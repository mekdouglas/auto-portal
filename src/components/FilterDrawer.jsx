import React from 'react';
import { X, RotateCcw, Filter } from 'lucide-react';
import { useVehicles } from '../context/VehicleContext';

export const FilterDrawer = () => {
  const { 
    isFilterOpen, 
    setIsFilterOpen, 
    selectedCategory, 
    setSelectedCategory, 
    priceMax, 
    setPriceMax,
    searchQuery,
    setSearchQuery
  } = useVehicles();

  if (!isFilterOpen) return null;

  const handleReset = () => {
    setSelectedCategory('todos');
    setPriceMax(1000000);
    setSearchQuery('');
  };

  return (
    <div className="filter-drawer-overlay" onClick={() => setIsFilterOpen(false)}>
      <div className="filter-drawer" onClick={e => e.stopPropagation()}>
        <div className="drawer-header">
          <div className="drawer-title">
            <Filter size={18} />
            <span>Filtros do Catálogo</span>
          </div>
          <button className="btn-close-drawer" onClick={() => setIsFilterOpen(false)}>
            <X size={20} />
          </button>
        </div>

        <div className="drawer-body">
          {/* Category */}
          <div className="filter-group">
            <label className="filter-label">Tipo de Veículo</label>
            <div className="category-btn-grid">
              <button
                className={`cat-btn ${selectedCategory === 'todos' ? 'active' : ''}`}
                onClick={() => setSelectedCategory('todos')}
              >
                🏎️ Todos
              </button>
              <button
                className={`cat-btn ${selectedCategory === 'carro' ? 'active' : ''}`}
                onClick={() => setSelectedCategory('carro')}
              >
                🚘 Carros
              </button>
              <button
                className={`cat-btn ${selectedCategory === 'moto' ? 'active' : ''}`}
                onClick={() => setSelectedCategory('moto')}
              >
                🏍️ Motos
              </button>
            </div>
          </div>

          {/* Price Slider */}
          <div className="filter-group">
            <div className="filter-label-row">
              <label className="filter-label">Preço Máximo</label>
              <span className="price-val-tag">
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
              className="price-range-slider"
            />
            <div className="slider-limits">
              <span>R$ 50 mil</span>
              <span>R$ 1 Milhão</span>
            </div>
          </div>

          {/* Search Term */}
          <div className="filter-group">
            <label className="filter-label">Marca / Modelo / Palavra-chave</label>
            <input
              type="text"
              placeholder="Ex: Porsche, BMW, GTI, Curitiba..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="filter-text-input"
            />
          </div>
        </div>

        <div className="drawer-footer">
          <button className="btn-reset-filters" onClick={handleReset}>
            <RotateCcw size={16} />
            <span>Limpar Filtros</span>
          </button>
          <button className="btn-apply-filters" onClick={() => setIsFilterOpen(false)}>
            Aplicar Filtros
          </button>
        </div>
      </div>
    </div>
  );
};
