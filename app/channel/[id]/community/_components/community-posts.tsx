'use client';

import { useCommunityPostList } from '@/services/community/community.service';
import { useParams, useRouter } from 'next/navigation';
import { ChannelPostsSkeleton } from '../../../_components/skeletons';
import { Post } from '@/components/post';
import { ICommunityPost } from '@/types';
import {
  useBatchLikeStatus,
  useLikeStatus,
} from '@/services/likes/likes.service';
import { useToggleLikeCommunityPost } from '@/services/likes/likes.service';
import { useUserStore } from '@/store';

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
        <CommunityPostItem key={post._id} post={post} />
      ))}
    </div>
  );
};

interface CommunityPostItemProps {
  post: ICommunityPost;
}

const CommunityPostItem = ({ post }: CommunityPostItemProps) => {
  const router = useRouter();
  const { mutate: toggleLike, isPending } = useToggleLikeCommunityPost(
    post._id
  );
  const { user } = useUserStore();

  const { data: likeStatus } = useLikeStatus('tweet', post._id, !user);

  const handleLikeClick = () => {
    toggleLike();
  };

  const handleCommentClick = () => {
    router.push(`/post/${post._id}`);
  };

  return (
    <Post.Root data={post}>
      <Post.OwnerAvatar />
      <Post.Body>
        <Post.Header />
        <Post.Content />
        <Post.Actions>
          <Post.LikeButton
            onClick={handleLikeClick}
            disabled={isPending}
            isLiked={likeStatus?.data?.data?.isLiked}
            likeCount={likeStatus?.data?.data?.likeCount}
          />
          <Post.CommentButton onClick={handleCommentClick} />
        </Post.Actions>
      </Post.Body>
    </Post.Root>
  );
};

export default ChannelCommunityPostsList;
