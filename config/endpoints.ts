const API_VERSION = '/api/v1';

export const endpoints = {
  auth: {
    refreshToken: {
      url: `${API_VERSION}/users/refresh-token`,
      queryKey: 'currentUser',
    },
    logout: {
      url: `${API_VERSION}/users/logout`,
      queryKey: 'currentUser',
    },
    login: {
      url: `${API_VERSION}/users/login`,
      queryKey: 'currentUser',
    },
    register: {
      url: `${API_VERSION}/users/register`,
      queryKey: 'currentUser',
    },
  },
  users: {
    changePassword: {
      url: `${API_VERSION}/users/change-password`,
      queryKey: 'currentUser',
    },
    currentUser: {
      url: `${API_VERSION}/users/current-user`,
      queryKey: 'currentUser',
    },
    updateUser: {
      url: `${API_VERSION}/users/update-account`,
      queryKey: 'currentUser',
    },
    updateProfilePicture: {
      url: `${API_VERSION}/users/avatar`,
      queryKey: 'currentUser',
    },
    updateCoverImage: {
      url: `${API_VERSION}/users/cover`,
      queryKey: 'currentUser',
    },
    channel: {
      url: `${API_VERSION}/users/channel/{channelId}`,
      queryKey: 'channel',
    },
    updateWatchHistory: {
      url: `${API_VERSION}/users/update-history`,
      queryKey: 'history',
    },
    history: {
      url: `${API_VERSION}/users/history`,
      queryKey: 'history',
    },
  },
};
