import PageLayout from '@/components/PageLayout';
import { documentationContent } from '@/lib/content';
import Link from 'next/link';

export default function DocumentationOverviewPage() {
  return (
    <PageLayout
      breadcrumb={`${documentationContent.title} / Overview`}
      sidebarSections={documentationContent.sections.map((s) => ({
        title: s.title,
        topics: s.topics.map((t) => t.title),
      }))}
    >
      <div className="max-w-4xl">
        {/* Breadcrumb */}
        <div className="mb-6 text-sm text-gray-600 dark:text-gray-400">
          <span className="text-gray-900 dark:text-white">{documentationContent.title}</span>
          {' / '}
          <span>Overview</span>
        </div>

        {/* Project Description */}
        <div className="prose prose-lg dark:prose-invert max-w-none">
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-6">
            O-RAN AI Research Project
          </h1>
          
          <p className="text-lg text-gray-700 dark:text-gray-300 mb-6 leading-relaxed">
            This research project at Luleå University of Technology (LTU) focuses on developing 
            advanced AI solutions for Open Radio Access Network (O-RAN) architectures. Our work 
            encompasses both digital and physical simulation environments to create intelligent, 
            adaptive network systems.
          </p>

          <p className="text-lg text-gray-700 dark:text-gray-300 mb-6 leading-relaxed">
            In collaboration with Ericsson, we are exploring how machine learning and artificial 
            intelligence can optimize network performance, resource allocation, and adaptive 
            decision-making in next-generation O-RAN environments. Our research combines theoretical 
            foundations with practical validation through comprehensive simulation platforms and 
            real-world testbeds.
          </p>

          <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mt-8 mb-4">
            Research Focus Areas
          </h2>
          
          <ul className="list-disc pl-6 space-y-2 text-gray-700 dark:text-gray-300 mb-8">
            <li>AI-driven network optimization and resource management</li>
            <li>Digital-physical simulation frameworks for O-RAN validation</li>
            <li>Real-time performance optimization algorithms</li>
            <li>Security and reliability in AI-powered network architectures</li>
            <li>Edge computing and distributed AI processing</li>
          </ul>

          <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mt-8 mb-4">
            Documentation Structure
          </h2>
          
          <p className="text-gray-700 dark:text-gray-300 mb-6">
            Our documentation is organized into sections covering different aspects of the research. 
            Explore the topics in the sidebar to dive deeper into specific areas of our work.
          </p>

          <div className="grid md:grid-cols-2 gap-4 mt-8">
            {documentationContent.sections.map((section) => (
              <Link
                key={section.id}
                href={`/documentation/${section.slug}/${section.topics[0]?.slug || ''}`}
                className="p-6 border rounded-lg transition-colors border-gray-200 dark:border-gray-700 hover:border-gray-300 dark:hover:border-gray-600 hover:bg-gray-50 dark:hover:bg-gray-800 group"
              >
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                  {section.title}
                </h3>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  {section.topics.length} topics
                </p>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </PageLayout>
  );
}

