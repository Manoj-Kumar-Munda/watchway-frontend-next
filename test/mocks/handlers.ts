import { http, HttpResponse } from 'msw';

export const apiResponse = <T>(data: T) => ({
  success: true,
  statusCode: 200,
  message: 'Success',
  data,
});

const defaultUser = {
  _id: 'user-1',
  username: 'alice',
  email: 'alice@example.com',
  fullName: 'Alice Doe',
  avatar: 'https://res.cloudinary.com/demo/image/upload/sample.jpg',
  coverImage: 'https://res.cloudinary.com/demo/image/upload/sample.jpg',
  watchHistory: [],
  createdAt: new Date().toISOString(),
  updatedAt: new Date().toISOString(),
};

const defaultVideo = {
  _id: 'video-1',
  videoFile: 'https://res.cloudinary.com/demo/video/upload/sample.mp4',
  thumbnail: 'https://res.cloudinary.com/demo/image/upload/sample.jpg',
  title: 'Test Video',
  description: 'A test video description',
  duration: 120,
  views: 1200,
  isPublished: true,
  owner: {
    _id: 'user-1',
    username: 'alice',
    fullName: 'Alice Doe',
    avatar: 'https://res.cloudinary.com/demo/image/upload/sample.jpg',
  },
  createdAt: new Date().toISOString(),
  updatedAt: new Date().toISOString(),
};

export const handlers = [
  http.get('*/api/v1/users/current-user', () => {
    return HttpResponse.json(apiResponse(defaultUser));
  }),
  http.post('*/api/v1/users/refresh-token', () => {
    return HttpResponse.json(apiResponse({}));
  }),
  http.get('*/api/v1/videos', () => {
    return HttpResponse.json(
      apiResponse({
        docs: [defaultVideo],
        totalDocs: 1,
        limit: 10,
        totalPages: 1,
        page: 1,
        hasNextPage: false,
        hasPrevPage: false,
        nextPage: null,
        prevPage: null,
      })
    );
  }),
];
