import React, { useState } from 'react';
import { Search, SlidersHorizontal, Bell, ShieldCheck, UserCheck, Sparkles, LogOut, ChevronDown } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useVehicles } from '../context/VehicleContext';

export const Header = () => {
  const { currentUser, switchRole, logout, setIsAuthModalOpen, setAuthMode } = useAuth();
  const { searchQuery, setSearchQuery, setIsFilterOpen } = useVehicles();
  const [isRoleDropdownOpen, setIsRoleDropdownOpen] = useState(false);

  const getRoleLabel = (role) => {
    if (role === 'garagista') return 'Garagista / Loja';
    if (role === 'proprietario') return 'Proprietário PF';
    return 'Comprador';
  };

  const getRoleBadgeClass = (role) => {
    if (role === 'garagista') return 'badge-garagista';
    if (role === 'proprietario') return 'badge-proprietario';
    return 'badge-comprador';
  };

  return (
    <header className="app-header">
      <div className="header-top">
        <div className="brand-logo">
          <span className="logo-icon">🏎️</span>
          <div className="logo-text">
            <span className="logo-title">Auto<span className="accent">Portal</span></span>
            <span className="logo-sub">SEU PRÓXIMO CARRO ESTÁ AQUI</span>
          </div>
        </div>

        <div className="header-actions">
          {currentUser ? (
            <div className="role-selector-wrapper">
              <button
                className={`role-pill ${getRoleBadgeClass(currentUser.role)}`}
                onClick={() => setIsRoleDropdownOpen(!isRoleDropdownOpen)}
              >
                <img src={currentUser.avatar} alt={currentUser.name} className="user-avatar-mini" />
                <div className="user-pill-text">
                  <span className="user-pill-name">{currentUser.name.split(' ')[0]}</span>
                  <span className="user-pill-role">{getRoleLabel(currentUser.role)}</span>
                </div>
                <ChevronDown size={14} />
              </button>

              {isRoleDropdownOpen && (
                <div className="role-dropdown-menu">
                  <div className="dropdown-header">Alternar Perfil (Simulação)</div>
                  <button
                    className={`dropdown-item ${currentUser.role === 'garagista' ? 'active' : ''}`}
                    onClick={() => { switchRole('garagista'); setIsRoleDropdownOpen(false); }}
                  >
                    <span className="role-icon">🏢</span>
                    <div>
                      <strong>Garagista (Loja)</strong>
                      <small>Gerencie estoque e receba leads</small>
                    </div>
                  </button>
                  <button
                    className={`dropdown-item ${currentUser.role === 'proprietario' ? 'active' : ''}`}
                    onClick={() => { switchRole('proprietario'); setIsRoleDropdownOpen(false); }}
                  >
                    <span className="role-icon">🚗</span>
                    <div>
                      <strong>Proprietário (PF)</strong>
                      <small>Anuncie seus carros pessoais</small>
                    </div>
                  </button>
                  <button
                    className={`dropdown-item ${currentUser.role === 'comprador' ? 'active' : ''}`}
                    onClick={() => { switchRole('comprador'); setIsRoleDropdownOpen(false); }}
                  >
                    <span className="role-icon">🔍</span>
                    <div>
                      <strong>Comprador</strong>
                      <small>Navegue e faça propostas</small>
                    </div>
                  </button>

                  <hr className="dropdown-divider" />
                  <button
                    className="dropdown-item danger"
                    onClick={() => { logout(); setIsRoleDropdownOpen(false); }}
                  >
                    <LogOut size={16} />
                    <span>Sair da conta</span>
                  </button>
                </div>
              )}
            </div>
          ) : (
            <button
              className="btn-login-header"
              onClick={() => { setAuthMode('login'); setIsAuthModalOpen(true); }}
            >
              Entrar
            </button>
          )}

          <button className="icon-btn-header" title="Notificações">
            <Bell size={20} />
            <span className="notification-dot"></span>
          </button>
        </div>
      </div>

      <div className="header-search-bar">
        <div className="search-input-container">
          <Search size={18} className="search-icon" />
          <input
            type="text"
            placeholder="Buscar por Porsche, BMW, SUV, Garagem..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          {searchQuery && (
            <button className="clear-search" onClick={() => setSearchQuery('')}>×</button>
          )}
        </div>
        <button
          className="btn-filter-trigger"
          onClick={() => setIsFilterOpen(true)}
          title="Filtros avançados"
        >
          <SlidersHorizontal size={18} />
        </button>
      </div>
    </header>
  );
};
