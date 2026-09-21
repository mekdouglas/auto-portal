import React, { useState } from 'react';
import { 
  Send, 
  DollarSign, 
  CheckCircle2, 
  XCircle, 
  RotateCcw, 
  Lock, 
  ShieldCheck, 
  MessageSquare,
  ChevronRight,
  AlertCircle
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useChats } from '../context/ChatContext';

export const ChatPage = () => {
  const { currentUser, setIsAuthModalOpen, setAuthMode } = useAuth();
  const { chats, activeChatId, setActiveChatId, sendMessage, updateOfferStatus } = useChats();

  const [inputMsg, setInputMsg] = useState('');
  const [counterModalOfferId, setCounterModalOfferId] = useState(null);
  const [counterVal, setCounterVal] = useState('');

  if (!currentUser) {
    return (
      <div className="page-container chat-page auth-required-state">
        <div className="auth-required-box">
          <MessageSquare size={48} className="lock-icon-lg" />
          <h2>Negociações & Chat de Propostas</h2>
          <p>Faça login para visualizar seus chats ativos e gerenciar propostas de compra e venda.</p>
          <button
            className="btn-primary-auth"
            onClick={() => { setAuthMode('login'); setIsAuthModalOpen(true); }}
          >
            Entrar na sua Conta
          </button>
        </div>
      </div>
    );
  }

  const activeChat = chats.find(c => c.id === activeChatId) || chats[0];

  const handleSendText = (e) => {
    e.preventDefault();
    if (!inputMsg.trim() || !activeChat) return;
    sendMessage(activeChat.id, inputMsg, currentUser.id);
    setInputMsg('');
  };

  const handleAcceptOffer = (offerId) => {
    updateOfferStatus(activeChat.id, offerId, 'accepted');
  };

  const handleRejectOffer = (offerId) => {
    updateOfferStatus(activeChat.id, offerId, 'rejected');
  };

  const handleSendCounter = (e) => {
    e.preventDefault();
    if (!counterVal || !counterModalOfferId) return;
    updateOfferStatus(activeChat.id, counterModalOfferId, 'countered', counterVal);
    setCounterModalOfferId(null);
    setCounterVal('');
  };

  return (
    <div className="page-container chat-page">
      <div className="chat-layout">
        {/* Left Sidebar: Threads List */}
        <div className="chat-threads-sidebar">
          <div className="sidebar-header">
            <h3>Negociações Activas</h3>
            <span className="threads-count">{chats.length} conversas</span>
          </div>

          <div className="threads-list">
            {chats.map(chat => {
              const isActive = activeChat && activeChat.id === chat.id;

              return (
                <div
                  key={chat.id}
                  className={`thread-item ${isActive ? 'active' : ''}`}
                  onClick={() => setActiveChatId(chat.id)}
                >
                  <img src={chat.vehiclePhoto} alt={chat.vehicleTitle} className="thread-vehicle-photo" />
                  <div className="thread-info">
                    <div className="thread-top">
                      <span className="thread-title">{chat.vehicleTitle}</span>
                      <span className="thread-time">{chat.lastMessageTime}</span>
                    </div>
                    <span className="thread-participant">{chat.participant.name}</span>
                    <p className="thread-last-msg">{chat.lastMessage}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Main Conversation Window */}
        {activeChat ? (
          <div className="chat-main-window">
            {/* Header */}
            <div className="chat-window-header">
              <img src={activeChat.vehiclePhoto} alt={activeChat.vehicleTitle} className="chat-header-thumb" />
              <div className="chat-header-title-box">
                <h4>{activeChat.vehicleTitle}</h4>
                <div className="chat-header-sub">
                  <span>Negociação com: <strong>{activeChat.participant.name}</strong></span>
                  <span className="chat-header-price">• R$ {activeChat.vehiclePrice.toLocaleString('pt-BR')}</span>
                </div>
              </div>
            </div>

            {/* Messages Area */}
            <div className="chat-messages-container">
              {activeChat.messages.map(msg => {
                const isMe = msg.senderId === currentUser.id;

                if (msg.type === 'offer') {
                  const offer = msg.offerData;
                  const isOfferPending = offer.status === 'pending';
                  const isOfferAccepted = offer.status === 'accepted';
                  const isOfferRejected = offer.status === 'rejected';
                  const isOfferCountered = offer.status === 'countered';

                  return (
                    <div key={msg.id} className={`chat-message-row ${isMe ? 'my-msg' : 'their-msg'}`}>
                      <div className="offer-card-embedded">
                        <div className="offer-card-top">
                          <DollarSign className="offer-icon-gold" size={20} />
                          <div className="offer-title-group">
                            <span className="offer-card-label">Proposta Financeira Formal</span>
                            <span className="offer-card-amount">R$ {offer.amount.toLocaleString('pt-BR')}</span>
                          </div>

                          <span className={`offer-status-badge ${offer.status}`}>
                            {isOfferPending && 'Pendente'}
                            {isOfferAccepted && '✅ Aceita'}
                            {isOfferRejected && '❌ Recusada'}
                            {isOfferCountered && '🔄 Contraproposta'}
                          </span>
                        </div>

                        <div className="offer-card-details">
                          <div className="offer-detail-line">
                            <span>Preço Anunciado:</span>
                            <span>R$ {offer.originalPrice.toLocaleString('pt-BR')}</span>
                          </div>
                          <div className="offer-detail-line">
                            <span>Pagamento:</span>
                            <span>{offer.paymentType}</span>
                          </div>
                          {offer.notes && (
                            <div className="offer-notes">"{offer.notes}"</div>
                          )}

                          {isOfferCountered && offer.counterAmount && (
                            <div className="counter-offer-box">
                              <strong>Nova Contraproposta do Vendedor:</strong>
                              <span className="counter-val">R$ {offer.counterAmount.toLocaleString('pt-BR')}</span>
                            </div>
                          )}
                        </div>

                        {/* Interactive Actions for Seller when Pending */}
                        {isOfferPending && !isMe && (
                          <div className="offer-actions-bar">
                            <button
                              className="btn-offer-action accept"
                              onClick={() => handleAcceptOffer(offer.id)}
                            >
                              <CheckCircle2 size={16} /> Aceitar Proposta
                            </button>
                            <button
                              className="btn-offer-action counter"
                              onClick={() => {
                                setCounterModalOfferId(offer.id);
                                setCounterVal(Math.round((offer.amount + offer.originalPrice) / 2));
                              }}
                            >
                              <RotateCcw size={16} /> Contraproposta
                            </button>
                            <button
                              className="btn-offer-action reject"
                              onClick={() => handleRejectOffer(offer.id)}
                            >
                              <XCircle size={16} /> Recusar
                            </button>
                          </div>
                        )}
                      </div>
                    </div>
                  );
                }

                return (
                  <div key={msg.id} className={`chat-message-row ${isMe ? 'my-msg' : 'their-msg'}`}>
                    <div className="message-bubble">
                      <p>{msg.text}</p>
                      <span className="message-time">{msg.timestamp}</span>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Input Bar */}
            <form onSubmit={handleSendText} className="chat-input-bar">
              <input
                type="text"
                placeholder="Escreva sua mensagem de negociação..."
                value={inputMsg}
                onChange={(e) => setInputMsg(e.target.value)}
              />
              <button type="submit" className="btn-send-msg">
                <Send size={18} />
              </button>
            </form>
          </div>
        ) : (
          <div className="empty-chat-state">
            <MessageSquare size={40} />
            <p>Selecione uma conversa ao lado para visualizar a negociação</p>
          </div>
        )}
      </div>

      {/* Counter Offer Modal */}
      {counterModalOfferId && (
        <div className="modal-overlay" onClick={() => setCounterModalOfferId(null)}>
          <div className="modal-container counter-modal" onClick={e => e.stopPropagation()}>
            <h4>Enviar Contraproposta ao Comprador</h4>
            <p>Defina o novo valor intermediário que você aceita para fechar negócio:</p>

            <form onSubmit={handleSendCounter}>
              <div className="currency-input-wrapper">
                <span className="currency-symbol">R$</span>
                <input
                  type="number"
                  step="1000"
                  value={counterVal}
                  onChange={(e) => setCounterVal(Number(e.target.value))}
                  required
                />
              </div>

              <div className="counter-modal-actions">
                <button type="button" className="btn-cancel" onClick={() => setCounterModalOfferId(null)}>
                  Cancelar
                </button>
                <button type="submit" className="btn-submit-counter">
                  Enviar Contraproposta
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
