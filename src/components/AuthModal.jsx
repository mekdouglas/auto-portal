import React, { useState } from 'react';
import { X, ShieldCheck, Building2, User, Search, ArrowRight, Check } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

export const AuthModal = () => {
  const { isAuthModalOpen, setIsAuthModalOpen, authMode, setAuthMode, login, register } = useAuth();

  const [step, setStep] = useState(1);
  const [selectedRole, setSelectedRole] = useState('garagista'); // 'garagista' | 'proprietario' | 'comprador'
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [city, setCity] = useState('');

  if (!isAuthModalOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    if (authMode === 'login') {
      login(email || 'autoluxe@motors.com', password || '123456');
    } else {
      register({
        name: name || (selectedRole === 'garagista' ? 'Garagem Premier Auto' : 'Usuário AutoPortal'),
        role: selectedRole,
        email,
        city: city || 'São Paulo, SP'
      });
    }
  };

  return (
    <div className="modal-overlay" onClick={() => setIsAuthModalOpen(false)}>
      <div className="modal-container auth-modal" onClick={e => e.stopPropagation()}>
        <div className="modal-header">
          <div className="auth-brand">
            <span className="logo-emoji">🏎️</span>
            <span>Auto<span className="accent">Portal</span></span>
          </div>
          <button className="btn-close-modal" onClick={() => setIsAuthModalOpen(false)}>
            <X size={20} />
          </button>
        </div>

        <div className="modal-body auth-modal-body">
          {/* Mode Switch Tabs */}
          <div className="auth-tabs">
            <button
              className={`auth-tab ${authMode === 'login' ? 'active' : ''}`}
              onClick={() => { setAuthMode('login'); setStep(1); }}
            >
              Entrar na Conta
            </button>
            <button
              className={`auth-tab ${authMode === 'register' ? 'active' : ''}`}
              onClick={() => { setAuthMode('register'); setStep(1); }}
            >
              Criar Novo Cadastro
            </button>
          </div>

          {authMode === 'register' && step === 1 ? (
            <div className="role-selection-step">
              <h3>Selecione seu perfil de acesso:</h3>
              <p className="step-subtitle">Como você pretende utilizar o portal hoje?</p>

              <div className="role-options-grid">
                <div
                  className={`role-option-card ${selectedRole === 'garagista' ? 'selected' : ''}`}
                  onClick={() => setSelectedRole('garagista')}
                >
                  <div className="role-card-header">
                    <Building2 className="role-icon" size={24} />
                    {selectedRole === 'garagista' && <Check className="check-icon" size={18} />}
                  </div>
                  <h4>Garagista / Loja</h4>
                  <p>Tenho estoque de veículos. Quero anunciar múltiplos carros/motos e receber propostas diretas.</p>
                  <span className="role-badge-tag">Perfil Comercial</span>
                </div>

                <div
                  className={`role-option-card ${selectedRole === 'proprietario' ? 'selected' : ''}`}
                  onClick={() => setSelectedRole('proprietario')}
                >
                  <div className="role-card-header">
                    <User className="role-icon" size={24} />
                    {selectedRole === 'proprietario' && <Check className="check-icon" size={18} />}
                  </div>
                  <h4>Proprietário (PF)</h4>
                  <p>Desejo anunciar meu próprio veículo particular com áudio-para-texto e sigilo de preço.</p>
                  <span className="role-badge-tag">Pessoa Física</span>
                </div>

                <div
                  className={`role-option-card ${selectedRole === 'comprador' ? 'selected' : ''}`}
                  onClick={() => setSelectedRole('comprador')}
                >
                  <div className="role-card-header">
                    <Search className="role-icon" size={24} />
                    {selectedRole === 'comprador' && <Check className="check-icon" size={18} />}
                  </div>
                  <h4>Comprador</h4>
                  <p>Quero navegar pelo feed estilo Instagram, salvar favoritos e enviar propostas financeiras.</p>
                  <span className="role-badge-tag">Navegação & Compra</span>
                </div>
              </div>

              <button className="btn-next-step" onClick={() => setStep(2)}>
                <span>Continuar para dados</span>
                <ArrowRight size={18} />
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="auth-form">
              {authMode === 'register' && (
                <>
                  <div className="form-group">
                    <label>{selectedRole === 'garagista' ? 'Nome da Garagem / Loja' : 'Seu Nome Completo'}</label>
                    <input
                      type="text"
                      placeholder={selectedRole === 'garagista' ? 'Ex: Motors SP Garagem' : 'Ex: Carlos Silva'}
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      required
                    />
                  </div>
                  <div className="form-group">
                    <label>Cidade e Estado</label>
                    <input
                      type="text"
                      placeholder="Ex: São Paulo, SP"
                      value={city}
                      onChange={(e) => setCity(e.target.value)}
                    />
                  </div>
                </>
              )}

              <div className="form-group">
                <label>E-mail de Acesso</label>
                <input
                  type="email"
                  placeholder="seuemail@dominio.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>

              <div className="form-group">
                <label>Senha</label>
                <input
                  type="password"
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>

              <div className="google-login-notice">
                <ShieldCheck size={16} />
                <span>Integração Google OAuth disponível em breve (Modo Simplificado ativo no MVP)</span>
              </div>

              <button type="submit" className="btn-auth-submit">
                {authMode === 'login' ? 'Entrar no AutoPortal' : 'Concluir Cadastro'}
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};
