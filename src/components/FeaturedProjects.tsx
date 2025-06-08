// components/FeaturedProjects.tsx
import React from 'react';

interface ProjectCard {
  id: string;
  title: string;
  description: string;
  imageUrl: string;
}

const FeaturedProjects: React.FC = () => {
  const featuredProjects: ProjectCard[] = [
    {
      id: 'casino-of-life',
      title: 'Casino of Life',
      description: 'Build the only game that matters.',
      imageUrl: '/images/logo.png',
    },
    {
      id: 'dolphin-project',
      title: 'Dolphin Project',
      description: 'The pythonothic solana project for the Casino of Life.',
      imageUrl: '/images/dolphin-project.png',
    },
    {
      id: 'caballo-loko',
      title: 'Caballo Loko',
      description: 'The AI behind the Casino of Life and Dolphin',
      imageUrl: '/images/caballo-logo.png',
    }
  ];

  return (
    <section className="mb-10">
      <h2 className="text-2xl font-bold mb-6 text-primary">FEATURED PROJECTS</h2>
      
      <div className="carousel rounded-box overflow-hidden">
        {featuredProjects.map((project) => (
          <div key={project.id} className="carousel-item w-full md:w-1/2 lg:w-1/3 p-2">
            <div className="card bg-base-200 shadow-xl h-full">
              <figure className="h-48 relative">
                <img src={project.imageUrl} alt={project.title} className="w-full h-full object-cover" />
                <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-base-300 to-transparent">
                  <h3 className="text-xl font-bold text-primary">{project.title}</h3>
                </div>
              </figure>
              <div className="card-body">
                <p className="mb-4 text-sm text-base-content">{project.description}</p>
                <div className="card-actions justify-end">
                  <button className="btn btn-primary btn-sm">
                    BUILD
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default FeaturedProjects;