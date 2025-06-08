'use client';

import React, { useRef } from 'react';
import Link from 'next/link';
import { motion, useScroll, useTransform } from 'framer-motion';
import { ChevronDown } from 'lucide-react';
import Footer from '../Footer';
import CasinoNewsViewer from '../CasinoNewsViewer';

const HomePage: React.FC = () => {
  const heroRef = useRef(null);
  const { scrollYProgress } = useScroll({ target: heroRef });
  const translateY = useTransform(scrollYProgress, [0, 1], [0, -50]);

  const casinoNews = [
    {
      title: "Don't be Gay",
      description: "Breaking News on the Return of Crazy Horse and the Casino of Life and Box Office!",
      video: "/col-promo-news-meme.mp4",
    },
    {
      title: "LIBERTIES DE CHICA",
      description: "Caballo Loko has gone too far! Calls for the replacement of the Statue of Liberty!",
      video: "/liberties-de-chica-promo.mp4",
    },
    {
      title: "The Brits are down bad!",
      description: "The Casino of Life War Machine cannot stop taking SOL's for FreeDUMBS!",
      video: "/col-news-promo-vid-3.mp4",
    }
  ];

  return (
    <div className="bg-base-100 text-base-content min-h-screen">
      {/* Hero Section */}
      <section id="hero" ref={heroRef} className="relative w-full h-screen overflow-hidden">
        <video
          autoPlay
          loop
          muted
          playsInline
          className="absolute w-full h-full object-cover opacity-70"
        >
          <source src="/cimai.mp4" type="video/mp4" />
          Your browser does not support the video tag.
        </video>

        <div className="absolute inset-0 flex flex-col justify-center items-center text-white text-center p-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
            style={{ y: translateY }}
          >
            <h1 className="text-6xl font-bold mb-4">Cimai</h1>
            <p className="text-xl mb-8">
              We don&apos;t just build what you love, we build what you love retarded
            </p>
            <Link href="/cimai-portal" passHref>
              <button className="btn btn-secondary btn-lg">Get Retardio</button>
            </Link>
          </motion.div>
        </div>
        
        {/* Scroll indicator */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
          <ChevronDown className="w-10 h-10 text-white opacity-70" />
        </div>
      </section>

      {/* Casino News Section - With Card Container */}
      <section className="py-20 px-4 md:px-8 bg-base-200">
        <div className="container mx-auto">
          <div className="card bg-base-300 shadow-xl mb-12">
            <div className="card-body text-center">
              <h2 className="text-4xl font-bold text-primary">
                The Casino of Life News 
              </h2>
              <p className="text-lg opacity-80">
                Stay updated with the latest from the Casino of Life
              </p>
            </div>
          </div>
          
          <CasinoNewsViewer newsItems={casinoNews} />
        </div>
      </section>
      
      {/* Footer Section */}
      <Footer />
    </div>
  );
};

export default HomePage; 