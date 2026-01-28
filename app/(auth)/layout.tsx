const AuthLayout = ({ children }: { children: React.ReactNode }) => {
  return <div className="absolute inset-0">{children}</div>;
};

export default AuthLayout;
