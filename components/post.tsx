import { ICommunityPost } from '@/types';
import { formatTimeAgo } from '@/utils/helpers';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Card, CardContent } from '@/components/ui/card';
import PostLikeButton from '../app/channel/[id]/community/_components/post-like-button';
import ReplyButton from '../app/channel/[id]/community/_components/reply-button';
import { useState } from 'react';
import PostReplyForm from '../app/channel/[id]/community/_components/post-reply-form';

interface ICommunityPostProps {
  post: ICommunityPost;
}

const CommunityPost = ({ post }: ICommunityPostProps) => {
  const { content, owner, createdAt, _id } = post;
  const [showReplyForm, setShowReplyForm] = useState(false);
  const handleShowReplyForm = () => {
    setShowReplyForm(!showReplyForm);
  };

  const closeReplyForm = () => {
    setShowReplyForm(false);
  };
  return (
    <Card className=" p-0 pb-4 ring-0 shadow-none border-b rounded-none border-neutral-200 last:border-0">
      <CardContent className="flex gap-4">
        <Avatar className="mt-0.5">
          <AvatarImage src={owner.avatar} alt={owner.username} />
          <AvatarFallback>
            {owner.username?.charAt(0).toUpperCase()}
          </AvatarFallback>
        </Avatar>
        <div className="flex-1 space-y-2 ">
          <div>
            <p className="font-semibold text-sm ">@{owner.username}</p>
            <p className="text-xs text-neutral-400">
              {formatTimeAgo(createdAt)}
            </p>
          </div>
          <p className="text-sm text-foreground">{content}</p>
          <div className="flex flex-col gap-2">
            <div className="flex items-center gap-4 pt-2">
              <PostLikeButton post={post} />
              <ReplyButton
                handleShowReplyForm={handleShowReplyForm}
                commentCount={post.comments}
              />
            </div>
            {showReplyForm && (
              <PostReplyForm postId={_id} onCancel={closeReplyForm} />
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default CommunityPost;
