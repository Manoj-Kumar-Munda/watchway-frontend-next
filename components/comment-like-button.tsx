'use client';

import ToggleLikeButton from '@/components/toogle-like-button';
import { ICommunityPost as IComment } from '@/types';
import { usePathname, useRouter } from 'next/navigation';
import {
  useLikeStatus,
  useToggleCommentLike,
} from '@/services/likes/likes.service';
import { useUserStore } from '@/store';

const CommentLikeButton = ({ post }: { post: IComment }) => {
  const router = useRouter();
  const pathname = usePathname();
  const { user } = useUserStore();
  const { data } = useLikeStatus('comment', post._id, !user);

  const { mutateAsync: toggleLike } = useToggleCommentLike(post._id);

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
      likeCount={data?.data?.data?.likeCount ?? 0}
      onClick={handleToggleLike}
    />
  );
};

export default CommentLikeButton;
