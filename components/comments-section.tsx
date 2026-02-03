'use client';

import PostReplyForm from '@/components/post-reply-form';
import { useGetPostComments } from '@/services/community/community.service';
import { useParams } from 'next/navigation';
import { Post } from './post';
import {
  useLikeStatus,
  useToggleCommentLike,
} from '@/services/likes/likes.service';
import { ICommunityPost } from '@/types';

const CommentsSection = () => {
  const postId = useParams().id;

  const { data, isPending, error } = useGetPostComments(postId as string);

  if (isPending) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  return (
    <div className="space-y-4">
      <h2 className="font-semibold">{data?.data?.data?.length} Comments</h2>
      <PostReplyForm postId={postId as string} />

      {data?.data?.data?.map((comment) => (
        <CommentItem key={comment._id} comment={comment} />
      ))}
    </div>
  );
};

interface CommentItemProps {
  comment: ICommunityPost;
}

const CommentItem = ({ comment }: CommentItemProps) => {
  const { mutate: toggleLike, isPending } = useToggleCommentLike(comment._id);

  const { data: likeStatus } = useLikeStatus('comment', comment._id);
  const handleLikeClick = () => {
    toggleLike();
  };

  return (
    <Post.Root data={comment}>
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
        </Post.Actions>
      </Post.Body>
    </Post.Root>
  );
};

export default CommentsSection;
