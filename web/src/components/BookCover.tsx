import React from 'react';
import { motion } from 'motion/react';
import { ChevronRight } from 'lucide-react';
import { Starburst } from './ComicElements';

interface BookCoverProps {
  onTurn?: () => void;
}

export function BookCover({ onTurn }: BookCoverProps) {
  return (
    <div className="w-full h-full flex flex-col items-center justify-center gap-8 px-6 relative">
      {/* Decorative corners - top starbursts */}
      <div className="absolute top-12 left-12">
        <motion.div
          animate={{ rotate: [0, 5, 0, -5, 0] }}
          transition={{ repeat: Infinity, duration: 4 }}
        >
          <Starburst color="#F4A261" size={80}>
            POW!
          </Starburst>
        </motion.div>
      </div>

      <div className="absolute top-12 right-12">
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
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8, delay: 0.1 }}
        className="text-center"
      >
        <h1
          className="comic-title leading-none"
          style={{
            fontSize: 'clamp(5rem, 16vw, 13rem)',
            textShadow: `7px 7px 0px #E63946, 14px 14px 0px #1A1A1A`,
            lineHeight: '0.85',
            letterSpacing: '2px',
            margin: 0,
            color: '#1A1A1A',
          }}
        >
          Chronicle
          <br />
          of Humor
        </h1>
      </motion.div>

      {/* Tagline */}
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3, duration: 0.6 }}
        className="comic-text text-center text-base text-[#8B4513] max-w-2xl"
      >
        A Data Visualization Journey Through The New Yorker Caption Contest
      </motion.p>

      {/* Year Box */}
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8, delay: 0.4 }}
        className="bg-[#E63946] px-8 py-2 border-4 border-[#1A1A1A] transform -rotate-2"
        style={{ boxShadow: '6px 6px 0 #1A1A1A' }}
      >
        <span className="comic-title text-[#FDFDF8] text-3xl font-bold">2016-2023</span>
      </motion.div>

      {/* Quick Summary Box */}
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8, delay: 0.6 }}
        className="bg-[#FFF9E6] border-4 border-[#1A1A1A] px-8 py-4 transform rotate-1 max-w-2xl text-center"
        style={{ boxShadow: '5px 5px 0 #1A1A1A' }}
      >
        <p className="comic-title text-sm text-[#8B4513] font-bold mb-2 uppercase">Quick Summary</p>
        <p className="comic-title text-base text-[#1A1A1A] font-bold uppercase tracking-tight">
          7 YEARS • 12,000 CAPTIONS • 581 WINNERS — UNCOVERING HOW HUMOR EVOLVES WITH SOCIETY
        </p>
      </motion.div>

      {/* Big Teal CTA Button */}
      <motion.button
        type="button"
        aria-label="Turn the page"
        onClick={() => onTurn?.()}
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8, delay: 0.8 }}
        whileHover={{ scale: 1.08 }}
        whileTap={{ scale: 0.95 }}
        className="mt-8 px-16 py-6 bg-[#2A9D8F] text-white border-4 border-[#1A1A1A] rounded-xl comic-title text-3xl font-bold tracking-wide flex items-center justify-center gap-4"
        style={{ boxShadow: '8px 8px 0 #1A1A1A', cursor: 'pointer' }}
      >
        TURN THE PAGE
        <ChevronRight size={36} />
      </motion.button>

      {/* Bottom corners */}
      <div className="absolute bottom-8 left-8 w-16 h-16 border-l-4 border-b-4 border-[#1A1A1A]" />
      <div className="absolute bottom-8 right-8 w-16 h-16 border-r-4 border-b-4 border-[#1A1A1A]" />
      <div className="absolute top-8 left-8 w-16 h-16 border-l-4 border-t-4 border-[#1A1A1A]" />
      <div className="absolute top-8 right-8 w-16 h-16 border-r-4 border-t-4 border-[#1A1A1A]" />
    </div>
  );
}
