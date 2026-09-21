import React, { useState, useEffect, useRef } from 'react';
import { useVehicles } from '../context/VehicleContext';
import { useAuth } from '../context/AuthContext';
import { Lock, MapPin, Sparkles, Filter, Loader2, CheckCircle2 } from 'lucide-react';

export const ExplorePage = () => {
  const { filteredVehicles, setSelectedVehicle, selectedCategory, setSelectedCategory, setIsFilterOpen } = useVehicles();
  const { currentUser } = useAuth();

  const [previewVehicle, setPreviewVehicle] = useState(null);
  const pressTimerRef = useRef(null);
  const isLongPressRef = useRef(false);

  // Progressive infinite loading state
  const [visibleCount, setVisibleCount] = useState(6);
  const [isLoadingMore, setIsLoadingMore] = useState(false);
  const sentinelRef = useRef(null);

  useEffect(() => {
    setVisibleCount(6);
  }, [selectedCategory, filteredVehicles.length]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const first = entries[0];
        if (first.isIntersecting && !isLoadingMore && visibleCount < filteredVehicles.length) {
          setIsLoadingMore(true);
          setTimeout(() => {
            setVisibleCount(prev => Math.min(prev + 4, filteredVehicles.length));
            setIsLoadingMore(false);
          }, 400);
        }
      },
      { threshold: 0.1 }
    );

    if (sentinelRef.current) {
      observer.observe(sentinelRef.current);
    }

    return () => {
      if (sentinelRef.current) {
        observer.unobserve(sentinelRef.current);
      }
    };
  }, [visibleCount, filteredVehicles.length, isLoadingMore]);

  const handleTouchStart = (vehicle) => {
    isLongPressRef.current = false;
    pressTimerRef.current = setTimeout(() => {
      isLongPressRef.current = true;
      setPreviewVehicle(vehicle);
    }, 200);
  };

  const handleTouchEnd = (vehicle) => {
    if (pressTimerRef.current) {
      clearTimeout(pressTimerRef.current);
    }

    if (previewVehicle) {
      setPreviewVehicle(null);
    } else if (!isLongPressRef.current) {
      setSelectedVehicle(vehicle);
    }
  };

  const handleTouchCancel = () => {
    if (pressTimerRef.current) {
      clearTimeout(pressTimerRef.current);
    }
    setPreviewVehicle(null);
  };

  const visibleVehicles = filteredVehicles.slice(0, visibleCount);
  const hasMore = visibleCount < filteredVehicles.length;

  return (
    <div className="page-container explore-page">
      <div className="explore-header">
        <h2>Catálogo de Veículos</h2>
        <p>Pressione e segure qualquer foto para espiar o preview rápido</p>

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
        {visibleVehicles.map(vehicle => {
          const isPriceHidden = vehicle.hidePrice && !currentUser;

          return (
            <div
              key={vehicle.id}
              className="explore-card"
              onTouchStart={() => handleTouchStart(vehicle)}
              onTouchEnd={() => handleTouchEnd(vehicle)}
              onTouchCancel={handleTouchCancel}
              onMouseDown={() => handleTouchStart(vehicle)}
              onMouseUp={() => handleTouchEnd(vehicle)}
              onMouseLeave={handleTouchCancel}
            >
              <div className="explore-img-wrapper">
                <img
                  src={vehicle.photos[0]}
                  alt={vehicle.title}
                  className="explore-img"
                  loading="lazy"
                />
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

      {/* Grid Progressive Loading Spinner */}
      {isLoadingMore && (
        <div className="progressive-loading-box">
          <Loader2 size={24} className="skeleton-spinner" />
          <span>Carregando mais veículos...</span>
        </div>
      )}

      {/* Intersection Observer Sentinel */}
      <div ref={sentinelRef} className="scroll-sentinel" />

      {!hasMore && filteredVehicles.length > 6 && (
        <div className="feed-end-badge">
          <CheckCircle2 size={16} className="icon-gold" />
          <span>Fim do catálogo ({filteredVehicles.length} veículos carregados)</span>
        </div>
      )}

      {/* Floating Preview Modal */}
      {previewVehicle && (
        <div className="quick-preview-overlay">
          <div className="quick-preview-card">
            <div className="preview-header">
              <div className="preview-seller-info">
                <img src={previewVehicle.seller.avatar} alt={previewVehicle.seller.name} className="preview-avatar" />
                <div>
                  <strong>{previewVehicle.seller.name}</strong>
                  <span className="preview-loc">{previewVehicle.location}</span>
                </div>
              </div>
              <span className="preview-pill-hint">Solte o dedo para fechar</span>
            </div>

            <div className="preview-image-container">
              <img
                src={previewVehicle.photos[0]}
                alt={previewVehicle.title}
                className="preview-scaled-img"
              />
            </div>

            <div className="preview-footer">
              <h4>{previewVehicle.title}</h4>
              <div className="preview-price-row">
                {previewVehicle.hidePrice && !currentUser ? (
                  <span className="price-hidden-tag"><Lock size={14} /> Preço Oculto para Visitantes</span>
                ) : (
                  <span className="preview-price-amount">R$ {previewVehicle.price.toLocaleString('pt-BR')}</span>
                )}
                <span className="preview-year-km">{previewVehicle.year} • {previewVehicle.mileage.toLocaleString('pt-BR')} km</span>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
