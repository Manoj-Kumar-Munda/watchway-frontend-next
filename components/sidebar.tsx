'use client';
import { useState } from 'react';

const Sidebar = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  return (
    <aside className="sticky top-20 h-[calc(100vh-80px)] w-60 shrink-0 border-r bg-amber-50 overflow-y-auto">
      <div className="p-4">
        <h1>Sidebar</h1>
        {/* Sidebar content goes here */}
      </div>
    </aside>
  );
};

export default Sidebar;
