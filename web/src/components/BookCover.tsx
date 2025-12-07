import React from 'react';
import { motion } from 'motion/react';
import { ChevronRight } from 'lucide-react';
import { Starburst, SoundEffect } from './ComicElements';

interface BookCoverProps {
  onTurn?: () => void;
}

export function BookCover({ onTurn }: BookCoverProps) {
  return (
    <div className="h-full flex flex-col items-center justify-center relative">
      {/* Decorative corners */}
      <div className="absolute top-8 left-8">
        <motion.div
          animate={{ rotate: [0, 5, 0, -5, 0] }}
          transition={{ repeat: Infinity, duration: 4 }}
        >
          <Starburst color="#F4A261" size={80}>
            POW!
          </Starburst>
        </motion.div>
      </div>

      <div className="absolute top-8 right-8">
        <motion.div
          animate={{ rotate: [0, -5, 0, 5, 0] }}
          transition={{ repeat: Infinity, duration: 3.5 }}
        >
          <Starburst color="#457B9D" size={70}>
            HA!
          </Starburst>
        </motion.div>
      </div>

      {/* Main Title */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, delay: 0.2 }}
        className="text-center mb-6 px-6"
      >
        <h1
          className="comic-title mb-4"
          style={{
            fontSize: '8.5rem',
            textShadow: `6px 6px 0px #E63946, 12px 12px 0px #1A1A1A`,
            lineHeight: '0.95',
            letterSpacing: '3px',
            margin: 0,
          }}
        >
          Chronicle
          <br />
          of Humor
        </h1>
        {/* Tagline */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
          className="comic-text text-lg text-[#8B4513] mt-3 max-w-3xl mx-auto"
        >
          A Data Visualization Journey Through The New Yorker Caption Contest
        </motion.p>
      </motion.div>

      {/* Subtitle */}
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8, delay: 0.5 }}
        className="inline-block bg-[#E63946] px-8 py-3 border-4 border-[#1A1A1A] transform -rotate-2 mb-6"
        style={{ boxShadow: '7px 7px 0 #1A1A1A' }}
      >
        <span className="comic-title text-[#FDFDF8] text-3xl">2016-2023</span>
      </motion.div>

      {/* Quick Summary Box */}
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8, delay: 0.9 }}
        className="bg-[#FFF9E6] border-4 border-[#1A1A1A] px-6 py-3 mb-8 transform rotate-1 max-w-4xl w-[80%] mx-auto"
        style={{ boxShadow: '5px 5px 0 #1A1A1A' }}
      >
        <p className="comic-title text-sm text-[#8B4513] mb-1">Quick Summary</p>
        <p className="handwritten text-lg text-[#1A1A1A]">
          7 years • 12,000 captions • 581 winners — uncovering how humor evolves with society
        </p>
      </motion.div>

      {/* Centered Icon CTA */}
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 1.2 }}
        className="flex flex-col items-center gap-3"
      >
        <motion.button
          type="button"
          aria-label="Turn the page"
          onClick={() => onTurn?.()}
          animate={{ scale: [1, 1.12, 1] }}
          transition={{ duration: 1.4, repeat: Infinity }}
          className="w-16 h-16 rounded-full bg-[#E63946] flex items-center justify-center border-4 border-[#1A1A1A] text-white"
          style={{ boxShadow: '4px 4px 0 #1A1A1A', cursor: onTurn ? 'pointer' : 'default' }}
        >
          <ChevronRight size={20} />
        </motion.button>
        <div className="handwritten text-sm text-[#1A1A1A]">Turn the page to begin</div>
      </motion.div>

      {/* Bottom corners */}
      <div className="absolute bottom-8 left-8 w-16 h-16 border-l-4 border-b-4 border-[#1A1A1A]" />
      <div className="absolute bottom-8 right-8 w-16 h-16 border-r-4 border-b-4 border-[#1A1A1A]" />
      <div className="absolute top-8 left-8 w-16 h-16 border-l-4 border-t-4 border-[#1A1A1A]" />
      <div className="absolute top-8 right-8 w-16 h-16 border-r-4 border-t-4 border-[#1A1A1A]" />
    </div>
  );
}
