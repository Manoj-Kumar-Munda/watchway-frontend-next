import { usePostCommentMutation } from '@/services/community/community.service';
import { Post } from './post';
import {
  useBatchLikeStatus,
  useToggleCommentLike,
} from '@/services/likes/likes.service';
import { ICommunityPost } from '@/types';
import { useUserStore } from '@/store';
import { toast } from 'sonner';
import CommentForm from './comment-form';

interface CommentsSectionProps {
  comments: ICommunityPost[] | undefined;
  isLoading: boolean;
  error?: Error | null;
  postId: string;
  resourceType?: 'tweet' | 'comment';
}

const CommentsSection = ({
  comments,
  isLoading,
  error,
  postId,
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
      <PostReplyForm postId={postId} />
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
            isLiked={isLiked}
            likeCount={likeCount}
          />
        </Post.Actions>
      </Post.Body>
    </Post.Root>
  );
};

interface IPostReplyFormProps {
  postId: string;
  onCancel?: () => void;
}

const PostReplyForm = ({ postId, onCancel }: IPostReplyFormProps) => {
  'use client';
  const userId = useUserStore((state) => state.user?._id);
  const { mutateAsync: postComment, isPending } = usePostCommentMutation(
    userId!,
    postId
  );

  const handleSubmit = (comment: string) => {
    postComment(
      { content: comment },
      {
        onError: () => {
          toast.error('Failed to post comment');
        },
        onSuccess: () => {
          toast.success('Comment posted successfully');
          onCancel?.();
        },
      }
    );
  };
  return (
    <CommentForm
      label="Reply"
      onSubmit={handleSubmit}
      onCancel={onCancel}
      disabled={isPending}
    />
  );
};

export default CommentsSection;
