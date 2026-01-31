'use client';

import { useCommunityPostList } from '@/services/community/community.service';
import { useParams } from 'next/navigation';
import { ChannelPostsSkeleton } from '../../../_components/skeletons';
import { Card, CardContent } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { formatTimeAgo } from '@/utils/helpers';
import { Button } from '@/components/ui/button';
import { MessageSquare, ThumbsUp } from 'lucide-react';
import ToggleLikeButton from '@/components/toogle-like-button';
import PostLikeButton from './post-like-button';

const ChannelCommunityPostsList = () => {
  const { id } = useParams();
  const { data, isPending, error } = useCommunityPostList(id as string);

  if (isPending) {
    return <ChannelPostsSkeleton count={4} />;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  const posts = data?.data?.data;

  return (
    <div className="space-y-4 w-full">
      {posts?.map((post) => (
        <Card
          key={post._id}
          className=" p-0 pb-4 ring-0 shadow-none border-b rounded-none border-neutral-200 last:border-0"
        >
          <CardContent className="flex gap-4">
            <Avatar className="mt-0.5">
              <AvatarImage src={post.owner.avatar} alt={post.owner.username} />
              <AvatarFallback>
                {post.owner.username?.charAt(0).toUpperCase()}
              </AvatarFallback>
            </Avatar>
            <div className="flex-1 space-y-2 ">
              <div>
                <p className="font-semibold text-sm ">@{post.owner.username}</p>
                <p className="text-xs text-neutral-400">
                  {formatTimeAgo(post.createdAt)}
                </p>
              </div>
              <p className="text-sm text-foreground">{post.content}</p>
              <div className="flex items-center gap-4 pt-2">
                <PostLikeButton post={post} />
                <Button
                  variant="ghost"
                  size="sm"
                  className="text-muted-foreground hover:text-foreground p-0 h-auto gap-2 hover:bg-transparent"
                >
                  <MessageSquare className="w-4 h-4" />
                  <span className="text-xs">Comment</span>
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

export default ChannelCommunityPostsList;
