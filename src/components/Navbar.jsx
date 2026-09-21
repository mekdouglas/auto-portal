import React from 'react';
import { Home, Compass, PlusCircle, MessageSquare, User } from 'lucide-react';
import { useChats } from '../context/ChatContext';

export const Navbar = ({ activeTab, setActiveTab, onOpenCreateAd }) => {
  const { chats } = useChats();

  const totalUnread = chats.reduce((acc, c) => acc + (c.unreadCount || 0), 0);

  return (
    <nav className="mobile-bottom-navbar">
      <button
        className={`nav-item ${activeTab === 'feed' ? 'active' : ''}`}
        onClick={() => setActiveTab('feed')}
      >
        <Home size={22} />
        <span>Feed</span>
      </button>

      <button
        className={`nav-item ${activeTab === 'explore' ? 'active' : ''}`}
        onClick={() => setActiveTab('explore')}
      >
        <Compass size={22} />
        <span>Explorar</span>
      </button>

      <button
        className="nav-item nav-item-create"
        onClick={onOpenCreateAd}
        title="Anunciar Veículo"
      >
        <div className="plus-btn-inner">
          <PlusCircle size={28} />
        </div>
        <span>Anunciar</span>
      </button>

      <button
        className={`nav-item ${activeTab === 'chat' ? 'active' : ''}`}
        onClick={() => setActiveTab('chat')}
      >
        <div className="nav-icon-wrapper">
          <MessageSquare size={22} />
          {totalUnread > 0 && <span className="nav-badge">{totalUnread}</span>}
        </div>
        <span>Chat & Ofertas</span>
      </button>

      <button
        className={`nav-item ${activeTab === 'profile' ? 'active' : ''}`}
        onClick={() => setActiveTab('profile')}
      >
        <User size={22} />
        <span>Perfil</span>
      </button>
    </nav>
  );
};
