import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Dashboard',
  description:
    'View your channel analytics, manage your content, and track your performance on Watchway.',
};

const DashboardLayout = ({ children }: { children: React.ReactNode }) => {
  return <div className="max-w-7xl mx-auto">{children}</div>;
};

export default DashboardLayout;
