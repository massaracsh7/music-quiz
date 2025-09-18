export const NAV_LIST_BASE = [
  { path: '/home', label: 'Home', icon: 'house' },
  { path: '/game', label: 'Game', icon: 'controller' },
  { path: '/leaderboard', label: 'Leaderboard', icon: 'trophy' },
  { path: '/about', label: 'About Us', icon: 'info-circle' },
];

export const NAV_LIST_ADMIN = [
  ... NAV_LIST_BASE,
  { path: '/create-category', label: 'Create category', icon: 'bookmark-plus' },
];
