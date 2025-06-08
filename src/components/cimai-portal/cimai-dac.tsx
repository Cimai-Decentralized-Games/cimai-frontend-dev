'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { FaCode, FaCoins, FaChartLine, FaUsersCog, FaRocket, FaLaptopCode } from 'react-icons/fa';

type ContributionStep = {
  id: number;
  title: string;
  description: string;
  icon: React.ComponentType<{ className?: string; size?: number }>;
  color: string;
};

type RewardMetric = {
  name: string;
  description: string;
  value: number; // Percentage or multiplier
  color: string;
};

const CimaiDac: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'flow' | 'compensation' | 'definition'>('definition');
  
  // Define the contribution flow steps
  const contributionSteps: ContributionStep[] = [
    {
      id: 1,
      title: "Discovery",
      description: "Browse available projects and tasks in our open repository",
      icon: FaRocket,
      color: "bg-blue-500"
    },
    {
      id: 2,
      title: "Engagement",
      description: "Select work that matches your skills and interests",
      icon: FaUsersCog,
      color: "bg-purple-500"
    },
    {
      id: 3,
      title: "Submission",
      description: "Deliver your contribution through our GitHub integration",
      icon: FaCode,
      color: "bg-green-500"
    },
    {
      id: 4,
      title: "Validation",
      description: "Automatic validation through our smart contract system",
      icon: FaLaptopCode,
      color: "bg-yellow-500"
    },
    {
      id: 5,
      title: "Impact Assessment",
      description: "AI-assisted evaluation of your contribution's value",
      icon: FaChartLine,
      color: "bg-red-500"
    },
    {
      id: 6,
      title: "Compensation",
      description: "Immediate payment based on predetermined metrics",
      icon: FaCoins,
      color: "bg-indigo-500"
    }
  ];

  // Define reward metrics
  const rewardMetrics: RewardMetric[] = [
    {
      name: "Code Quality",
      description: "Clean, well-documented, and efficient code",
      value: 35,
      color: "bg-blue-500"
    },
    {
      name: "Feature Impact",
      description: "How significantly the contribution improves the product",
      value: 30,
      color: "bg-green-500"
    },
    {
      name: "Community Adoption",
      description: "How many users benefit from your contribution",
      value: 20,
      color: "bg-purple-500"
    },
    {
      name: "Technical Complexity",
      description: "Difficulty and sophistication of the solution",
      value: 15,
      color: "bg-orange-500"
    }
  ];

  const renderDefinition = () => (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="space-y-6"
    >
      <div className="p-6 bg-gradient-to-r from-orange-900 to-indigo-900 rounded-lg shadow-xl">
        <h2 className="text-3xl font-bold text-white mb-4">The Cimai DAC</h2>
        <p className="text-white text-lg mb-4">
          A Decentralized Autonomous Corporation (DAC) that combines the focus of traditional 
          enterprises with the freedom of decentralized participation.
        </p>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">
          <div className="bg-black/30 p-5 rounded-lg">
            <h3 className="text-xl font-bold text-white mb-3">Beyond DAOs</h3>
            <p className="text-white">
              While DAOs often focus on governance without product direction, 
              Cimai DAC maintains clear product vision while distributing value creation opportunities.
            </p>
          </div>
          
          <div className="bg-black/30 p-5 rounded-lg">
            <h3 className="text-xl font-bold text-white mb-3">Merit-Based</h3>
            <p className="text-white">
              Compensation directly tied to contribution value, not titles or seniority. 
              Anyone can contribute and be rewarded based on impact.
            </p>
          </div>
          
          <div className="bg-black/30 p-5 rounded-lg">
            <h3 className="text-xl font-bold text-white mb-3">Products Over Narratives</h3>
            <p className="text-white">
              We focus on building market-moving products rather than narratives.
              Real innovation drives value in our ecosystem.
            </p>
          </div>
          
          <div className="bg-black/30 p-5 rounded-lg">
            <h3 className="text-xl font-bold text-white mb-3">Global & Borderless</h3>
            <p className="text-white">
              Contributors from anywhere can participate without traditional barriers.
              Blockchain-enabled collaboration without geographical limitations.
            </p>
          </div>
        </div>
      </div>
    </motion.div>
  );

  const renderContributionFlow = () => (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="space-y-6"
    >
      <h2 className="text-2xl font-bold">The Contribution Flow</h2>
      <p className="text-gray-700 dark:text-gray-300">
        From discovery to compensation, here&apos;s how contributing to Cimai works:
      </p>
      
      <div className="relative">
        {/* Flow line */}
        <div className="absolute left-5 top-6 h-full w-1 bg-gray-300 dark:bg-gray-700 z-0 hidden md:block" />
        
        {/* Steps */}
        <div className="space-y-8">
          {contributionSteps.map((step) => (
            <div key={step.id} className="flex flex-col md:flex-row items-start md:items-center gap-4">
              <div className={`flex-shrink-0 w-10 h-10 rounded-full ${step.color} flex items-center justify-center z-10`}>
                {React.createElement(step.icon, { className: "text-white", size: 20 })}
              </div>
              <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow flex-grow">
                <h3 className="font-bold text-lg">{step.title}</h3>
                <p className="text-gray-600 dark:text-gray-400">{step.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
      
      <div className="bg-blue-50 dark:bg-blue-900/30 p-4 rounded-lg mt-8">
        <h3 className="font-bold text-lg mb-2">Ready to Start?</h3>
        <p>
          Connect your wallet, set up your contributor profile, and start browsing 
          available opportunities across Dolphin Framework and Casino of Life.
        </p>
      </div>
    </motion.div>
  );

  const renderCompensation = () => (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="space-y-6"
    >
      <h2 className="text-2xl font-bold">Real-Time Compensation</h2>
      <p className="text-gray-700 dark:text-gray-300">
        Our smart contracts don&apos;t just track contributions—they enable immediate payment 
        based on predetermined value metrics:
      </p>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-4">
        {rewardMetrics.map((metric) => (
          <div 
            key={metric.name} 
            className="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden"
          >
            <div className={`${metric.color} h-2`} />
            <div className="p-4">
              <div className="flex justify-between items-center mb-2">
                <h3 className="font-bold">{metric.name}</h3>
                <span className="text-sm font-semibold">{metric.value}%</span>
              </div>
              <p className="text-sm text-gray-600 dark:text-gray-400">{metric.description}</p>
              <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2.5 mt-3">
                <div 
                  className={`h-2.5 rounded-full ${metric.color}`} 
                  style={{ width: `${metric.value}%` }}
                ></div>
              </div>
            </div>
          </div>
        ))}
      </div>
      
      <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md mt-6">
        <h3 className="font-bold text-lg mb-4">Compensation Features</h3>
        <ul className="space-y-3">
          <li className="flex items-start gap-2">
            <div className="bg-green-500 rounded-full p-1 flex-shrink-0 mt-1">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3 text-white" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
              </svg>
            </div>
            <span>No waiting for payday or approval processes</span>
          </li>
          <li className="flex items-start gap-2">
            <div className="bg-green-500 rounded-full p-1 flex-shrink-0 mt-1">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3 text-white" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
              </svg>
            </div>
            <span>Transparent evaluation criteria established in advance</span>
          </li>
          <li className="flex items-start gap-2">
            <div className="bg-green-500 rounded-full p-1 flex-shrink-0 mt-1">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3 text-white" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
              </svg>
            </div>
            <span>Objective measurement of contribution impact</span>
          </li>
          <li className="flex items-start gap-2">
            <div className="bg-green-500 rounded-full p-1 flex-shrink-0 mt-1">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3 text-white" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
              </svg>
            </div>
            <span>Automatic escalation of payment based on contribution quality</span>
          </li>
        </ul>
      </div>
    </motion.div>
  );

  return (
    <div className="container mx-auto">
      <h1 className="text-3xl font-bold mb-6">Cimai Decentralized Autonomous Corporation</h1>
      
      {/* Tab navigation */}
      <div className="flex border-b border-gray-200 dark:border-gray-700 mb-6">
        <button
          className={`px-4 py-2 font-medium ${activeTab === 'definition' ? 'text-blue-500 border-b-2 border-blue-500' : 'text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300'}`}
          onClick={() => setActiveTab('definition')}
        >
          What is a DAC?
        </button>
        <button
          className={`px-4 py-2 font-medium ${activeTab === 'flow' ? 'text-blue-500 border-b-2 border-blue-500' : 'text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300'}`}
          onClick={() => setActiveTab('flow')}
        >
          Contribution Flow
        </button>
        <button
          className={`px-4 py-2 font-medium ${activeTab === 'compensation' ? 'text-blue-500 border-b-2 border-blue-500' : 'text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300'}`}
          onClick={() => setActiveTab('compensation')}
        >
          Real-Time Compensation
        </button>
      </div>
      
      {/* Tab content */}
      <div className="p-4">
        {activeTab === 'definition' && renderDefinition()}
        {activeTab === 'flow' && renderContributionFlow()}
        {activeTab === 'compensation' && renderCompensation()}
      </div>
    </div>
  );
};

export default CimaiDac;