import { authRoutes } from '@/config/app-config';

const isNotShowSidebar = (pathname: string) => {
  return authRoutes.includes(pathname);
};

//video
const formatViews = (views: number) => {
  if (views >= 1000000) {
    return `${views / 1000000}M`;
  }
  if (views >= 1000) {
    return `${views / 1000}K`;
  }
  return views;
};

const formatTimeAgo = (timestamp: string) => {
  const now = new Date();
  const past = new Date(timestamp);
  const diff = now.getTime() - past.getTime();
  const seconds = Math.floor(diff / 1000);
  const minutes = Math.floor(seconds / 60);
  const hours = Math.floor(minutes / 60);
  const days = Math.floor(hours / 24);
  const weeks = Math.floor(days / 7);
  const months = Math.floor(days / 30);
  const years = Math.floor(days / 365);
  if (seconds < 60) {
    return `${seconds} seconds ago`;
  }
  if (minutes < 60) {
    return `${minutes} minutes ago`;
  }
  if (hours < 24) {
    return `${hours} hours ago`;
  }
  if (days < 7) {
    return `${days} days ago`;
  }
  if (weeks < 4) {
    return `${weeks} weeks ago`;
  }
  if (months < 12) {
    return `${months} months ago`;
  }
  return `${years} years ago`;
};

export { formatViews, formatTimeAgo, isNotShowSidebar };
