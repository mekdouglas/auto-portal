import React, { createContext, useContext, useState, useEffect } from 'react';
import { MOCK_CHATS } from '../data/mockChats';

const ChatContext = createContext();

export const ChatProvider = ({ children }) => {
  const [chats, setChats] = useState(() => {
    const saved = localStorage.getItem('autoportal_chats');
    if (saved) {
      try { return JSON.parse(saved); } catch (e) {}
    }
    return MOCK_CHATS;
  });

  const [activeChatId, setActiveChatId] = useState(null);

  useEffect(() => {
    localStorage.setItem('autoportal_chats', JSON.stringify(chats));
  }, [chats]);

  const sendMessage = (chatId, text, senderId) => {
    const now = new Date();
    const timeStr = `${String(now.getHours()).padStart(2, '0')}:${String(now.getMinutes()).padStart(2, '0')}`;

    const newMsg = {
      id: `msg_${Date.now()}`,
      senderId,
      text,
      timestamp: timeStr
    };

    setChats(prev => prev.map(c => {
      if (c.id === chatId) {
        return {
          ...c,
          lastMessage: text,
          lastMessageTime: timeStr,
          messages: [...c.messages, newMsg]
        };
      }
      return c;
    }));
  };

  const createOrGetChat = (vehicle, currentUser) => {
    // Check if chat for vehicle & user already exists
    const existing = chats.find(c => c.vehicleId === vehicle.id);
    if (existing) {
      setActiveChatId(existing.id);
      return existing.id;
    }

    // Create new chat
    const newChatId = `chat_${Date.now()}`;
    const newChat = {
      id: newChatId,
      vehicleId: vehicle.id,
      vehicleTitle: vehicle.title,
      vehiclePhoto: vehicle.photos[0],
      vehiclePrice: vehicle.price,
      participant: {
        id: vehicle.seller.id,
        name: vehicle.seller.name,
        avatar: vehicle.seller.avatar,
        role: vehicle.seller.role
      },
      lastMessage: 'Chat de negociação iniciado',
      lastMessageTime: 'Agora',
      unreadCount: 0,
      messages: [
        {
          id: `msg_init_${Date.now()}`,
          senderId: vehicle.seller.id,
          text: `Olá! Obrigado pelo interesse no ${vehicle.title}. Como posso te ajudar hoje?`,
          timestamp: 'Agora'
        }
      ]
    };

    setChats(prev => [newChat, ...prev]);
    setActiveChatId(newChatId);
    return newChatId;
  };

  const sendOffer = (vehicle, offerAmount, paymentType, notes, currentUser) => {
    const chatId = createOrGetChat(vehicle, currentUser);
    const now = new Date();
    const timeStr = `${String(now.getHours()).padStart(2, '0')}:${String(now.getMinutes()).padStart(2, '0')}`;

    const offerObj = {
      id: `off_${Date.now()}`,
      amount: Number(offerAmount),
      originalPrice: vehicle.price,
      paymentType: paymentType || 'À Vista PIX',
      notes: notes || '',
      status: 'pending',
      counterAmount: null
    };

    const offerMsg = {
      id: `msg_offer_${Date.now()}`,
      senderId: currentUser.id,
      type: 'offer',
      offerData: offerObj,
      text: `Proposta enviada no valor de R$ ${Number(offerAmount).toLocaleString('pt-BR')}`,
      timestamp: timeStr
    };

    setChats(prev => prev.map(c => {
      if (c.id === chatId) {
        return {
          ...c,
          lastMessage: `Proposta enviada: R$ ${Number(offerAmount).toLocaleString('pt-BR')}`,
          lastMessageTime: timeStr,
          messages: [...c.messages, offerMsg]
        };
      }
      return c;
    }));

    return chatId;
  };

  const updateOfferStatus = (chatId, offerId, newStatus, counterVal = null) => {
    const now = new Date();
    const timeStr = `${String(now.getHours()).padStart(2, '0')}:${String(now.getMinutes()).padStart(2, '0')}`;

    setChats(prev => prev.map(c => {
      if (c.id === chatId) {
        const updatedMessages = c.messages.map(m => {
          if (m.type === 'offer' && m.offerData.id === offerId) {
            return {
              ...m,
              offerData: {
                ...m.offerData,
                status: newStatus,
                counterAmount: counterVal ? Number(counterVal) : m.offerData.counterAmount
              }
            };
          }
          return m;
        });

        let statusText = '';
        if (newStatus === 'accepted') statusText = 'Proposta Aceita!';
        if (newStatus === 'rejected') statusText = 'Proposta Recusada.';
        if (newStatus === 'countered') statusText = `Contraproposta enviada: R$ ${Number(counterVal).toLocaleString('pt-BR')}`;

        return {
          ...c,
          lastMessage: statusText,
          lastMessageTime: timeStr,
          messages: updatedMessages
        };
      }
      return c;
    }));
  };

  return (
    <ChatContext.Provider value={{
      chats,
      activeChatId,
      setActiveChatId,
      sendMessage,
      createOrGetChat,
      sendOffer,
      updateOfferStatus
    }}>
      {children}
    </ChatContext.Provider>
  );
};

export const useChats = () => useContext(ChatContext);
