import React, { useState } from 'react';
import { Calculator, DollarSign, Calendar, ChevronRight, Check } from 'lucide-react';

export const FinancingCalculator = ({ vehiclePrice }) => {
  const [downPaymentPercent, setDownPaymentPercent] = useState(30); // 30% down payment
  const [termMonths, setTermMonths] = useState(48); // 48 months
  const interestRateMonthly = 0.0149; // 1.49% per month average auto credit rate

  const downPaymentValue = Math.round((vehiclePrice * downPaymentPercent) / 100);
  const financedAmount = vehiclePrice - downPaymentValue;

  // Monthly payment calculation using Price table formula
  const calculateMonthlyPayment = (amount, months, rate) => {
    if (amount <= 0) return 0;
    const i = rate;
    const n = months;
    const pmt = (amount * (i * Math.pow(1 + i, n))) / (Math.pow(1 + i, n) - 1);
    return Math.round(pmt);
  };

  const monthlyPayment = calculateMonthlyPayment(financedAmount, termMonths, interestRateMonthly);

  return (
    <div className="financing-calculator-box">
      <div className="calc-header">
        <Calculator size={18} className="icon-gold" />
        <div>
          <strong>Simulador de Financiamento Bancário</strong>
          <small>Taxa estimada de 1,49% a.m.</small>
        </div>
      </div>

      <div className="calc-body">
        <div className="calc-row">
          <label>Entrada: <strong>R$ {downPaymentValue.toLocaleString('pt-BR')} ({downPaymentPercent}%)</strong></label>
          <input
            type="range"
            min="10"
            max="80"
            step="5"
            value={downPaymentPercent}
            onChange={(e) => setDownPaymentPercent(Number(e.target.value))}
            className="calc-range-slider"
          />
        </div>

        <div className="calc-row">
          <label>Prazo de Financiamento</label>
          <div className="term-pills-row">
            {[24, 36, 48, 60].map(m => (
              <button
                key={m}
                type="button"
                className={`term-pill ${termMonths === m ? 'active' : ''}`}
                onClick={() => setTermMonths(m)}
              >
                {m}x
              </button>
            ))}
          </div>
        </div>

        <div className="calc-result-card">
          <span className="result-label">Parcela Mensal Estimada:</span>
          <div className="result-val">
            <span className="months-count">{termMonths}x de</span>
            <span className="amount-val">R$ {monthlyPayment.toLocaleString('pt-BR')}</span>
          </div>
          <p className="result-sub">Entrada de R$ {downPaymentValue.toLocaleString('pt-BR')} + {termMonths} parcelas fixas</p>
        </div>
      </div>
    </div>
  );
};
