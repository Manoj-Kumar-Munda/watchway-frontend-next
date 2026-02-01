const API_VERSION = '/api/v1';

export const endpoints = {
  auth: {
    refreshToken: {
      url: `${API_VERSION}/users/refresh-token`,
      queryKeys: ['currentUser'],
    },
    logout: {
      url: `${API_VERSION}/users/logout`,
      queryKeys: ['currentUser'],
    },
    login: {
      url: `${API_VERSION}/users/login`,
      queryKeys: ['currentUser'],
    },
    register: {
      url: `${API_VERSION}/users/register`,
      queryKeys: ['currentUser'],
    },
  },
  users: {
    changePassword: {
      url: `${API_VERSION}/users/change-password`,
      queryKeys: ['currentUser'],
    },
    currentUser: {
      url: `${API_VERSION}/users/current-user`,
      queryKeys: ['currentUser'],
    },
    updateUser: {
      url: `${API_VERSION}/users/update-account`,
      queryKeys: ['currentUser'],
    },
    updateProfilePicture: {
      url: `${API_VERSION}/users/avatar`,
      queryKeys: ['currentUser'],
    },
    updateCoverImage: {
      url: `${API_VERSION}/users/cover`,
      queryKeys: ['currentUser'],
    },
    channel: {
      url: `${API_VERSION}/users/channel/{channelId}`,
      queryKeys: ['channel'],
      cover: {
        url: `${API_VERSION}/users/channel/{channelId}/cover`,
        queryKeys: ['channel'],
      },
      avatar: {
        url: `${API_VERSION}/users/channel/{channelId}/avatar`,
        queryKeys: ['channel'],
      },
    },
    updateWatchHistory: {
      url: `${API_VERSION}/users/update-history`,
      queryKeys: ['history'],
    },
    history: {
      url: `${API_VERSION}/users/history`,
      queryKeys: ['history'],
    },
  },
  videos: {
    list: {
      url: `${API_VERSION}/videos`,
      queryKeys: ['videos'],
    },
  },
  subscriptions: {
    list: {
      url: `${API_VERSION}/subscription/u/{userId}`,
      queryKeys: ['subscriptions'],
    },
    toggle: {
      url: `${API_VERSION}/subscription/c/{channelId}`,
      queryKeys: ['subscribers'],
    },
    subscribers: {
      url: `${API_VERSION}/subscription/c/{channelId}`,
      queryKeys: ['subscribers'],
    },
  },
  community: {
    create: {
      url: `${API_VERSION}/tweet`,
      queryKeys: ['community'],
    },
    list: {
      url: `${API_VERSION}/tweet/user/{userId}`,
      queryKeys: ['community'],
    },
    postById: {
      url: `${API_VERSION}/tweet/{tweetId}`,
      queryKeys: ['community'],
    },
    update: {
      url: `${API_VERSION}/tweet/{tweetId}`,
      queryKeys: ['community'],
    },
    delete: {
      url: `${API_VERSION}/tweet/{tweetId}`,
      queryKeys: ['community'],
    },
    replies: {
      url: `${API_VERSION}/tweet/{tweetId}/comments`,
      queryKeys: ['community'],
    },
    comments: {
      url: `${API_VERSION}/tweet/{tweetId}/comments`,
      queryKeys: ['community', 'comments'],
    },
  },
  playlists: {
    createPlaylist: {
      url: `${API_VERSION}/playlist`,
      queryKeys: ['playlist'],
    },
    // get, patch - name and description, delete
    playlistById: {
      url: `${API_VERSION}/playlist/{playlistId}`,
      queryKeys: ['playlist'],
    },
    playlistByChannelId: {
      url: `${API_VERSION}/playlist/user/{userId}`,
      queryKeys: ['playlists'],
    },
    addVideoToPlaylist: {
      url: `${API_VERSION}/playlist/add/{videoId}/{playlistId}`,
      queryKeys: ['playlist'],
    },
    //{ payload: { videoIds: ["videoId1", "videoId2"] } }
    removeVideoFromPlaylist: {
      url: `${API_VERSION}/playlist/remove/{videoId}/{playlistId}`,
      queryKeys: ['playlist'],
    },
  },
  likes: {
    likedVideos: {
      url: `${API_VERSION}/like/videos`,
      queryKeys: ['video', 'like'],
    },
    toggleVideoLike: {
      url: `${API_VERSION}/like/toggle/v/{videoId}`,
      queryKeys: ['video', 'like'],
    },
    toggleCommentLike: {
      url: `${API_VERSION}/like/toggle/c/{commentId}`,
      queryKeys: ['comment', 'like'],
    },
    toggleTweetLike: {
      url: `${API_VERSION}/like/toggle/t/{tweetId}`,
      queryKeys: ['community', 'like'],
    },
    likeStatus: {
      url: `${API_VERSION}/like/status?resource={resourceType}&id={resourceId}`,
      queryKeys: ['like'],
    },
  },
};
