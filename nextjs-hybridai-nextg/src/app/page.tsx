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
        <div className="container mx-auto px-8">
          <div className="text-center mb-4">
            <p className="text-sm">
              © {new Date().getFullYear()} O-RAN AI Research Project | Luleå University of Technology
            </p>
          </div>
          <div className="text-center text-xs text-gray-500 dark:text-gray-600 space-y-1">
            <p>
              We make use of the open-source software{' '}
              <a 
                href="https://github.com/wineslab/colosseum-near-rt-ric" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-blue-400 hover:text-blue-300 underline"
              >
                Colosseum Near-RT RIC
              </a>
              {' '}licensed under{' '}
              <a 
                href="https://github.com/wineslab/colosseum-near-rt-ric/blob/main/LICENSE" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-blue-400 hover:text-blue-300 underline"
              >
                Apache 2.0
              </a>
            </p>
            <p>
              We use the{' '}
              <a 
                href="https://github.com/wineslab/ns-o-ran-ns3-mmwave" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-blue-400 hover:text-blue-300 underline"
              >
                ns-O-RAN ns-3 mmWave module
              </a>
              {' '}licensed under{' '}
              <a 
                href="https://github.com/wineslab/ns-o-ran-ns3-mmwave/blob/master/LICENSE" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-blue-400 hover:text-blue-300 underline"
              >
                GNU GPL v2
              </a>
            </p>
            <p>
              We reference the{' '}
              <a 
                href="https://github.com/wineslab/o-ran-e2sim" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-blue-400 hover:text-blue-300 underline"
              >
                o-ran-e2sim
              </a>
              {' '}repository (no explicit license detected at time of access)
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
