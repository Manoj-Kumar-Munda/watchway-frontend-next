'use client';
import { SignInFormSchema } from '@/app/(auth)/_components/sign-in-form';
import { endpoints } from '@/config/endpoints';
import api from '@/lib/api';
import { useMutation, useQuery } from '@tanstack/react-query';
import { ApiResponse } from './types';
import { IUser } from '@/types/auth.types';

interface LoginResponse {
  accessToken: string;
  refreshToken: string;
  loggedInUser: IUser;
}

export const useLogin = () => {
  return useMutation({
    mutationFn: (data: SignInFormSchema) => {
      return api.post<ApiResponse<LoginResponse>>(
        endpoints.auth.login.url,
        data
      );
    },
    mutationKey: [endpoints.auth.login.queryKey],
  });
};

interface CurrentUserResponse {
  data: IUser;
}

export const useCurrentUser = () => {
  return useQuery({
    queryKey: [endpoints.users.currentUser.queryKey],
    queryFn: () => {
      return api.get<ApiResponse<CurrentUserResponse>>(
        endpoints.users.currentUser.url
      );
    },
  });
};
