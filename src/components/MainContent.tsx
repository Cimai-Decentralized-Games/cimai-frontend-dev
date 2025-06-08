// components/MainContent.tsx
import React from 'react';
import HeroSection from './HeroSection';

const MainContent: React.FC = () => {
  return (
    <div className="space-y-16">
      {/* Hero Section */}
      <HeroSection />
      
      {/* Featured Projects Section */}
      <section className="py-10">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold mb-8 text-primary">FEATURED PROJECTS</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Casino of Life */}
            <div className="card bg-base-200 shadow-xl hover:shadow-2xl transition-all duration-300 hover:-translate-y-1">
              <figure className="px-4 pt-4">
                <img src="/images/logo.png" alt="Casino of Life" className="rounded-xl h-48 w-full object-cover" />
              </figure>
              <div className="card-body">
                <h3 className="card-title text-primary">Casino of Life</h3>
                <p>Build the only game that matters.</p>
                <div className="card-actions justify-end mt-4">
                  <button className="btn btn-primary">BUILD</button>
                </div>
              </div>
            </div>
            
            {/* Dolphin Project */}
            <div className="card bg-base-200 shadow-xl hover:shadow-2xl transition-all duration-300 hover:-translate-y-1">
              <figure className="px-4 pt-4">
                <img src="/images/dolphin-project.png" alt="Dolphin Project" className="rounded-xl h-48 w-full object-cover" />
              </figure>
              <div className="card-body">
                <h3 className="card-title text-primary">Dolphin Project</h3>
                <p>The pythonothic solana project for the Casino of Life.</p>
                <div className="card-actions justify-end mt-4">
                  <button className="btn btn-primary">BUILD</button>
                </div>
              </div>
            </div>
            
            {/* Caballo Loko */}
            <div className="card bg-base-200 shadow-xl hover:shadow-2xl transition-all duration-300 hover:-translate-y-1">
              <figure className="px-4 pt-4">
                <img src="/images/caballo-logo.png" alt="Caballo Loko" className="rounded-xl h-48 w-full object-cover" />
              </figure>
              <div className="card-body">
                <h3 className="card-title text-primary">Caballo Loko</h3>
                <p>The AI behind the Casino of Life and Dolphin.</p>
                <div className="card-actions justify-end mt-4">
                  <button className="btn btn-primary">BUILD</button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default MainContent;





