'use client';

import {
  IconVideoPlus,
  IconBell,
  IconSearch,
  IconBrandBilibili,
  IconMenu2,
} from '@tabler/icons-react';
import Link from 'next/link';
import { Button } from './ui/button';
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';
import { useState } from 'react';
import { Input } from './ui/input';
import { Separator } from './ui/separator';
import { useUserStore } from '@/store';
import appStore from '@/store/app-store';

const Header = () => {
  const { sidebarOpen, toggleSidebar } = appStore();
  const user = useUserStore((state) => state.user);
  return (
    <header className="fixed top-0 left-0 right-0 z-50 border-b bg-white h-20">
      <div className="flex items-center justify-between p-4">
        <div className="flex items-center gap-4">
          <Button
            variant={'ghost'}
            size={'icon'}
            className="rounded-full"
            onClick={toggleSidebar}
          >
            <IconMenu2 size={24} strokeWidth={3} />
          </Button>
          <div className="flex items-center">
            <Link href="/" className=" mr-1.5">
              <IconBrandBilibili size={24} />
            </Link>
            <h1 className="text-2xl font-bold font-oswald text-neutral-800">
              Watchway
            </h1>
          </div>
        </div>
        {/* Search Bar */}
        <SearchBar />
        {/* Navigation Items */}
        <nav className="flex items-center gap-4">
          <Button className={'rounded-full px-4 text-sm'}>
            <IconVideoPlus size={24} strokeWidth={3} />
            Upload
          </Button>
          <Button variant={'ghost'} size={'icon-lg'} className={'rounded-full'}>
            <IconBell size={24} strokeWidth={2} />
          </Button>
          {/* User Avatar */}
          {user ? (
            <Avatar>
              <AvatarImage src="https://github.com/shadcn.png" />
              <AvatarFallback>CN</AvatarFallback>
            </Avatar>
          ) : (
            <>
              <Link href="/login">
                <Button variant="outline" className="rounded-full px-4 text-sm">
                  Login
                </Button>
              </Link>

              <Link href="/register">
                <Button variant={'outline'} className={'rounded-full px-4'}>
                  Register
                </Button>
              </Link>
            </>
          )}
        </nav>
      </div>
    </header>
  );
};

const SearchBar = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const handleSearch = () => {
    //TODO: Implement search functionality
    console.log(searchQuery);
  };
  return (
    <div className="flex items-center w-full justify-center">
      <div className="border border-gray-300 rounded-full pl-4 max-w-md w-full flex items-center group transition-all focus-within:ring-1 focus-within:ring-ring focus-within:border-ring overflow-hidden ">
        <Input
          type="text"
          placeholder="Search"
          className="rounded-full pr-4 max-w-md w-full focus:outline-none border-none shadow-none focus-visible:ring-0"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
        <Separator orientation="vertical" />
        <Button className="bg-transparent px-4 hover:bg-transparent cursor-pointer">
          <IconSearch
            size={20}
            className="text-neutral-600 hover:text-neutral-900"
          />
        </Button>
      </div>
    </div>
  );
};

export default Header;
