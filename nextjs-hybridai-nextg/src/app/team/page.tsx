import Navbar from '@/components/Navbar';
import Container from '@/components/Container';

interface TeamMember {
  name: string;
  focus: string[];
}

const teamMembers: TeamMember[] = [
  { name: 'Wilhelm Rauston', focus: ['AI', 'Simulation'] },
  { name: 'Tim Rosendahl', focus: ['Simulation'] },
  { name: 'Sune Larsson', focus: ['Testbed'] },
  { name: 'Samuel Thelin', focus: ['Testbed'] },
  { name: 'Rasmus Svedberg', focus: ['AI'] },
  { name: 'Elliot Eriksson', focus: ['Simulation'] },
  { name: 'Alexander Pettersson', focus: ['AI'] },
  { name: 'Albin Mårtensson', focus: ['Simulation'] },
];

export default function TeamPage() {
  // Group members by focus area
  const membersByFocus = {
    AI: teamMembers.filter(m => m.focus.includes('AI')),
    Simulation: teamMembers.filter(m => m.focus.includes('Simulation')),
    Testbed: teamMembers.filter(m => m.focus.includes('Testbed')),
  };

  const getFocusBadgeColor = (focus: string) => {
    switch (focus) {
      case 'AI':
        return 'bg-blue-100 dark:bg-blue-900/20 text-blue-700 dark:text-blue-300';
      case 'Simulation':
        return 'bg-purple-100 dark:bg-purple-900/20 text-purple-700 dark:text-purple-300';
      case 'Testbed':
        return 'bg-green-100 dark:bg-green-900/20 text-green-700 dark:text-green-300';
      default:
        return 'bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300';
    }
  };

  return (
    <div className="flex flex-col min-h-screen bg-white dark:bg-gray-800">
      <Navbar 
        breadcrumb="O-RAN AI Research Project / Team"
        navItems={[
          { label: 'Documentation', href: '/documentation' },
          { label: 'Blog', href: '/blog' },
          { label: 'Team', href: '/team' },
        ]}
      />
      
      <Container>
        <div className="py-12 md:py-20">
          {/* Header */}
          <div className="text-center mb-16">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4">
              Our Team
            </h1>
            <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
              Meet the researchers and engineers working on advancing O-RAN networks through AI, simulation, and testbed development.
            </p>
          </div>

          {/* Team Members Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
            {teamMembers.map((member, index) => (
              <div
                key={index}
                className="group p-6 rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 hover:shadow-lg transition-all hover:-translate-y-1"
              >
                {/* Avatar placeholder */}
                <div className="w-20 h-20 rounded-full bg-gradient-to-br from-blue-500 to-purple-500 flex items-center justify-center text-white text-2xl font-bold mb-4 mx-auto group-hover:scale-110 transition-transform">
                  {member.name.split(' ').map(n => n[0]).join('')}
                </div>
                
                {/* Name */}
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white text-center mb-3">
                  {member.name}
                </h3>
                
                {/* Focus areas */}
                <div className="flex flex-wrap gap-2 justify-center">
                  {member.focus.map((f, idx) => (
                    <span
                      key={idx}
                      className={`px-3 py-1 text-xs font-medium rounded-full ${getFocusBadgeColor(f)}`}
                    >
                      {f}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>

          {/* Focus Areas Section */}
          <div className="mt-16 pt-12 border-t border-gray-200 dark:border-gray-700">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-8 text-center">
              Research Focus Areas
            </h2>
            <div className="grid md:grid-cols-3 gap-8">
              {/* AI Focus */}
              <div className="p-6 rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-12 h-12 rounded-lg bg-blue-100 dark:bg-blue-900/20 flex items-center justify-center">
                    <svg className="w-6 h-6 text-blue-600 dark:text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                    </svg>
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 dark:text-white">AI</h3>
                </div>
                <p className="text-gray-600 dark:text-gray-300 mb-4">
                  {membersByFocus.AI.length} team member{membersByFocus.AI.length !== 1 ? 's' : ''}
                </p>
                <ul className="space-y-2">
                  {membersByFocus.AI.map((member, idx) => (
                    <li key={idx} className="text-sm text-gray-500 dark:text-gray-400">
                      • {member.name}
                    </li>
                  ))}
                </ul>
              </div>

              {/* Simulation Focus */}
              <div className="p-6 rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-12 h-12 rounded-lg bg-purple-100 dark:bg-purple-900/20 flex items-center justify-center">
                    <svg className="w-6 h-6 text-purple-600 dark:text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 dark:text-white">Simulation</h3>
                </div>
                <p className="text-gray-600 dark:text-gray-300 mb-4">
                  {membersByFocus.Simulation.length} team member{membersByFocus.Simulation.length !== 1 ? 's' : ''}
                </p>
                <ul className="space-y-2">
                  {membersByFocus.Simulation.map((member, idx) => (
                    <li key={idx} className="text-sm text-gray-500 dark:text-gray-400">
                      • {member.name}
                    </li>
                  ))}
                </ul>
              </div>

              {/* Testbed Focus */}
              <div className="p-6 rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-12 h-12 rounded-lg bg-green-100 dark:bg-green-900/20 flex items-center justify-center">
                    <svg className="w-6 h-6 text-green-600 dark:text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
                    </svg>
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 dark:text-white">Testbed</h3>
                </div>
                <p className="text-gray-600 dark:text-gray-300 mb-4">
                  {membersByFocus.Testbed.length} team member{membersByFocus.Testbed.length !== 1 ? 's' : ''}
                </p>
                <ul className="space-y-2">
                  {membersByFocus.Testbed.map((member, idx) => (
                    <li key={idx} className="text-sm text-gray-500 dark:text-gray-400">
                      • {member.name}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </Container>

      {/* Footer */}
      <footer className="py-8 bg-gray-900 dark:bg-black text-gray-400 border-t border-gray-800 mt-auto">
        <div className="container mx-auto px-8 text-center">
          <p className="text-sm">
            © {new Date().getFullYear()} O-RAN AI Research Project | Luleå University of Technology
          </p>
        </div>
      </footer>
    </div>
  );
}