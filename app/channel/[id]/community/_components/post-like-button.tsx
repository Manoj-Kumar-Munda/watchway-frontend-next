'use client';

import ToggleLikeButton from '@/components/toogle-like-button';
import { ICommunityPost } from '@/types';
import { useToggleLikeCommunityPost } from '@/services/community/community.service';
import { useUserStore } from '@/store';

const PostLikeButton = ({ post }: { post: ICommunityPost }) => {
  const user = useUserStore((state) => state.user);
  const { mutateAsync: toggleLike } = useToggleLikeCommunityPost(
    post._id,
    user?._id || ''
  );
  return (
    <ToggleLikeButton
      isLiked={post.isLiked}
      likeCount={post.likeCount}
      onToggle={() => toggleLike()}
    />
  );
};

export default PostLikeButton;
