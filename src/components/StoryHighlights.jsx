import React from 'react';
import { MOCK_USERS } from '../data/mockUsers';
import { useVehicles } from '../context/VehicleContext';

export const StoryHighlights = () => {
  const { selectedCategory, setSelectedCategory } = useVehicles();

  const stories = [
    {
      id: 'st_1',
      title: 'Todos',
      category: 'todos',
      avatar: 'https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&w=200&q=80',
      badge: '🔥',
      isLive: true
    },
    {
      id: 'st_2',
      title: 'Carros',
      category: 'carro',
      avatar: 'https://images.unsplash.com/photo-1617814076367-b759c7d7e738?auto=format&fit=crop&w=200&q=80',
      badge: '🏎️',
      isLive: false
    },
    {
      id: 'st_3',
      title: 'Motos',
      category: 'moto',
      avatar: 'https://images.unsplash.com/photo-1558981403-c5f9899a28bc?auto=format&fit=crop&w=200&q=80',
      badge: '🏍️',
      isLive: false
    },
    {
      id: 'st_4',
      title: 'AutoLuxe VIP',
      sellerId: 'user_garagista_1',
      avatar: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&w=200&q=80',
      badge: '💎',
      isLive: true
    },
    {
      id: 'st_5',
      title: 'Rota 66 Motos',
      sellerId: 'user_garagista_2',
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80',
      badge: '⚡',
      isLive: true
    }
  ];

  return (
    <div className="story-highlights-container">
      <div className="story-scroll">
        {stories.map(story => {
          const isActive = story.category ? selectedCategory === story.category : false;

          return (
            <div
              key={story.id}
              className={`story-item ${isActive ? 'active' : ''}`}
              onClick={() => {
                if (story.category) setSelectedCategory(story.category);
              }}
            >
              <div className={`story-ring ${story.isLive ? 'live-ring' : ''}`}>
                <img src={story.avatar} alt={story.title} className="story-avatar" />
                <span className="story-badge-icon">{story.badge}</span>
              </div>
              <span className="story-title">{story.title}</span>
            </div>
          );
        })}
      </div>
    </div>
  );
};
