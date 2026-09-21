export const MOCK_VEHICLES = [
  {
    id: 'veh_1',
    title: 'Porsche Macan GTS 2.9 V6 Turbo',
    category: 'carro',
    make: 'Porsche',
    model: 'Macan GTS',
    year: '2022/2023',
    mileage: 18500,
    fuel: 'Gasolina',
    transmission: 'Automático PDK',
    color: 'Vermelho Carmine',
    price: 549000,
    hidePrice: false, // Visible price
    featured: true,
    featuredTag: 'VIP TOP FEED',
    photos: [
      'https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1614162692292-7ac56d7f7f1e?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1617814076367-b759c7d7e738?auto=format&fit=crop&w=1200&q=80'
    ],
    description: 'Porsche Macan GTS em estado impecável de zero km! Garantia de fábrica estendida até 2026. Pacote Sport Chrono, escapamento esportivo original com seletor de ronco, bancos adaptativos 18 vias com memória, teto panorâmico, faróis Matrix LED em preto.',
    audioDuration: '0:28',
    audioTranscript: 'Fala pessoal! Esse Macan GTS está incrivelmente conservado, todas as revisões feitas na concessionária Stuttgart Porsche. Pneus Michelin Pilot Sport seminovos, sem nenhum risco nas rodas.',
    location: 'São Paulo, SP',
    seller: {
      id: 'user_garagista_1',
      name: 'AutoLuxe Motors',
      username: '@autoluxemotors',
      role: 'garagista',
      avatar: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&w=200&q=80',
      verified: true
    },
    likesCount: 142,
    isLiked: false,
    isSaved: true,
    viewsCount: 1840,
    specs: [
      'Motor 2.9 V6 Biturbo 440cv',
      'Tração Integral AWD',
      'Som Burmester 3D Surround',
      'Teto Solar Panorâmico',
      'Suspensão Pneumática Adaptativa'
    ],
    createdAt: 'Há 2 horas'
  },
  {
    id: 'veh_2',
    title: 'BMW S1000 RR M Package',
    category: 'moto',
    make: 'BMW',
    model: 'S1000 RR',
    year: '2023/2023',
    mileage: 4200,
    fuel: 'Gasolina',
    transmission: 'Manual 6v c/ Quickshifter Pro',
    color: 'Branco M Motorsport',
    price: 138900,
    hidePrice: true, // Price hidden for logged out users!
    featured: true,
    featuredTag: 'DESTAQUE GARAGEM',
    photos: [
      'https://images.unsplash.com/photo-1568772585407-9361f9bf3a87?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1558981403-c5f9899a28bc?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1558981806-ec527fa84c39?auto=format&fit=crop&w=1200&q=80'
    ],
    description: 'Único dono! Edição M Package com rodas de carbono de fábrica, escapamento Akrapovic em titânio, modos de pilotagem Race Pro 1-3, controle de tração dinâmico e painel TFT colorido de 6.5 polegadas.',
    audioDuration: '0:19',
    audioTranscript: 'Fala motociclistas! Moto impecável com apenas 4 mil km rodados, usada apenas em passeios de fim de semana. Rodas de carbono originais sem detalhe. Aceito proposta com volta.',
    location: 'Curitiba, PR',
    seller: {
      id: 'user_garagista_2',
      name: 'Rota 66 Motos & Garagem',
      username: '@rota66motos',
      role: 'garagista',
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80',
      verified: true
    },
    likesCount: 98,
    isLiked: true,
    isSaved: false,
    viewsCount: 920,
    specs: [
      '207cv a 13.500 RPM',
      'Rodas em Fibra de Carbono M',
      'Quickshifter Bidirecional Pro',
      'Bateria M de Lítio Ultraleve'
    ],
    createdAt: 'Há 5 horas'
  },
  {
    id: 'veh_3',
    title: 'Audi RS6 Avant 4.0 V8 BiTurbo Quattro',
    category: 'carro',
    make: 'Audi',
    model: 'RS6 Avant',
    year: '2021/2021',
    mileage: 26000,
    fuel: 'Gasolina',
    transmission: 'Tiptronic 8v',
    color: 'Cinza Nardo',
    price: 890000,
    hidePrice: false,
    featured: true,
    featuredTag: 'IMPULSIONADO',
    photos: [
      'https://images.unsplash.com/photo-1603584173870-7f23fdae1b7a?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1618843479313-40f8afb4b4d8?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1542282088-72c9c27ed0cd?auto=format&fit=crop&w=1200&q=80'
    ],
    description: 'A perua mais rápida do mundo em cor icônica Cinza Nardo. PPF completo em toda a carroceria (garantia de 10 anos). Freios em cerâmica de carbono RS, ronco com sistema de exaustão RS Sport.',
    audioDuration: '0:35',
    audioTranscript: 'Olá interessados, essa RS6 possui vitrificação de pintura e PPF integral. Nenhuma repintura, histórico 100% limpo na Audi SP. Motor stock de 600 cavalos com torque brutal.',
    location: 'São Paulo, SP',
    seller: {
      id: 'user_garagista_1',
      name: 'AutoLuxe Motors',
      username: '@autoluxemotors',
      role: 'garagista',
      avatar: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&w=200&q=80',
      verified: true
    },
    likesCount: 310,
    isLiked: false,
    isSaved: true,
    viewsCount: 3100,
    specs: [
      '600cv e 81.6 kgfm de torque',
      '0 a 100 km/h em 3.6s',
      'Freios de Cerâmica RS',
      'PPF Integral Hexis Protect'
    ],
    createdAt: 'Há 1 dia'
  },
  {
    id: 'veh_4',
    title: 'Volkswagen Golf GTI 2.0 TSI Mk7.5',
    category: 'carro',
    make: 'Volkswagen',
    model: 'Golf GTI',
    year: '2019/2019',
    mileage: 48000,
    fuel: 'Gasolina',
    transmission: 'Automático DSG 6v',
    color: 'Branco Puro',
    price: 179900,
    hidePrice: true, // Price hidden for unauthenticated users
    featured: false,
    photos: [
      'https://images.unsplash.com/photo-1541899481282-d53bffe3c35d?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1502877338535-766e1452684a?auto=format&fit=crop&w=1200&q=80'
    ],
    description: 'Golf GTI MK7.5 com pacote Premium (faróis Full LED direcionais, Active Info Display 12.3", som Dynaudio, Park Assist 3.0). Sem modificações ou Stage, motor 100% original.',
    audioDuration: '0:22',
    audioTranscript: 'Carro do meu uso diário para ir ao trabalho. Cuido com óleo trocado a cada 5.000km, pneus Michelin novos. Muito novo de andar!',
    location: 'Campinas, SP',
    seller: {
      id: 'user_proprietario_1',
      name: 'Carlos Eduardo Silva',
      username: '@carlosedu_cars',
      role: 'proprietario',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&q=80',
      verified: false
    },
    likesCount: 76,
    isLiked: false,
    isSaved: false,
    viewsCount: 890,
    specs: [
      '230cv Turbo TSI',
      'Painel Digital Active Info Display',
      'Sistema Som Dynaudio 400W',
      'Bancos Xadrez Clark Icônicos'
    ],
    createdAt: 'Há 2 dias'
  },
  {
    id: 'veh_5',
    title: 'Ducati Panigale V4 S 1100cc',
    category: 'moto',
    make: 'Ducati',
    model: 'Panigale V4 S',
    year: '2022/2022',
    mileage: 3100,
    fuel: 'Gasolina',
    transmission: 'Manual 6v c/ DQS',
    color: 'Rosso Corsa Ducati',
    price: 154900,
    hidePrice: false,
    featured: true,
    featuredTag: 'OFERTA DA SEMANA',
    photos: [
      'https://images.unsplash.com/photo-1558981806-ec527fa84c39?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1568772585407-9361f9bf3a87?auto=format&fit=crop&w=1200&q=80'
    ],
    description: 'A suprema italiana! Versão S equipada com suspensão eletrônica Öhlins Smart EC 2.0, rodas forjadas Marchesini em alumínio, asas aerodinâmicas em carbono.',
    audioDuration: '0:25',
    audioTranscript: 'Panigale V4 S sem nenhum detalhe. Todas as revisões na concessionária Ducati SP. Moto de garagem climatizada.',
    location: 'Curitiba, PR',
    seller: {
      id: 'user_garagista_2',
      name: 'Rota 66 Motos & Garagem',
      username: '@rota66motos',
      role: 'garagista',
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80',
      verified: true
    },
    likesCount: 189,
    isLiked: true,
    isSaved: true,
    viewsCount: 1450,
    specs: [
      'Motor Desmosedici Stradale V4 214cv',
      'Suspensão Öhlins Eletrônica',
      'Rodas Forjadas Marchesini'
    ],
    createdAt: 'Há 3 dias'
  },
  {
    id: 'veh_6',
    title: 'Jeep Compass Longitude 1.3 Turbo T270',
    category: 'carro',
    make: 'Jeep',
    model: 'Compass',
    year: '2022/2023',
    mileage: 22000,
    fuel: 'Flex (Gasolina/Etanol)',
    transmission: 'Automático 6v',
    color: 'Cinza Granite',
    price: 139900,
    hidePrice: false,
    featured: true,
    featuredTag: 'IMPULSIONADO',
    photos: [
      'https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1549399542-7e3f8b79c341?auto=format&fit=crop&w=1200&q=80'
    ],
    description: 'SUV de único dono, revisado na concessionária Jeep. Painel Full Digital 10.25", central multimídia 10.1" com Apple CarPlay e Android Auto sem fio, bancos em couro ecológico.',
    audioDuration: '0:21',
    audioTranscript: 'Olá! Sou a dona do Compass. Carro impecável de família, usado só pra viagens nos fins de semana. Manual e chave reserva intactos.',
    location: 'Rio de Janeiro, RJ',
    seller: {
      id: 'user_proprietario_2',
      name: 'Renata Oliveira',
      username: '@renata_suv',
      role: 'proprietario',
      avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=200&q=80',
      verified: false
    },
    likesCount: 64,
    isLiked: false,
    isSaved: false,
    viewsCount: 670,
    specs: [
      'Motor T270 Turbo Flex 185cv',
      'Central Multimídia 10.1" sem fio',
      'Bancos em Couro Nobre',
      'Ar Condicionado Dual Zone'
    ],
    createdAt: 'Há 4 dias'
  },
  {
    id: 'veh_7',
    title: 'Porsche 911 Carrera S (992) 3.0 Turbo',
    category: 'carro',
    make: 'Porsche',
    model: '911 Carrera S',
    year: '2021/2022',
    mileage: 9800,
    fuel: 'Gasolina',
    transmission: 'PDK 8v',
    color: 'Prata GT',
    price: 820000,
    hidePrice: true, // Price hidden
    featured: true,
    featuredTag: 'VIP TOP FEED',
    photos: [
      'https://images.unsplash.com/photo-1614162692292-7ac56d7f7f1e?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&w=1200&q=80'
    ],
    description: 'Icônico 911 Carrera S geração 992! Cor Prata GT com interior em couro Vermelho Bordeaux. Crono Sport Package, eixo traseiro esterçante, sistema de elevação de eixo dianteiro (Front Axle Lift).',
    audioDuration: '0:30',
    audioTranscript: 'Exemplar fantástico do 911 992 Carrera S. Estado de novo na Garagem 61. Aceitamos propostas à vista e trocas em clássicos.',
    location: 'Belo Horizonte, MG',
    seller: {
      id: 'user_garagista_3',
      name: 'Garagem 61 Classics & Custom',
      username: '@garagem61',
      role: 'garagista',
      avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=200&q=80',
      verified: true
    },
    likesCount: 245,
    isLiked: false,
    isSaved: true,
    viewsCount: 2900,
    specs: [
      '450cv Boxer 6 Cilindros Biturbo',
      'Front Axle Lift System',
      'Eixo Traseiro Esterçante',
      'Pacote Couro Total Bordeaux'
    ],
    createdAt: 'Há 5 dias'
  },
  {
    id: 'veh_8',
    title: 'BMW R 1250 GS Adventure HP',
    category: 'moto',
    make: 'BMW',
    model: 'R 1250 GS',
    year: '2022/2022',
    mileage: 12500,
    fuel: 'Gasolina',
    transmission: 'Manual 6v c/ Shift Assistant',
    color: 'HP Motorsport Tricolor',
    price: 114900,
    hidePrice: false,
    featured: true,
    featuredTag: 'DESTAQUE GARAGEM',
    photos: [
      'https://images.unsplash.com/photo-1558981806-ec527fa84c39?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1568772585407-9361f9bf3a87?auto=format&fit=crop&w=1200&q=80'
    ],
    description: 'A rainha das grandes viagens! Edição HP Adventure completa com conjunto de 3 baús de alumínio originais BMW, protetores de motor e carenagem, faróis auxiliares em LED e freios ABS Pro.',
    audioDuration: '0:22',
    audioTranscript: 'R 1250 GS Adventure com trio de baús de alumínio de fábrica. Perfeita para expedições nas Américas. Revisões na BMW Osten.',
    location: 'Curitiba, PR',
    seller: {
      id: 'user_garagista_2',
      name: 'Rota 66 Motos & Garagem',
      username: '@rota66motos',
      role: 'garagista',
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80',
      verified: true
    },
    likesCount: 112,
    isLiked: false,
    isSaved: true,
    viewsCount: 1100,
    specs: [
      'Motor ShiftCam Boxer 136cv',
      'Trio de Baús Alumínio Original',
      'Tanque 30 Litros para Longas Viagens',
      'Suspensão Eletrônica ESA Dynamic'
    ],
    createdAt: 'Há 6 dias'
  }
];
