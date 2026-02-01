'use client';

import { useCommunityPostList } from '@/services/community/community.service';
import { useParams } from 'next/navigation';
import { ChannelPostsSkeleton } from '../../../_components/skeletons';
import CommunityPost from '@/components/post-layout';
import PostCTAs from './post-ctas';
import { ICommunityPost } from '@/types';

const ChannelCommunityPostsList = () => {
  const { id } = useParams();
  const { data, isPending, error } = useCommunityPostList(id as string);

  if (isPending) {
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

const Post = ({ post }: { post: ICommunityPost }) => {
  return (
    <CommunityPost post={post}>
      <PostCTAs post={post} />
    </CommunityPost>
  );
};

export default ChannelCommunityPostsList;
