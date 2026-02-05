const SearchLayout = ({ children }: { children: React.ReactNode }) => {
  console.log(children);
  return <div className="max-w-7xl mx-auto p-4 xl:p-8">{children}</div>;
};

export default SearchLayout;
