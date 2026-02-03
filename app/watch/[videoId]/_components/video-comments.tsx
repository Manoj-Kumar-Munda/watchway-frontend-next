'use client';

import CommentsSection from '@/components/comments-section';
import VideoCommentForm from '@/components/video-comment-form';
import { useGetVideoComments } from '@/services/video/video.service';

interface VideoCommentsProps {
  videoId: string;
}

const VideoComments = ({ videoId }: VideoCommentsProps) => {
  const { data, isPending, error } = useGetVideoComments(videoId);

  const comments = data?.data?.data?.docs;

  return (
    <CommentsSection
      comments={comments}
      isLoading={isPending}
      error={error as Error | null}
    >
      <VideoCommentForm videoId={videoId} />
    </CommentsSection>
  );
};

export default VideoComments;
