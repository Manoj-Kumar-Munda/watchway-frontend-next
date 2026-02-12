import { endpoints } from '@/config/endpoints';
import { getQueryClient } from '@/lib/query-client';
import { server } from '@/test/mocks/server';
import { createWrapper } from '@/test/setup/test-utils';
import { act, renderHook, waitFor } from '@testing-library/react';
import { http, HttpResponse } from 'msw';
import { describe, expect, it } from 'vitest';
import {
  ILikeStatusResponse,
  useToggleLikeCommunityPost,
} from './likes.service';
import { ApiResponse } from '../types';

const createLikeStatusResponse = (
  isLiked: boolean,
  likeCount: number
): ApiResponse<ILikeStatusResponse> => ({
  success: true,
  statusCode: 200,
  message: 'Success',
  data: {
    data: {
      isLiked,
      likeCount,
    },
  },
});

describe('useToggleLikeCommunityPost', () => {
  it('applies optimistic like updates to the post like-status cache', async () => {
    const postId = 'post-1';
    const queryClient = getQueryClient();
    queryClient.clear();
    const wrapper = createWrapper(queryClient);
    const queryKey = [...endpoints.likes.likeStatus.queryKeys, 'tweet', postId];

    queryClient.setQueryData(queryKey, createLikeStatusResponse(false, 10));

    server.use(
      http.post('http://localhost:4010/api/v1/like/toggle/t/:tweetId', () => {
        return HttpResponse.json({ success: true }, { status: 200 });
      })
    );

    const { result } = renderHook(() => useToggleLikeCommunityPost(postId), {
      wrapper,
    });

    act(() => {
      result.current.mutate();
    });

    await waitFor(() => {
      const data =
        queryClient.getQueryData<ApiResponse<ILikeStatusResponse>>(queryKey);

      expect(data?.data.data.isLiked).toBe(true);
      expect(data?.data.data.likeCount).toBe(11);
    });
  });
});
