import React, { useState, useEffect, useRef } from 'react';
import { StoryHighlights } from '../components/StoryHighlights';
import { FeedCard } from '../components/FeedCard';
import { useVehicles } from '../context/VehicleContext';
import { Sparkles, SlidersHorizontal, Loader2, CheckCircle2 } from 'lucide-react';

export const FeedPage = () => {
  const { filteredVehicles, selectedCategory, setIsFilterOpen } = useVehicles();

  const [visibleCount, setVisibleCount] = useState(3);
  const [isLoadingMore, setIsLoadingMore] = useState(false);
  const sentinelRef = useRef(null);

  // Reset count when category or filter changes
  useEffect(() => {
    setVisibleCount(3);
  }, [selectedCategory, filteredVehicles.length]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const first = entries[0];
        if (first.isIntersecting && !isLoadingMore && visibleCount < filteredVehicles.length) {
          setIsLoadingMore(true);
          setTimeout(() => {
            setVisibleCount(prev => Math.min(prev + 3, filteredVehicles.length));
            setIsLoadingMore(false);
          }, 450); // Progressive batch loading delay
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

  const visibleVehicles = filteredVehicles.slice(0, visibleCount);
  const hasMore = visibleCount < filteredVehicles.length;

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
          <>
            {visibleVehicles.map(vehicle => (
              <FeedCard key={vehicle.id} vehicle={vehicle} />
            ))}

            {/* Progressive Loading Skeleton */}
            {isLoadingMore && (
              <div className="feed-skeleton-card">
                <div className="skeleton-header">
                  <div className="skeleton-avatar"></div>
                  <div className="skeleton-line-sm"></div>
                </div>
                <div className="skeleton-media">
                  <Loader2 size={32} className="skeleton-spinner" />
                </div>
                <div className="skeleton-footer">
                  <div className="skeleton-line-lg"></div>
                  <div className="skeleton-line-md"></div>
                </div>
              </div>
            )}

            {/* Intersection Observer Sentinel */}
            <div ref={sentinelRef} className="scroll-sentinel" />

            {!hasMore && filteredVehicles.length > 3 && (
              <div className="feed-end-badge">
                <CheckCircle2 size={16} className="icon-gold" />
                <span>Você visualizou todas as {filteredVehicles.length} publicações do feed</span>
              </div>
            )}
          </>
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
