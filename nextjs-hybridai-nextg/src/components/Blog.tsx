'use client';

import Link from 'next/link';
import Container from './Container';

export default function Blog() {
  const blogPosts = [
    {
      title: 'AI-Driven Network Optimization in O-RAN',
      excerpt: 'Exploring how machine learning models can optimize resource allocation and improve network performance.',
      date: '2024-01-15',
      category: 'Research',
    },
    {
      title: 'Digital-Physical Simulation Platforms',
      excerpt: 'A deep dive into our simulation frameworks that bridge digital models with physical testbeds.',
      date: '2024-01-10',
      category: 'Technology',
    },
    {
      title: 'Collaboration with Ericsson: First Results',
      excerpt: 'Initial findings from our partnership with Ericsson on real-world O-RAN deployments.',
      date: '2024-01-05',
      category: 'Partnership',
    },
  ];

  return (
    <div className="bg-white dark:bg-gray-800 py-20">
      <Container>
        <div className="mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
            Latest Research Updates
          </h2>
          <p className="text-gray-600 dark:text-gray-300">
            Stay updated with our latest research findings, publications, and project updates.
          </p>
        </div>
        <div className="grid md:grid-cols-3 gap-8">
          {blogPosts.map((post, index) => (
            <Link
              key={index}
              href="#"
              className="group p-6 rounded-2xl border border-gray-200 dark:border-gray-700 hover:shadow-lg transition-all hover:-translate-y-1 bg-white dark:bg-gray-900"
            >
              <div className="mb-4">
                <span className="inline-block px-3 py-1 text-xs font-semibold text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-900/20 rounded-full">
                  {post.category}
                </span>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                {post.title}
              </h3>
              <p className="text-gray-600 dark:text-gray-300 mb-4 line-clamp-2">
                {post.excerpt}
              </p>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                {new Date(post.date).toLocaleDateString('en-US', {
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric',
                })}
              </p>
            </Link>
          ))}
        </div>
        <div className="mt-12 text-center">
          <Link
            href="#"
            className="inline-block px-6 py-3 text-blue-600 dark:text-blue-400 font-semibold hover:underline"
          >
            View All Updates →
          </Link>
        </div>
      </Container>
    </div>
  );
}

