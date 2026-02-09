'use client';
import { useSearchVideo } from '@/services/video/video.service';
import { use } from 'react';
import SearchVideoCard from './search-video-card';

function SearchResult({
  searchParams,
}: {
  searchParams: Promise<{ q?: string }>;
}) {
  const params = use(searchParams);
  const query = params.q;
  const { data, isPending, error } = useSearchVideo({
    query: query || '',
    page: 1,
    limit: 10,
    sortBy: 'createdAt',
    sortOrder: -1,
  });

  if (isPending) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  if (!data?.data.data.docs.length) {
    return <div>No results found</div>;
  }
  return (
    <div className="flex flex-col gap-4">
      {data.data.data.docs.map((video) => (
        <SearchVideoCard key={video._id} video={video} />
      ))}
    </div>
  );
}

export default SearchResult;
