'use client';

import PostReplyForm from '@/components/post-reply-form';
import { useGetPostComments } from '@/services/community/community.service';
import { useParams } from 'next/navigation';
import Comment from './post-layout';
import CommentCTAs from './comment-ctas';

const CommentsSection = () => {
  const postId = useParams().id;

  const { data, isPending, error } = useGetPostComments(postId as string);

  if (isPending) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  const comment = data?.data?.data[0];

  return (
    <div className="space-y-4">
      <h2 className="font-semibold">{data?.data?.data?.length} Comments</h2>
      <PostReplyForm postId={postId as string} />

      {data?.data?.data?.map((comment) => (
        <Comment key={comment._id} post={comment} isComment>
          <div className="flex items-center gap-4 pt-2">
            <CommentCTAs post={comment} />
          </div>
        </Comment>
      ))}
    </div>
  );
};

export default CommentsSection;
