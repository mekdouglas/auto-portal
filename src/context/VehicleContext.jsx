import React, { createContext, useContext, useState, useEffect } from 'react';
import { MOCK_VEHICLES } from '../data/mockVehicles';

const VehicleContext = createContext();

export const VehicleProvider = ({ children }) => {
  const [vehicles, setVehicles] = useState(() => {
    const saved = localStorage.getItem('autoportal_vehicles');
    if (saved) {
      try { return JSON.parse(saved); } catch (e) {}
    }
    return MOCK_VEHICLES;
  });

  const [selectedCategory, setSelectedCategory] = useState('todos'); // 'todos' | 'carro' | 'moto'
  const [searchQuery, setSearchQuery] = useState('');
  const [priceMax, setPriceMax] = useState(1000000);
  const [selectedVehicle, setSelectedVehicle] = useState(null);
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [offerModalVehicle, setOfferModalVehicle] = useState(null);

  useEffect(() => {
    localStorage.setItem('autoportal_vehicles', JSON.stringify(vehicles));
  }, [vehicles]);

  const toggleLike = (vehicleId) => {
    setVehicles(prev => prev.map(v => {
      if (v.id === vehicleId) {
        const isLiked = !v.isLiked;
        return {
          ...v,
          isLiked,
          likesCount: isLiked ? v.likesCount + 1 : v.likesCount - 1
        };
      }
      return v;
    }));
  };

  const toggleSave = (vehicleId) => {
    setVehicles(prev => prev.map(v => {
      if (v.id === vehicleId) {
        return { ...v, isSaved: !v.isSaved };
      }
      return v;
    }));
  };

  const addVehicle = (newVehicle) => {
    setVehicles(prev => [newVehicle, ...prev]);
  };

  const filteredVehicles = vehicles.filter(v => {
    const matchesCategory = selectedCategory === 'todos' || v.category.toLowerCase() === selectedCategory.toLowerCase();
    const matchesSearch = searchQuery === '' || 
      v.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      v.make.toLowerCase().includes(searchQuery.toLowerCase()) ||
      v.model.toLowerCase().includes(searchQuery.toLowerCase()) ||
      v.location.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesPrice = v.price <= priceMax;
    return matchesCategory && matchesSearch && matchesPrice;
  });

  return (
    <VehicleContext.Provider value={{
      vehicles,
      filteredVehicles,
      selectedCategory,
      setSelectedCategory,
      searchQuery,
      setSearchQuery,
      priceMax,
      setPriceMax,
      toggleLike,
      toggleSave,
      addVehicle,
      selectedVehicle,
      setSelectedVehicle,
      isFilterOpen,
      setIsFilterOpen,
      offerModalVehicle,
      setOfferModalVehicle
    }}>
      {children}
    </VehicleContext.Provider>
  );
};

export const useVehicles = () => useContext(VehicleContext);
