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
    path: '/channel/{channelId}',
  },
};

const PUBLIC_ROUTES = [
  ROUTES.HOME.path,
  ROUTES.REGISTER.path,
  ROUTES.LOGIN.path,
];

export { ROUTES, PUBLIC_ROUTES };
