'use client';

import Navbar from '@/components/Navbar';
import HeroSection from '@/components/HeroSection';
import Features from '@/components/Features';
import Stats from '@/components/Stats';
import CallToAction from '@/components/CallToAction';
import Blog from '@/components/Blog';

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen bg-white dark:bg-gray-800">
      {/* Navbar */}
      <Navbar 
        breadcrumb="O-RAN AI Research Project"
        navItems={[
          { label: 'Documentation', href: '/documentation' },
          { label: 'Blog', href: '/blog' },
          { label: 'Team', href: '/team' },
        ]}
      />
      
      <HeroSection />
      <Features />
      <Stats />
      <CallToAction />
      <Blog />

      {/* Footer */}
      <footer className="py-8 bg-gray-900 dark:bg-black text-gray-400 border-t border-gray-800">
        <div className="container mx-auto px-8 text-center">
          <p className="text-sm">
            © {new Date().getFullYear()} O-RAN AI Research Project | Luleå University of Technology
          </p>
        </div>
      </footer>
    </div>
  );
}
