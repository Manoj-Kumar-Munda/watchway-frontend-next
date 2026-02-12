import { endpoints } from '@/config/endpoints';
import { getQueryClient } from '@/lib/query-client';
import { server } from '@/test/mocks/server';
import { createWrapper } from '@/test/setup/test-utils';
import { useUserStore } from '@/store';
import { ICommunityPost } from '@/types';
import { act, renderHook, waitFor } from '@testing-library/react';
import { http, HttpResponse } from 'msw';
import { describe, expect, it } from 'vitest';
import { ApiResponse } from '../types';
import { useVideoCommentMutation } from './video.service';

const sleep = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

interface IVideoCommentsResponse {
  data: {
    docs: ICommunityPost[];
    totalDocs: number;
    limit: number;
    totalPages: number;
    page: number;
    hasNextPage: boolean;
    hasPrevPage: boolean;
    nextPage: number | null;
    prevPage: number | null;
  };
}

const createCommentsResponse = (
  comments: ICommunityPost[]
): ApiResponse<IVideoCommentsResponse> => ({
  success: true,
  statusCode: 200,
  message: 'Success',
  data: {
    data: {
      docs: comments,
      totalDocs: comments.length,
      limit: 10,
      totalPages: 1,
      page: 1,
      hasNextPage: false,
      hasPrevPage: false,
      nextPage: null,
      prevPage: null,
    },
  },
});

describe('useVideoCommentMutation', () => {
  it('adds an optimistic comment and rolls back on request failure', async () => {
    const videoId = 'video-1';
    const queryClient = getQueryClient();
    queryClient.clear();
    const wrapper = createWrapper(queryClient);
    const queryKey = [...endpoints.videos.comments.queryKeys, videoId];

    useUserStore.setState({
      user: {
        _id: 'user-1',
        username: 'alice',
        email: 'alice@example.com',
        fullName: 'Alice Doe',
        avatar: 'avatar.png',
        coverImage: 'cover.png',
        watchHistory: [],
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    });

    const existingComment: ICommunityPost = {
      _id: 'comment-1',
      content: 'Existing comment',
      owner: {
        _id: 'user-2',
        username: 'bob',
        avatar: 'avatar-2.png',
      },
      likeCount: 0,
      comments: 0,
      createdAt: new Date().toISOString(),
    };

    const initialData = createCommentsResponse([existingComment]);
    queryClient.setQueryData(queryKey, initialData);

    server.use(
      http.post('http://localhost:4010/api/v1/comments/:videoId', async () => {
        await sleep(150);
        return HttpResponse.json({ message: 'Failed' }, { status: 500 });
      })
    );

    const { result } = renderHook(() => useVideoCommentMutation(videoId), {
      wrapper,
    });

    act(() => {
      result.current.mutate({ content: 'New optimistic comment' });
    });

    await waitFor(() => {
      const optimisticData =
        queryClient.getQueryData<ApiResponse<IVideoCommentsResponse>>(queryKey);
      const optimisticComments = optimisticData?.data.data.docs ?? [];

      expect(optimisticComments).toHaveLength(2);
      expect(optimisticComments[1].content).toBe('New optimistic comment');
      expect(optimisticComments[1].owner._id).toBe('user-1');
    });

    await waitFor(() => {
      expect(result.current.isError).toBe(true);
    });

    expect(queryClient.getQueryData(queryKey)).toEqual(initialData);
  });
});
