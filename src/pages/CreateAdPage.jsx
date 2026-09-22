import React, { useState } from 'react';
import { 
  ArrowLeft, 
  ArrowRight, 
  Check, 
  Upload, 
  Mic, 
  Sparkles, 
  Lock, 
  Eye, 
  EyeOff, 
  DollarSign, 
  ShieldCheck,
  Plus,
  Trash2,
  Zap
} from 'lucide-react';
import { VoiceRecorder } from '../components/VoiceRecorder';
import { CheckoutModal } from '../components/CheckoutModal';
import { useAuth } from '../context/AuthContext';
import { useVehicles } from '../context/VehicleContext';

export const CreateAdPage = ({ onCancel, onSuccess }) => {
  const { currentUser, setIsAuthModalOpen, setAuthMode } = useAuth();
  const { addVehicle } = useVehicles();

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
  const [fuel, setFuel] = useState('Gasolina');
  const [price, setPrice] = useState('');
  const [hidePrice, setHidePrice] = useState(false);
  const [description, setDescription] = useState('');
  const [photos, setPhotos] = useState([
    'https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&w=1200&q=80',
    'https://images.unsplash.com/photo-1614162692292-7ac56d7f7f1e?auto=format&fit=crop&w=1200&q=80'
  ]);
  const [newPhotoUrl, setNewPhotoUrl] = useState('');
  const [selectedPlan, setSelectedPlan] = useState('gratis'); // 'gratis' | 'ouro' | 'vip'

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

  const handleAddPhoto = () => {
    if (newPhotoUrl) {
      setPhotos([...photos, newPhotoUrl]);
      setNewPhotoUrl('');
    } else {
      // Add random auto photo placeholder for demonstration
      const sampleCars = [
        'https://images.unsplash.com/photo-1617814076367-b759c7d7e738?auto=format&fit=crop&w=1200&q=80',
        'https://images.unsplash.com/photo-1558981403-c5f9899a28bc?auto=format&fit=crop&w=1200&q=80',
        'https://images.unsplash.com/photo-1542282088-72c9c27ed0cd?auto=format&fit=crop&w=1200&q=80'
      ];
      const randomImg = sampleCars[Math.floor(Math.random() * sampleCars.length)];
      setPhotos([...photos, randomImg]);
    }
  };

  const handleRemovePhoto = (index) => {
    setPhotos(photos.filter((_, i) => i !== index));
  };

  const handleSubmitAd = (e) => {
    e.preventDefault();

    if (selectedPlan !== 'gratis' && !showCheckout) {
      setShowCheckout(true);
      return;
    }

    const newVeh = {
      id: `veh_${Date.now()}`,
      title: title || `${make} ${model} ${year}`,
      category,
      make: make || 'Marca Premium',
      model: model || 'Modelo Sport',
      year: year || '2023/2023',
      mileage: Number(mileage) || 12000,
      fuel,
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
    onSuccess();
  };

  return (
    <div className="page-container create-ad-page">
      <div className="wizard-header">
        <button className="btn-back-wizard" onClick={onCancel}>
          <ArrowLeft size={20} />
        </button>
        <h2>Criar Anúncio de Veículo</h2>
        <span className="step-indicator">Etapa {step} de 5</span>
      </div>

      <div className="wizard-progress-bar">
        <div className="progress-fill" style={{ width: `${(step / 5) * 100}%` }}></div>
      </div>

      <div className="wizard-body">
        {/* Step 1: Basic Specs */}
        {step === 1 && (
          <div className="wizard-step">
            <h3>1. Informações Básicas do Veículo</h3>
            <p className="step-desc">Selecione o tipo e especificações principais do seu veículo.</p>

            <div className="form-group">
              <label>Tipo de Veículo</label>
              <div className="type-toggle-grid">
                <button
                  type="button"
                  className={`type-btn ${category === 'carro' ? 'active' : ''}`}
                  onClick={() => setCategory('carro')}
                >
                  🏎️ Carro
                </button>
                <button
                  type="button"
                  className={`type-btn ${category === 'moto' ? 'active' : ''}`}
                  onClick={() => setCategory('moto')}
                >
                  🏍️ Moto
                </button>
              </div>
            </div>

            <div className="form-group">
              <label>Título do Anúncio</label>
              <input
                type="text"
                placeholder="Ex: Porsche Macan GTS 2.9 V6 Biturbo"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                required
              />
            </div>

            <div className="form-row-2">
              <div className="form-group">
                <label>Marca</label>
                <input
                  type="text"
                  placeholder="Ex: Porsche, BMW, Honda..."
                  value={make}
                  onChange={(e) => setMake(e.target.value)}
                  required
                />
              </div>

              <div className="form-group">
                <label>Modelo</label>
                <input
                  type="text"
                  placeholder="Ex: Macan, S1000RR, Civic..."
                  value={model}
                  onChange={(e) => setModel(e.target.value)}
                  required
                />
              </div>
            </div>

            <div className="form-row-2">
              <div className="form-group">
                <label>Ano/Modelo</label>
                <input
                  type="text"
                  placeholder="Ex: 2023/2023"
                  value={year}
                  onChange={(e) => setYear(e.target.value)}
                />
              </div>

              <div className="form-group">
                <label>Quilometragem (KM)</label>
                <input
                  type="number"
                  placeholder="Ex: 15000"
                  value={mileage}
                  onChange={(e) => setMileage(e.target.value)}
                />
              </div>
            </div>

            <div className="form-row-2">
              <div className="form-group">
                <label>Câmbio</label>
                <select value={transmission} onChange={(e) => setTransmission(e.target.value)}>
                  <option value="Automático">Automático</option>
                  <option value="Manual">Manual</option>
                  <option value="Automatizado DSG/PDK">Automatizado Dual-Clutch (PDK/DSG)</option>
                </select>
              </div>

              <div className="form-group">
                <label>Combustível</label>
                <select value={fuel} onChange={(e) => setFuel(e.target.value)}>
                  <option value="Gasolina">Gasolina</option>
                  <option value="Flex (Gasolina/Etanol)">Flex (Gasolina/Etanol)</option>
                  <option value="Diesel">Diesel</option>
                  <option value="Híbrido / Elétrico">Híbrido / Elétrico</option>
                </select>
              </div>
            </div>
          </div>
        )}

        {/* Step 2: Price & Hide Price Toggle */}
        {step === 2 && (
          <div className="wizard-step">
            <h3>2. Valor e Visibilidade do Preço</h3>
            <p className="step-desc">Defina o preço e controle quem pode ver o valor do seu anúncio.</p>

            <div className="form-group">
              <label>Valor de Venda (R$)</label>
              <div className="currency-input-wrapper">
                <span className="currency-symbol">R$</span>
                <input
                  type="number"
                  placeholder="Ex: 195000"
                  value={price}
                  onChange={(e) => setPrice(e.target.value)}
                  required
                />
              </div>
            </div>

            {/* Hide Price Switch */}
            <div className="hide-price-switch-card">
              <div className="switch-info">
                <div className="switch-title-row">
                  {hidePrice ? <EyeOff className="icon-gold" size={20} /> : <Eye size={20} />}
                  <strong>Ocultar Preço para Não-Cadastrados</strong>
                </div>
                <p>
                  Quando ativado, visitantes anônimos verão <strong>"🔒 Preço Oculto"</strong> e precisarão fazer login ou cadastro rápido para visualizar o valor real do seu veículo.
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
          </div>
        )}

        {/* Step 3: Voice Description & Text */}
        {step === 3 && (
          <div className="wizard-step">
            <h3>3. Descrição Detalhada & Recurso de Áudio</h3>
            <p className="step-desc">Fale ou digite os diferenciais, estado e opcionais do veículo.</p>

            <VoiceRecorder
              onTranscriptChange={(text) => setDescription(prev => prev ? prev + ' ' + text : text)}
              initialText={description}
            />

            <div className="form-group">
              <label>Descrição Escrita</label>
              <textarea
                rows={5}
                placeholder="Ex: Veículo revisado em concessionária, sem histórico de colisão, pneus Michelin novos..."
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              />
            </div>
          </div>
        )}

        {/* Step 4: Photo Gallery */}
        {step === 4 && (
          <div className="wizard-step">
            <h3>4. Galeria de Fotos do Anúncio</h3>
            <p className="step-desc">Selecione fotos do seu dispositivo ou adicione URLs de imagens do veículo.</p>

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
                <span>Escolher do Celular / PC</span>
              </label>
            </div>
          </div>
        )}

        {/* Step 5: Monetization & Destaque */}
        {step === 5 && (
          <div className="wizard-step">
            <h3>5. Destacar seu Anúncio (Monetização)</h3>
            <p className="step-desc">Escolha como seu anúncio será exibido para milhares de compradores no Feed.</p>

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
                  <li><Check size={14} /> Chat e propostas ativados</li>
                </ul>
              </div>

              <div
                className={`plan-card ${selectedPlan === 'ouro' ? 'selected' : ''}`}
                onClick={() => setSelectedPlan('ouro')}
              >
                <div className="plan-header">
                  <h4>Destaque Ouro</h4>
                  <span className="plan-price">R$ 29 <small>/anúncio</small></span>
                </div>
                <ul>
                  <li><Check size={14} /> Etiqueta "Impulsionado"</li>
                  <li><Check size={14} /> 2x mais visualizações no feed</li>
                  <li><Check size={14} /> Suporte no WhatsApp</li>
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
                  <li><Check size={14} /> Destaque com borda dourada VIP</li>
                  <li><Check size={14} /> Inclusão no Story Highlight principal</li>
                </ul>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Navigation Buttons */}
      <div className="wizard-footer">
        {step > 1 && (
          <button className="btn-wizard-prev" onClick={() => setStep(step - 1)}>
            <ArrowLeft size={16} /> Voltar
          </button>
        )}

        {step < 5 ? (
          <button className="btn-wizard-next" onClick={() => setStep(step + 1)}>
            Avançar <ArrowRight size={16} />
          </button>
        ) : (
          <button className="btn-wizard-finish" onClick={handleSubmitAd}>
            <Zap size={18} /> Publicar Anúncio Agora
          </button>
        )}
      </div>

      {showCheckout && (
        <CheckoutModal
          itemTitle={selectedPlan === 'vip' ? 'Destaque VIP Top Feed Instagram' : 'Destaque Ouro Anúncio'}
          price={selectedPlan === 'vip' ? 59 : 29}
          planTag={selectedPlan === 'vip' ? 'VIP TOP FEED' : 'IMPULSIONADO'}
          onClose={() => setShowCheckout(false)}
          onSuccess={() => {
            setShowCheckout(false);
            handleSubmitAd({ preventDefault: () => {} });
          }}
        />
      )}
    </div>
  );
};
