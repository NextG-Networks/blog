// Content structure for documentation topics - now using Sanity CMS
import { client } from '@/sanity/client';
import { type SanityDocument } from 'next-sanity';
import imageUrlBuilder from '@sanity/image-url';

const builder = imageUrlBuilder(client);

export function urlFor(source: Parameters<typeof builder.image>[0]) {
  return builder.image(source);
}

export interface Topic {
  id: string;
  title: string;
  slug: string;
  content?: any; // PortableText content from Sanity
  duration?: string;
  videoUrl?: string;
  image?: string;
  imageAlt?: string;
  order: number;
  section?: {
    slug: string;
    title: string;
  };
}

export interface Section {
  id: string;
  title: string;
  slug: string;
  topics: Topic[];
  order: number;
  description?: string;
}

export interface Documentation {
  id: string;
  title: string;
  description: string;
  sections: Section[];
  modules: number;
  lessons: number;
  duration: string;
}

const options = { next: { revalidate: 30 } };

// Fetch all sections from Sanity
export async function getSections(): Promise<Section[]> {
  const sections = await client.fetch<SanityDocument[]>(
    `*[_type == "documentationSection"] | order(order asc) {
      _id,
      title,
      "slug": slug.current,
      description,
      order,
      "topics": topics[]-> {
        _id,
        title,
        "slug": slug.current,
        order,
        brief,
        duration,
        videoUrl,
        heroImage {
          asset-> {
            _id,
            url
          },
          alt
        },
        "imageAlt": heroImage.alt,
        content,
        "section": section-> {
          "slug": slug.current,
          title
        }
      } | order(order asc)
    }`,
    {},
    options
  );

  return sections.map((section) => ({
    id: section._id,
    title: section.title,
    slug: section.slug,
    description: section.description,
    order: section.order,
    topics: (section.topics || []).map((topic: any) => ({
      id: topic._id,
      title: topic.title,
      slug: topic.slug,
      content: topic.content,
      duration: topic.duration,
      videoUrl: topic.videoUrl,
      image: topic.heroImage?.asset?.url
        ? urlFor(topic.heroImage).width(1200).height(600).url()
        : undefined,
      imageAlt: topic.imageAlt || topic.heroImage?.alt,
      order: topic.order,
      section: topic.section,
    })),
  }));
}

// Get documentation content structure
export async function getDocumentationContent(): Promise<Documentation> {
  const sections = await getSections();
  const totalTopics = sections.reduce((sum, section) => sum + section.topics.length, 0);

  return {
    id: 'research-documentation',
    title: 'Research Documentation',
    description:
      'Comprehensive documentation of our O-RAN AI research project, including methodologies, findings, and technical details.',
    modules: sections.length,
    lessons: totalTopics,
    duration: 'Ongoing',
    sections,
  };
}

// Get a single topic by section and topic slugs
export async function getTopicBySlug(
  sectionSlug: string,
  topicSlug: string
): Promise<Topic | undefined> {
  const topic = await client.fetch<SanityDocument>(
    `*[_type == "documentationTopic" && slug.current == $topicSlug && section->slug.current == $sectionSlug][0] {
      _id,
      title,
      "slug": slug.current,
      order,
      brief,
      duration,
      videoUrl,
      heroImage {
        asset-> {
          _id,
          url
        },
        alt
      },
      "imageAlt": heroImage.alt,
      content,
      "section": section-> {
        "slug": slug.current,
        title
      }
    }`,
    { sectionSlug, topicSlug },
    options
  );

  if (!topic) return undefined;

  return {
    id: topic._id,
    title: topic.title,
    slug: topic.slug,
    content: topic.content,
    duration: topic.duration,
    videoUrl: topic.videoUrl,
    image: topic.heroImage?.asset?.url
      ? urlFor(topic.heroImage).width(1200).height(600).url()
      : undefined,
    imageAlt: topic.imageAlt || topic.heroImage?.alt,
    order: topic.order,
    section: topic.section,
  };
}

// Get a single section by slug
export async function getSectionBySlug(slug: string): Promise<Section | undefined> {
  const section = await client.fetch<SanityDocument>(
    `*[_type == "documentationSection" && slug.current == $slug][0] {
      _id,
      title,
      "slug": slug.current,
      description,
      order,
      "topics": topics[]-> {
        _id,
        title,
        "slug": slug.current,
        order,
        brief,
        duration,
        videoUrl,
        heroImage {
          asset-> {
            _id,
            url
          },
          alt
        },
        "imageAlt": heroImage.alt,
        content,
        "section": section-> {
          "slug": slug.current,
          title
        }
      } | order(order asc)
    }`,
    { slug },
    options
  );

  if (!section) return undefined;

  return {
    id: section._id,
    title: section.title,
    slug: section.slug,
    description: section.description,
    order: section.order,
    topics: (section.topics || []).map((topic: any) => ({
      id: topic._id,
      title: topic.title,
      slug: topic.slug,
      content: topic.content,
      duration: topic.duration,
      videoUrl: topic.videoUrl,
      image: topic.heroImage?.asset?.url
        ? urlFor(topic.heroImage).width(1200).height(600).url()
        : undefined,
      imageAlt: topic.imageAlt || topic.heroImage?.alt,
      order: topic.order,
      section: topic.section,
    })),
  };
}

// Get all topics across all sections
export async function getAllTopics(): Promise<Array<{ section: Section; topic: Topic }>> {
  const sections = await getSections();
  return sections.flatMap((section) =>
    section.topics.map((topic) => ({ section, topic }))
  );
}

// Get next topic
export async function getNextTopic(
  sectionSlug: string,
  topicSlug: string
): Promise<{ section: Section; topic: Topic } | null> {
  const allTopics = await getAllTopics();
  const currentIndex = allTopics.findIndex(
    (item) =>
      item.section.slug === sectionSlug && item.topic.slug === topicSlug
  );

  if (currentIndex < allTopics.length - 1) {
    return allTopics[currentIndex + 1];
  }
  return null;
}

// Get previous topic
export async function getPreviousTopic(
  sectionSlug: string,
  topicSlug: string
): Promise<{ section: Section; topic: Topic } | null> {
  const allTopics = await getAllTopics();
  const currentIndex = allTopics.findIndex(
    (item) =>
      item.section.slug === sectionSlug && item.topic.slug === topicSlug
  );

  if (currentIndex > 0) {
    return allTopics[currentIndex - 1];
  }
  return null;
}

// Legacy export for backwards compatibility (will be removed once fully migrated)
export const documentationContent = {
  id: 'research-documentation',
  title: 'Research Documentation',
  description:
    'Comprehensive documentation of our O-RAN AI research project, including methodologies, findings, and technical details.',
  modules: 4,
  lessons: 16,
  duration: 'Ongoing',
  sections: [],
};
