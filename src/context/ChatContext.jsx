import React, { createContext, useContext, useState, useEffect } from 'react';
import { MOCK_CHATS } from '../data/mockChats';
import { supabase } from '../lib/supabase';

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

  // Load chats from Supabase
  useEffect(() => {
    async function loadSupabaseChats() {
      try {
        const { data, error } = await supabase.from('chats').select('*');
        if (!error && data && data.length > 0) {
          const formatted = data.map(c => ({
            id: c.id,
            vehicleId: c.vehicle_id,
            vehicleTitle: c.vehicle_title,
            vehiclePhoto: c.vehicle_photo,
            vehiclePrice: Number(c.vehicle_price),
            participant: c.participant,
            lastMessage: c.last_message,
            lastMessageTime: c.last_message_time,
            unreadCount: Number(c.unread_count || 0),
            messages: c.messages || []
          }));
          setChats(formatted);
        }
      } catch (err) {
        console.warn('Fallback to local chats state:', err);
      }
    }
    loadSupabaseChats();
  }, []);

  useEffect(() => {
    localStorage.setItem('autoportal_chats', JSON.stringify(chats));
  }, [chats]);

  const sendMessage = async (chatId, text, senderId) => {
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
        const updatedMsgs = [...c.messages, newMsg];
        
        // Sync to Supabase
        supabase.from('chats').update({
          last_message: text,
          last_message_time: timeStr,
          messages: updatedMsgs
        }).eq('id', chatId).then(({ error }) => { if (error) console.warn(error); });

        return {
          ...c,
          lastMessage: text,
          lastMessageTime: timeStr,
          messages: updatedMsgs
        };
      }
      return c;
    }));
  };

  const createOrGetChat = (vehicle, currentUser) => {
    const existing = chats.find(c => c.vehicleId === vehicle.id);
    if (existing) {
      setActiveChatId(existing.id);
      return existing.id;
    }

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

    // Push to Supabase
    supabase.from('chats').insert({
      id: newChatId,
      vehicle_id: vehicle.id,
      vehicle_title: vehicle.title,
      vehicle_photo: vehicle.photos[0],
      vehicle_price: vehicle.price,
      participant: newChat.participant,
      last_message: newChat.lastMessage,
      last_message_time: newChat.lastMessageTime,
      unread_count: 0,
      messages: newChat.messages
    }).then(({ error }) => { if (error) console.warn(error); });

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
        const updatedMsgs = [...c.messages, offerMsg];
        const lastMsgText = `Proposta enviada: R$ ${Number(offerAmount).toLocaleString('pt-BR')}`;

        supabase.from('chats').update({
          last_message: lastMsgText,
          last_message_time: timeStr,
          messages: updatedMsgs
        }).eq('id', chatId).then(({ error }) => { if (error) console.warn(error); });

        return {
          ...c,
          lastMessage: lastMsgText,
          lastMessageTime: timeStr,
          messages: updatedMsgs
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

        supabase.from('chats').update({
          last_message: statusText,
          last_message_time: timeStr,
          messages: updatedMessages
        }).eq('id', chatId).then(({ error }) => { if (error) console.warn(error); });

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
