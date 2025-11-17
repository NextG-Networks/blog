'use client';

import { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { documentationContent, type Topic } from '@/lib/content';

interface Section {
  title: string;
  topics: string[];
}

interface SectionWithRouting extends Section {
  sectionSlug: string;
  topicsData: Topic[];
}

interface SidebarProps {
  sections?: Section[];
  useContentStructure?: boolean; // If true, use documentationContent from lib/content.ts
}

const defaultSections: Section[] = [
  {
    title: 'Orientation: Understanding Where You Are',
    topics: [
      'The Landscape of Choice',
      'The Paradox of Agency',
      'Liberation from Regret',
      'Recognizing Patterns',
      'Values and Goals',
    ],
  },
  {
    title: 'Direction: Choosing a Path',
    topics: [
      'Mapping the Causal Factors',
      'Reframing Uncertainty as Agency',
      'Overcoming Decision Paralysis',
      'Perceiving the Path of Least Resistance',
      'Surrendering to the Outcome',
    ],
  },
  {
    title: 'Navigation: Steering Through the Inevitable',
    topics: [
      'Adapting to Change',
      'Maintaining Momentum',
      'Course Corrections',
      'Measuring Progress',
      'Staying Aligned',
    ],
  },
];

export default function Sidebar({
  sections: customSections,
  useContentStructure = false,
}: SidebarProps) {
  const pathname = usePathname();
  const [expandedSections, setExpandedSections] = useState<Set<number>>(
    new Set([0, 1, 2]) // All sections expanded by default
  );

  // Always use content structure if we're on a documentation page, otherwise use custom sections
  const isDocumentationPage = pathname?.startsWith('/documentation');
  const shouldUseContentStructure = useContentStructure || isDocumentationPage;

  const sections = shouldUseContentStructure
    ? documentationContent.sections.map((section) => ({
        title: section.title,
        topics: section.topics.map((topic) => topic.title),
        sectionSlug: section.slug,
        topicsData: section.topics,
      }))
    : customSections || defaultSections;

  const toggleSection = (index: number) => {
    const newExpanded = new Set(expandedSections);
    if (newExpanded.has(index)) {
      newExpanded.delete(index);
    } else {
      newExpanded.add(index);
    }
    setExpandedSections(newExpanded);
  };

  const isTopicActive = (sectionSlug: string, topicSlug: string) => {
    return pathname === `/documentation/${sectionSlug}/${topicSlug}`;
  };

  return (
    <aside className="w-64 border-r h-full overflow-y-auto bg-gray-50 dark:bg-gray-900 border-gray-200 dark:border-gray-700 scrollbar-hide">
      <div className="p-4">
        {/* Icon at the top */}
        <div className="mb-6">
          <div className="w-5 h-5 rounded-sm mb-4 bg-gray-300 dark:bg-gray-700"></div>
        </div>

        {/* Documentation sections */}
        <nav className="space-y-6">
          {sections.map((section, sectionIndex) => {
            const hasRouting = 'sectionSlug' in section && 'topicsData' in section;
            const sectionWithRouting = hasRouting
              ? (section as SectionWithRouting)
              : null;

            return (
              <div key={sectionIndex}>
                <button
                  onClick={() => toggleSection(sectionIndex)}
                  className="w-full text-left mb-2 group"
                >
                  <h2 className="font-bold text-sm leading-tight transition-colors text-gray-900 dark:text-white group-hover:opacity-70">
                    {section.title}
                  </h2>
                </button>

                {expandedSections.has(sectionIndex) && (
                  <ul className="space-y-1 ml-0 mt-2">
                    {section.topics.map((topic, topicIndex) => {
                      // If using content structure, create proper links
                      if (
                        shouldUseContentStructure &&
                        sectionWithRouting &&
                        sectionWithRouting.topicsData[topicIndex]
                      ) {
                        const topicData =
                          sectionWithRouting.topicsData[topicIndex];
                        const isActive = isTopicActive(
                          sectionWithRouting.sectionSlug,
                          topicData.slug
                        );

                        return (
                          <li key={topicIndex}>
                            <Link
                              href={`/documentation/${sectionWithRouting.sectionSlug}/${topicData.slug}`}
                              className={`block py-1.5 pl-4 text-sm transition-colors ${
                                isActive
                                  ? 'text-gray-900 dark:text-white font-medium bg-gray-100 dark:bg-gray-800'
                                  : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-300'
                              }`}
                            >
                              {topic}
                            </Link>
                          </li>
                        );
                      }

                      // Fallback for custom sections without routing
                      return (
                        <li key={topicIndex}>
                          <a
                            href="#"
                            className="block py-1.5 pl-4 text-sm transition-colors text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-300"
                          >
                            {topic}
                          </a>
                        </li>
                      );
                    })}
                  </ul>
                )}
              </div>
            );
          })}
        </nav>
      </div>
    </aside>
  );
}

