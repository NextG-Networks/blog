import Link from "next/link";
import Image from "next/image";
import { type SanityDocument } from "next-sanity";
import { client } from "@/sanity/client";
import imageUrlBuilder from '@sanity/image-url';

// Create the image URL builder
const builder = imageUrlBuilder(client);

export function urlFor(source: any) {
  return builder.image(source);
}

// Updated query to include all the fields we need for the design
const POSTS_QUERY = `*[
  _type == "post"
  && defined(slug.current)
]|order(publishedAt desc)[0...12]{
  _id, 
  title, 
  slug, 
  publishedAt,
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
  brief
}`;

const options = { next: { revalidate: 30 } };

export default async function IndexPage() {
  const posts = await client.fetch<SanityDocument[]>(POSTS_QUERY, {}, options);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="bg-emerald-900 text-white pt-32 pb-16">
        <div className="container mx-auto max-w-4xl px-8">
          <h1 className="text-2xl font-bold sm:text-4xl mb-3">
            Latest News & Updates
          </h1>
          <p className="text-lg font-medium opacity-90 sm:text-xl">
            Stay updated with our latest articles, insights, and announcements.
          </p>
        </div>
      </section>

      {/* Main Content */}
      <main className="bg-white rounded-t-2xl relative -mt-4 pt-6 sm:pt-12 pb-20">
        <div className="container mx-auto max-w-4xl px-8">
          <div className="grid gap-8">
            {posts.map((post) => (
              <ArticleCard key={post._id} post={post} />
            ))}
          </div>
        </div>
      </main>
    </div>
  );
}

function ArticleCard({ post }: { post: SanityDocument }) {
  return (
    <Link href={`/${post.slug.current}`}>
      <article className="flex w-full cursor-pointer flex-col items-center overflow-hidden transition-opacity hover:opacity-70 sm:flex-row group">
        {/* Image */}
        <div className="relative h-52 w-full shrink-0 overflow-hidden rounded-xl sm:h-40 sm:w-48">
          {post.mainImage?.asset?.url ? (
            <Image
              height={200}
              width={300}
              src={urlFor(post.mainImage).width(300).height(200).url()}
              alt={post.mainImage.alt || post.title}
              className="min-h-full min-w-full object-cover object-center transition-transform duration-200 group-hover:scale-105"
            />
          ) : (
            <div className="min-h-full min-w-full bg-gray-200 flex items-center justify-center">
              <span className="text-gray-400">No image</span>
            </div>
          )}
        </div>

        {/* Content */}
        <div className="py-2 pt-4 sm:px-5 flex-1">
          <p className="pb-1 text-sm font-medium text-gray-500">
            {new Date(post.publishedAt).toLocaleDateString('en-US', {
              year: 'numeric',
              month: 'long',
              day: 'numeric'
            })}
          </p>
          
          <h2 className="pb-2 text-base font-semibold text-gray-800 sm:text-xl group-hover:text-emerald-700 transition-colors">
            {post.title}
          </h2>
          
          {post.brief && (
            <p className="pb-2 text-sm font-medium text-gray-500 sm:text-base line-clamp-2">
              {post.brief}
            </p>
          )}
          
          {/* Categories */}
          {post.categories && post.categories.length > 0 && (
            <div className="flex gap-3 flex-wrap">
              {post.categories.map((category: any, index: number) => (
                <span
                  key={index}
                  className="text-xs font-medium uppercase tracking-wide text-emerald-500 sm:text-sm"
                >
                  #{category.title}
                </span>
              ))}
            </div>
          )}
        </div>
      </article>
    </Link>
  );
}