'use client';
import { SignInFormSchema as SignInPayload } from '@/app/(auth)/_components/sign-in-form';
import { endpoints } from '@/config/endpoints';
import api from '@/lib/api';
import { useMutation, useQuery } from '@tanstack/react-query';
import { ApiResponse } from '../types';
import { IUser } from '@/types/auth.types';
import { getQueryClient } from '@/lib/query-client';

interface LoginResponse {
  accessToken: string;
  refreshToken: string;
  loggedInUser: IUser;
}

export const useLogin = () => {
  return useMutation({
    mutationFn: (data: SignInPayload) => {
      return api.post<ApiResponse<LoginResponse>>(
        endpoints.auth.login.url,
        data
      );
    },
    onSettled: () => {
      getQueryClient().invalidateQueries({
        queryKey: endpoints.users.currentUser.queryKeys,
      });
    },
  });
};

export const useCurrentUser = () => {
  return useQuery({
    queryKey: endpoints.users.currentUser.queryKeys,
    queryFn: () => {
      return api.get<ApiResponse<IUser>>(endpoints.users.currentUser.url);
    },
    retry: false,
  });
};

export const useRegister = () => {
  return useMutation({
    mutationFn: (data: FormData) => {
      return api.post<ApiResponse<IUser>>(endpoints.auth.register.url, data, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
    },
    onSettled: () => {
      getQueryClient().invalidateQueries({
        queryKey: endpoints.users.currentUser.queryKeys,
      });
    },
  });
};

export const useLogout = () => {
  return useMutation({
    mutationFn: () => {
      return api.post<ApiResponse<void>>(endpoints.auth.logout.url);
    },
    onSuccess: () => {
      getQueryClient().invalidateQueries({
        queryKey: endpoints.users.currentUser.queryKeys,
      });
    },
  });
};
