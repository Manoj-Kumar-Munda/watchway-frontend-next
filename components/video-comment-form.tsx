'use client';

import CommentForm from '@/components/comment-form';
import { useVideoCommentMutation } from '@/services/video/video.service';
import { toast } from 'sonner';

interface VideoCommentFormProps {
  videoId: string;
  onCancel?: () => void;
}

const VideoCommentForm = ({ videoId, onCancel }: VideoCommentFormProps) => {
  const { mutateAsync: postComment, isPending } =
    useVideoCommentMutation(videoId);

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
      label="Comment"
      onSubmit={handleSubmit}
      onCancel={onCancel}
      disabled={isPending}
    />
  );
};

export default VideoCommentForm;
