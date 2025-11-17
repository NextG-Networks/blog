'use client';

import { useEffect, useState } from 'react';

interface Heading {
  id: string;
  text: string;
  level: number;
}

interface OnThisPageProps {
  contentId?: string;
}

export default function OnThisPage({ contentId = 'topic-content' }: OnThisPageProps) {
  const [headings, setHeadings] = useState<Heading[]>([]);
  const [activeId, setActiveId] = useState<string>('');

  useEffect(() => {
    // Extract headings from the content
    const contentElement = document.getElementById(contentId);
    if (!contentElement) return;

    const headingElements = contentElement.querySelectorAll('h2, h3');
    const extractedHeadings: Heading[] = Array.from(headingElements).map(
      (heading, index) => {
        const id = heading.id || `heading-${index}`;
        if (!heading.id) {
          heading.id = id;
        }
        return {
          id,
          text: heading.textContent || '',
          level: parseInt(heading.tagName.charAt(1)),
        };
      }
    );

    setHeadings(extractedHeadings);

    // Set up intersection observer for active heading
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveId(entry.target.id);
          }
        });
      },
      {
        rootMargin: '-20% 0px -70% 0px',
        threshold: 0,
      }
    );

    headingElements.forEach((heading) => observer.observe(heading));

    return () => {
      observer.disconnect();
    };
  }, [contentId]);

  if (headings.length === 0) {
    return null;
  }

  const scrollToHeading = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      const offset = 100; // Account for sticky header
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth',
      });
    }
  };

  return (
    <aside className="w-64 h-full overflow-y-auto sticky top-0 bg-white dark:bg-gray-900 text-gray-900 dark:text-white border-l border-gray-200 dark:border-gray-800">
      <div className="p-6">
        <h2 className="font-bold mb-4 text-sm text-gray-900 dark:text-white">
          On this page
        </h2>
        <nav className="space-y-1">
          {headings.map((heading) => (
            <a
              key={heading.id}
              href={`#${heading.id}`}
              onClick={(e) => {
                e.preventDefault();
                scrollToHeading(heading.id);
              }}
              className={`block py-1.5 text-sm transition-colors ${
                heading.level === 3 ? 'pl-4' : ''
              } ${
                activeId === heading.id
                  ? 'text-gray-900 dark:text-white font-medium'
                  : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-300'
              }`}
            >
              {heading.text}
            </a>
          ))}
        </nav>
      </div>
    </aside>
  );
}

