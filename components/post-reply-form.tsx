import CommentForm from '@/components/comment-form';
import { usePostCommentMutation } from '@/services/community/community.service';
import { useUserStore } from '@/store';
import { toast } from 'sonner';

interface IPostReplyFormProps {
  postId: string;
  onCancel?: () => void;
}

const PostReplyForm = ({ postId, onCancel }: IPostReplyFormProps) => {
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

export default PostReplyForm;
