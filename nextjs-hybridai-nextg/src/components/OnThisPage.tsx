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
    // Wait a bit for content to be rendered
    const extractHeadings = () => {
      // Extract headings from the content
      const contentElement = document.getElementById(contentId);
      if (!contentElement) return null;

      const headingElements = contentElement.querySelectorAll('h2, h3');
      const extractedHeadings: Heading[] = Array.from(headingElements).map(
        (heading, index) => {
          // Get or create ID
          let id = heading.id;
          if (!id || id === '') {
            // Generate ID from text content
            const text = heading.textContent || '';
            id = text.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '') || `heading-${index}`;
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
      return headingElements;
    };

    // Set up intersection observer for active heading
    const setupObserver = (headingElements: NodeListOf<Element> | null) => {
      if (!headingElements || headingElements.length === 0) return null;

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
    };

    // Try immediately
    const headingElements = extractHeadings();
    let observerCleanup = setupObserver(headingElements);

    // Also try after a short delay to catch dynamically rendered content
    const timeout = setTimeout(() => {
      const newHeadingElements = extractHeadings();
      if (observerCleanup) observerCleanup();
      observerCleanup = setupObserver(newHeadingElements);
    }, 100);

    return () => {
      clearTimeout(timeout);
      if (observerCleanup) observerCleanup();
    };
  }, [contentId]);

  if (headings.length === 0) {
    return null;
  }

  const scrollToHeading = (id: string) => {
    const element = document.getElementById(id);
    if (!element) return;

    // Find the scrollable container (the main element with overflow-y-auto)
    const scrollContainer = element.closest('main') || document.documentElement;
    const isMainContainer = scrollContainer.tagName === 'MAIN';

    if (isMainContainer) {
      // Scroll within the main container
      const containerRect = scrollContainer.getBoundingClientRect();
      const elementRect = element.getBoundingClientRect();
      const offset = 20; // Small offset from top
      const scrollTop = scrollContainer.scrollTop;
      const targetPosition = elementRect.top - containerRect.top + scrollTop - offset;

      scrollContainer.scrollTo({
        top: targetPosition,
        behavior: 'smooth',
      });
    } else {
      // Fallback to window scroll
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
    <aside className="w-64 h-full overflow-y-auto sticky top-0 bg-white dark:bg-[#1a1a1a] text-gray-900 dark:text-[#E0E0E0] border-l border-gray-200 dark:border-[#444444]">
      <div className="p-6">
        <h2 className="font-bold mb-4 text-sm text-gray-900 dark:text-[#E0E0E0]">
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
                  ? 'text-gray-900 dark:text-[#E0E0E0] font-medium'
                  : 'text-gray-600 dark:text-[#B0B0B0] hover:text-gray-900 dark:hover:text-[#E0E0E0]'
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

