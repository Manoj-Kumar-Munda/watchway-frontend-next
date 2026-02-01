import ReplyButton from '@/components/reply-button';
import { ICommunityPost } from '@/types';
import CommentLikeButton from './comment-like-button';
import { useState } from 'react';
import PostReplyForm from './post-reply-form';

const CommentCTAs = ({ post }: { post: ICommunityPost }) => {
  const [showReplyForm, setShowReplyForm] = useState(false);

  const showReplyFormHandler = () => {
    setShowReplyForm(true);
  };
  const closeReplyFormHandler = () => {
    setShowReplyForm(false);
  };

  return (
    <div className="flex flex-col gap-2 grow">
      <div className="flex items-center gap-4 pt-2">
        <CommentLikeButton post={post} />
        <ReplyButton
          handleClick={showReplyFormHandler}
          commentCount={post.comments}
        />
      </div>
      {showReplyForm && (
        <PostReplyForm postId={post._id} onCancel={closeReplyFormHandler} />
      )}
    </div>
  );
};

export default CommentCTAs;
