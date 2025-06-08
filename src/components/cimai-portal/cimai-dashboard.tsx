'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaBrain, FaChartLine, FaMoneyBillWave } from 'react-icons/fa';
import CimaiBasics from './cimai-basics';
import CimaiDac from './cimai-dac';
import ColCurve from './col-curve';

type CimaiDashboardProps = Record<string, never>;

const tools = [
  {
    title: "Cimai Basics",
    description: "Learn the basics of the Dolphin Project and the Casino of Life",
    component: "cimai-basics",
    Icon: FaBrain,
    image: "/images/rapr_caballo.png",
    alt: "Cimai Basics visualization"
  },
  {
    title: "Cimai Sex Curve",
    description: "The intelligent Controller and the future of programmable money",
    component: "cimai-sex-curve",
    Icon: FaChartLine,
    image: "/images/sex-token-chica.png",
    alt: "Cimai Sex Curve visualization"
  },
  {
    title: "Cimai DAC",
    description: "The Decentralized Autonomous Corporation",
    component: "cimai-dac",
    Icon: FaMoneyBillWave,
    image: "/images/cimai-dac.png",
    alt: "Cimai DAC visualization"
  }
];

const CimaiDashboard: React.FC<CimaiDashboardProps> = () => {
  const [activeComponent, setActiveComponent] = useState<string | null>(null);

  const renderComponent = () => {
    switch (activeComponent) {
      case 'cimai-basics':
        return <CimaiBasics />;
      case 'cimai-sex-curve':
        return <ColCurve />;
      case 'cimai-dac':
        return <CimaiDac />;
      default:
        return null;
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <AnimatePresence mode="wait">
        {!activeComponent ? (
          <motion.div
            key="dashboard"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="flex flex-col items-center"
          >
            <h1 className="text-3xl font-bold text-center mb-8">Cimai Labs</h1>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {tools.map((tool) => (
                <motion.div
                  key={tool.component}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5 }}
                  className="flex justify-center"
                >
                  <div className="card bg-base-100 w-full shadow-xl hover:shadow-2xl transition-shadow duration-300">
                    <figure className="px-6 pt-6">
                      <img
                        src={tool.image}
                        alt={tool.alt}
                        className="rounded-xl h-48 w-full object-cover"
                        onError={(e) => {
                          const target = e.target as HTMLImageElement;
                          target.src = "https://picsum.photos/400/200";
                        }}
                      />
                    </figure>
                    <div className="card-body items-center text-center">
                      <h2 className="card-title flex items-center gap-2">
                        <tool.Icon className="text-primary" />
                        {tool.title}
                      </h2>
                      <p className="mb-4">{tool.description}</p>
                      <div className="card-actions">
                        <button 
                          className="btn btn-primary"
                          onClick={() => setActiveComponent(tool.component)}
                        >
                          Explore
                        </button>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        ) : (
          <motion.div
            key="component"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="bg-base-200 p-6 rounded-lg shadow-lg"
          >
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold">
                {tools.find(t => t.component === activeComponent)?.title}
              </h2>
              <button 
                className="btn btn-secondary"
                onClick={() => setActiveComponent(null)}
              >
                Back to Dashboard
              </button>
            </div>
            {renderComponent()}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default CimaiDashboard;
