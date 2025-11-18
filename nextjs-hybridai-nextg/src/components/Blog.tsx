'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import Container from './Container';
import { client } from '@/sanity/client';
import { type SanityDocument } from 'next-sanity';
import imageUrlBuilder from '@sanity/image-url';

const builder = imageUrlBuilder(client);

function urlFor(source: Parameters<typeof builder.image>[0]) {
  return builder.image(source);
}

interface Category {
  title: string;
  description?: string;
}

const POSTS_QUERY = `*[
  _type == "post"
  && defined(slug.current)
]|order(publishedAt desc)[0...3]{
  _id, 
  title, 
  slug, 
  publishedAt,
  mainImage{
    asset->{
      _id,
      url
    },
    alt,
  },
  categories[]->{
    title,
    description
  },
  brief
}`;

export default function Blog() {
  const [posts, setPosts] = useState<SanityDocument[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchPosts() {
      try {
        const data = await client.fetch<SanityDocument[]>(POSTS_QUERY, {});
        setPosts(data);
      } catch (error) {
        console.error('Error fetching posts:', error);
      } finally {
        setLoading(false);
      }
    }
    fetchPosts();
  }, []);

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
        {loading ? (
          <div className="text-center py-12">
            <p className="text-gray-600 dark:text-gray-300">Loading...</p>
          </div>
        ) : posts && posts.length > 0 ? (
          <>
            <div className="grid md:grid-cols-3 gap-8">
              {posts.map((post) => (
                <Link
                  key={post._id}
                  href={`/${post.slug.current}`}
                  className="group p-6 rounded-2xl border border-gray-200 dark:border-gray-700 hover:shadow-lg transition-all hover:-translate-y-1 bg-white dark:bg-gray-900"
                >
                  {post.mainImage?.asset?.url && (
                    <div className="mb-4 relative h-48 w-full rounded-lg overflow-hidden">
                      <Image
                        src={urlFor(post.mainImage).width(400).height(300).url()}
                        alt={post.mainImage.alt || post.title}
                        fill
                        className="object-cover group-hover:scale-105 transition-transform duration-200"
                      />
                    </div>
                  )}
                  <div className="mb-4">
                    {post.categories && post.categories.length > 0 ? (
                      <span className="inline-block px-3 py-1 text-xs font-semibold text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-900/20 rounded-full">
                        {post.categories[0].title}
                      </span>
                    ) : (
                      <span className="inline-block px-3 py-1 text-xs font-semibold text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-900/20 rounded-full">
                        Research
                      </span>
                    )}
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                    {post.title}
                  </h3>
                  {post.brief && (
                    <p className="text-gray-600 dark:text-gray-300 mb-4 line-clamp-2">
                      {post.brief}
                    </p>
                  )}
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    {new Date(post.publishedAt).toLocaleDateString('en-US', {
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
                href="/blog"
                className="inline-block px-6 py-3 text-blue-600 dark:text-blue-400 font-semibold hover:underline"
              >
                View All Updates →
              </Link>
            </div>
          </>
        ) : (
          <div className="text-center py-12">
            <p className="text-gray-600 dark:text-gray-300">
              No blog posts available yet. Check back soon!
            </p>
          </div>
        )}
      </Container>
    </div>
  );
}

