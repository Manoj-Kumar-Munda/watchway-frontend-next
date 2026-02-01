'use client';

import { useParams } from 'next/navigation';
import { useGetPostById } from '@/services/community/community.service';
import CommunityPost from '@/components/post-layout';
import { ChannelPostsSkeleton } from '@/app/channel/_components/skeletons';
import { Card } from '@/components/ui/card';
import CommentsSection from '@/components/comments-section';
import PostCTAs from '@/app/channel/[id]/community/_components/post-ctas';

const PostPage = () => {
  const params = useParams();
  const postId = params.id as string;
  const { data, isPending, error } = useGetPostById(postId);

  if (isPending) return <ChannelPostsSkeleton count={1} />;

  if (error) return null;

  const post = data?.data?.data;

  return (
    <div className="space-y-4">
      <Card>
        <CommunityPost post={post}>
          <PostCTAs post={post} />
        </CommunityPost>
      </Card>

      <CommentsSection />
    </div>
  );
};

export default PostPage;
