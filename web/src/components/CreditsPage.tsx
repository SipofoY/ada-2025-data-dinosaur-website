import React from 'react';
import { motion } from 'motion/react';
import { Mail, Github, Linkedin, Heart, BookOpen, Database, Code } from 'lucide-react';
import { Starburst } from './ComicElements';
import { MethodologyInfographic } from './MethodologyInfographic';

export function CreditsPage() {
  return (
    <div className="h-full overflow-y-auto">
      <div className="max-w-6xl mx-auto py-8 px-6">
        {/* Title */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-8"
        >
          <h1 
            className="comic-title mb-4"
            style={{
              fontSize: '3rem',
              textShadow: '3px 3px 0px #E63946, 6px 6px 0px #1A1A1A'
            }}
          >
            Credits & Thanks
          </h1>
        </motion.div>

        {/* Methodology Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="mb-8"
        >
          <MethodologyInfographic />
        </motion.div>

        {/* Credits Grid */}
        <div className="grid grid-cols-2 gap-6 mb-6">
          {/* Authors */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
            className="border-4 border-[#1A1A1A] bg-white p-6"
            style={{ boxShadow: '5px 5px 0 #1A1A1A' }}
          >
            <div className="inline-block mb-4 px-4 py-2 bg-[#457B9D] border-3 border-[#1A1A1A]">
              <h2 className="comic-title text-sm text-[#FDFDF8]">Research Team</h2>
            </div>

            <div className="space-y-3 comic-text text-sm">
              <div>
                <p className="comic-title text-[#457B9D] mb-1">Project Lead</p>
                <p>Dr. Jane Smith</p>
                <p className="text-xs opacity-70">Data Science & Visualization</p>
              </div>
              <div>
                <p className="comic-title text-[#457B9D] mb-1">Machine Learning</p>
                <p>Alex Johnson</p>
                <p className="text-xs opacity-70">NLP & Clustering Analysis</p>
              </div>
              <div>
                <p className="comic-title text-[#457B9D] mb-1">Design & UX</p>
                <p>Maria Garcia</p>
                <p className="text-xs opacity-70">Interactive Visualization</p>
              </div>
            </div>
          </motion.div>

          {/* Data Sources */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 }}
            className="border-4 border-[#1A1A1A] bg-white p-6"
            style={{ boxShadow: '5px 5px 0 #1A1A1A' }}
          >
            <div className="inline-block mb-4 px-4 py-2 bg-[#F4A261] border-3 border-[#1A1A1A]">
              <h2 className="comic-title text-sm text-[#FDFDF8]">Data Sources</h2>
            </div>

            <div className="space-y-3">
              <div className="flex items-start gap-3">
                <BookOpen size={18} className="text-[#457B9D] mt-1 flex-shrink-0" />
                <div className="comic-text text-sm">
                  <p className="comic-title text-[#457B9D]">The New Yorker</p>
                  <p className="text-xs opacity-70">Cartoon Caption Contest Archive</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <Database size={18} className="text-[#2A9D8F] mt-1 flex-shrink-0" />
                <div className="comic-text text-sm">
                  <p className="comic-title text-[#2A9D8F]">Google Trends</p>
                  <p className="text-xs opacity-70">Search Interest Data API</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <Code size={18} className="text-[#E63946] mt-1 flex-shrink-0" />
                <div className="comic-text text-sm">
                  <p className="comic-title text-[#E63946]">News Archives</p>
                  <p className="text-xs opacity-70">Historical Context & Events</p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Tech Stack */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="border-4 border-[#1A1A1A] bg-white p-6 mb-8"
          style={{ boxShadow: '5px 5px 0 #1A1A1A' }}
        >
          <div className="inline-block mb-4 px-4 py-2 bg-[#2A9D8F] border-3 border-[#1A1A1A]">
            <h2 className="comic-title text-sm text-[#FDFDF8]">Built With</h2>
          </div>

          <div className="grid grid-cols-3 gap-6 comic-text text-sm">
            <div>
              <p className="comic-title text-xs mb-2 text-[#457B9D]">Analysis</p>
              <ul className="space-y-1 text-xs">
                <li>• Python 3.9+</li>
                <li>• Pandas & NumPy</li>
                <li>• Scikit-learn</li>
                <li>• NLTK</li>
              </ul>
            </div>
            <div>
              <p className="comic-title text-xs mb-2 text-[#F4A261]">Visualization</p>
              <ul className="space-y-1 text-xs">
                <li>• React & TypeScript</li>
                <li>• Recharts</li>
                <li>• Motion</li>
                <li>• Tailwind CSS</li>
              </ul>
            </div>
            <div>
              <p className="comic-title text-xs mb-2 text-[#2A9D8F]">Tools</p>
              <ul className="space-y-1 text-xs">
                <li>• Jupyter Notebooks</li>
                <li>• Git & GitHub</li>
                <li>• Figma</li>
                <li>• VS Code</li>
              </ul>
            </div>
          </div>
        </motion.div>

        {/* Special Thanks */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="border-4 border-[#1A1A1A] bg-[#FFF9E6] p-6 mb-8"
          style={{ boxShadow: '5px 5px 0 #1A1A1A' }}
        >
          <div className="flex items-center gap-3 mb-4">
            <Heart size={24} className="text-[#E63946]" fill="#E63946" />
            <h2 className="comic-title text-lg text-[#E63946]">Special Thanks</h2>
          </div>
          
          <div className="comic-text text-sm leading-relaxed">
            <p className="mb-3">
              To <span className="comic-title text-[#457B9D]">The New Yorker</span> for maintaining 
              an incredible archive of humor and creativity. To the thousands of contest participants 
              who make us laugh every week.
            </p>
            <p>
              To the open-source community for the amazing tools that made this project possible. 
              And to everyone who appreciates the power of humor to help us understand our world.
            </p>
          </div>
        </motion.div>

        {/* Contact & Social */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
          className="text-center"
        >
          <p className="comic-text text-sm mb-4">
            Questions? Feedback? Get in touch!
          </p>
          <div className="flex justify-center gap-4">
            <motion.button 
              whileHover={{ scale: 1.15, rotate: 5 }}
              whileTap={{ scale: 0.95 }}
              className="w-14 h-14 bg-[#E63946] text-[#FDFDF8] rounded-full flex items-center justify-center border-4 border-[#1A1A1A]"
              style={{ boxShadow: '4px 4px 0 #1A1A1A' }}
            >
              <Mail size={24} />
            </motion.button>
            <motion.button 
              whileHover={{ scale: 1.15, rotate: -5 }}
              whileTap={{ scale: 0.95 }}
              className="w-14 h-14 bg-[#457B9D] text-[#FDFDF8] rounded-full flex items-center justify-center border-4 border-[#1A1A1A]"
              style={{ boxShadow: '4px 4px 0 #1A1A1A' }}
            >
              <Github size={24} />
            </motion.button>
            <motion.button 
              whileHover={{ scale: 1.15, rotate: 5 }}
              whileTap={{ scale: 0.95 }}
              className="w-14 h-14 bg-[#2A9D8F] text-[#FDFDF8] rounded-full flex items-center justify-center border-4 border-[#1A1A1A]"
              style={{ boxShadow: '4px 4px 0 #1A1A1A' }}
            >
              <Linkedin size={24} />
            </motion.button>
          </div>
        </motion.div>

        {/* Citation */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
          className="mt-8 p-4 bg-white border-2 border-[#1A1A1A] border-dashed rounded"
        >
          <p className="handwritten text-xs text-[#8B4513] text-center leading-relaxed">
            Chronicle of Humor: The New Yorker Cartoon Caption Contest Analysis (2016-2023). 
            Interactive Data Visualization Project. © 2024
          </p>
        </motion.div>
      </div>
    </div>
  );
}