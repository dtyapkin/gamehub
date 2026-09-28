export const NAV_ITEMS = [
  { id: 'home', label: 'Главная', icon: 'Home', href: '/' },
  { id: 'all-games', label: 'Все игры', icon: 'Gamepad2', href: '/games' },
  { id: 'trending', label: 'В тренде', icon: 'Flame', href: '/trending' },
  { id: 'new-games', label: 'Новые', icon: 'Sparkles', href: '/new', badge: 'NEW' },
  { id: 'popular', label: 'Популярные', icon: 'Star', href: '/popular' },
  { id: 'categories', label: 'Категории', icon: 'LayoutGrid', href: '/categories' },
  { id: 'best', label: 'Лучшие', icon: 'Medal', href: '/best' },
  { id: 'boy', label: 'Для мальчиков', icon: 'Mars', href: '/boys' },
  { id: 'girl', label: 'Для девочек', icon: 'Venus', href: '/girls' },
  // { id: 'favorites', label: 'Любимые', icon: 'Heart', href: '/favorites' },
  // { id: 'recently-played', label: 'Недавно открытые', icon: 'Clock', href: '/recently-played' },
  // { id: 'leaderboard', label: 'Лидеры', icon: 'Crown', href: '/leaderboard' },
];

export const FOOTER_LINKS = {
  whyWupex: {
    title: 'Why WUPEX?',
    links: ['Partners', 'Apple', 'PSN', 'Razer', 'Gold', 'Xbox', 'PUBG', 'Steam', 'Jawaker', 'Roblox', 'Fornite', 'Minecraft'],
  },
  industries: {
    title: 'Industries',
    links: ['Banks & Fintech', 'Retail & eCommerce', 'Payment Gateways', 'Telecom & Wallets', 'Gaming & Esports', 'Corporate Gifting'],
  },
  company: {
    title: 'Company',
    links: ['About Us', 'Meet Our Team', 'Contact Us', 'Partnership', 'Terms & Conditions'],
  },
  features: {
    title: 'Features',
    links: ['Seamless Integration', 'Secured API', 'Real-Time Delivery', 'Bulk Digital Gift Cards', 'Fraud Prevention', 'Global Brand Access'],
  },
  support: {
    title: 'Support',
    links: ['Get Started', 'Customer Support', 'Portal Guide', 'API Integration Guide', 'Help Center'],
  },
  resources: {
    title: 'Resources',
    links: ['Blog', 'FAQ'],
  },
  downloads: {
    title: 'Downloads',
    links: ['Catalogue', 'Company Profile', 'API Documentation'],
  },
};

export const FOOTER_LINKSTHREE = {
  
  company: {
    title: 'Company',
    links: ['О нас', 'Контакты', 'Партнерство'],
  },
  features: {
    title: 'Features',
    links: ['Популярные', 'В тренде', 'Новинки'],
  },
  support: {
    title: 'Support',
    links: ['FAQ', 'Обратная связь'],
  },
  resources: {
    title: 'Resources',
    links: ['Блог', 'Как заработать?'],
  },
  downloads: {
    title: 'Downloads',
    links: ['Публичная оферта', 'Политика конфиденциальности', 'Пользователькое соглашение'],
  },
};
export const FOOTER_LINKSTWO = {
  company: {
    title: 'О портале',
    links: [
      { label: 'О нас', href: '/about' },
      { label: 'Контакты', href: '/contacts' },
      { label: 'Партнерство', href: '/partnership' },
    ],
  },
  features: {
    title: 'Игры',
    links: [
      { label: 'Популярные', href: '/popular' },
      { label: 'В тренде', href: '/trending' },
      { label: 'Новинки', href: '/new' },
    ],
  },
  support: {
    title: 'Поддержка',
    links: [
      { label: 'FAQ', href: '/faq' },
      // { label: 'Обратная связь', href: '/feedback' },
      { label: 'Правообладатели', href: '/copyright' },
    ],
  },
  resources: {
    title: 'Ресурсы',
    links: [
      { label: 'Блог', href: '/blog' },
      { label: 'Как заработать?', href: '/how-to-earn' },
    ],
  },
  documents: { // Переименовали downloads в documents для точности
    title: 'Документы',
    links: [
      { label: 'Публичная оферта', href: '/legal/offer' },
      { label: 'Политика конфиденциальности', href: '/legal/privacy' },
      { label: 'Пользовательское соглашение', href: '/legal/terms' },
    ],
  },
  // ... остальные константы
};