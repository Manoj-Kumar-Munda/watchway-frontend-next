import type { Metadata } from 'next';
import { getQueryClient } from '@/lib/query-client';
import { endpoints } from '@/config/endpoints';
import api from '@/lib/api';
import Container from '@/components/container';

export const metadata: Metadata = {
  title: 'Post',
  description: 'View community post and comments on Watchway.',
};

const getPost = async (postId: string) => {
  const queryClient = getQueryClient();
  return await queryClient.prefetchQuery({
    queryKey: [...endpoints.community.postById.queryKeys, postId],
    queryFn: () =>
      api.get(endpoints.community.postById.url.replace('{tweetId}', postId)),
  });
};

const getComments = async (postId: string) => {
  const queryClient = getQueryClient();
  return await queryClient.prefetchQuery({
    queryKey: [...endpoints.community.comments.queryKeys, postId],
    queryFn: () =>
      api.get(endpoints.community.comments.url.replace('{tweetId}', postId)),
  });
};

const PostLayout = async ({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ id: string }>;
}) => {
  const postId = (await params).id;
  await Promise.all([getPost(postId), getComments(postId)]);
  return <Container className="max-w-3xl mx-auto">{children}</Container>;
};

export default PostLayout;
