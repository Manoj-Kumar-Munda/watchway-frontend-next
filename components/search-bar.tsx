'use client';
import { IconSearch } from '@tabler/icons-react';
import { Input } from './ui/input';
import { Button } from './ui/button';
import { Separator } from './ui/separator';
import { useState } from 'react';

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

export default SearchBar;
