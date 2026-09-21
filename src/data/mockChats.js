export const MOCK_CHATS = [
  {
    id: 'chat_1',
    vehicleId: 'veh_1',
    vehicleTitle: 'Porsche Macan GTS 2.9 V6 Turbo',
    vehiclePhoto: 'https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&w=400&q=80',
    vehiclePrice: 549000,
    participant: {
      id: 'user_comprador_1',
      name: 'Mariana Costa',
      avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=200&q=80',
      role: 'comprador'
    },
    lastMessage: 'Enviei uma proposta de R$ 525.000 à vista!',
    lastMessageTime: '14:32',
    unreadCount: 1,
    messages: [
      {
        id: 'msg_1',
        senderId: 'user_comprador_1',
        text: 'Olá! Aceita financiamento ou veículo seminovo na troca por este Macan GTS?',
        timestamp: '14:28'
      },
      {
        id: 'msg_2',
        senderId: 'user_garagista_1',
        text: 'Boa tarde Mariana! Aceitamos sim troca e fazemos financiamento bancário com as melhores taxas.',
        timestamp: '14:30'
      },
      {
        id: 'msg_3',
        senderId: 'user_comprador_1',
        text: 'Ótimo! Tenho interesse em fechar a compra à vista sem troca.',
        timestamp: '14:31'
      },
      {
        id: 'msg_4',
        senderId: 'user_comprador_1',
        type: 'offer',
        offerData: {
          id: 'off_101',
          amount: 525000,
          originalPrice: 549000,
          paymentType: 'À Vista PIX / Transferência',
          notes: 'Validade da proposta: 48h. Pagamento imediato.',
          status: 'pending', // 'pending' | 'accepted' | 'rejected' | 'countered'
          counterAmount: null
        },
        text: 'Proposta enviada no valor de R$ 525.000',
        timestamp: '14:32'
      }
    ]
  },
  {
    id: 'chat_2',
    vehicleId: 'veh_2',
    vehicleTitle: 'BMW S1000 RR M Package',
    vehiclePhoto: 'https://images.unsplash.com/photo-1568772585407-9361f9bf3a87?auto=format&fit=crop&w=400&q=80',
    vehiclePrice: 138900,
    participant: {
      id: 'user_proprietario_1',
      name: 'Carlos Eduardo Silva',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&q=80',
      role: 'proprietario'
    },
    lastMessage: 'Proposta de R$ 132.000 foi aceita pelo vendedor!',
    lastMessageTime: 'Ontem',
    unreadCount: 0,
    messages: [
      {
        id: 'msg_201',
        senderId: 'user_proprietario_1',
        text: 'Amigo, qual o valor mínimo que consegue fazer nessa BMW com frete pra SP?',
        timestamp: 'Ontem 10:15'
      },
      {
        id: 'msg_202',
        senderId: 'user_garagista_2',
        text: 'Consigo fechar em R$ 135.000 com frete grátis via plataforma fechada!',
        timestamp: 'Ontem 10:40'
      },
      {
        id: 'msg_203',
        senderId: 'user_proprietario_1',
        type: 'offer',
        offerData: {
          id: 'off_102',
          amount: 132000,
          originalPrice: 138900,
          paymentType: 'À Vista',
          notes: 'Consigo enviar o sinal hoje mesmo.',
          status: 'accepted',
          counterAmount: null
        },
        text: 'Proposta Aceita no valor de R$ 132.000',
        timestamp: 'Ontem 11:00'
      }
    ]
  }
];
