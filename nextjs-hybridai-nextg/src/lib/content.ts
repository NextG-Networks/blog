// Content structure for documentation topics
import {
  landscapeOfChoice,
  paradoxOfAgency,
  liberationFromRegret,
  mappingCausalFactors,
  reframingUncertainty,
  adaptingToChange,
} from '@/content/topics';

export interface Topic {
  id: string;
  title: string;
  slug: string;
  content?: string; // Can be markdown, HTML, or reference to CMS
  duration?: string; // e.g., "14:36"
  videoUrl?: string;
  image?: string; // Hero image URL
  imageAlt?: string; // Alt text for hero image
  order: number;
}

export interface Section {
  id: string;
  title: string;
  slug: string;
  topics: Topic[];
  order: number;
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

// Documentation data structure
export const documentationContent: Documentation = {
  id: 'research-documentation',
  title: 'Research Documentation',
  description:
    'Comprehensive documentation of our O-RAN AI research project, including methodologies, findings, and technical details.',
  modules: 4,
  lessons: 20,
  duration: '3 hr 43 min',
  sections: [
    {
      id: 'orientation',
      title: 'Orientation: Understanding Where You Are',
      slug: 'orientation',
      order: 1,
      topics: [
        landscapeOfChoice,
        paradoxOfAgency,
        liberationFromRegret,
        {
          id: 'recognizing-patterns',
          title: 'Recognizing Patterns',
          slug: 'recognizing-patterns',
          duration: '18:10',
          order: 4,
        },
        {
          id: 'values-and-goals',
          title: 'Values and Goals',
          slug: 'values-and-goals',
          duration: '16:30',
          order: 5,
        },
      ],
    },
    {
      id: 'direction',
      title: 'Direction: Choosing a Path',
      slug: 'direction',
      order: 2,
      topics: [
        mappingCausalFactors,
        reframingUncertainty,
        {
          id: 'overcoming-paralysis',
          title: 'Overcoming Decision Paralysis',
          slug: 'overcoming-paralysis',
          duration: '17:15',
          order: 3,
        },
        {
          id: 'path-of-least-resistance',
          title: 'Perceiving the Path of Least Resistance',
          slug: 'path-of-least-resistance',
          duration: '15:40',
          order: 4,
        },
        {
          id: 'surrendering-outcome',
          title: 'Surrendering to the Outcome',
          slug: 'surrendering-outcome',
          duration: '16:55',
          order: 5,
        },
      ],
    },
    {
      id: 'navigation',
      title: 'Navigation: Steering Through the Inevitable',
      slug: 'navigation',
      order: 3,
      topics: [
        adaptingToChange,
        {
          id: 'maintaining-momentum',
          title: 'Maintaining Momentum',
          slug: 'maintaining-momentum',
          duration: '13:45',
          order: 2,
        },
        {
          id: 'course-corrections',
          title: 'Corrections & Adjustments',
          slug: 'course-corrections',
          duration: '15:10',
          order: 3,
        },
        {
          id: 'measuring-progress',
          title: 'Measuring Progress',
          slug: 'measuring-progress',
          duration: '12:30',
          order: 4,
        },
        {
          id: 'staying-aligned',
          title: 'Staying Aligned',
          slug: 'staying-aligned',
          duration: '16:00',
          order: 5,
        },
      ],
    },
  ],
};

// Helper functions
export function getTopicBySlug(
  sectionSlug: string,
  topicSlug: string
): Topic | undefined {
  const section = documentationContent.sections.find((s) => s.slug === sectionSlug);
  return section?.topics.find((t) => t.slug === topicSlug);
}

export function getSectionBySlug(slug: string): Section | undefined {
  return documentationContent.sections.find((s) => s.slug === slug);
}

export function getAllTopics(): Array<{ section: Section; topic: Topic }> {
  return documentationContent.sections.flatMap((section) =>
    section.topics.map((topic) => ({ section, topic }))
  );
}

export function getNextTopic(
  sectionSlug: string,
  topicSlug: string
): { section: Section; topic: Topic } | null {
  const allTopics = getAllTopics();
  const currentIndex = allTopics.findIndex(
    (item) =>
      item.section.slug === sectionSlug && item.topic.slug === topicSlug
  );

  if (currentIndex < allTopics.length - 1) {
    return allTopics[currentIndex + 1];
  }
  return null;
}

export function getPreviousTopic(
  sectionSlug: string,
  topicSlug: string
): { section: Section; topic: Topic } | null {
  const allTopics = getAllTopics();
  const currentIndex = allTopics.findIndex(
    (item) =>
      item.section.slug === sectionSlug && item.topic.slug === topicSlug
  );

  if (currentIndex > 0) {
    return allTopics[currentIndex - 1];
  }
  return null;
}

