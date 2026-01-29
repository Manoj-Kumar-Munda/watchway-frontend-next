import { authRoutes } from '@/config/app-config';

const isNotShowSidebar = (pathname: string) => {
  return authRoutes.includes(pathname);
};

export { isNotShowSidebar };
