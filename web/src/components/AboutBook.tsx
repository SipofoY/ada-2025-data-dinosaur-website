'use client';

import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Mail, Github, Linkedin, ArrowLeft, ArrowRight } from 'lucide-react';
import { Starburst } from './ComicElements';

interface AboutBookProps {
  onNext?: () => void;
  onPrev?: () => void;
}

export function AboutBook({ onNext, onPrev }: AboutBookProps) {
  const [currentId, setCurrentId] = useState(510);
  const minId = 510;
  const maxId = 895;

  // Base path for GitHub Pages deployment
  const basePath = process.env.NODE_ENV === 'production' ? '/ada-2025-data-dinosaur-website' : '';

  const handlePrevImage = () => {
    setCurrentId((prev) => {
      let nextId = prev - 1;
      if (nextId === 525) nextId = 524; // Skip missing 525
      return nextId < minId ? maxId : nextId;
    });
  };

  const handleNextImage = () => {
    setCurrentId((prev) => {
      let nextId = prev + 1;
      if (nextId === 525) nextId = 526; // Skip missing 525
      return nextId > maxId ? minId : nextId;
    });
  };

  const [currentCaption, setCurrentCaption] = useState<string>('');

  React.useEffect(() => {
    const fetchCaption = async () => {
      try {
        const response = await fetch(`${basePath}/data/data_with_llm_top30/${currentId}.csv`);
        const text = await response.text();
        const lines = text.split('\n');
        if (lines.length > 1) {
          // Parse the first data line (index 1)
          // Regex to capture rank, then caption (quoted or unquoted)
          // Matches: start | digits | comma | "groups" OR non-comma | comma
          const match = lines[1].match(/^(\d+),(?:"([^"]*)"|([^,]*)),/);
          if (match) {
            // Group 2 is quoted caption, Group 3 is unquoted
            setCurrentCaption(match[2] || match[3] || '');
          }
        }
      } catch (error) {
        console.error('Error fetching caption:', error);
        setCurrentCaption('');
      }
    };

    fetchCaption();
  }, [currentId, basePath]);

  const findings = [
    {
      title: 'Pandemic Dominance',
      text: '26.7% of captions from 2020-2021',
      color: '#E63946'
    },
    {
      title: 'Tech Anxiety Surge',
      text: '340% growth from 2016 to 2023',
      color: '#F4A261'
    },
    {
      title: 'Political Cyclicity',
      text: '85% correlation with Google Trends',
      color: '#457B9D'
    },
    {
      title: 'Climate Persistence',
      text: 'Steady growth, increasingly urgent',
      color: '#2A9D8F'
    }
  ];

  return (
    <div className="h-full flex flex-col">
      {/* Page Title */}
      <div className="text-center mb-6">
        <Starburst color="#2A9D8F" size={120}>
          About
        </Starburst>
      </div>

      {/* Two Column Layout with Separator */}
      <div className="flex flex-row gap-0 flex-1 relative">
        {/* Left Column - Story & Cartoons */}
        <div className="flex-1 pr-8">
          <div className="inline-block mb-4 px-4 py-2 bg-[#457B9D] border-3 border-[#1A1A1A]">
            <h2 className="comic-title text-sm text-[#FDFDF8]">The Story</h2>
          </div>

          <div className="border-4 border-[#1A1A1A] p-4 bg-white mb-4" style={{ boxShadow: '4px 4px 0 #1A1A1A' }}>
            <div className="space-y-3 comic-text text-xs leading-relaxed">
              <p>
                The New Yorker Cartoon Caption Contest has been delighting readers
                since 2005, becoming a cultural touchstone that reflects our collective
                sense of humor.
              </p>
              <p>
                This project analyzes how humor evolved from 2016 to 2023—a period
                marked by political upheaval, technological transformation, a global
                pandemic, and climate crisis.
              </p>
              <p>
                By analyzing 587 winning captions through machine learning, we uncovered
                five distinct humor clusters and tracked how they shifted alongside
                world events.
              </p>
            </div>
          </div>

          <div
            className="mb-4"
            style={{
              backgroundColor: 'transparent',
              paddingTop: '2rem',
              paddingBottom: '3rem',
              width: '100%',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center'
            }}
          >
            {/* Aligned Container for Everything */}
            <div style={{ width: '440px', maxWidth: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>

              <div className="inline-block mb-2 px-4 py-2 bg-[#F4A261] border-3 border-[#1A1A1A]">
                <h2 className="comic-title text-sm text-[#FDFDF8]">Cartoons</h2>
              </div>
              <p className="comic-text text-sm mb-6 text-center w-full" style={{ fontWeight: 'bold', fontStyle: 'italic' }}>#{currentId}</p>

              {/* Caption Display */}
              <div className="min-h-[3rem] mb-4 flex items-end justify-center px-4">
                <p className="comic-text text-lg text-center font-bold leading-tight w-full">
                  {currentCaption && `"${currentCaption}"`}
                </p>
              </div>

              {/* The Square - Now Displaying Images */}
              <div
                style={{
                  width: '100%',
                  height: '350px',
                  border: '6px solid #000000ff',
                  backgroundColor: '#FFFFFF',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  position: 'relative',
                  overflow: 'hidden',
                  boxShadow: '4px 4px 0 #1A1A1A'
                }}
              >
                <img
                  src={`${basePath}/data/images/${currentId}.jpg`}
                  alt={`New Yorker Cartoon ${currentId}`}
                  style={{
                    width: '100%',
                    height: '100%',
                    objectFit: 'contain',
                    display: 'block'
                  }}
                  onError={(e) => {
                    (e.target as HTMLImageElement).style.display = 'none';
                  }}
                />
              </div>

              {/* Navigation Buttons */}
              <div style={{ marginTop: '1rem', display: 'flex', justifyContent: 'space-between', width: '100%' }}>
                <button
                  onClick={handlePrevImage}
                  className="interactive-cta bg-white text-[#1A1A1A] hover:opacity-100 transition-opacity"
                >
                  ← Previous
                </button>
                <button
                  onClick={handleNextImage}
                  className="interactive-cta bg-[#F4A261] text-white"
                >
                  Next →
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Central Separator - Robust Implementation */}
        <div className="w-[1px] border-r-2 border-dashed border-[#1A1A1A] h-auto my-12 opacity-30 mx-6 self-stretch"></div>

        {/* Right Column - Key Findings & Credits */}
        <div className="flex-1 pl-8">
          <div className="inline-block mb-4 px-4 py-2 bg-[#E63946] border-3 border-[#1A1A1A]">
            <h2 className="comic-title text-sm text-[#FDFDF8]">Key Findings</h2>
          </div>

          <div className="space-y-3 mb-4">
            {findings.map((finding, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
                className="border-4 border-[#1A1A1A] p-3 bg-white"
                style={{ boxShadow: '3px 3px 0 #1A1A1A' }}
              >
                <div className="flex items-start gap-2">
                  <div
                    className="w-2 h-2 border-2 border-[#1A1A1A] rounded-full flex-shrink-0 mt-1"
                    style={{ backgroundColor: finding.color }}
                  />
                  <div>
                    <h4 className="comic-title text-xs mb-1" style={{ color: finding.color }}>
                      {finding.title}
                    </h4>
                    <p className="comic-text text-[10px] opacity-80">
                      {finding.text}
                    </p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Credits */}
          <div className="border-4 border-[#1A1A1A] p-4 bg-white" style={{ boxShadow: '4px 4px 0 #1A1A1A' }}>
            <div className="inline-block mb-3 px-3 py-1 bg-[#F4A261] border-2 border-[#1A1A1A]">
              <h3 className="comic-title text-xs text-[#FDFDF8]">Credits</h3>
            </div>

            <div className="space-y-2 text-[10px] comic-text">
              <p>📚 The New Yorker Contest Archive</p>
              <p>📈 Google Trends API</p>
              <p>🗞️ Historical Event Databases</p>
            </div>

            <div className="mt-4 pt-3 border-t-2 border-[#1A1A1A] border-dashed">
              <p className="text-[10px] comic-text mb-3">
                Independent research, not affiliated with The New Yorker
              </p>
              <div className="flex gap-2">
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  className="w-8 h-8 bg-[#E63946] text-[#FDFDF8] rounded-full flex items-center justify-center border-2 border-[#1A1A1A]"
                  style={{ boxShadow: '2px 2px 0 #1A1A1A' }}
                >
                  <Mail size={14} />
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  className="w-8 h-8 bg-[#457B9D] text-[#FDFDF8] rounded-full flex items-center justify-center border-2 border-[#1A1A1A]"
                  style={{ boxShadow: '2px 2px 0 #1A1A1A' }}
                >
                  <Github size={14} />
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  className="w-8 h-8 bg-[#2A9D8F] text-[#FDFDF8] rounded-full flex items-center justify-center border-2 border-[#1A1A1A]"
                  style={{ boxShadow: '2px 2px 0 #1A1A1A' }}
                >
                  <Linkedin size={14} />
                </motion.button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
