import React from 'react';
import { X, Scale, Check, Plus, Lock } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

export const CompareModal = ({ vehicles, onClose }) => {
  const { currentUser, setIsAuthModalOpen, setAuthMode } = useAuth();

  if (!vehicles || vehicles.length === 0) return null;

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-container compare-modal" onClick={e => e.stopPropagation()}>
        <div className="modal-header">
          <div className="modal-title">
            <Scale size={20} className="icon-gold" />
            <span>Comparador Técnico de Veículos</span>
          </div>
          <button className="btn-close-modal" onClick={onClose}>
            <X size={20} />
          </button>
        </div>

        <div className="modal-body compare-modal-body">
          <div className="compare-grid-layout" style={{ gridTemplateColumns: `140px repeat(${vehicles.length}, 1fr)` }}>
            {/* Header Row */}
            <div className="compare-col-header">
              <span>Especificações</span>
            </div>
            {vehicles.map(v => (
              <div key={v.id} className="compare-col-item compare-card-header">
                <img src={v.photos[0]} alt={v.title} className="compare-thumb" />
                <h4>{v.title}</h4>
                <div className="compare-price">
                  {v.hidePrice && !currentUser ? (
                    <span className="price-hidden-tag"><Lock size={12} /> Oculto</span>
                  ) : (
                    <span>R$ {v.price.toLocaleString('pt-BR')}</span>
                  )}
                </div>
              </div>
            ))}

            {/* Row: Categoria */}
            <div className="compare-col-header">Categoria</div>
            {vehicles.map(v => (
              <div key={v.id} className="compare-col-item">
                {v.category === 'carro' ? '🏎️ Carro' : '🏍️ Moto'}
              </div>
            ))}

            {/* Row: Ano / Modelo */}
            <div className="compare-col-header">Ano/Modelo</div>
            {vehicles.map(v => (
              <div key={v.id} className="compare-col-item">{v.year}</div>
            ))}

            {/* Row: Quilometragem */}
            <div className="compare-col-header">Quilometragem</div>
            {vehicles.map(v => (
              <div key={v.id} className="compare-col-item">{v.mileage.toLocaleString('pt-BR')} km</div>
            ))}

            {/* Row: Câmbio */}
            <div className="compare-col-header">Câmbio</div>
            {vehicles.map(v => (
              <div key={v.id} className="compare-col-item">{v.transmission}</div>
            ))}

            {/* Row: Combustível */}
            <div className="compare-col-header">Combustível</div>
            {vehicles.map(v => (
              <div key={v.id} className="compare-col-item">{v.fuel}</div>
            ))}

            {/* Row: Vendedor */}
            <div className="compare-col-header">Vendedor</div>
            {vehicles.map(v => (
              <div key={v.id} className="compare-col-item">
                <strong>{v.seller.name}</strong>
                <small>{v.seller.role === 'garagista' ? 'Garagem' : 'PF'}</small>
              </div>
            ))}

            {/* Row: Localização */}
            <div className="compare-col-header">Localização</div>
            {vehicles.map(v => (
              <div key={v.id} className="compare-col-item">{v.location}</div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
