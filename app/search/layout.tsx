const SearchLayout = ({ children }: { children: React.ReactNode }) => {
  console.log(children);
  return <div className="max-w-7xl mx-auto">{children}</div>;
};

export default SearchLayout;
