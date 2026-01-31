const ROUTES = {
  HOME: {
    path: '/',
  },
  LOGIN: {
    path: '/login',
  },
  REGISTER: {
    path: '/register',
  },
  CHANNEL: {
    path: '/channel/:id',
    children: {
      VIDEOS: { path: '/' },
      PLAYLISTS: { path: 'playlists' },
      COMMUNITY: { path: 'community' },
      SUBSCRIPTIONS: { path: 'subscriptions' },
      ABOUT: { path: 'about' },
    },
  },
};

const PUBLIC_ROUTES = [
  ROUTES.HOME.path,
  ROUTES.REGISTER.path,
  ROUTES.LOGIN.path,
];

export { ROUTES, PUBLIC_ROUTES };
