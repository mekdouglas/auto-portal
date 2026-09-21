import React, { useState } from 'react';
import { 
  Building2, 
  User, 
  CheckCircle2, 
  Sparkles, 
  Star, 
  MapPin, 
  Phone, 
  DollarSign, 
  ShieldCheck,
  TrendingUp,
  Package,
  Heart,
  Plus,
  Zap,
  Check,
  Lock
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useVehicles } from '../context/VehicleContext';

export const ProfilePage = ({ onOpenCreateAd }) => {
  const { currentUser, setIsAuthModalOpen, setAuthMode, switchRole } = useAuth();
  const { vehicles, setSelectedVehicle } = useVehicles();
  const [showPlansModal, setShowPlansModal] = useState(false);

  if (!currentUser) {
    return (
      <div className="page-container profile-page auth-required-state">
        <div className="auth-required-box">
          <User size={48} className="lock-icon-lg" />
          <h2>Seu Perfil no AutoPortal</h2>
          <p>Acesse seu perfil para gerenciar anúncios, ver favoritos e planos de garagista.</p>
          <button
            className="btn-primary-auth"
            onClick={() => { setAuthMode('login'); setIsAuthModalOpen(true); }}
          >
            Entrar ou Cadastrar
          </button>
        </div>
      </div>
    );
  }

  // Filter vehicles owned by current user
  const myVehicles = vehicles.filter(v => v.seller.id === currentUser.id || currentUser.role === 'garagista');
  const savedVehicles = vehicles.filter(v => v.isSaved);

  return (
    <div className="page-container profile-page">
      {/* Profile Header Card */}
      <div className="profile-header-card">
        <div className="cover-image-wrapper">
          <img
            src={currentUser.coverImage || 'https://images.unsplash.com/photo-1563720223185-11003d516935?auto=format&fit=crop&w=1200&q=80'}
            alt="Capa"
            className="cover-img"
          />
        </div>

        <div className="profile-details-row">
          <div className="profile-avatar-container">
            <img src={currentUser.avatar} alt={currentUser.name} className="profile-avatar-lg" />
            {currentUser.verified && <CheckCircle2 className="avatar-badge-verified" size={20} />}
          </div>

          <div className="profile-meta">
            <div className="name-role-line">
              <h2>{currentUser.name}</h2>
              <span className={`role-badge ${currentUser.role}`}>
                {currentUser.role === 'garagista' ? 'Garagem Comercial' : currentUser.role === 'proprietario' ? 'Proprietário PF' : 'Comprador'}
              </span>
            </div>

            <span className="username-tag">{currentUser.username}</span>

            <div className="rating-loc-line">
              <span className="rating-pill">
                <Star size={14} fill="#F0A500" color="#F0A500" />
                <strong>{currentUser.rating || '5.0'}</strong>
              </span>
              <span className="loc-pill">
                <MapPin size={14} /> {currentUser.city}
              </span>
            </div>
          </div>

          <div className="profile-action-btns">
            <button className="btn-create-ad-profile" onClick={onOpenCreateAd}>
              <Plus size={16} /> Novo Anúncio
            </button>
          </div>
        </div>

        <p className="profile-bio-text">{currentUser.bio}</p>

        {/* Garagista Subscription Plan Banner */}
        {currentUser.role === 'garagista' && (
          <div className="plan-status-card">
            <div className="plan-status-info">
              <div className="plan-status-title">
                <Sparkles size={18} className="gold-sparkle" />
                <span>Plano Garagista Ativo: <strong>{currentUser.plan || 'Profissional'}</strong></span>
              </div>
              <p>Estoque Ilimitado • Feed VIP com Prioridade • Selo de Garagem Verificada</p>
            </div>
            <button className="btn-upgrade-plan" onClick={() => setShowPlansModal(true)}>
              Gerenciar Assinatura
            </button>
          </div>
        )}
      </div>

      {/* Role Tabs Content */}
      <div className="profile-content-section">
        {currentUser.role === 'garagista' || currentUser.role === 'proprietario' ? (
          <div className="inventory-dashboard">
            <div className="dashboard-stats-row">
              <div className="stat-card">
                <Package size={20} className="stat-icon" />
                <div>
                  <span className="stat-num">{myVehicles.length}</span>
                  <span className="stat-label">Anúncios Ativos</span>
                </div>
              </div>
              <div className="stat-card">
                <TrendingUp size={20} className="stat-icon green" />
                <div>
                  <span className="stat-num">4.820</span>
                  <span className="stat-label">Visualizações</span>
                </div>
              </div>
              <div className="stat-card">
                <DollarSign size={20} className="stat-icon gold" />
                <div>
                  <span className="stat-num">14</span>
                  <span className="stat-label">Propostas Recebidas</span>
                </div>
              </div>
            </div>

            <div className="section-title-row">
              <h3>Estoque Anunciado ({myVehicles.length})</h3>
              <button className="btn-add-stock" onClick={onOpenCreateAd}>+ Adicionar Veículo</button>
            </div>

            <div className="inventory-grid">
              {myVehicles.map(veh => (
                <div key={veh.id} className="inventory-item-card">
                  <img src={veh.photos[0]} alt={veh.title} className="inventory-thumb" />
                  <div className="inventory-info">
                    <h4>{veh.title}</h4>
                    <span className="inventory-price">R$ {veh.price.toLocaleString('pt-BR')}</span>
                    <div className="inventory-badges">
                      {veh.hidePrice && <span className="hide-price-tag"><Lock size={10} /> Preço Oculto</span>}
                      {veh.featured && <span className="boost-tag"><Zap size={10} /> {veh.featuredTag}</span>}
                    </div>
                  </div>
                  <button className="btn-view-item" onClick={() => setSelectedVehicle(veh)}>
                    Gerenciar
                  </button>
                </div>
              ))}
            </div>
          </div>
        ) : (
          <div className="buyer-dashboard">
            <h3>Veículos Salvos nos Favoritos ({savedVehicles.length})</h3>
            <div className="inventory-grid">
              {savedVehicles.map(veh => (
                <div key={veh.id} className="inventory-item-card" onClick={() => setSelectedVehicle(veh)}>
                  <img src={veh.photos[0]} alt={veh.title} className="inventory-thumb" />
                  <div className="inventory-info">
                    <h4>{veh.title}</h4>
                    <span className="inventory-price">R$ {veh.price.toLocaleString('pt-BR')}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Subscription Plans Modal for Garagistas */}
      {showPlansModal && (
        <div className="modal-overlay" onClick={() => setShowPlansModal(false)}>
          <div className="modal-container plans-modal" onClick={e => e.stopPropagation()}>
            <div className="modal-header">
              <h3>Planos de Monetização para Garagistas</h3>
              <button className="btn-close-modal" onClick={() => setShowPlansModal(false)}>×</button>
            </div>

            <div className="modal-body">
              <div className="subscription-plans-grid">
                <div className="sub-plan-card">
                  <h4>Plano Básico</h4>
                  <div className="sub-price">R$ 99 <small>/mês</small></div>
                  <ul>
                    <li><Check size={14} /> Até 5 veículos simultâneos</li>
                    <li><Check size={14} /> Recebimento de propostas no Chat</li>
                  </ul>
                  <button className="btn-select-sub">Selecionar</button>
                </div>

                <div className="sub-plan-card featured">
                  <div className="popular-tag">MAIS POPULAR</div>
                  <h4>Plano Profissional</h4>
                  <div className="sub-price">R$ 249 <small>/mês</small></div>
                  <ul>
                    <li><Check size={14} /> Até 25 veículos no estoque</li>
                    <li><Check size={14} /> 3 Anúncios VIP por mês</li>
                    <li><Check size={14} /> Selo de Garagem Verificada</li>
                  </ul>
                  <button className="btn-select-sub primary">Assinar Profissional</button>
                </div>

                <div className="sub-plan-card">
                  <h4>Plano Elite VIP</h4>
                  <div className="sub-price">R$ 499 <small>/mês</small></div>
                  <ul>
                    <li><Check size={14} /> Estoque Ilimitado</li>
                    <li><Check size={14} /> Destaque ilimitado no Feed estilo Instagram</li>
                    <li><Check size={14} /> Suporte prioritário 24/7</li>
                  </ul>
                  <button className="btn-select-sub">Assinar Elite</button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
