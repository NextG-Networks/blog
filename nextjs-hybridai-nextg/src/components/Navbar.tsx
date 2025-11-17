'use client';

import Link from 'next/link';
import ThemeToggle from './ThemeToggle';

interface NavbarProps {
  breadcrumb?: string;
  navItems?: Array<{ label: string; href: string; hasDropdown?: boolean }>;
}

export default function Navbar({
  breadcrumb = 'Compass / Overview',
  navItems = [
    { label: 'Documentation', href: '/documentation' },
    { label: 'Blog', href: '/blog' },
    { label: 'Publications', href: '#' },
    { label: 'Team', href: '#' },
  ],
}: NavbarProps) {
  return (
    <header className="w-full border-b bg-white dark:bg-gray-900 text-gray-900 dark:text-white border-gray-200 dark:border-gray-800">
      <div className="flex items-center justify-between px-6 py-3">
        {/* Left: Icon */}
        <div className="w-5 h-5 rounded-sm bg-gray-300 dark:bg-gray-700"></div>

        {/* Center: Breadcrumb */}
        <div className="flex-1 text-center text-sm text-gray-600 dark:text-gray-300">
          {breadcrumb}
        </div>

        {/* Right: Navigation links and theme toggle */}
        <nav className="flex items-center gap-6">
          {navItems.map((item, index) => (
            <Link
              key={index}
              href={item.href}
              className="text-sm transition-colors flex items-center gap-1 text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white"
            >
              {item.label}
              {item.hasDropdown && (
                <svg
                  className="w-4 h-4"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M19 9l-7 7-7-7"
                  />
                </svg>
              )}
            </Link>
          ))}
          <ThemeToggle />
        </nav>
      </div>
    </header>
  );
}

