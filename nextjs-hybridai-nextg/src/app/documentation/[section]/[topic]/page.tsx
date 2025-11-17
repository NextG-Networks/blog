import { notFound } from 'next/navigation';
import PageLayout from '@/components/PageLayout';
import OnThisPage from '@/components/OnThisPage';
import {
  getTopicBySlug,
  getSectionBySlug,
  getNextTopic,
  getPreviousTopic,
  documentationContent,
} from '@/lib/content';
import Link from 'next/link';
import Image from 'next/image';

// Component to render content with proper heading IDs
function TopicContent({ content }: { content: string }) {
  // Generate IDs for headings
  const processedContent = content.replace(
    /<h([23])>([^<]+)<\/h[23]>/g,
    (match, level, text) => {
      const id = text
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/^-|-$/g, '');
      return `<h${level} id="${id}">${text}</h${level}>`;
    }
  );

  return <div dangerouslySetInnerHTML={{ __html: processedContent }} />;
}

interface TopicPageProps {
  params: Promise<{
    section: string;
    topic: string;
  }>;
}

export default async function TopicPage({ params }: TopicPageProps) {
  const { section: sectionSlug, topic: topicSlug } = await params;

  const topic = getTopicBySlug(sectionSlug, topicSlug);
  const section = getSectionBySlug(sectionSlug);

  if (!topic || !section) {
    notFound();
  }

  const nextTopic = getNextTopic(sectionSlug, topicSlug);
  const previousTopic = getPreviousTopic(sectionSlug, topicSlug);

  const breadcrumb = `${documentationContent.title} / ${section.title} / ${topic.title}`;

  return (
    <PageLayout
      breadcrumb={breadcrumb}
      sidebarSections={documentationContent.sections.map((s) => ({
        title: s.title,
        topics: s.topics.map((t) => t.title),
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

            {/* Introduction text - extract first paragraph from content if available */}
            {topic.content && (
              <div className="text-lg leading-relaxed text-gray-600 dark:text-gray-300">
                <div
                  dangerouslySetInnerHTML={{
                    __html: topic.content
                      .split('</p>')[0]
                      .replace('<p>', '')
                      .replace('<div>', '')
                      .replace('<h2>', '')
                      .replace('</h2>', '')
                      .replace('<h3>', '')
                      .replace('</h3>', '') + '</p>',
                  }}
                />
              </div>
            )}
          </section>

          {/* Topic Content */}
          <div
            id="topic-content"
            className="prose prose-lg max-w-none mb-12 prose-gray dark:prose-invert"
          >
            {topic.content ? (
              <TopicContent content={topic.content} />
            ) : (
              <div className="text-gray-900 dark:text-gray-100">
                <p className="mb-4">
                  This is where your topic content will go. You can add:
                </p>
                <ul className="list-disc list-inside space-y-2 mb-4">
                  <li>Text content</li>
                  <li>Video embeds</li>
                  <li>Images</li>
                  <li>Interactive elements</li>
                  <li>Code examples</li>
                </ul>
                <p>
                  Update the <code>content</code> field in{' '}
                  <code>src/lib/content.ts</code> for this topic to add your
                  content.
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
  return documentationContent.sections.flatMap((section) =>
    section.topics.map((topic) => ({
      section: section.slug,
      topic: topic.slug,
    }))
  );
}

