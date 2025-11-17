'use client';

import Link from 'next/link';
import Container from './Container';

export default function CallToAction() {
  return (
    <div className="bg-gradient-to-r from-blue-600 to-purple-600 dark:from-gray-900 dark:to-gray-800 text-white py-20">
      <Container>
        <div className="text-center max-w-3xl mx-auto">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            Explore Our Research
          </h2>
          <p className="text-xl mb-8 text-blue-100 dark:text-gray-300">
            Dive into our comprehensive research documentation, methodologies, and findings. 
            Learn about our AI-driven approaches to O-RAN network optimization.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/documentation"
              className="px-8 py-4 bg-white text-blue-600 dark:bg-gray-800 dark:text-white rounded-lg font-semibold hover:bg-blue-50 dark:hover:bg-gray-700 transition-all transform hover:scale-105 shadow-lg"
            >
              View Research Content
            </Link>
            <Link
              href="#"
              className="px-8 py-4 bg-white/10 backdrop-blur-sm text-white border border-white/20 rounded-lg font-semibold hover:bg-white/20 transition-all"
            >
              Contact Us
            </Link>
          </div>
        </div>
      </Container>
    </div>
  );
}

