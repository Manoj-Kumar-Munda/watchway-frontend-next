import type { Metadata } from 'next';
import { Oswald, Inter } from 'next/font/google';
import './globals.css';
import Header from '@/components/header';
import Sidebar from '@/components/sidebar';
import Providers from '@/components/providers';
import { Toaster } from '@/components/ui/sonner';
import UploadStatusIndicator from '@/components/upload-status-indicator';

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-family-inter',
});

const oswald = Oswald({
  variable: '--font-family-oswald',
  subsets: ['latin'],
});

export const metadata: Metadata = {
  title: {
    default: 'Watchway - Share & Discover Videos',
    template: '%s | Watchway',
  },
  description:
    'Watchway is a video sharing platform where you can upload, share, and discover amazing videos. Join our community of creators and viewers.',
  keywords: [
    'video',
    'streaming',
    'video sharing',
    'watchway',
    'upload video',
    'watch videos',
    'creators',
    'content',
  ],
  authors: [{ name: 'Watchway' }],
  creator: 'Watchway',
  publisher: 'Watchway',
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    siteName: 'Watchway',
    title: 'Watchway - Share & Discover Videos',
    description:
      'Watchway is a video sharing platform where you can upload, share, and discover amazing videos.',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Watchway - Share & Discover Videos',
    description:
      'Watchway is a video sharing platform where you can upload, share, and discover amazing videos.',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.variable} ${oswald.variable}`}>
      <body className="antialiased">
        <Providers>
          <Header />
          <div className="min-h-svh pt-20 relative flex">
            <Sidebar />
            <main className="flex-1 overflow-x-hidden overflow-y-auto">
              {children}
            </main>
          </div>
          <UploadStatusIndicator />
          <Toaster />
        </Providers>
      </body>
    </html>
  );
}
