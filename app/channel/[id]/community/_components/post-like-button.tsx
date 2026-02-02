'use client';

import ToggleLikeButton from '@/components/toogle-like-button';
import { ICommunityPost } from '@/types';
import {
  useLikeStatus,
  useToggleLikeCommunityPost,
} from '@/services/likes/likes.service';

interface PostLikeButtonProps {
  post: ICommunityPost;
}

const PostLikeButton = ({ post }: PostLikeButtonProps) => {
  const { data } = useLikeStatus('tweet', post._id);
  const { mutateAsync: toggleLike } = useToggleLikeCommunityPost(post._id);

  const handleToggleLike = () => {
    toggleLike();
  };

  return (
    <ToggleLikeButton
      isLiked={data?.data?.data?.isLiked ?? false}
      likeCount={data?.data?.data?.likeCount ?? post.likeCount}
      onToggle={handleToggleLike}
    />
  );
};

export default PostLikeButton;
