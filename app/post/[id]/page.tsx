'use client';

import { useParams } from 'next/navigation';
import {
  useGetPostById,
  useGetPostComments,
} from '@/services/community/community.service';
import { ChannelPostsSkeleton } from '@/app/channel/_components/skeletons';
import CommentsSection from '@/components/comments-section';
import PostReplyForm from '@/components/post-reply-form';
import PostCard from './_components/post-card';

const PostPage = () => {
  const params = useParams();
  const postId = params.id as string;
  const { data, isPending, error } = useGetPostById(postId);

  const {
    data: commentsData,
    isPending: commentsPending,
    error: commentsError,
  } = useGetPostComments(postId);

  if (isPending) return <ChannelPostsSkeleton count={1} />;

  if (error) return null;

  const post = data?.data?.data;
  return (
    <div className="space-y-4">
      <PostCard post={post} />
      <CommentsSection
        comments={commentsData?.data?.data}
        isLoading={commentsPending}
        error={commentsError as Error | null}
      >
        <PostReplyForm postId={postId} />
      </CommentsSection>
    </div>
  );
};

export default PostPage;
