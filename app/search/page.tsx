import { Suspense } from 'react';
import SearchResult from './_components/search-result';

async function Page({
  searchParams,
}: {
  searchParams: Promise<{ q?: string }>;
}) {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <SearchResult searchParams={searchParams} />
    </Suspense>
  );
}

export default Page;
