import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { JournalSpread } from './JournalSpread';
import { Starburst, SoundEffect, SpeechBubble, ComicPanel } from './ComicElements';

interface TimelineEvent {
  id: string;
  date: string;
  year: number;
  position: number;
  cluster: string;
  keywords: string[];
  cartoonTheme: string;
  color: string;
  worldEvents: string[];
  wordData: { word: string; count: number }[];
  trendsData: { month: string; interest: number }[];
}

export function Timeline() {
  const [hoveredNode, setHoveredNode] = useState<string | null>(null);
  const [selectedEvent, setSelectedEvent] = useState<TimelineEvent | null>(null);

  // Mock timeline events data
  const events: TimelineEvent[] = [
    {
      id: '1',
      date: 'Jan 2016',
      year: 2016,
      position: 2,
      cluster: 'Political Satire',
      keywords: ['election', 'campaign', 'debate'],
      cartoonTheme: 'Election Season',
      color: '#457B9D',
      worldEvents: [
        'U.S. Presidential Election Campaign begins',
        'Brexit referendum announced',
        'Zika virus outbreak'
      ],
      wordData: [
        { word: 'election', count: 245 },
        { word: 'vote', count: 198 },
        { word: 'campaign', count: 167 },
        { word: 'debate', count: 143 },
        { word: 'poll', count: 121 }
      ],
      trendsData: [
        { month: 'Jan', interest: 45 },
        { month: 'Feb', interest: 52 },
        { month: 'Mar', interest: 61 },
        { month: 'Apr', interest: 70 },
        { month: 'May', interest: 78 },
        { month: 'Jun', interest: 85 }
      ]
    },
    {
      id: '2',
      date: 'Nov 2016',
      year: 2016,
      position: 11,
      cluster: 'Political Satire',
      keywords: ['shocked', 'upset', 'results'],
      cartoonTheme: 'Election Results',
      color: '#457B9D',
      worldEvents: [
        'Donald Trump elected President',
        'Post-election protests',
        'Political polarization intensifies'
      ],
      wordData: [
        { word: 'shocked', count: 289 },
        { word: 'upset', count: 234 },
        { word: 'results', count: 221 },
        { word: 'surprise', count: 198 },
        { word: 'reaction', count: 176 }
      ],
      trendsData: [
        { month: 'Jul', interest: 82 },
        { month: 'Aug', interest: 88 },
        { month: 'Sep', interest: 91 },
        { month: 'Oct', interest: 95 },
        { month: 'Nov', interest: 100 },
        { month: 'Dec', interest: 87 }
      ]
    },
    {
      id: '3',
      date: 'Mar 2017',
      year: 2017,
      position: 15,
      cluster: 'Tech Anxiety',
      keywords: ['smartphone', 'social', 'media'],
      cartoonTheme: 'Digital Life',
      color: '#F4A261',
      worldEvents: [
        'Facebook reaches 2 billion users',
        'iPhone X announced',
        'Social media addiction concerns rise'
      ],
      wordData: [
        { word: 'phone', count: 312 },
        { word: 'social', count: 267 },
        { word: 'media', count: 245 },
        { word: 'screen', count: 198 },
        { word: 'online', count: 187 }
      ],
      trendsData: [
        { month: 'Jan', interest: 65 },
        { month: 'Feb', interest: 71 },
        { month: 'Mar', interest: 78 },
        { month: 'Apr', interest: 82 },
        { month: 'May', interest: 88 },
        { month: 'Jun', interest: 91 }
      ]
    },
    {
      id: '4',
      date: 'Sep 2018',
      year: 2018,
      position: 33,
      cluster: 'Work-Life Absurdity',
      keywords: ['office', 'meeting', 'boss'],
      cartoonTheme: 'Corporate Culture',
      color: '#2A9D8F',
      worldEvents: [
        'Remote work begins gaining traction',
        'Corporate wellness programs expand',
        'Open office debate intensifies'
      ],
      wordData: [
        { word: 'meeting', count: 298 },
        { word: 'office', count: 276 },
        { word: 'boss', count: 234 },
        { word: 'work', count: 221 },
        { word: 'email', count: 198 }
      ],
      trendsData: [
        { month: 'Jul', interest: 55 },
        { month: 'Aug', interest: 61 },
        { month: 'Sep', interest: 68 },
        { month: 'Oct', interest: 72 },
        { month: 'Nov', interest: 67 },
        { month: 'Dec', interest: 63 }
      ]
    },
    {
      id: '5',
      date: 'Feb 2019',
      year: 2019,
      position: 38,
      cluster: 'Climate Crisis',
      keywords: ['climate', 'earth', 'environment'],
      cartoonTheme: 'Environmental Concerns',
      color: '#2A9D8F',
      worldEvents: [
        'Youth climate strikes begin',
        'Amazon rainforest fires',
        'Greta Thunberg addresses UN'
      ],
      wordData: [
        { word: 'climate', count: 334 },
        { word: 'earth', count: 289 },
        { word: 'environment', count: 256 },
        { word: 'future', count: 234 },
        { word: 'crisis', count: 211 }
      ],
      trendsData: [
        { month: 'Jan', interest: 72 },
        { month: 'Feb', interest: 79 },
        { month: 'Mar', interest: 85 },
        { month: 'Apr', interest: 88 },
        { month: 'May', interest: 92 },
        { month: 'Jun', interest: 87 }
      ]
    },
    {
      id: '6',
      date: 'Mar 2020',
      year: 2020,
      position: 51,
      cluster: 'Pandemic',
      keywords: ['mask', 'distance', 'zoom'],
      cartoonTheme: 'COVID-19 Begins',
      color: '#E63946',
      worldEvents: [
        'WHO declares COVID-19 pandemic',
        'Global lockdowns begin',
        'Toilet paper shortage'
      ],
      wordData: [
        { word: 'mask', count: 456 },
        { word: 'zoom', count: 398 },
        { word: 'distance', count: 367 },
        { word: 'quarantine', count: 334 },
        { word: 'home', count: 312 }
      ],
      trendsData: [
        { month: 'Jan', interest: 12 },
        { month: 'Feb', interest: 23 },
        { month: 'Mar', interest: 100 },
        { month: 'Apr', interest: 98 },
        { month: 'May', interest: 91 },
        { month: 'Jun', interest: 85 }
      ]
    },
    {
      id: '7',
      date: 'Jun 2020',
      year: 2020,
      position: 54,
      cluster: 'Pandemic',
      keywords: ['lockdown', 'sourdough', 'netflix'],
      cartoonTheme: 'Pandemic Life',
      color: '#E63946',
      worldEvents: [
        'Lockdown lifestyle normalizes',
        'Tiger King phenomenon',
        'Sourdough bread craze'
      ],
      wordData: [
        { word: 'lockdown', count: 412 },
        { word: 'netflix', count: 356 },
        { word: 'sourdough', count: 298 },
        { word: 'bored', count: 276 },
        { word: 'home', count: 267 }
      ],
      trendsData: [
        { month: 'Jan', interest: 15 },
        { month: 'Feb', interest: 28 },
        { month: 'Mar', interest: 95 },
        { month: 'Apr', interest: 100 },
        { month: 'May', interest: 97 },
        { month: 'Jun', interest: 88 }
      ]
    },
    {
      id: '8',
      date: 'Nov 2020',
      year: 2020,
      position: 59,
      cluster: 'Political Satire',
      keywords: ['mail', 'ballot', 'vote'],
      cartoonTheme: 'Election Pandemic',
      color: '#457B9D',
      worldEvents: [
        'U.S. Presidential Election',
        'Mail-in voting surge',
        'Election result disputes'
      ],
      wordData: [
        { word: 'vote', count: 478 },
        { word: 'ballot', count: 389 },
        { word: 'mail', count: 356 },
        { word: 'election', count: 334 },
        { word: 'count', count: 298 }
      ],
      trendsData: [
        { month: 'Jul', interest: 68 },
        { month: 'Aug', interest: 75 },
        { month: 'Sep', interest: 82 },
        { month: 'Oct', interest: 91 },
        { month: 'Nov', interest: 100 },
        { month: 'Dec', interest: 76 }
      ]
    },
    {
      id: '9',
      date: 'Jan 2021',
      year: 2021,
      position: 61,
      cluster: 'Political Satire',
      keywords: ['capitol', 'riot', 'insurrection'],
      cartoonTheme: 'Political Chaos',
      color: '#457B9D',
      worldEvents: [
        'Capitol riot January 6th',
        'Presidential transition',
        'Political divisions deepen'
      ],
      wordData: [
        { word: 'capitol', count: 445 },
        { word: 'riot', count: 398 },
        { word: 'democracy', count: 367 },
        { word: 'chaos', count: 334 },
        { word: 'unprecedented', count: 298 }
      ],
      trendsData: [
        { month: 'Jan', interest: 100 },
        { month: 'Feb', interest: 87 },
        { month: 'Mar', interest: 72 },
        { month: 'Apr', interest: 65 },
        { month: 'May', interest: 58 },
        { month: 'Jun', interest: 52 }
      ]
    },
    {
      id: '10',
      date: 'Jun 2021',
      year: 2021,
      position: 66,
      cluster: 'Work-Life Absurdity',
      keywords: ['remote', 'office', 'hybrid'],
      cartoonTheme: 'Return to Office',
      color: '#2A9D8F',
      worldEvents: [
        'Companies plan office returns',
        '"Great Resignation" begins',
        'Hybrid work debates'
      ],
      wordData: [
        { word: 'remote', count: 423 },
        { word: 'hybrid', count: 378 },
        { word: 'office', count: 356 },
        { word: 'return', count: 312 },
        { word: 'quit', count: 289 }
      ],
      trendsData: [
        { month: 'Jan', interest: 68 },
        { month: 'Feb', interest: 72 },
        { month: 'Mar', interest: 79 },
        { month: 'Apr', interest: 85 },
        { month: 'May', interest: 91 },
        { month: 'Jun', interest: 88 }
      ]
    },
    {
      id: '11',
      date: 'Mar 2022',
      year: 2022,
      position: 75,
      cluster: 'Global Crisis',
      keywords: ['ukraine', 'crisis', 'war'],
      cartoonTheme: 'International Conflict',
      color: '#8D5B4C',
      worldEvents: [
        'Russia invades Ukraine',
        'Global sanctions imposed',
        'Energy crisis begins'
      ],
      wordData: [
        { word: 'ukraine', count: 489 },
        { word: 'war', count: 445 },
        { word: 'crisis', count: 412 },
        { word: 'peace', count: 378 },
        { word: 'conflict', count: 356 }
      ],
      trendsData: [
        { month: 'Jan', interest: 32 },
        { month: 'Feb', interest: 58 },
        { month: 'Mar', interest: 100 },
        { month: 'Apr', interest: 91 },
        { month: 'May', interest: 82 },
        { month: 'Jun', interest: 74 }
      ]
    },
    {
      id: '12',
      date: 'Nov 2022',
      year: 2022,
      position: 83,
      cluster: 'Tech Anxiety',
      keywords: ['twitter', 'musk', 'chaos'],
      cartoonTheme: 'Social Media Drama',
      color: '#F4A261',
      worldEvents: [
        'Elon Musk buys Twitter',
        'Mass tech layoffs',
        'Crypto market crash'
      ],
      wordData: [
        { word: 'twitter', count: 467 },
        { word: 'musk', count: 423 },
        { word: 'chaos', count: 389 },
        { word: 'layoff', count: 356 },
        { word: 'crypto', count: 334 }
      ],
      trendsData: [
        { month: 'Jul', interest: 52 },
        { month: 'Aug', interest: 61 },
        { month: 'Sep', interest: 68 },
        { month: 'Oct', interest: 85 },
        { month: 'Nov', interest: 100 },
        { month: 'Dec', interest: 87 }
      ]
    },
    {
      id: '13',
      date: 'Mar 2023',
      year: 2023,
      position: 87,
      cluster: 'Tech Anxiety',
      keywords: ['AI', 'chatgpt', 'robot'],
      cartoonTheme: 'AI Revolution',
      color: '#F4A261',
      worldEvents: [
        'ChatGPT goes mainstream',
        'AI concerns escalate',
        'Job automation fears'
      ],
      wordData: [
        { word: 'AI', count: 512 },
        { word: 'chatgpt', count: 478 },
        { word: 'robot', count: 445 },
        { word: 'intelligence', count: 412 },
        { word: 'future', count: 389 }
      ],
      trendsData: [
        { month: 'Jan', interest: 45 },
        { month: 'Feb', interest: 68 },
        { month: 'Mar', interest: 100 },
        { month: 'Apr', interest: 95 },
        { month: 'May', interest: 88 },
        { month: 'Jun', interest: 82 }
      ]
    },
    {
      id: '14',
      date: 'Dec 2023',
      year: 2023,
      position: 96,
      cluster: 'Climate Crisis',
      keywords: ['climate', 'heat', 'record'],
      cartoonTheme: 'Climate Records',
      color: '#2A9D8F',
      worldEvents: [
        'Hottest year on record',
        'Climate summit',
        'Extreme weather events'
      ],
      wordData: [
        { word: 'climate', count: 534 },
        { word: 'heat', count: 498 },
        { word: 'record', count: 467 },
        { word: 'extreme', count: 434 },
        { word: 'emergency', count: 412 }
      ],
      trendsData: [
        { month: 'Jul', interest: 91 },
        { month: 'Aug', interest: 95 },
        { month: 'Sep', interest: 88 },
        { month: 'Oct', interest: 82 },
        { month: 'Nov', interest: 87 },
        { month: 'Dec', interest: 93 }
      ]
    }
  ];

  return (
    <>
      <div className="min-h-screen pt-32 pb-24 px-8">
        <div className="max-w-[1440px] mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-16"
          >
            <div className="inline-block mb-6">
              <Starburst color="#E63946" size={160}>
                Timeline
              </Starburst>
            </div>
            <SpeechBubble color="white" className="max-w-2xl mx-auto">
              <p className="text-lg comic-text">
                Explore key moments in humor evolution from 2016 to 2023. 
                Click on any speech bubble to view detailed analysis and context!
              </p>
            </SpeechBubble>
          </motion.div>

          {/* Timeline Container */}
          <ComicPanel className="p-12 mb-12">
            <div className="relative py-24">
              {/* Main Timeline Line - Centered and Pretty */}
              <div className="relative h-80">
                {/* Decorative background line with shadow */}
                <div 
                  className="absolute top-1/2 left-0 right-0 h-3 transform -translate-y-1/2 rounded-full"
                  style={{
                    background: 'linear-gradient(90deg, #E63946 0%, #F4A261 25%, #2A9D8F 50%, #457B9D 75%, #8D5B4C 100%)',
                    boxShadow: '0 6px 0 #1A1A1A30, 0 8px 20px rgba(0,0,0,0.2)'
                  }}
                />
                
                {/* Comic-style halftone overlay on line */}
                <div 
                  className="absolute top-1/2 left-0 right-0 h-3 transform -translate-y-1/2 rounded-full opacity-20 halftone"
                  style={{ backgroundColor: '#1A1A1A' }}
                />

                {/* Year Markers ON the line */}
                {[2016, 2017, 2018, 2019, 2020, 2021, 2022, 2023].map((year, idx) => {
                  const position = (idx / 7) * 100;
                  return (
                    <motion.div
                      key={year}
                      className="absolute top-1/2 transform -translate-y-1/2"
                      style={{ left: `${position}%` }}
                      initial={{ scale: 0, rotate: 180 }}
                      animate={{ scale: 1, rotate: 0 }}
                      transition={{ delay: idx * 0.1, type: 'spring', bounce: 0.6 }}
                    >
                      {/* Year node on the line */}
                      <div className="relative flex flex-col items-center">
                        <div
                          className="w-16 h-16 border-4 border-[#1A1A1A] rounded-full bg-[#FDFDF8] flex items-center justify-center transform -translate-x-1/2"
                          style={{
                            boxShadow: '4px 4px 0 #1A1A1A',
                            background: `linear-gradient(135deg, #FDFDF8 0%, #FFF 100%)`
                          }}
                        >
                          <span className="comic-title text-sm">{year}</span>
                        </div>
                      </div>
                    </motion.div>
                  );
                })}

                {/* Event Bubbles Above and Below the Line */}
                {events.map((event, index) => {
                  const isHovered = hoveredNode === event.id;
                  const isAbove = index % 2 === 0;
                  
                  return (
                    <motion.div
                      key={event.id}
                      className="absolute"
                      style={{
                        left: `${event.position}%`,
                        top: isAbove ? '-20%' : '120%',
                        transform: 'translateX(-50%)',
                      }}
                      initial={{ scale: 0, rotate: isAbove ? -180 : 180 }}
                      animate={{ scale: 1, rotate: 0 }}
                      transition={{ delay: 0.8 + index * 0.08, type: 'spring', bounce: 0.5 }}
                    >
                      <motion.button
                        className="relative"
                        whileHover={{ scale: 1.15, rotate: isAbove ? -8 : 8 }}
                        whileTap={{ scale: 0.95 }}
                        onHoverStart={() => setHoveredNode(event.id)}
                        onHoverEnd={() => setHoveredNode(null)}
                        onClick={() => setSelectedEvent(event)}
                      >
                        {/* Speech Bubble Node */}
                        <div 
                          className="w-32 h-32 border-4 border-[#1A1A1A] rounded-full flex items-center justify-center cursor-pointer relative bg-white overflow-hidden"
                          style={{ 
                            boxShadow: `6px 6px 0px ${event.color}, 6px 6px 0px 3px #1A1A1A`,
                          }}
                        >
                          <div className="text-center p-3 z-10 relative">
                            <div className="comic-title text-xs mb-1" style={{ color: event.color }}>
                              {event.date}
                            </div>
                            <div className="comic-text text-[9px] leading-tight opacity-70">
                              {event.cartoonTheme}
                            </div>
                          </div>
                          
                          {/* Halftone background effect */}
                          <div 
                            className="absolute inset-0 opacity-15 halftone"
                            style={{ backgroundColor: event.color }}
                          />
                        </div>

                        {/* Comic speech bubble tail connecting to timeline */}
                        <svg 
                          className="absolute left-1/2 transform -translate-x-1/2"
                          style={{
                            [isAbove ? 'bottom' : 'top']: '-30px',
                          }}
                          width="40" 
                          height="35" 
                          viewBox="0 0 40 35"
                        >
                          {isAbove ? (
                            <path 
                              d="M 20 0 L 10 30 L 30 30 Z" 
                              fill="white" 
                              stroke="#1A1A1A" 
                              strokeWidth="4"
                            />
                          ) : (
                            <path 
                              d="M 20 35 L 10 5 L 30 5 Z" 
                              fill="white" 
                              stroke="#1A1A1A" 
                              strokeWidth="4"
                            />
                          )}
                        </svg>

                        {/* Hover Tooltip - Comic Panel Style */}
                        <AnimatePresence>
                          {isHovered && (
                            <motion.div
                              initial={{ opacity: 0, scale: 0.8 }}
                              animate={{ opacity: 1, scale: 1 }}
                              exit={{ opacity: 0, scale: 0.8 }}
                              transition={{ type: 'spring', bounce: 0.4 }}
                              className="absolute left-1/2 transform -translate-x-1/2 z-30"
                              style={{
                                [isAbove ? 'top' : 'bottom']: '100%',
                                [isAbove ? 'marginTop' : 'marginBottom']: '20px'
                              }}
                            >
                              <ComicPanel className="w-72 p-4 bg-white">
                                <h4 className="comic-title text-lg mb-2" style={{ color: event.color }}>
                                  {event.cartoonTheme}
                                </h4>
                                <p className="text-sm mb-3 comic-text">
                                  {event.cluster}
                                </p>
                                <div className="flex flex-wrap gap-2 mb-3">
                                  {event.keywords.slice(0, 3).map((keyword, i) => (
                                    <span
                                      key={i}
                                      className="text-xs px-3 py-1 bg-[#FDFDF8] border-2 border-[#1A1A1A] comic-text"
                                    >
                                      #{keyword}
                                    </span>
                                  ))}
                                </div>
                                <div className="text-xs handwritten text-[#E63946]">
                                  ← Click to explore!
                                </div>
                              </ComicPanel>
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </motion.button>
                    </motion.div>
                  );
                })}
              </div>
            </div>
          </ComicPanel>

          {/* Legend - Comic Style */}
          <div className="text-center mb-8">
            <SoundEffect text="Humor Types!" color="#F4A261" className="text-4xl" />
          </div>
          <div className="flex flex-wrap justify-center gap-6">
            {[
              { label: 'Political Satire', color: '#457B9D' },
              { label: 'Tech Anxiety', color: '#F4A261' },
              { label: 'Work-Life Absurdity', color: '#2A9D8F' },
              { label: 'Pandemic', color: '#E63946' },
              { label: 'Climate Crisis', color: '#2A9D8F' },
              { label: 'Global Crisis', color: '#8D5B4C' }
            ].map((item, index) => (
              <motion.div 
                key={index} 
                className="flex items-center gap-2"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.5 + index * 0.05 }}
              >
                <div
                  className="w-6 h-6 border-3 border-[#1A1A1A] transform rotate-45"
                  style={{ 
                    backgroundColor: item.color,
                    boxShadow: '2px 2px 0px #1A1A1A'
                  }}
                />
                <span className="comic-text">{item.label}</span>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* Journal Spread Modal */}
      <AnimatePresence>
        {selectedEvent && (
          <JournalSpread 
            event={selectedEvent} 
            onClose={() => setSelectedEvent(null)}
          />
        )}
      </AnimatePresence>
    </>
  );
}