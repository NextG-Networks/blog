'use client';

import { ReactNode } from 'react';
import Navbar from './Navbar';
import Sidebar from './SideBar';

interface PageLayoutProps {
  children: ReactNode;
  sidebarSections?: Array<{
    title: string;
    topics: string[];
  }>;
  breadcrumb?: string;
  navItems?: Array<{ label: string; href: string; hasDropdown?: boolean }>;
}

export default function PageLayout({
  children,
  sidebarSections,
  breadcrumb,
  navItems,
}: PageLayoutProps) {
  return (
    <div className="flex flex-col h-screen bg-white dark:bg-gray-800">
      {/* Navbar */}
      <Navbar breadcrumb={breadcrumb} navItems={navItems} />

      {/* Main content area with sidebar */}
      <div className="flex flex-1 overflow-hidden">
        {/* Sidebar */}
        <Sidebar
          sections={sidebarSections}
          useContentStructure={!sidebarSections}
        />

        {/* Main content container */}
        <main className="flex-1 overflow-y-auto bg-white dark:bg-gray-800">
          <div className="p-6">{children}</div>
        </main>
      </div>
    </div>
  );
}

