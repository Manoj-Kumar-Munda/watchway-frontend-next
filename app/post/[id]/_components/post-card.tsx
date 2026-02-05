import { Post } from '@/components/post';
import { ICommunityPost } from '@/types';
import {
  useLikeStatus,
  useToggleLikeCommunityPost,
} from '@/services/likes/likes.service';
import { Card } from '@/components/ui/card';
import { useUserStore } from '@/store';

interface PostCardProps {
  post: ICommunityPost;
}

const PostCard = ({ post }: PostCardProps) => {
  const { user } = useUserStore();
  const { data: likeStatus } = useLikeStatus('tweet', post._id, !user);

  const { mutate: toggleLike, isPending } = useToggleLikeCommunityPost(
    post._id
  );

  const handleLikeClick = () => {
    toggleLike();
  };

  return (
    <Card>
      <Post.Root data={post}>
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
            <Post.CommentButton />
          </Post.Actions>
        </Post.Body>
      </Post.Root>
    </Card>
  );
};

export default PostCard;
