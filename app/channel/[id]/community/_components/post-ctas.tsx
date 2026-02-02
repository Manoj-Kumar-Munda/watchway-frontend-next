import PostLikeButton from './post-like-button';
import ReplyButton from '@/components/reply-button';
import { ICommunityPost } from '@/types';
import { useRouter } from 'next/navigation';

interface PostCTAsProps {
  post: ICommunityPost;
}

const PostCTAs = ({ post }: PostCTAsProps) => {
  const router = useRouter();
  const handleShowReplyForm = () => {
    router.push(`/post/${post._id}`);
  };
  return (
    <div className="flex items-center gap-4 pt-2">
      <PostLikeButton post={post} />
      <ReplyButton
        handleClick={handleShowReplyForm}
        commentCount={post.comments}
      />
    </div>
  );
};

export default PostCTAs;
