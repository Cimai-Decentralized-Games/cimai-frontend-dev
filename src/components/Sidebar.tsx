// components/Sidebar.tsx
import React from 'react';
import Link from 'next/link';

interface FeaturedItem {
  id: string;
  name: string;
  icon: string;
}

interface ContributorItem {
  id: string;
  name: string;
  bounties: number;
}

const Sidebar: React.FC = () => {
  const projects: FeaturedItem[] = [
    { id: 'casino-of-life', name: 'Casino of LIfe', icon: '🎮' },
    { id: 'dolphin-project', name: 'Dolphin Project', icon: '🎲' },
    { id: 'dac', name: 'Cimai DAC', icon: '🃏' },
  ];

  const employeeLeaderboard: ContributorItem[] = [
    { id: 'reno', name: 'RENO', bounties: 487 },
    { id: 'caballo-loko', name: 'Caballo Loko', bounties: 943 },
    { id: 'gary', name: 'Gary', bounties: 1 },
  ];

  return (
    <aside className="w-64 bg-gray-900 bg-opacity-80 border-r border-cyan-900 min-h-screen overflow-y-auto">
      <div className="p-4">
        <div className="mb-6">
          <h3 className="orbitron text-xl neon-text-pink mb-3">FEATURED PROJECTS MENU</h3>
          <ul className="space-y-2">
            {projects.map((project) => (
              <li key={project.id} className="p-2 hover:bg-purple-900 hover:bg-opacity-30 rounded transition-all">
                <Link href={`/projects/${project.id}`} className="flex items-center">
                  <span className="mr-2">{project.icon}</span> 
                  <span>{project.name}</span>
                </Link>
              </li>
            ))}
          </ul>
        </div>
        
        <div className="mb-6">
          <h3 className="orbitron text-xl neon-text-blue mb-3">EMPLOYEE LEADERBOARD</h3>
          <div className="space-y-3">
            {employeeLeaderboard.map((player) => (
              <div key={player.id} className="flex justify-between p-2 bg-blue-900 bg-opacity-20 rounded">
                <span>{player.name}</span>
                <span className="neon-text-blue">{player.bounties.toLocaleString()}</span>
              </div>
            ))}
          </div>
        </div>
        
        <div className="p-3 rounded neon-border">
          <h3 className="orbitron text-center mb-2">MINT DUMBS</h3>
          <div className="text-center font-bold text-2xl neon-text-pink">
            5,000
          </div>
          <button className="w-full mt-2 py-1 bg-gradient-to-r from-pink-600 to-purple-700 rounded text-sm">
            PAY ME
          </button>
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;