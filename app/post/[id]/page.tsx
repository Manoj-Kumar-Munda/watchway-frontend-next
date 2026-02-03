'use client';

import { useParams, useRouter } from 'next/navigation';
import { useGetPostById } from '@/services/community/community.service';
import { ChannelPostsSkeleton } from '@/app/channel/_components/skeletons';
import CommentsSection from '@/components/comments-section';
import PostCard from './_components/post-card';

const PostPage = () => {
  const params = useParams();
  const postId = params.id as string;
  const { data, isPending, error } = useGetPostById(postId);

  if (isPending) return <ChannelPostsSkeleton count={1} />;

  if (error) return null;

  const post = data?.data?.data;

  return (
    <div className="space-y-4">
      <PostCard post={post} />
      <CommentsSection />
    </div>
  );
};

export default PostPage;
