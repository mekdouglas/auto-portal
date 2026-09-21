import React, { createContext, useContext, useState, useEffect } from 'react';
import { MOCK_VEHICLES } from '../data/mockVehicles';
import { supabase } from '../lib/supabase';

const VehicleContext = createContext();

export const VehicleProvider = ({ children }) => {
  const [vehicles, setVehicles] = useState(() => {
    const saved = localStorage.getItem('autoportal_vehicles');
    if (saved) {
      try { return JSON.parse(saved); } catch (e) {}
    }
    return MOCK_VEHICLES;
  });

  const [selectedCategory, setSelectedCategory] = useState('todos');
  const [searchQuery, setSearchQuery] = useState('');
  const [priceMax, setPriceMax] = useState(1000000);
  const [selectedVehicle, setSelectedVehicle] = useState(null);
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [offerModalVehicle, setOfferModalVehicle] = useState(null);

  const fetchVehiclesFromSupabase = async () => {
    try {
      const { data, error } = await supabase.from('vehicles').select('*').order('created_at', { ascending: false });
      if (!error && data && data.length > 0) {
        const formatted = data.map(item => ({
          id: item.id,
          title: item.title,
          category: item.category,
          make: item.make,
          model: item.model,
          year: item.year,
          mileage: Number(item.mileage),
          fuel: item.fuel,
          transmission: item.transmission,
          color: item.color,
          price: Number(item.price),
          hidePrice: item.hide_price,
          featured: item.featured,
          featuredTag: item.featured_tag,
          photos: item.photos || [],
          description: item.description,
          audioTranscript: item.audio_transcript,
          audioDuration: item.audio_duration,
          location: item.location,
          seller: item.seller_data || {
            id: item.seller_id,
            name: 'Vendedor Supabase',
            role: 'garagista',
            avatar: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&w=200&q=80',
            verified: true
          },
          likesCount: Number(item.likes_count || 0),
          viewsCount: Number(item.views_count || 0),
          specs: item.specs || [],
          createdAt: 'Recente'
        }));
        setVehicles(formatted);
      }
    } catch (err) {
      console.warn('Fallback to local state:', err);
    }
  };

  useEffect(() => {
    fetchVehiclesFromSupabase();

    // Supabase Realtime Subscription for live updates across clients
    const channel = supabase
      .channel('public:vehicles')
      .on('postgres_changes', { event: '*', schema: 'public', table: 'vehicles' }, () => {
        fetchVehiclesFromSupabase();
      })
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, []);

  useEffect(() => {
    localStorage.setItem('autoportal_vehicles', JSON.stringify(vehicles));
  }, [vehicles]);

  const toggleLike = async (vehicleId) => {
    setVehicles(prev => prev.map(v => {
      if (v.id === vehicleId) {
        const isLiked = !v.isLiked;
        const newCount = isLiked ? v.likesCount + 1 : v.likesCount - 1;

        supabase.from('vehicles')
          .update({ likes_count: newCount })
          .eq('id', vehicleId)
          .then(({ error }) => { if (error) console.warn(error); });

        return { ...v, isLiked, likesCount: newCount };
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

  const addVehicle = async (newVehicle) => {
    setVehicles(prev => [newVehicle, ...prev]);

    try {
      await supabase.from('vehicles').insert({
        id: newVehicle.id,
        title: newVehicle.title,
        category: newVehicle.category,
        make: newVehicle.make,
        model: newVehicle.model,
        year: newVehicle.year,
        mileage: newVehicle.mileage,
        fuel: newVehicle.fuel,
        transmission: newVehicle.transmission,
        color: newVehicle.color,
        price: newVehicle.price,
        hide_price: newVehicle.hidePrice,
        featured: newVehicle.featured,
        featured_tag: newVehicle.featuredTag,
        photos: newVehicle.photos,
        description: newVehicle.description,
        audio_transcript: newVehicle.audioTranscript,
        audio_duration: newVehicle.audioDuration,
        location: newVehicle.location,
        seller_id: newVehicle.seller.id,
        seller_data: newVehicle.seller,
        likes_count: newVehicle.likesCount,
        views_count: newVehicle.viewsCount,
        specs: newVehicle.specs
      });
    } catch (err) {
      console.warn('Failed to insert into Supabase:', err);
    }
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
