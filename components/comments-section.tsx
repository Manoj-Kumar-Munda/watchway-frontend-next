import { useRequireAuth } from '@/lib/use-require-auth';
import { Post } from './post';
import {
  useBatchLikeStatus,
  useToggleCommentLike,
} from '@/services/likes/likes.service';
import { ICommunityPost } from '@/types';

interface CommentsSectionProps {
  comments: ICommunityPost[] | undefined;
  isLoading: boolean;
  error?: Error | null;
  children?: React.ReactNode;
}

const CommentsSection = ({
  comments,
  isLoading,
  error,
  children,
}: CommentsSectionProps) => {
  const commentIds = comments?.map((comment) => comment._id) ?? [];
  const { data: likeStatus } = useBatchLikeStatus({
    resourceType: 'comment',
    resourceIds: commentIds,
  });

  const likeStatusMap = new Map(
    likeStatus?.data?.map((item) => [
      item.resourceId,
      { isLiked: item.isLiked, likeCount: item.likeCount },
    ])
  );

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    const message = error instanceof Error ? error.message : 'Unknown error';
    return <div>Error: {message}</div>;
  }

  return (
    <div className="space-y-4">
      <h2 className="font-semibold">{comments?.length ?? 0} Comments</h2>
      {children}
      {comments?.length === 0 && (
        <p className="text-sm text-muted-foreground">No comments yet.</p>
      )}
      {comments?.map((comment) => (
        <CommentItem
          key={comment._id}
          comment={comment}
          isLiked={likeStatusMap.get(comment._id)?.isLiked}
          likeCount={likeStatusMap.get(comment._id)?.likeCount}
        />
      ))}
    </div>
  );
};

interface CommentItemProps {
  comment: ICommunityPost;
  isLiked?: boolean;
  likeCount?: number;
}

const CommentItem = ({ comment, isLiked, likeCount }: CommentItemProps) => {
  'use client';
  const { mutate: toggleLike, isPending } = useToggleCommentLike(comment._id);
  const { requireAuth } = useRequireAuth();
  const handleLikeClick = () => {
    requireAuth(() => toggleLike());
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
            isLiked={isLiked}
            likeCount={likeCount}
          />
        </Post.Actions>
      </Post.Body>
    </Post.Root>
  );
};

export default CommentsSection;
