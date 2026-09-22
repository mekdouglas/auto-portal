import React, { useState } from 'react';
import { X, QrCode, CreditCard, ShieldCheck, CheckCircle2, Copy, Sparkles, Loader2 } from 'lucide-react';

export const CheckoutModal = ({ itemTitle, price, planTag, onClose, onSuccess }) => {
  const [paymentMethod, setPaymentMethod] = useState('pix'); // 'pix' | 'card'
  const [isProcessing, setIsProcessing] = useState(false);
  const [isPaid, setIsPaid] = useState(false);
  const [copiedPix, setCopiedPix] = useState(false);

  // Simulated PIX string
  const pixCopyPasteCode = `00020126580014br.gov.bcb.pix0136autoportal-pix-${Date.now()}520400005303986540${price}.005802BR5920AutoPortal Pagamentos6009Sao Paulo62070503***6304`;

  const handleCopyPix = () => {
    navigator.clipboard.writeText(pixCopyPasteCode);
    setCopiedPix(true);
    setTimeout(() => setCopiedPix(false), 2500);
  };

  const handleConfirmPayment = () => {
    setIsProcessing(true);
    setTimeout(() => {
      setIsProcessing(false);
      setIsPaid(true);
      setTimeout(() => {
        if (onSuccess) onSuccess();
        onClose();
      }, 1500);
    }, 1200);
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-container checkout-modal" onClick={e => e.stopPropagation()}>
        <div className="modal-header">
          <div className="modal-title">
            <Sparkles className="icon-gold" size={20} />
            <span>Checkout & Pagamento Seguro</span>
          </div>
          <button className="btn-close-modal" onClick={onClose}>
            <X size={20} />
          </button>
        </div>

        <div className="modal-body checkout-modal-body">
          {isPaid ? (
            <div className="payment-success-state">
              <CheckCircle2 size={56} className="icon-green-lg" />
              <h3>Pagamento Confirmado!</h3>
              <p>Seu plano <strong>{planTag || itemTitle}</strong> foi ativado com sucesso.</p>
              <span className="success-badge-pill">Status: Ativo em Produção</span>
            </div>
          ) : (
            <>
              {/* Summary Header */}
              <div className="checkout-summary-card">
                <div>
                  <span className="item-label">Item Selecionado</span>
                  <h4>{itemTitle}</h4>
                </div>
                <div className="item-price">
                  <span>Total:</span>
                  <strong>R$ {price.toLocaleString('pt-BR')}</strong>
                </div>
              </div>

              {/* Payment Methods */}
              <div className="payment-methods-tabs">
                <button
                  className={`payment-tab ${paymentMethod === 'pix' ? 'active' : ''}`}
                  onClick={() => setPaymentMethod('pix')}
                >
                  <QrCode size={18} />
                  <span>PIX (Instantâneo)</span>
                </button>
                <button
                  className={`payment-tab ${paymentMethod === 'card' ? 'active' : ''}`}
                  onClick={() => setPaymentMethod('card')}
                >
                  <CreditCard size={18} />
                  <span>Cartão de Crédito</span>
                </button>
              </div>

              {paymentMethod === 'pix' ? (
                <div className="pix-checkout-box">
                  <div className="qr-code-placeholder">
                    <QrCode size={140} className="qr-code-img" />
                    <span className="pix-discount-tag">Aprovação Imediata</span>
                  </div>

                  <div className="pix-code-field">
                    <input type="text" readOnly value={pixCopyPasteCode} />
                    <button className="btn-copy-pix" onClick={handleCopyPix}>
                      <Copy size={16} />
                      <span>{copiedPix ? 'Copiado!' : 'Copiar'}</span>
                    </button>
                  </div>

                  <p className="pix-instructions">
                    Abra o app do seu banco, escolha <strong>"Pagar com QR Code"</strong> ou <strong>"PIX Copia e Cola"</strong> e cole a chave acima.
                  </p>

                  <button
                    className="btn-pay-confirm"
                    onClick={handleConfirmPayment}
                    disabled={isProcessing}
                  >
                    {isProcessing ? (
                      <>
                        <Loader2 size={18} className="spinner-icon" />
                        <span>Verificando Pagamento PIX...</span>
                      </>
                    ) : (
                      <span>Simular Confirmação do PIX</span>
                    )}
                  </button>
                </div>
              ) : (
                <form onSubmit={(e) => { e.preventDefault(); handleConfirmPayment(); }} className="card-checkout-form">
                  <div className="form-group">
                    <label>Número do Cartão</label>
                    <input type="text" placeholder="4532 •••• •••• 8910" required />
                  </div>

                  <div className="form-row-2">
                    <div className="form-group">
                      <label>Validade</label>
                      <input type="text" placeholder="12/28" required />
                    </div>
                    <div className="form-group">
                      <label>CVV</label>
                      <input type="text" placeholder="123" required />
                    </div>
                  </div>

                  <div className="form-group">
                    <label>Nome no Cartão</label>
                    <input type="text" placeholder="NOME COMO NO CARTAO" required />
                  </div>

                  <button type="submit" className="btn-pay-confirm" disabled={isProcessing}>
                    {isProcessing ? (
                      <>
                        <Loader2 size={18} className="spinner-icon" />
                        <span>Processando Cartão...</span>
                      </>
                    ) : (
                      <span>Pagar R$ {price.toLocaleString('pt-BR')} no Cartão</span>
                    )}
                  </button>
                </form>
              )}

              <div className="checkout-security-footer">
                <ShieldCheck size={16} />
                <span>Pagamento criptografado de alta segurança via AutoPortal Pay</span>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};
