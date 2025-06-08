import React, { useEffect, useState } from 'react';
import { 
  FaCogs, 
  FaGamepad,
  FaTools, 
  FaPython,
  FaRobot
} from 'react-icons/fa';
import { GiDolphin } from "react-icons/gi";
import { MdCasino, MdGames } from "react-icons/md";
import { FaBots } from "react-icons/fa6";
import CodeBlock from '../codeblock/code-block';

const CimaiBasics = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  const dolphinGameCode = `
from dolphin.prelude import *
from casino_of_life.agents import DynamicAgent

@program("HeLLo777777777777777777777777777777777777777")
class RetroFightingGame:
    @account
    class GameState(GameState):
        player: Pubkey
        character: str
        wins: u64
        last_match: UnixTimestamp

    @instruction
    def initialize(
        self,
        state: GameState,
        authority: Signer,
        system_program: Program = SYSTEM_PROGRAM_ID
    ):
        state.authority = authority.key()
        state.character = "Liu Kang"
        state.wins = 0

    @instruction
    def record_match(
        self,
        state: GameState,
        player: Signer,
        won: bool,
        clock: Clock = CLOCK_SYSVAR_ID
    ):
        assert state.authority == player.key(), "Invalid player"
        if won:
            state.wins += 1
        state.last_match = clock.unix_timestamp
`;

  const casinoTrainingCode = `
from casino_of_life.agents import DynamicAgent, CaballoLoko
from casino_of_life.environment import RetroEnv

# Initialize AI training assistant
caballo = CaballoLoko()
response = caballo.chat("Train Liu Kang to be aggressive with fireballs")

# Create environment and agent
env = RetroEnv(
    game='MortalKombatII-Genesis',
    state='tournament',
    players=2
)

# Initialize training agent
agent = DynamicAgent(
    env=env,
    policy='PPO',
    learning_rate=0.0003
)

# Start training with natural language guidance
agent.train(timesteps=100000)
`;

  return (
    <div className="min-h-screen bg-gradient-to-b from-base-300 to-base-100">
      {/* Hero Section */}
      <div className="relative min-h-screen flex items-center justify-center overflow-hidden">
        {/* Background animations */}
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-gradient-to-r from-purple-900/20 to-primary/20 animate-gradient" />
          <div className="absolute inset-0 bg-[url('/api/placeholder/1920/1080')] bg-cover bg-center opacity-10" />
        </div>

        {/* Floating elements */}
        <div className="absolute inset-0 overflow-hidden">
          {[...Array(20)].map((_, i) => (
            <div
              key={i}
              className="absolute animate-float"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 5}s`,
                animationDuration: `${5 + Math.random() * 10}s`
              }}
            >
              <div className="w-4 h-4 bg-primary/20 rounded-full blur-sm" />
            </div>
          ))}
        </div>

        {/* Main Hero Content */}
        <div className={`relative z-10 max-w-6xl mx-auto px-4 text-center transform transition-all duration-1000 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
          <div className="flex justify-center items-center space-x-4 mb-6">
            <GiDolphin className="text-7xl text-primary" />
            <span className="text-4xl">+</span>
            <MdCasino className="text-7xl text-secondary" />
          </div>
          
          <h1 className="text-7xl font-bold mb-6 bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
            Casino Development Ecosystem
          </h1>
          
          <p className="text-2xl mb-12 max-w-3xl mx-auto leading-relaxed">
            Leverage Blockchain with Dolphin&apos;s Solana integration and train AI agents using Casino of Life&apos;s natural language interface.
          </p>

          {/* Feature Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
            <div className="bg-base-200/80 backdrop-blur-lg p-6 rounded-xl shadow-lg transform hover:scale-105 transition-transform">
              <FaPython className="text-5xl text-primary mx-auto mb-4" />
              <h3 className="text-xl font-semibold mb-2">Solana Retro Game Integration</h3>
              <p>Create specific styled contracts for your retro games using Python with Dolphin Framework</p>
            </div>

            <div className="bg-base-200/80 backdrop-blur-lg p-6 rounded-xl shadow-lg transform hover:scale-105 transition-transform">
              <FaRobot className="text-5xl text-primary mx-auto mb-4" />
              <h3 className="text-xl font-semibold mb-2">Natural Language AI Training</h3>
              <p>Train game agents using plain English with CaballoLoko assistant</p>
            </div>

            <div className="bg-base-200/80 backdrop-blur-lg p-6 rounded-xl shadow-lg transform hover:scale-105 transition-transform">
              <MdGames className="text-5xl text-primary mx-auto mb-4" />
              <h3 className="text-xl font-semibold mb-2">Retro Game Support</h3>
              <p>Built-in support for classic fighting games like Mortal Kombat II and More to Come!</p>
            </div>
          </div>

          {/* Code Examples */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
            <div className="text-left">
              <h3 className="text-xl font-semibold mb-4">Dolphin Game Contract</h3>
              <CodeBlock code={dolphinGameCode} language="python" />
            </div>
            <div className="text-left">
              <h3 className="text-xl font-semibold mb-4">Casino of Life Training</h3>
              <CodeBlock code={casinoTrainingCode} language="python" />
            </div>
          </div>

          {/* Framework Features */}
          <div className="container mx-auto px-4 py-16 max-w-6xl">
            <h2 className="text-4xl font-bold mb-12 text-center bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
              Integrated Features
            </h2>
            <div className="grid gap-8">
              <div className="bg-base-200 p-6 rounded-lg shadow-lg flex items-center">
                <FaCogs className="text-4xl text-primary mr-6" />
                <div>
                  <h3 className="text-xl font-semibold mb-2">Blockchain Integration</h3>
                  <p>Record game statistics and achievements on Solana while training AI agents for gameplay</p>
                </div>
              </div>

              <div className="bg-base-200 p-6 rounded-lg shadow-lg flex items-center">
                <FaGamepad className="text-4xl text-primary mr-6" />
                <div>
                  <h3 className="text-xl font-semibold mb-2">Advanced Game AI</h3>
                  <p>Train sophisticated fighting game AI using natural language with built-in reward systems</p>
                </div>
              </div>

              <div className="bg-base-200 p-6 rounded-lg shadow-lg flex items-center">
                <FaTools className="text-4xl text-primary mr-6" />
                <div>
                  <h3 className="text-xl font-semibold mb-2">Development Tools</h3>
                  <p>Comprehensive suite of tools for both blockchain development and AI training</p>
                </div>
              </div>
            </div>
          </div>

          {/* Benefits Section */}
          <div className="mb-16 container mx-auto px-4 max-w-6xl">
            <h2 className="text-3xl font-semibold mb-8 text-center">Platform Benefits</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-base-200 p-6 rounded-lg shadow-lg">
                <div className="flex items-center mb-4">
                  <GiDolphin className="text-3xl text-secondary mr-4" />
                  <h3 className="text-xl font-semibold">Dolphin Framework</h3>
                </div>
                <p>Create blockchain-enabled retro game agents using Python with Solana&apos;s performance</p>
              </div>

              <div className="bg-base-200 p-6 rounded-lg shadow-lg">
                <div className="flex items-center mb-4">
                  <MdCasino className="text-3xl text-secondary mr-4" />
                  <h3 className="text-xl font-semibold">Casino of Life</h3>
                </div>
                <p>Train game AI agents using natural language with CaballoLoko assistant</p>
              </div>

              <div className="bg-base-200 p-6 rounded-lg shadow-lg">
                <div className="flex items-center mb-4">
                  <FaTools className="text-3xl text-secondary mr-4" />
                  <h3 className="text-xl font-semibold">Integrated Tools</h3>
                </div>
                <p>Full suite of development, testing, and training tools for both platforms</p>
              </div>

              <div className="bg-base-200 p-6 rounded-lg shadow-lg">
                <div className="flex items-center mb-4">
                  <FaBots className="text-3xl text-secondary mr-4" />
                  <h3 className="text-xl font-semibold">AI Integration</h3>
                </div>
                <p>Seamless connection between blockchain games and trained AI agents</p>
              </div>
            </div>
          </div>

          {/* Call to Action */}
          <div className="bg-base-200 p-8 rounded-lg shadow-lg text-center container mx-auto max-w-4xl mb-16">
            <h2 className="text-3xl font-semibold mb-4">Start Building Today</h2>
            <p className="text-lg mb-6">
              Create smart contracts for retro games and train AI agents with our integrated ecosystem
            </p>
            <div className="flex justify-center gap-4">
              <a href="https://docs.cimai.biz" className="btn btn-primary">
                Read Docs
              </a>
              <a href="https://github.com/Cimai-Decentralized-Games" className="btn btn-secondary">
                View on GitHub
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CimaiBasics;