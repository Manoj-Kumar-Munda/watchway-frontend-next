const ROUTES = {
  HOME: {
    path: '/',
    isProtected: false,
  },
  LOGIN: {
    path: '/login',
    isProtected: false,
  },
  REGISTER: {
    path: '/register',
    isProtected: false,
  },
};

const PUBLIC_ROUTES = [
  ROUTES.HOME.path,
  ROUTES.REGISTER.path,
  ROUTES.LOGIN.path,
];

export { ROUTES, PUBLIC_ROUTES };
