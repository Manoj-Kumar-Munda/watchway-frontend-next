'use client';

import ToggleLikeButton from '@/components/toogle-like-button';
import { ICommunityPost as IComment } from '@/types';
import { useToggleLikeCommunityPost } from '@/services/community/community.service';
import { useUserStore } from '@/store';
import { usePathname, useRouter } from 'next/navigation';
import { useLikeStatus } from '@/services/likes/likes.service';

const CommentLikeButton = ({ post }: { post: IComment }) => {
  const user = useUserStore((state) => state.user);
  const router = useRouter();
  const pathname = usePathname();
  const { data } = useLikeStatus('comment', post._id, user?._id);

  //TODO: change to useToggleLikeCommunityPost
  const { mutateAsync: toggleLike } = useToggleLikeCommunityPost(
    post._id,
    user?._id || ''
  );

  const handleToggleLike = () => {
    if (pathname.includes('/channel')) {
      router.push(`/post/${post._id}`);
    } else {
      toggleLike();
    }
  };

  return (
    <ToggleLikeButton
      isLiked={!!data?.data?.data?.isLiked}
      likeCount={post.likeCount}
      onToggle={handleToggleLike}
    />
  );
};

export default CommentLikeButton;
