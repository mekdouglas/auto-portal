import React, { useState } from 'react';
import { 
  X, 
  MapPin, 
  Phone, 
  MessageCircle, 
  DollarSign, 
  CheckCircle2, 
  Share2, 
  Bookmark, 
  Heart,
  Volume2,
  Lock,
  ChevronLeft,
  ChevronRight,
  ShieldCheck,
  Calendar,
  Gauge,
  Fuel,
  Settings
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useVehicles } from '../context/VehicleContext';
import { useChats } from '../context/ChatContext';

export const VehicleDetailModal = ({ vehicle, onClose, onOpenChat, onOpenOffer }) => {
  const { currentUser, setIsAuthModalOpen, setAuthMode } = useAuth();
  const { toggleLike, toggleSave } = useVehicles();
  const { createOrGetChat } = useChats();

  const [activeIdx, setActiveIdx] = useState(0);
  const [isPlayingAudio, setIsPlayingAudio] = useState(false);

  const isPriceHidden = vehicle.hidePrice && !currentUser;

  const handleStartChat = () => {
    if (!currentUser) {
      setAuthMode('login');
      setIsAuthModalOpen(true);
      return;
    }
    const chatId = createOrGetChat(vehicle, currentUser);
    onClose();
    if (onOpenChat) onOpenChat(chatId);
  };

  const handleMakeOffer = () => {
    if (!currentUser) {
      setAuthMode('login');
      setIsAuthModalOpen(true);
      return;
    }
    onClose();
    if (onOpenOffer) onOpenOffer(vehicle);
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-container vehicle-detail-modal" onClick={e => e.stopPropagation()}>
        <button className="btn-close-floating" onClick={onClose}>
          <X size={20} />
        </button>

        <div className="modal-body detail-modal-body">
          {/* Gallery Slider */}
          <div className="detail-gallery">
            <img src={vehicle.photos[activeIdx]} alt={vehicle.title} className="detail-main-img" />
            {vehicle.photos.length > 1 && (
              <>
                {activeIdx > 0 && (
                  <button className="nav-arrow left" onClick={() => setActiveIdx(prev => prev - 1)}>
                    <ChevronLeft size={20} />
                  </button>
                )}
                {activeIdx < vehicle.photos.length - 1 && (
                  <button className="nav-arrow right" onClick={() => setActiveIdx(prev => prev + 1)}>
                    <ChevronRight size={20} />
                  </button>
                )}
              </>
            )}

            <div className="detail-thumbs">
              {vehicle.photos.map((photo, i) => (
                <img
                  key={i}
                  src={photo}
                  alt="thumbnail"
                  className={`thumb ${i === activeIdx ? 'active' : ''}`}
                  onClick={() => setActiveIdx(i)}
                />
              ))}
            </div>
          </div>

          {/* Main Info */}
          <div className="detail-info-section">
            <div className="detail-header-row">
              <span className="category-tag">{vehicle.category === 'carro' ? '🏎️ Carro' : '🏍️ Moto'}</span>
              <div className="quick-actions">
                <button
                  className={`icon-circle-btn ${vehicle.isLiked ? 'liked' : ''}`}
                  onClick={() => toggleLike(vehicle.id)}
                >
                  <Heart size={18} fill={vehicle.isLiked ? '#FF2E63' : 'none'} color={vehicle.isLiked ? '#FF2E63' : 'currentColor'} />
                </button>
                <button
                  className={`icon-circle-btn ${vehicle.isSaved ? 'saved' : ''}`}
                  onClick={() => toggleSave(vehicle.id)}
                >
                  <Bookmark size={18} fill={vehicle.isSaved ? '#F0A500' : 'none'} color={vehicle.isSaved ? '#F0A500' : 'currentColor'} />
                </button>
              </div>
            </div>

            <h1 className="detail-title">{vehicle.title}</h1>

            <div className="detail-price-box">
              {isPriceHidden ? (
                <div className="price-hidden-box" onClick={() => { setAuthMode('login'); setIsAuthModalOpen(true); }}>
                  <Lock size={18} />
                  <div>
                    <strong>R$ •••••••••</strong>
                    <p>Preço Oculto. Faça login para revelar o valor deste anúncio.</p>
                  </div>
                </div>
              ) : (
                <div className="price-unlocked-box">
                  <span className="price-label">Valor de Venda</span>
                  <div className="price-val">R$ {vehicle.price.toLocaleString('pt-BR')}</div>
                </div>
              )}
            </div>

            {/* Seller Card */}
            <div className="detail-seller-card">
              <img src={vehicle.seller.avatar} alt={vehicle.seller.name} className="seller-card-avatar" />
              <div className="seller-card-info">
                <div className="seller-card-name-row">
                  <strong>{vehicle.seller.name}</strong>
                  {vehicle.seller.verified && <CheckCircle2 size={16} className="blue-check" />}
                </div>
                <span className="seller-type">
                  {vehicle.seller.role === 'garagista' ? 'Garagem / Loja Especializada' : 'Proprietário Particular'}
                </span>
                <span className="seller-loc">
                  <MapPin size={12} /> {vehicle.location}
                </span>
              </div>
            </div>

            {/* Quick CTAs */}
            <div className="detail-cta-row">
              <button className="btn-cta offer" onClick={handleMakeOffer}>
                <DollarSign size={18} />
                <span>Fazer Proposta</span>
              </button>
              <button className="btn-cta chat" onClick={handleStartChat}>
                <MessageCircle size={18} />
                <span>Iniciar Chat</span>
              </button>
            </div>

            {/* Tech Specs */}
            <div className="specs-grid">
              <div className="spec-item">
                <Calendar size={18} className="spec-icon" />
                <div>
                  <small>Ano/Modelo</small>
                  <strong>{vehicle.year}</strong>
                </div>
              </div>
              <div className="spec-item">
                <Gauge size={18} className="spec-icon" />
                <div>
                  <small>Quilometragem</small>
                  <strong>{vehicle.mileage.toLocaleString('pt-BR')} km</strong>
                </div>
              </div>
              <div className="spec-item">
                <Fuel size={18} className="spec-icon" />
                <div>
                  <small>Combustível</small>
                  <strong>{vehicle.fuel}</strong>
                </div>
              </div>
              <div className="spec-item">
                <Settings size={18} className="spec-icon" />
                <div>
                  <small>Câmbio</small>
                  <strong>{vehicle.transmission}</strong>
                </div>
              </div>
            </div>

            {/* Audio Transcript */}
            {vehicle.audioTranscript && (
              <div className="detail-audio-box">
                <div className="audio-header">
                  <Volume2 size={18} className="accent-icon" />
                  <strong>Descrição Falada pelo Vendedor</strong>
                </div>
                <p className="transcript-text">"{vehicle.audioTranscript}"</p>
              </div>
            )}

            {/* Full Specs List */}
            {vehicle.specs && vehicle.specs.length > 0 && (
              <div className="equipment-list">
                <h3>Equipamentos e Opcionais</h3>
                <ul>
                  {vehicle.specs.map((item, idx) => (
                    <li key={idx}>
                      <ShieldCheck size={14} className="green-check" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Description */}
            <div className="detail-description">
              <h3>Descrição Geral</h3>
              <p>{vehicle.description}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
