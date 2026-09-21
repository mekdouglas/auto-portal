import React from 'react';
import { StoryHighlights } from '../components/StoryHighlights';
import { FeedCard } from '../components/FeedCard';
import { useVehicles } from '../context/VehicleContext';
import { Sparkles, SlidersHorizontal } from 'lucide-react';

export const FeedPage = () => {
  const { filteredVehicles, selectedCategory, setIsFilterOpen } = useVehicles();

  return (
    <div className="page-container feed-page">
      <StoryHighlights />

      <div className="feed-category-bar">
        <div className="category-title">
          <Sparkles className="sparkle-gold" size={16} />
          <span>Feed de Veículos ({selectedCategory.toUpperCase()})</span>
        </div>
        <button className="btn-filter-chip" onClick={() => setIsFilterOpen(true)}>
          <SlidersHorizontal size={14} />
          <span>Filtros</span>
        </button>
      </div>

      <main className="feed-stream">
        {filteredVehicles.length > 0 ? (
          filteredVehicles.map(vehicle => (
            <FeedCard key={vehicle.id} vehicle={vehicle} />
          ))
        ) : (
          <div className="empty-feed">
            <span className="empty-icon">🏎️</span>
            <h3>Nenhum veículo encontrado</h3>
            <p>Tente ajustar seus filtros de busca ou escolher outra categoria.</p>
          </div>
        )}
      </main>
    </div>
  );
};
