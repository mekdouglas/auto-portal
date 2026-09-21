import React, { useState } from 'react';
import { AuthProvider, useAuth } from './context/AuthContext';
import { VehicleProvider, useVehicles } from './context/VehicleContext';
import { ChatProvider, useChats } from './context/ChatContext';

import { Header } from './components/Header';
import { Navbar } from './components/Navbar';
import { AuthModal } from './components/AuthModal';
import { FilterDrawer } from './components/FilterDrawer';
import { OfferModal } from './components/OfferModal';
import { VehicleDetailModal } from './components/VehicleDetailModal';

import { FeedPage } from './pages/FeedPage';
import { ExplorePage } from './pages/ExplorePage';
import { CreateAdPage } from './pages/CreateAdPage';
import { ChatPage } from './pages/ChatPage';
import { ProfilePage } from './pages/ProfilePage';

const AppContent = () => {
  const [activeTab, setActiveTab] = useState('feed'); // 'feed' | 'explore' | 'createAd' | 'chat' | 'profile'
  const { selectedVehicle, setSelectedVehicle, offerModalVehicle, setOfferModalVehicle } = useVehicles();
  const { setActiveChatId } = useChats();

  const handleOpenChatFromModal = (chatId) => {
    setActiveChatId(chatId);
    setActiveTab('chat');
  };

  const handleOpenOfferFromModal = (veh) => {
    setOfferModalVehicle(veh);
  };

  return (
    <div className="app-shell">
      <Header />

      <main className="app-main-content">
        {activeTab === 'feed' && <FeedPage />}
        {activeTab === 'explore' && <ExplorePage />}
        {activeTab === 'createAd' && (
          <CreateAdPage
            onCancel={() => setActiveTab('feed')}
            onSuccess={() => setActiveTab('feed')}
          />
        )}
        {activeTab === 'chat' && <ChatPage />}
        {activeTab === 'profile' && (
          <ProfilePage onOpenCreateAd={() => setActiveTab('createAd')} />
        )}
      </main>

      <Navbar
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        onOpenCreateAd={() => setActiveTab('createAd')}
      />

      {/* Global Modals */}
      <AuthModal />
      <FilterDrawer />

      {selectedVehicle && (
        <VehicleDetailModal
          vehicle={selectedVehicle}
          onClose={() => setSelectedVehicle(null)}
          onOpenChat={handleOpenChatFromModal}
          onOpenOffer={handleOpenOfferFromModal}
        />
      )}

      {offerModalVehicle && (
        <OfferModal
          vehicle={offerModalVehicle}
          onClose={() => setOfferModalVehicle(null)}
          onOfferSent={(chatId) => {
            setActiveChatId(chatId);
            setActiveTab('chat');
          }}
        />
      )}
    </div>
  );
};

export function App() {
  return (
    <AuthProvider>
      <VehicleProvider>
        <ChatProvider>
          <AppContent />
        </ChatProvider>
      </VehicleProvider>
    </AuthProvider>
  );
}

export default App;
