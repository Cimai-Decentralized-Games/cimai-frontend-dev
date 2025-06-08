// components/HeroSection.tsx
import React from 'react';
import Image from 'next/image';

const HeroSection: React.FC = () => {
  return (
    <section className="relative mb-10 rounded-lg overflow-hidden">
      <div className="border-2 bg-base-300 p-1">
        {/* Background container with custom theme colors */}
        <div className="relative bg-base-200 rounded-sm overflow-hidden">
          {/* Hero image with CRT overlay */}
          <div className="absolute inset-0 z-0">
            <Image 
              src="/images/cimai.png" 
              alt="Cimai"
              fill
              className="object-cover opacity-30"
            />
          </div>
          
          {/* Content */}
          <div className="relative z-10 py-12 px-6 md:py-24 md:px-12 text-center">
            <h2 className="orbitron text-4xl md:text-6xl font-bold mb-6">
              <span className="text-primary">This is </span><br />
              <span className="text-accent">CIMAI</span>
            </h2>
            <p className="max-w-2xl mx-auto mb-8 text-lg text-base-content">
              We build what nobody will.. <br />Because they know better
            </p>
            <button className="btn btn-primary btn-lg orbitron">
              Join us
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;