import React, { useState } from 'react';
import { 
  ArrowLeft, 
  ArrowRight, 
  Check, 
  Upload, 
  Lock, 
  Eye, 
  EyeOff, 
  Sparkles,
  Plus,
  Trash2,
  Zap,
  Info,
  Calendar,
  Gauge,
  Settings,
  Fuel,
  FileText,
  Car,
  Bike,
  ShieldCheck,
  Filter,
  RotateCcw,
  Search
} from 'lucide-react';
import { VoiceRecorder } from '../components/VoiceRecorder';
import { CheckoutModal } from '../components/CheckoutModal';
import { useAuth } from '../context/AuthContext';
import { useVehicles } from '../context/VehicleContext';

export const CreateAdPage = ({ onCancel, onSuccess }) => {
  const { currentUser, setIsAuthModalOpen, setAuthMode } = useAuth();
  const { addVehicle, selectedCategory, setSelectedCategory, priceMax, setPriceMax, searchQuery, setSearchQuery } = useVehicles();

  const [step, setStep] = useState(1);
  const [showCheckout, setShowCheckout] = useState(false);

  // Form State
  const [category, setCategory] = useState('carro');
  const [title, setTitle] = useState('');
  const [make, setMake] = useState('');
  const [model, setModel] = useState('');
  const [year, setYear] = useState('2023/2023');
  const [mileage, setMileage] = useState('');
  const [transmission, setTransmission] = useState('Automático');
  const [fuelType, setFuelType] = useState('Gasolina');
  const [price, setPrice] = useState('');
  const [hidePrice, setHidePrice] = useState(false);
  const [description, setDescription] = useState('');
  const [photos, setPhotos] = useState([
    'https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&w=1200&q=80',
    'https://images.unsplash.com/photo-1614162692292-7ac56d7f7f1e?auto=format&fit=crop&w=1200&q=80'
  ]);
  const [newPhotoUrl, setNewPhotoUrl] = useState('');
  const [selectedPlan, setSelectedPlan] = useState('gratis');

  if (!currentUser) {
    return (
      <div className="page-container create-ad-page auth-required-state">
        <div className="auth-required-box">
          <Lock size={48} className="lock-icon-lg" />
          <h2>Anuncie seu Veículo no AutoPortal</h2>
          <p>Faça login ou crie sua conta para publicar anúncios com ditado por voz e recursos de preço oculto.</p>
          <button
            className="btn-primary-auth"
            onClick={() => { setAuthMode('register'); setIsAuthModalOpen(true); }}
          >
            Criar Conta ou Entrar
          </button>
        </div>
      </div>
    );
  }

  const handleRemovePhoto = (index) => {
    setPhotos(photos.filter((_, i) => i !== index));
  };

  const handleSubmitAd = (e) => {
    if (e && e.preventDefault) e.preventDefault();

    if (selectedPlan !== 'gratis' && !showCheckout) {
      setShowCheckout(true);
      return;
    }

    const newVeh = {
      id: `veh_${Date.now()}`,
      title: title || `${make || 'Porsche'} ${model || 'Macan GTS'} ${year}`,
      category,
      make: make || 'Porsche',
      model: model || 'Macan GTS 2.9',
      year: year || '2023/2023',
      mileage: Number(mileage) || 15000,
      fuel: fuelType,
      transmission,
      color: 'Preto Metálico',
      price: Number(price) || 195000,
      hidePrice,
      featured: selectedPlan !== 'gratis',
      featuredTag: selectedPlan === 'vip' ? 'VIP TOP FEED' : selectedPlan === 'ouro' ? 'IMPULSIONADO' : null,
      photos: photos.length > 0 ? photos : ['https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&w=1200&q=80'],
      description: description || 'Veículo em excelente estado de conservação, revisões em dia.',
      audioTranscript: description ? description.slice(0, 140) + '...' : 'Descrição falada pelo proprietário via aplicativo.',
      audioDuration: '0:24',
      location: currentUser.city || 'São Paulo, SP',
      seller: {
        id: currentUser.id,
        name: currentUser.name,
        username: currentUser.username,
        role: currentUser.role,
        avatar: currentUser.avatar,
        verified: currentUser.verified
      },
      likesCount: 1,
      isLiked: false,
      isSaved: false,
      viewsCount: 1,
      specs: [
        `${transmission} de alta precisão`,
        'Revisões em Concessionária',
        'IPVA e Licenciamento Pagos'
      ],
      createdAt: 'Agora mesmo'
    };

    addVehicle(newVeh);
    if (onSuccess) onSuccess();
  };

  const stepsList = [
    { num: 1, label: 'Veículo' },
    { num: 2, label: 'Detalhes' },
    { num: 3, label: 'Fotos' },
    { num: 4, label: 'Preço' },
    { num: 5, label: 'Revisão' }
  ];

  return (
    <div className="page-container create-ad-page ds-wizard-container">
      {/* 1. Header Promo Banner */}
      <div className="ds-promo-banner">
        <div className="ds-promo-content">
          <h2 className="ds-promo-title">
            Anuncie seu <br />
            veículo <span className="text-yellow">em minutos</span>
          </h2>
          <p className="ds-promo-sub">Mais visibilidade. Mais oportunidades.</p>

          <div className="ds-promo-badges">
            <div className="ds-promo-badge">
              <span className="ds-promo-badge-icon">✔</span> Seguro
            </div>
            <div className="ds-promo-badge">
              <span className="ds-promo-badge-icon">⚡</span> Rápido
            </div>
            <div className="ds-promo-badge">
              <span className="ds-promo-badge-icon">📊</span> Sem complicação
            </div>
          </div>
        </div>
      </div>

      {/* Top Header Bar */}
      <div className="ds-wizard-topbar">
        <div className="ds-wizard-title-group">
          <button className="ds-btn-back" onClick={onCancel} title="Voltar">
            <ArrowLeft size={18} />
          </button>
          <h2 className="ds-wizard-page-title">Criar Anúncio de Veículo</h2>
        </div>
        <span className="ds-wizard-step-tag">Etapa {step} de 5</span>
      </div>

      {/* 2. Numbered Stepper (1 to 5) */}
      <div className="ds-stepper-track">
        <div className="ds-step-line-bg"></div>
        {stepsList.map((s) => {
          const isActive = step === s.num;
          const isCompleted = step > s.num;
          return (
            <div key={s.num} className="ds-stepper-item" onClick={() => setStep(s.num)} style={{ cursor: 'pointer' }}>
              <div className={`ds-step-node ${isActive ? 'active' : ''} ${isCompleted ? 'completed' : ''}`}>
                {s.num}
              </div>
              <span className={`ds-step-label ${isActive ? 'active' : ''}`}>
                {s.label}
              </span>
            </div>
          );
        })}
      </div>

      {/* Step 1: Basic Specs */}
      {step === 1 && (
        <div className="wizard-step">
          {/* Section Title */}
          <div className="ds-section-header">
            <div className="ds-section-icon">🚘</div>
            <div className="ds-section-info">
              <h3>1. Informações Básicas do Veículo</h3>
              <p>Selecione o tipo e preencha as informações principais.</p>
            </div>
          </div>

          {/* Vehicle Type Toggle */}
          <div className="ds-type-toggle-container">
            <label className="ds-field-label">Tipo de Veículo</label>
            <div className="ds-type-toggle-grid">
              <button
                type="button"
                className={`ds-type-btn ${category === 'carro' ? 'active' : ''}`}
                onClick={() => setCategory('carro')}
              >
                <span className="type-icon">🏎️</span> Carro
              </button>
              <button
                type="button"
                className={`ds-type-btn ${category === 'moto' ? 'active' : ''}`}
                onClick={() => setCategory('moto')}
              >
                <span className="type-icon">🏍️</span> Moto
              </button>
            </div>
          </div>

          {/* Título do Anúncio */}
          <div className="ds-form-group">
            <div className="ds-field-label-row">
              <label className="ds-field-label">
                Título do Anúncio <Info size={14} className="ds-info-icon" />
              </label>
              <span className="ds-counter-text">{title.length}/60</span>
            </div>
            <div className="ds-input-wrapper">
              <input
                type="text"
                maxLength={60}
                className="ds-input"
                placeholder="Ex: Porsche Macan GTS 2.9 - Impecável!"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />
            </div>
          </div>

          {/* Marca & Modelo */}
          <div className="form-row-2">
            <div className="ds-form-group">
              <label className="ds-field-label">Marca</label>
              <div className="ds-input-wrapper">
                <input
                  type="text"
                  className="ds-input"
                  placeholder="Ex: Porsche, BMW, Honda..."
                  value={make}
                  onChange={(e) => setMake(e.target.value)}
                />
              </div>
            </div>

            <div className="ds-form-group">
              <label className="ds-field-label">Modelo</label>
              <div className="ds-input-wrapper">
                <input
                  type="text"
                  className="ds-input"
                  placeholder="Ex: Macan, S1000RR, Civic..."
                  value={model}
                  onChange={(e) => setModel(e.target.value)}
                />
              </div>
            </div>
          </div>

          {/* Ano/Modelo & Quilometragem (KM) */}
          <div className="form-row-2">
            <div className="ds-form-group">
              <label className="ds-field-label">Ano/Modelo</label>
              <div className="ds-input-wrapper">
                <Calendar size={16} className="ds-input-icon" />
                <input
                  type="text"
                  className="ds-input ds-input-has-icon"
                  placeholder="Ex: 2023/2023"
                  value={year}
                  onChange={(e) => setYear(e.target.value)}
                />
              </div>
            </div>

            <div className="ds-form-group">
              <label className="ds-field-label">Quilometragem (KM)</label>
              <div className="ds-input-wrapper">
                <Gauge size={16} className="ds-input-icon" />
                <input
                  type="text"
                  className="ds-input ds-input-has-icon"
                  placeholder="Ex: 15.000"
                  value={mileage}
                  onChange={(e) => setMileage(e.target.value)}
                />
              </div>
            </div>
          </div>

          {/* Câmbio & Combustível */}
          <div className="form-row-2">
            <div className="ds-form-group">
              <label className="ds-field-label">Câmbio</label>
              <div className="ds-input-wrapper">
                <Settings size={16} className="ds-input-icon" />
                <select 
                  className="ds-select"
                  value={transmission} 
                  onChange={(e) => setTransmission(e.target.value)}
                >
                  <option value="Selecione" disabled>Selecione</option>
                  <option value="Automático">Automático</option>
                  <option value="Manual">Manual</option>
                  <option value="Automatizado PDK/DSG">Automatizado Dual-Clutch</option>
                </select>
              </div>
            </div>

            <div className="ds-form-group">
              <label className="ds-field-label">Combustível</label>
              <div className="ds-input-wrapper">
                <Fuel size={16} className="ds-input-icon" />
                <select 
                  className="ds-select"
                  value={fuelType} 
                  onChange={(e) => setFuelType(e.target.value)}
                >
                  <option value="Selecione" disabled>Selecione</option>
                  <option value="Gasolina">Gasolina</option>
                  <option value="Flex (Gasolina/Etanol)">Flex (Gasolina/Etanol)</option>
                  <option value="Diesel">Diesel</option>
                  <option value="Híbrido / Elétrico">Híbrido / Elétrico</option>
                </select>
              </div>
            </div>
          </div>

          {/* Action Footer Bar */}
          <div className="ds-actions-bar">
            <button type="button" className="ds-btn-secondary" onClick={() => alert('Rascunho salvo!')}>
              <FileText size={16} /> Salvar rascunho
            </button>
            <button type="button" className="ds-btn-primary" onClick={() => setStep(2)}>
              Avançar <ArrowRight size={16} />
            </button>
          </div>
        </div>
      )}

      {/* Step 2: Price & Visibility */}
      {step === 2 && (
        <div className="wizard-step">
          <div className="ds-section-header">
            <div className="ds-section-icon">💰</div>
            <div className="ds-section-info">
              <h3>2. Valor e Visibilidade do Preço</h3>
              <p>Defina o valor do anúncio e as preferências de exibição.</p>
            </div>
          </div>

          <div className="ds-form-group">
            <label className="ds-field-label">Valor de Venda (R$)</label>
            <div className="ds-input-wrapper">
              <input
                type="number"
                className="ds-input"
                placeholder="Ex: 195.000"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
              />
            </div>
          </div>

          <div className="hide-price-switch-card">
            <div className="switch-info">
              <div className="switch-title-row">
                {hidePrice ? <EyeOff className="icon-gold" size={20} /> : <Eye size={20} />}
                <strong>Ocultar Preço para Não-Cadastrados</strong>
              </div>
              <p>
                Visitantes anônimos verão "🔒 Preço Oculto" e precisarão se cadastrar para ver o valor.
              </p>
            </div>
            <label className="toggle-switch">
              <input
                type="checkbox"
                checked={hidePrice}
                onChange={(e) => setHidePrice(e.target.checked)}
              />
              <span className="slider round"></span>
            </label>
          </div>

          <div className="ds-actions-bar">
            <button type="button" className="ds-btn-secondary" onClick={() => setStep(1)}>
              <ArrowLeft size={16} /> Voltar
            </button>
            <button type="button" className="ds-btn-primary" onClick={() => setStep(3)}>
              Avançar <ArrowRight size={16} />
            </button>
          </div>
        </div>
      )}

      {/* Step 3: Audio Description & Text */}
      {step === 3 && (
        <div className="wizard-step">
          <div className="ds-section-header">
            <div className="ds-section-icon">🎙️</div>
            <div className="ds-section-info">
              <h3>3. Descrição Detalhada & Voz</h3>
              <p>Fale ou digite todos os diferenciais e estado do veículo.</p>
            </div>
          </div>

          <VoiceRecorder
            onTranscriptChange={(text) => setDescription(prev => prev ? prev + ' ' + text : text)}
            initialText={description}
          />

          <div className="ds-form-group" style={{ marginTop: '16px' }}>
            <label className="ds-field-label">Descrição Escrita</label>
            <textarea
              className="ds-input"
              rows={5}
              placeholder="Ex: Veículo impecável, revisões na concessionária, sem retoques..."
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </div>

          <div className="ds-actions-bar">
            <button type="button" className="ds-btn-secondary" onClick={() => setStep(2)}>
              <ArrowLeft size={16} /> Voltar
            </button>
            <button type="button" className="ds-btn-primary" onClick={() => setStep(4)}>
              Avançar <ArrowRight size={16} />
            </button>
          </div>
        </div>
      )}

      {/* Step 4: Photo Gallery */}
      {step === 4 && (
        <div className="wizard-step">
          <div className="ds-section-header">
            <div className="ds-section-icon">📷</div>
            <div className="ds-section-info">
              <h3>4. Galeria de Fotos</h3>
              <p>Adicione fotos de alta qualidade do seu veículo.</p>
            </div>
          </div>

          <div className="photo-upload-grid">
            {photos.map((url, i) => (
              <div key={i} className="photo-thumb-wrapper">
                <img src={url} alt="Foto veículo" className="upload-thumb" />
                <button
                  type="button"
                  className="btn-remove-photo"
                  onClick={() => handleRemovePhoto(i)}
                >
                  <Trash2 size={14} />
                </button>
                {i === 0 && <span className="main-photo-tag">Foto Capa</span>}
              </div>
            ))}

            <label className="btn-add-photo-card">
              <input
                type="file"
                accept="image/*"
                multiple
                style={{ display: 'none' }}
                onChange={(e) => {
                  const files = Array.from(e.target.files);
                  files.forEach(file => {
                    const reader = new FileReader();
                    reader.onloadend = () => {
                      setPhotos(prev => [...prev, reader.result]);
                    };
                    reader.readAsDataURL(file);
                  });
                }}
              />
              <Plus size={24} />
              <span>Adicionar Foto</span>
            </label>
          </div>

          <div className="ds-actions-bar">
            <button type="button" className="ds-btn-secondary" onClick={() => setStep(3)}>
              <ArrowLeft size={16} /> Voltar
            </button>
            <button type="button" className="ds-btn-primary" onClick={() => setStep(5)}>
              Avançar <ArrowRight size={16} />
            </button>
          </div>
        </div>
      )}

      {/* Step 5: Revision & Highlight */}
      {step === 5 && (
        <div className="wizard-step">
          <div className="ds-section-header">
            <div className="ds-section-icon">⭐</div>
            <div className="ds-section-info">
              <h3>5. Destaque e Publicação</h3>
              <p>Escolha o nível de visibilidade para o seu anúncio no feed.</p>
            </div>
          </div>

          <div className="plans-selection-grid">
            <div
              className={`plan-card ${selectedPlan === 'gratis' ? 'selected' : ''}`}
              onClick={() => setSelectedPlan('gratis')}
            >
              <div className="plan-header">
                <h4>Anúncio Padrão</h4>
                <span className="plan-price">Grátis</span>
              </div>
              <ul>
                <li><Check size={14} /> Exibição no feed comum</li>
                <li><Check size={14} /> Recebimento de propostas direto</li>
              </ul>
            </div>

            <div
              className={`plan-card vip-plan ${selectedPlan === 'vip' ? 'selected' : ''}`}
              onClick={() => setSelectedPlan('vip')}
            >
              <div className="plan-badge-top"><Sparkles size={12} /> RECOMENDADO</div>
              <div className="plan-header">
                <h4>VIP Top Feed Instagram</h4>
                <span className="plan-price">R$ 59 <small>/anúncio</small></span>
              </div>
              <ul>
                <li><Check size={14} /> Posicionamento no Topo do Feed</li>
                <li><Check size={14} /> Borda Dourada Destaque VIP</li>
                <li><Check size={14} /> Story Highlights Principal</li>
              </ul>
            </div>
          </div>

          <div className="ds-actions-bar">
            <button type="button" className="ds-btn-secondary" onClick={() => setStep(4)}>
              <ArrowLeft size={16} /> Voltar
            </button>
            <button type="button" className="ds-btn-primary" onClick={handleSubmitAd}>
              <Zap size={18} /> Publicar Anúncio
            </button>
          </div>
        </div>
      )}

      {/* 3. Catalog Filter Card (Matches bottom part of reference image) */}
      <div className="ds-filter-card" style={{ marginTop: '32px' }}>
        <div className="ds-filter-card-header">
          <div className="ds-filter-card-title">
            <Filter size={18} className="text-yellow" />
            <span>Filtros do Catálogo</span>
          </div>
          <button 
            type="button" 
            className="ds-btn-clear-filters"
            onClick={() => {
              setSelectedCategory('todos');
              setPriceMax(1000000);
              setSearchQuery('');
            }}
          >
            <RotateCcw size={13} /> Limpar filtros
          </button>
        </div>

        {/* Category Pills */}
        <div className="ds-form-group">
          <label className="ds-field-label">Tipo de Veículo</label>
          <div className="ds-cat-pills-row">
            <button
              type="button"
              className={`ds-cat-pill ${selectedCategory === 'todos' ? 'active' : ''}`}
              onClick={() => setSelectedCategory('todos')}
            >
              Todos
            </button>
            <button
              type="button"
              className={`ds-cat-pill ${selectedCategory === 'carro' ? 'active' : ''}`}
              onClick={() => setSelectedCategory('carro')}
            >
              <Car size={14} /> Carros
            </button>
            <button
              type="button"
              className={`ds-cat-pill ${selectedCategory === 'moto' ? 'active' : ''}`}
              onClick={() => setSelectedCategory('moto')}
            >
              <Bike size={14} /> Motos
            </button>
          </div>
        </div>

        {/* Price Slider */}
        <div className="ds-form-group">
          <div className="ds-field-label-row">
            <label className="ds-field-label">Preço Máximo</label>
            <span className="ds-counter-text" style={{ color: 'var(--accent-gold)', fontWeight: 700 }}>
              {priceMax >= 1000000 ? 'Sem limite (R$ 1M+)' : `Até R$ ${priceMax.toLocaleString('pt-BR')}`}
            </span>
          </div>
          <input
            type="range"
            min="50000"
            max="1000000"
            step="25000"
            value={priceMax}
            onChange={(e) => setPriceMax(Number(e.target.value))}
            className="ds-price-slider-track"
          />
          <div className="ds-field-label-row" style={{ fontSize: '10px', color: 'var(--text-dim)' }}>
            <span>R$ 50 mil</span>
            <span>R$ 1 Milhão+</span>
          </div>
        </div>

        {/* Marca / Modelo / Palavra-chave */}
        <div className="ds-form-group">
          <label className="ds-field-label">Marca / Modelo / Palavra-chave</label>
          <div className="ds-input-wrapper">
            <Search size={16} className="ds-input-icon" />
            <input
              type="text"
              className="ds-input ds-input-has-icon"
              placeholder="Ex: Porsche, BMW, GTI, Cur..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        </div>

        {/* Apply Filters Button */}
        <button type="button" className="ds-btn-apply-filters">
          <Filter size={16} /> Aplicar Filtros
        </button>
      </div>

      {showCheckout && (
        <CheckoutModal
          itemTitle={selectedPlan === 'vip' ? 'Destaque VIP Top Feed Instagram' : 'Destaque Ouro Anúncio'}
          price={selectedPlan === 'vip' ? 59 : 29}
          planTag={selectedPlan === 'vip' ? 'VIP TOP FEED' : 'IMPULSIONADO'}
          onClose={() => setShowCheckout(false)}
          onSuccess={() => {
            setShowCheckout(false);
            handleSubmitAd();
          }}
        />
      )}
    </div>
  );
};
