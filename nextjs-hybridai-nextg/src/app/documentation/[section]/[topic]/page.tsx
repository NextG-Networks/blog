import { notFound } from 'next/navigation';
import PageLayout from '@/components/PageLayout';
import OnThisPage from '@/components/OnThisPage';
import {
  getTopicBySlug,
  getSectionBySlug,
  getNextTopic,
  getPreviousTopic,
  getDocumentationContent,
} from '@/lib/content';
import Link from 'next/link';
import Image from 'next/image';
import { PortableText } from '@portabletext/react';
import imageUrlBuilder from '@sanity/image-url';
import { client } from '@/sanity/client';

const builder = imageUrlBuilder(client);

function urlFor(source: Parameters<typeof builder.image>[0]) {
  return builder.image(source);
}

interface TopicPageProps {
  params: Promise<{
    section: string;
    topic: string;
  }>;
}

export default async function TopicPage({ params }: TopicPageProps) {
  const { section: sectionSlug, topic: topicSlug } = await params;

  const topic = await getTopicBySlug(sectionSlug, topicSlug);
  const section = await getSectionBySlug(sectionSlug);
  const documentationContent = await getDocumentationContent();

  if (!topic || !section) {
    notFound();
  }

  const nextTopic = await getNextTopic(sectionSlug, topicSlug);
  const previousTopic = await getPreviousTopic(sectionSlug, topicSlug);

  const breadcrumb = `${documentationContent.title} / ${section.title} / ${topic.title}`;

  return (
    <PageLayout
      breadcrumb={breadcrumb}
      sidebarSections={documentationContent.sections.map((s) => ({
        title: s.title,
        topics: s.topics.map((t) => t.title),
        sectionSlug: s.slug,
        topicsData: s.topics.map((t) => ({
          slug: t.slug,
          title: t.title,
        })),
      }))}
    >
      <div className="flex gap-8 w-full">
        {/* Main Content */}
        <div className="flex-1 max-w-4xl">
          {/* Hero Section */}
          <section className="mb-12">
            <h1 className="text-4xl md:text-5xl font-bold mb-6 text-gray-900 dark:text-white">
              {topic.title}
            </h1>
            
            {topic.image && (
              <div className="relative w-full h-96 mb-6 rounded-lg overflow-hidden">
                <Image
                  src={topic.image}
                  alt={topic.imageAlt || topic.title}
                  fill
                  className="object-cover"
                  priority
                />
              </div>
            )}

            {/* Brief description */}
            {topic.brief && (
              <div className="text-lg leading-relaxed text-gray-600 dark:text-gray-300 mb-6">
                {topic.brief}
              </div>
            )}
          </section>

          {/* Topic Content */}
          <div
            id="topic-content"
            className="prose prose-lg max-w-none mb-12 prose-gray dark:prose-invert prose-headings:text-gray-900 dark:prose-headings:text-white prose-p:text-gray-700 dark:prose-p:text-gray-300 prose-a:text-blue-600 dark:prose-a:text-blue-400 prose-strong:text-gray-900 dark:prose-strong:text-white"
          >
            {topic.content ? (
              <PortableText
                value={topic.content}
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
                          <p className="text-sm text-gray-500 dark:text-gray-400 mt-2 text-center italic">
                            {value.caption}
                          </p>
                        )}
                      </div>
                    ),
                  },
                  marks: {
                    link: ({ children, value }) => (
                      <a
                        href={value.href || '#'}
                        target={value.href?.startsWith('http') ? '_blank' : undefined}
                        rel={value.href?.startsWith('http') ? 'noopener noreferrer' : undefined}
                        className="text-blue-600 dark:text-blue-400 hover:underline"
                      >
                        {children}
                      </a>
                    ),
                  },
                  block: {
                    h2: ({ children }) => (
                      <h2 className="text-2xl font-bold text-gray-900 dark:text-white mt-8 mb-4" id={String(children).toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '')}>
                        {children}
                      </h2>
                    ),
                    h3: ({ children }) => (
                      <h3 className="text-xl font-semibold text-gray-900 dark:text-white mt-6 mb-3" id={String(children).toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '')}>
                        {children}
                      </h3>
                    ),
                  },
                }}
              />
            ) : (
              <div className="text-gray-900 dark:text-gray-100">
                <p className="mb-4">
                  Content for this topic is being prepared. Check back soon!
                </p>
              </div>
            )}
          </div>

          {/* Navigation */}
          <div className="flex justify-between items-center pt-8 border-t border-gray-200 dark:border-gray-700">
            {previousTopic ? (
              <Link
                href={`/documentation/${previousTopic.section.slug}/${previousTopic.topic.slug}`}
                className="flex items-center gap-2 transition-colors text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-300"
              >
                <svg
                  className="w-5 h-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M15 19l-7-7 7-7"
                  />
                </svg>
                <div>
                  <div className="text-xs text-gray-500 dark:text-gray-500">Previous</div>
                  <div className="font-medium text-gray-900 dark:text-white">
                    {previousTopic.topic.title}
                  </div>
                </div>
              </Link>
            ) : (
              <div></div>
            )}

            {nextTopic ? (
              <Link
                href={`/documentation/${nextTopic.section.slug}/${nextTopic.topic.slug}`}
                className="flex items-center gap-2 transition-colors text-right text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-300"
              >
                <div>
                  <div className="text-xs text-gray-500 dark:text-gray-500">Next</div>
                  <div className="font-medium text-gray-900 dark:text-white">
                    {nextTopic.topic.title}
                  </div>
                </div>
                <svg
                  className="w-5 h-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 5l7 7-7 7"
                  />
                </svg>
              </Link>
            ) : (
              <div></div>
            )}
          </div>
        </div>

        {/* On This Page Sidebar */}
        <OnThisPage contentId="topic-content" />
      </div>
    </PageLayout>
  );
}

// Generate static params for all topics
export async function generateStaticParams() {
  const sections = await client.fetch(
    `*[_type == "documentationSection"] {
      "slug": slug.current,
      "topics": topics[]-> {
        "slug": slug.current
      }
    }`
  );

  return sections.flatMap((section: { slug: string; topics?: Array<{ slug: string }> }) =>
    (section.topics || []).map((topic: { slug: string }) => ({
      section: section.slug,
      topic: topic.slug,
    }))
  );
}
