import { useQuery } from '@tanstack/react-query';
import { endpoints } from '@/config/endpoints';
import api from '@/lib/api';
import { ApiResponse } from '../types';

type ResourceType = 'tweet' | 'comment' | 'video';

interface ILikeStatusResponse {
  data: {
    isLiked: boolean;
  };
}

const useLikeStatus = (
  resourceType: ResourceType,
  resourceId: string,
  userId?: string
) => {
  return useQuery<ApiResponse<ILikeStatusResponse>>({
    queryKey: [
      ...endpoints.likes.likeStatus.queryKeys,
      resourceType,
      resourceId,
    ],
    queryFn: () =>
      api.get(
        endpoints.likes.likeStatus.url
          .replace('{resourceType}', resourceType)
          .replace('{resourceId}', resourceId)
      ),
    enabled: !!resourceType && !!resourceId && !!userId,
  });
};

export { useLikeStatus };
