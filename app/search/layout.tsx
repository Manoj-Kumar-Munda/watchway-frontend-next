import Container from '@/components/container';

const SearchLayout = ({ children }: { children: React.ReactNode }) => {
  return <Container className="max-w-7xl mx-auto">{children}</Container>;
};

export default SearchLayout;
