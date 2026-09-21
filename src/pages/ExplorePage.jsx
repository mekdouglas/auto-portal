import React from 'react';
import { useVehicles } from '../context/VehicleContext';
import { useAuth } from '../context/AuthContext';
import { Lock, Heart, MapPin, Sparkles, Filter } from 'lucide-react';

export const ExplorePage = () => {
  const { filteredVehicles, setSelectedVehicle, selectedCategory, setSelectedCategory, setIsFilterOpen } = useVehicles();
  const { currentUser, setIsAuthModalOpen, setAuthMode } = useAuth();

  return (
    <div className="page-container explore-page">
      <div className="explore-header">
        <h2>Catálogo de Veículos</h2>
        <p>Explore por fotos estilo vitrine visual</p>

        <div className="explore-chips-row">
          <button
            className={`explore-chip ${selectedCategory === 'todos' ? 'active' : ''}`}
            onClick={() => setSelectedCategory('todos')}
          >
            Todos ({filteredVehicles.length})
          </button>
          <button
            className={`explore-chip ${selectedCategory === 'carro' ? 'active' : ''}`}
            onClick={() => setSelectedCategory('carro')}
          >
            🚘 Carros
          </button>
          <button
            className={`explore-chip ${selectedCategory === 'moto' ? 'active' : ''}`}
            onClick={() => setSelectedCategory('moto')}
          >
            🏍️ Motos
          </button>
          <button className="explore-chip filter-btn" onClick={() => setIsFilterOpen(true)}>
            <Filter size={14} /> Filtros
          </button>
        </div>
      </div>

      <div className="explore-grid">
        {filteredVehicles.map(vehicle => {
          const isPriceHidden = vehicle.hidePrice && !currentUser;

          return (
            <div
              key={vehicle.id}
              className="explore-card"
              onClick={() => setSelectedVehicle(vehicle)}
            >
              <div className="explore-img-wrapper">
                <img src={vehicle.photos[0]} alt={vehicle.title} className="explore-img" />
                <div className="explore-overlay">
                  <div className="overlay-top">
                    <span className="cat-badge">{vehicle.category === 'carro' ? 'Carro' : 'Moto'}</span>
                    {vehicle.featured && <span className="featured-badge"><Sparkles size={10} /> VIP</span>}
                  </div>

                  <div className="overlay-bottom">
                    <span className="location-tag"><MapPin size={10} /> {vehicle.location.split(',')[0]}</span>
                  </div>
                </div>
              </div>

              <div className="explore-card-info">
                <h4 className="explore-card-title">{vehicle.title}</h4>
                <div className="explore-card-year">{vehicle.year} • {vehicle.mileage.toLocaleString('pt-BR')} km</div>

                <div className="explore-card-price">
                  {isPriceHidden ? (
                    <span className="price-hidden-tag">
                      <Lock size={12} /> Preço Oculto
                    </span>
                  ) : (
                    <span className="price-value">R$ {vehicle.price.toLocaleString('pt-BR')}</span>
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
