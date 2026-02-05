import env from '@/config/env';
import { endpoints } from '@/config/endpoints';
import axios, { AxiosError, AxiosRequestConfig, AxiosResponse } from 'axios';
import { PUBLIC_ROUTES } from '@/config/routes';

const baseUrl = env.NEXT_PUBLIC_BASE_URL;

const api = axios.create({
  baseURL: baseUrl,
  withCredentials: true,
  headers: {
    'Content-Type': 'application/json',
  },
});

let isRefreshing = false;
const isRedirecting = false;
let failedQueue: Array<{
  resolve: (value?: unknown) => void;
  reject: (reason?: unknown) => void;
}> = [];

const processQueue = (error: AxiosError | null) => {
  failedQueue.forEach((prom) => {
    if (error) {
      prom.reject(error);
    } else {
      prom.resolve();
    }
  });
  failedQueue = [];
};

const refreshAccessToken = async (): Promise<boolean> => {
  try {
    const response = await axios.post(
      `${baseUrl}${endpoints.auth.refreshToken.url}`,
      {},
      { withCredentials: true }
    );
    return response.status === 200;
  } catch (error) {
    return false;
  }
};

api.interceptors.request.use(
  (config) => {
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

api.interceptors.response.use(
  (response: AxiosResponse) => response,
  async (error: AxiosError) => {
    const originalRequest = error.config as AxiosRequestConfig & {
      _retry?: boolean;
    };

    if (error.response?.status === 401 && !originalRequest._retry) {
      // Skip if the request is to refresh token endpoint
      if (originalRequest.url?.includes(endpoints.auth.refreshToken.url)) {
        handleAuthError();
        return Promise.reject(error);
      }

      if (isRefreshing) {
        return new Promise((resolve, reject) => {
          failedQueue.push({ resolve, reject });
        })
          .then(() => {
            return api(originalRequest);
          })
          .catch((err) => {
            return Promise.reject(err);
          });
      }

      originalRequest._retry = true;
      isRefreshing = true;

      try {
        const refreshed = await refreshAccessToken();

        if (refreshed) {
          processQueue(null);
          return api(originalRequest);
        } else {
          processQueue(error);
          handleAuthError();
          return Promise.reject(error);
        }
      } catch (refreshError) {
        processQueue(error);
        handleAuthError();
        return Promise.reject(refreshError);
      } finally {
        isRefreshing = false;
      }
    }

    return Promise.reject(error);
  }
);

const handleAuthError = () => {
  // No longer redirecting to login page on 401 errors
  // Let the error propagate to be handled by individual components
  return;
};

export default api;
