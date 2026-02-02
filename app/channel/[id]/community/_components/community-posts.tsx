'use client';

import { useCommunityPostList } from '@/services/community/community.service';
import { useParams } from 'next/navigation';
import { ChannelPostsSkeleton } from '../../../_components/skeletons';
import CommunityPost from '@/components/post-layout';
import PostCTAs from './post-ctas';
import { ICommunityPost } from '@/types';
import { useBatchLikeStatus } from '@/services/likes/likes.service';

const ChannelCommunityPostsList = () => {
  const { id } = useParams();
  const { data, isPending, error } = useCommunityPostList(id as string);

  const postIds = data?.data?.data?.map((post) => post._id) ?? [];

  const { data: likeStatus, isPending: likeStatusPending } = useBatchLikeStatus(
    {
      resourceType: 'tweet',
      resourceIds: postIds,
    }
  );

  if (isPending || likeStatusPending) {
    return <ChannelPostsSkeleton count={4} />;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  const posts = data?.data?.data;

  return (
    <div className="space-y-4 w-full">
      {posts?.map((post) => (
        <Post key={post._id} post={post} />
      ))}
    </div>
  );
};

interface PostProps {
  post: ICommunityPost;
}

const Post = ({ post }: PostProps) => {
  return (
    <CommunityPost post={post}>
      <PostCTAs post={post} />
    </CommunityPost>
  );
};

export default ChannelCommunityPostsList;
