import { ICommunityPost } from '@/types';
import { formatTimeAgo } from '@/utils/helpers';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Card, CardContent } from '@/components/ui/card';
import { PropsWithChildren } from 'react';

/**
 * Props for the CommunityPost component.
 */
interface ICommunityPostProps {
  /** The post data containing content, author details, and metrics. */
  post: ICommunityPost;
  /**
   * Indicates if the component is being rendered within a comment/detail context.
   * - If `true`: The reply button toggles an inline reply form.
   * - If `false` (default): The reply button navigates to the post detail page.
   */
  isComment?: boolean;
}

/**
 * CommunityPost Component
 *
 * Renders a card displaying a community post or comment, including the author's avatar,
 * username, timestamp, content, and interactive buttons (Like, Reply).
 *
 * It handles conditional navigation or inline reply form display based on the `isComment` prop.
 */
const CommunityPostLayout = ({
  post,
  isComment = false,
  children,
}: PropsWithChildren<ICommunityPostProps>) => {
  const { content, owner, createdAt } = post;
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
          {children}
        </div>
      </CardContent>
    </Card>
  );
};

export default CommunityPostLayout;
