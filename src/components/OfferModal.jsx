import React, { useState } from 'react';
import { X, DollarSign, Send, ShieldCheck, AlertCircle } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useVehicles } from '../context/VehicleContext';
import { useChats } from '../context/ChatContext';

export const OfferModal = ({ vehicle, onClose, onOfferSent }) => {
  const { currentUser } = useAuth();
  const { sendOffer } = useChats();

  const defaultOfferVal = Math.round(vehicle.price * 0.95);
  const [offerAmount, setOfferAmount] = useState(defaultOfferVal);
  const [paymentType, setPaymentType] = useState('À Vista PIX / Transferência');
  const [notes, setNotes] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const calculateDiscount = () => {
    const diff = vehicle.price - offerAmount;
    const perc = Math.round((diff / vehicle.price) * 100);
    return { diff, perc };
  };

  const { diff, perc } = calculateDiscount();

  const handleSubmitOffer = (e) => {
    e.preventDefault();
    if (!offerAmount || offerAmount <= 0) return;

    setIsSubmitting(true);
    setTimeout(() => {
      const chatId = sendOffer(vehicle, offerAmount, paymentType, notes, currentUser);
      setIsSubmitting(false);
      onClose();
      if (onOfferSent) onOfferSent(chatId);
    }, 400);
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-container offer-modal" onClick={e => e.stopPropagation()}>
        <div className="modal-header">
          <div className="modal-title">
            <DollarSign className="icon-green" size={20} />
            <span>Fazer Proposta de Compra</span>
          </div>
          <button className="btn-close-modal" onClick={onClose}>
            <X size={20} />
          </button>
        </div>

        <div className="modal-body">
          {/* Target Vehicle Banner */}
          <div className="target-vehicle-preview">
            <img src={vehicle.photos[0]} alt={vehicle.title} className="target-img" />
            <div className="target-details">
              <h4>{vehicle.title}</h4>
              <span className="target-price">Valor Anunciado: <strong>R$ {vehicle.price.toLocaleString('pt-BR')}</strong></span>
              <span className="target-seller">Vendedor: {vehicle.seller.name}</span>
            </div>
          </div>

          <form onSubmit={handleSubmitOffer} className="offer-form">
            <div className="form-group">
              <label>Sua Proposta em Dinheiro (R$)</label>
              <div className="currency-input-wrapper">
                <span className="currency-symbol">R$</span>
                <input
                  type="number"
                  step="1000"
                  min="1000"
                  value={offerAmount}
                  onChange={(e) => setOfferAmount(Number(e.target.value))}
                  required
                />
              </div>
              <div className="quick-offer-pills">
                <button
                  type="button"
                  onClick={() => setOfferAmount(Math.round(vehicle.price * 0.90))}
                >
                  -10% (R$ {Math.round(vehicle.price * 0.90).toLocaleString('pt-BR')})
                </button>
                <button
                  type="button"
                  onClick={() => setOfferAmount(Math.round(vehicle.price * 0.95))}
                >
                  -5% (R$ {Math.round(vehicle.price * 0.95).toLocaleString('pt-BR')})
                </button>
                <button
                  type="button"
                  onClick={() => setOfferAmount(vehicle.price)}
                >
                  Preço Cheio
                </button>
              </div>
            </div>

            {diff > 0 && (
              <div className="discount-summary-tag">
                <AlertCircle size={16} />
                <span>
                  Sua proposta está <strong>R$ {diff.toLocaleString('pt-BR')} ({perc}% abaixo)</strong> do valor pedido.
                </span>
              </div>
            )}

            <div className="form-group">
              <label>Forma de Pagamento Pretendida</label>
              <select value={paymentType} onChange={(e) => setPaymentType(e.target.value)}>
                <option value="À Vista PIX / Transferência">À Vista (PIX / Transferência)</option>
                <option value="Financiamento Bancário Aprovado">Financiamento Bancário Aprovado</option>
                <option value="Veículo na Troca + Diferença">Ofereço Veículo na Troca + Diferença</option>
                <option value="Carta de Crédito / Consórcio">Carta de Crédito / Consórcio Contemplado</option>
              </select>
            </div>

            <div className="form-group">
              <label>Observações / Condições (Opcional)</label>
              <textarea
                placeholder="Ex: Tenho pressa para fechar hoje mesmo. Pagamento via PIX assim que vistoriar o carro."
                rows={3}
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
              />
            </div>

            <div className="security-notice">
              <ShieldCheck size={16} />
              <span>Ao enviar, a proposta será enviada diretamente ao vendedor no chat seguro.</span>
            </div>

            <button
              type="submit"
              className="btn-submit-offer"
              disabled={isSubmitting}
            >
              <Send size={18} />
              <span>{isSubmitting ? 'Enviando Proposta...' : 'Enviar Proposta ao Vendedor'}</span>
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};
