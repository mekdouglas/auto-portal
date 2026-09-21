import React, { useState } from 'react';
import { 
  Heart, 
  MessageCircle, 
  Bookmark, 
  Share2, 
  MapPin, 
  CheckCircle2, 
  Lock, 
  Eye, 
  Sparkles, 
  Volume2, 
  VolumeX, 
  ChevronLeft, 
  ChevronRight,
  DollarSign,
  Tag
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useVehicles } from '../context/VehicleContext';
import { useChats } from '../context/ChatContext';

export const FeedCard = ({ vehicle }) => {
  const { currentUser, setIsAuthModalOpen, setAuthMode } = useAuth();
  const { toggleLike, toggleSave, setSelectedVehicle, setOfferModalVehicle } = useVehicles();
  const { createOrGetChat } = useChats();

  const [activePhotoIndex, setActivePhotoIndex] = useState(0);
  const [showHeartAnim, setShowHeartAnim] = useState(false);
  const [isPlayingAudio, setIsPlayingAudio] = useState(false);

  const handleDoubleTap = () => {
    if (!vehicle.isLiked) {
      toggleLike(vehicle.id);
    }
    setShowHeartAnim(true);
    setTimeout(() => setShowHeartAnim(false), 800);
  };

  const handleNextPhoto = (e) => {
    e.stopPropagation();
    if (activePhotoIndex < vehicle.photos.length - 1) {
      setActivePhotoIndex(prev => prev + 1);
    }
  };

  const handlePrevPhoto = (e) => {
    e.stopPropagation();
    if (activePhotoIndex > 0) {
      setActivePhotoIndex(prev => prev - 1);
    }
  };

  const handleOpenChat = () => {
    if (!currentUser) {
      setAuthMode('login');
      setIsAuthModalOpen(true);
      return;
    }
    createOrGetChat(vehicle, currentUser);
    // Navigation to chat page handled in app
  };

  const handleMakeOffer = () => {
    if (!currentUser) {
      setAuthMode('login');
      setIsAuthModalOpen(true);
      return;
    }
    setOfferModalVehicle(vehicle);
  };

  const isPriceHidden = vehicle.hidePrice && !currentUser;

  return (
    <article className="instagram-feed-card">
      {/* Header */}
      <div className="card-header">
        <div className="seller-profile-info">
          <div className="avatar-wrapper">
            <img src={vehicle.seller.avatar} alt={vehicle.seller.name} className="seller-avatar" />
            {vehicle.seller.verified && (
              <CheckCircle2 className="verified-badge" size={14} />
            )}
          </div>
          <div className="seller-details">
            <div className="seller-name-row">
              <span className="seller-name">{vehicle.seller.name}</span>
              <span className="seller-role-tag">{vehicle.seller.role === 'garagista' ? 'Loja' : 'Proprietário'}</span>
            </div>
            <div className="seller-location">
              <MapPin size={12} />
              <span>{vehicle.location} • {vehicle.createdAt}</span>
            </div>
          </div>
        </div>

        {vehicle.featured && (
          <div className="vip-ribbon">
            <Sparkles size={12} />
            <span>{vehicle.featuredTag || 'VIP'}</span>
          </div>
        )}
      </div>

      {/* Media Carousel */}
      <div className="card-media-wrapper" onDoubleClick={handleDoubleTap}>
        <img
          src={vehicle.photos[activePhotoIndex]}
          alt={vehicle.title}
          className="feed-media-img"
        />

        {showHeartAnim && (
          <div className="heart-double-tap-anim">
            <Heart size={80} fill="#FF2E63" color="#FF2E63" />
          </div>
        )}

        {/* Navigation Arrows */}
        {vehicle.photos.length > 1 && (
          <>
            {activePhotoIndex > 0 && (
              <button className="carousel-btn prev" onClick={handlePrevPhoto}>
                <ChevronLeft size={20} />
              </button>
            )}
            {activePhotoIndex < vehicle.photos.length - 1 && (
              <button className="carousel-btn next" onClick={handleNextPhoto}>
                <ChevronRight size={20} />
              </button>
            )}
            <div className="carousel-dots">
              {vehicle.photos.map((_, idx) => (
                <span
                  key={idx}
                  className={`dot ${idx === activePhotoIndex ? 'active' : ''}`}
                ></span>
              ))}
            </div>
          </>
        )}

        <div className="category-pill-tag">
          {vehicle.category === 'carro' ? '🚘 Carro' : '🏍️ Moto'}
        </div>
      </div>

      {/* Action Bar */}
      <div className="card-action-bar">
        <div className="left-actions">
          <button
            className={`action-btn ${vehicle.isLiked ? 'liked' : ''}`}
            onClick={() => toggleLike(vehicle.id)}
          >
            <Heart size={24} fill={vehicle.isLiked ? '#FF2E63' : 'none'} color={vehicle.isLiked ? '#FF2E63' : 'currentColor'} />
            <span className="action-count">{vehicle.likesCount}</span>
          </button>

          <button className="action-btn" onClick={handleOpenChat}>
            <MessageCircle size={24} />
          </button>

          <button
            className="action-btn btn-make-offer"
            onClick={handleMakeOffer}
            title="Enviar Proposta com Valor"
          >
            <DollarSign size={18} />
            <span>Fazer Proposta</span>
          </button>
        </div>

        <div className="right-actions">
          <button
            className={`action-btn ${vehicle.isSaved ? 'saved' : ''}`}
            onClick={() => toggleSave(vehicle.id)}
          >
            <Bookmark size={24} fill={vehicle.isSaved ? '#F0A500' : 'none'} color={vehicle.isSaved ? '#F0A500' : 'currentColor'} />
          </button>
        </div>
      </div>

      {/* Price Section */}
      <div className="card-price-section">
        {isPriceHidden ? (
          <div
            className="hidden-price-banner"
            onClick={() => { setAuthMode('login'); setIsAuthModalOpen(true); }}
          >
            <Lock size={16} className="lock-icon" />
            <div className="hidden-price-text">
              <span className="hidden-title">R$ ••••••••</span>
              <span className="hidden-sub">Preço oculto pelo vendedor. <strong>Faça login para ver</strong></span>
            </div>
          </div>
        ) : (
          <div className="price-display">
            <span className="price-currency">R$</span>
            <span className="price-amount">{vehicle.price.toLocaleString('pt-BR')}</span>
            <span className="price-condition">À vista ou Financiamento</span>
          </div>
        )}
      </div>

      {/* Content & Specs */}
      <div className="card-content">
        <h3 className="vehicle-title" onClick={() => setSelectedVehicle(vehicle)}>
          {vehicle.title}
        </h3>

        <div className="spec-pills-row">
          <span className="spec-pill">{vehicle.year}</span>
          <span className="spec-pill">{vehicle.mileage.toLocaleString('pt-BR')} km</span>
          <span className="spec-pill">{vehicle.transmission}</span>
          <span className="spec-pill">{vehicle.fuel}</span>
        </div>

        {/* Audio Description Player if present */}
        {vehicle.audioTranscript && (
          <div className="audio-player-card">
            <button
              className="btn-play-audio"
              onClick={() => setIsPlayingAudio(!isPlayingAudio)}
            >
              {isPlayingAudio ? <VolumeX size={16} /> : <Volume2 size={16} />}
              <span>{isPlayingAudio ? 'Pausar Áudio' : `Ouvir Áudio (${vehicle.audioDuration || '0:20'})`}</span>
            </button>
            <div className="audio-wave-anim">
              <div className={`bar ${isPlayingAudio ? 'playing' : ''}`}></div>
              <div className={`bar ${isPlayingAudio ? 'playing' : ''}`}></div>
              <div className={`bar ${isPlayingAudio ? 'playing' : ''}`}></div>
              <div className={`bar ${isPlayingAudio ? 'playing' : ''}`}></div>
            </div>
            <p className="audio-transcript-snippet">
              "{vehicle.audioTranscript}"
            </p>
          </div>
        )}

        <p className="vehicle-description">
          <strong>{vehicle.seller.name}</strong> {vehicle.description}
        </p>

        <button
          className="btn-view-details"
          onClick={() => setSelectedVehicle(vehicle)}
        >
          <Eye size={14} />
          <span>Ver ficha técnica completa e mais fotos</span>
        </button>
      </div>
    </article>
  );
};
