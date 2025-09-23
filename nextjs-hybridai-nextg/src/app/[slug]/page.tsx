import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import { PortableText } from "@portabletext/react";
import { type SanityDocument } from "next-sanity";
import { client } from "@/sanity/client";
import imageUrlBuilder from '@sanity/image-url';

// Create the image URL builder
const builder = imageUrlBuilder(client);

export function urlFor(source: any) {
  return builder.image(source);
}

const POST_QUERY = `*[
  _type == "post" 
  && slug.current == $slug
][0]{
  _id,
  title,
  slug,
  author->{
    name,
    image
  },
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
  publishedAt,
  brief,
  body[]{
    ...,
    _type == "image" => {
      ...,
      asset->{
        ...,
        url
      }
    }
  }
}`;

const options = { next: { revalidate: 30 } };

export default async function BlogPost({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  
  const post = await client.fetch<SanityDocument>(
    POST_QUERY,
    { slug },
    options
  );

  if (!post) {
    notFound();
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header with back button */}
      <header className="bg-white border-b border-gray-200 sticky top-0 z-10">
        <div className="container mx-auto max-w-4xl px-8 py-4">
          <Link
            href="/"
            className="inline-flex items-center text-emerald-600 hover:text-emerald-700 font-medium"
          >
            ← Back to Blog
          </Link>
        </div>
      </header>

      <main className="bg-white">
        <article className="container mx-auto max-w-4xl px-8 py-12">
          {/* Article Header */}
          <header className="mb-8">
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 mb-4">
              {post.title}
            </h1>

            <div className="flex flex-wrap items-center gap-4 text-gray-600 mb-6">
              {post.author?.name && (
                <span className="font-medium">By {post.author.name}</span>
              )}
              <span>
                {new Date(post.publishedAt).toLocaleDateString('en-US', {
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric'
                })}
              </span>
            </div>

            {/* Categories */}
            {post.categories && post.categories.length > 0 && (
              <div className="flex gap-2 mb-8">
                {post.categories.map((category: any, index: number) => (
                  <span
                    key={index}
                    className="px-3 py-1 bg-emerald-100 text-emerald-700 text-sm font-medium rounded-full"
                  >
                    {category.title}
                  </span>
                ))}
              </div>
            )}

            {/* Featured Image */}
            {post.mainImage?.asset?.url && (
              <div className="mb-8">
                <Image
                  src={urlFor(post.mainImage).width(800).height(400).url()}
                  alt={post.mainImage.alt || post.title}
                  width={800}
                  height={400}
                  className="w-full h-64 sm:h-80 lg:h-96 object-cover rounded-xl shadow-lg"
                />
              </div>
            )}
          </header>

          {/* Article Body */}
          <div className="prose prose-lg max-w-none prose-headings:text-gray-900 prose-p:text-gray-700 prose-a:text-emerald-600 prose-a:no-underline hover:prose-a:underline prose-strong:text-gray-900 prose-blockquote:border-l-emerald-500 prose-blockquote:bg-emerald-50 prose-blockquote:py-2 prose-blockquote:px-4 prose-blockquote:rounded-r">
            <PortableText
              value={post.body}
              components={{
                types: {
                  image: ({ value }) => (
                    <div className="my-8">
                      <Image
                        src={urlFor(value).width(800).height(400).url()}
                        alt={value.alt || ''}
                        width={800}
                        height={400}
                        className="w-full h-auto rounded-lg shadow-md"
                      />
                      {value.caption && (
                        <p className="text-sm text-gray-500 mt-2 text-center italic">
                          {value.caption}
                        </p>
                      )}
                    </div>
                  ),
                },
                marks: {
                  link: ({ children, value }) => (
                    <a
                      href={value.href}
                      target={value.href.startsWith('http') ? '_blank' : undefined}
                      rel={value.href.startsWith('http') ? 'noopener noreferrer' : undefined}
                      className="text-emerald-600 hover:text-emerald-700 hover:underline"
                    >
                      {children}
                    </a>
                  ),
                },
                block: {
                  h2: ({ children }) => (
                    <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">
                      {children}
                    </h2>
                  ),
                  h3: ({ children }) => (
                    <h3 className="text-xl font-semibold text-gray-900 mt-6 mb-3">
                      {children}
                    </h3>
                  ),
                  blockquote: ({ children }) => (
                    <blockquote className="border-l-4 border-emerald-500 bg-emerald-50 py-4 px-6 my-6 rounded-r-lg">
                      <div className="text-gray-700 italic">{children}</div>
                    </blockquote>
                  ),
                },
                list: {
                  bullet: ({ children }) => (
                    <ul className="list-disc list-inside space-y-2 my-4 text-gray-700">
                      {children}
                    </ul>
                  ),
                  number: ({ children }) => (
                    <ol className="list-decimal list-inside space-y-2 my-4 text-gray-700">
                      {children}
                    </ol>
                  ),
                },
              }}
            />
          </div>
        </article>

        {/* Navigation back to blog */}
        <section className="bg-gray-50 border-t border-gray-200 py-12">
          <div className="container mx-auto max-w-4xl px-8 text-center">
            <Link
              href="/"
              className="inline-flex items-center justify-center px-6 py-3 bg-emerald-600 text-white font-medium rounded-lg hover:bg-emerald-700 transition-colors"
            >
              ← Back to All Posts
            </Link>
          </div>
        </section>
      </main>
    </div>
  );
}

// Generate static params for all posts
export async function generateStaticParams() {
  const posts = await client.fetch<SanityDocument[]>(
    `*[_type == "post" && defined(slug.current)]{
      "slug": slug.current
    }`
  );

  return posts.map((post) => ({
    slug: post.slug,
  }));
}