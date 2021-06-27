import { FormEvent, useState } from 'react';
import { useHistory } from 'react-router-dom';

import illustrationImg from '../../assets/images/illustration.svg';
import logoImg from '../../assets/images/logo.svg';
import goolgeIconImg from '../../assets/images/google-icon.svg';

import '../../styles/auth.scss';

import { Button } from '../../components/Button';

import { useAuth } from '../../hooks/useAuth';
import { database } from '../../services/firebase';

export function Home() {
  const history = useHistory();
  const [roomCode, setRoomCode] = useState('');
  const { user, signInWithGoolge } = useAuth();

  async function handleCreateRoom() {
    if(!user) {
      await signInWithGoolge();
    }

    history.push('/rooms/new');
  }

  async function handleJoinRoom(event: FormEvent) {
    event.preventDefault();

    if (roomCode.trim() === '') {
      return;
    } 

    const roomRef = await database.ref(`rooms/${roomCode}`).get();

    if (!roomRef.exists()) {
      alert('Room does not exists.')
      return;
    }

    history.push(`/rooms/${roomCode}`)
  }

  return (
    <div id="page-auth">
      <aside>
          <img src={illustrationImg} alt="Ilustração simbolizando perguntas e respotas" />
          <strong>Crie salas de Q&amp;A ao-vivo</strong>
          <p>Tire as dúvidas da sua audiência em tempo-real</p>
      </aside>
      <main>
        <div className="main-content">
          <img src={logoImg} alt="Letmeask" />
          <button onClick={handleCreateRoom} className="create-room">
            <img src={goolgeIconImg} alt="Logo do Goolge" />
            Crie sua sala como o Goolge
          </button>
          <div className="separator">ou entre em uma sala</div>
          <form onSubmit={handleJoinRoom}>
            <input 
              type="text"
              placeholder="Digite o código da sala" 
              onChange={event => setRoomCode(event.target.value)}
              value={roomCode}
            />
            <Button type="submit">Entrar na Sala</Button>
          </form>
        </div>
      </main>
    </div>
  )
}