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
          status: 'pending', // Pending status
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
    lastMessage: 'Proposta Aceita no valor de R$ 132.000!',
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
          paymentType: 'À Vista PIX',
          notes: 'Consigo enviar o sinal hoje mesmo.',
          status: 'accepted', // Accepted status
          counterAmount: null
        },
        text: 'Proposta Aceita no valor de R$ 132.000',
        timestamp: 'Ontem 11:00'
      }
    ]
  },
  {
    id: 'chat_3',
    vehicleId: 'veh_4',
    vehicleTitle: 'Volkswagen Golf GTI 2.0 TSI Mk7.5',
    vehiclePhoto: 'https://images.unsplash.com/photo-1541899481282-d53bffe3c35d?auto=format&fit=crop&w=400&q=80',
    vehiclePrice: 179900,
    participant: {
      id: 'user_comprador_2',
      name: 'Douglas Santos',
      avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=200&q=80',
      role: 'comprador'
    },
    lastMessage: 'Contraproposta enviada: R$ 175.000',
    lastMessageTime: 'Há 3 horas',
    unreadCount: 1,
    messages: [
      {
        id: 'msg_301',
        senderId: 'user_comprador_2',
        text: 'Boa tarde Carlos! Aceita R$ 168.000 à vista no PIX hoje?',
        timestamp: '11:20'
      },
      {
        id: 'msg_302',
        senderId: 'user_comprador_2',
        type: 'offer',
        offerData: {
          id: 'off_103',
          amount: 168000,
          originalPrice: 179900,
          paymentType: 'À Vista PIX',
          notes: 'Pagamento imediato.',
          status: 'countered', // Countered status
          counterAmount: 175000
        },
        text: 'Contraproposta enviada no valor de R$ 175.000',
        timestamp: '11:45'
      }
    ]
  },
  {
    id: 'chat_4',
    vehicleId: 'veh_5',
    vehicleTitle: 'Ducati Panigale V4 S 1100cc',
    vehiclePhoto: 'https://images.unsplash.com/photo-1558981806-ec527fa84c39?auto=format&fit=crop&w=400&q=80',
    vehiclePrice: 154900,
    participant: {
      id: 'user_comprador_1',
      name: 'Mariana Costa',
      avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=200&q=80',
      role: 'comprador'
    },
    lastMessage: 'Proposta Recusada.',
    lastMessageTime: 'Há 1 dia',
    unreadCount: 0,
    messages: [
      {
        id: 'msg_401',
        senderId: 'user_comprador_1',
        type: 'offer',
        offerData: {
          id: 'off_104',
          amount: 135000,
          originalPrice: 154900,
          paymentType: 'Veículo na Troca + Diferença',
          notes: 'Ofereço minha moto atual de R$ 40k + dinheiro.',
          status: 'rejected', // Rejected status
          counterAmount: null
        },
        text: 'Proposta Recusada',
        timestamp: 'Ontem 16:00'
      }
    ]
  }
];
