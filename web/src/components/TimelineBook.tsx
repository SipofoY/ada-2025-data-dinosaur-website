import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { JournalSpread } from './JournalSpread';
import { Starburst, ComicPanel } from './ComicElements';
import { useData } from '@/context/DataContext';

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

export function TimelineBook() {
  const [hoveredNode, setHoveredNode] = useState<string | null>(null);
  const [selectedEvent, setSelectedEvent] = useState<TimelineEvent | null>(null);

  const { selectedTimeframe, selectTimeframe } = useData();
  // Mock timeline events data (same as before)
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
      id: '6',
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
      id: '7',
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
    }
  ];

  return (
    <>
      <div className="h-full flex flex-col">
        {/* Page Title */}
        <div className="text-center mb-8">
          <Starburst color="#E63946" size={120}>
            Timeline
          </Starburst>
        </div>

        <p className="text-center comic-text mb-8 max-w-2xl mx-auto">
          Click on any moment to explore detailed analysis and context!
        </p>

        {/* Compact Timeline for Book Page */}
        <div className="flex-1 relative">
          {/* Timeline Line */}
          <div 
            className="absolute top-1/2 left-12 right-12 h-2 transform -translate-y-1/2 rounded-full"
            style={{
              background: 'linear-gradient(90deg, #E63946 0%, #F4A261 33%, #2A9D8F 66%, #457B9D 100%)',
              boxShadow: '0 4px 0 #1A1A1A30'
            }}
          />

          {/* Year Markers */}
          {[2016, 2017, 2018, 2019, 2020, 2021, 2022, 2023].map((year, idx) => {
            const position = (idx / 7) * 100;
            return (
              <div
                key={year}
                className="absolute top-1/2 transform -translate-y-1/2"
                style={{ left: `calc(12% + ${position * 0.76}%)` }}
              >
                <div
                  className="w-10 h-10 border-3 border-[#1A1A1A] rounded-full bg-[#FDFDF8] flex items-center justify-center transform -translate-x-1/2"
                  style={{ boxShadow: '3px 3px 0 #1A1A1A' }}
                >
                  <span className="comic-title text-xs">{year}</span>
                </div>
              </div>
            );
          })}

          {/* Event Nodes */}
          {events.map((event, index) => {
            const isAbove = index % 2 === 0;
            
            return (
              <motion.div
                key={event.id}
                className="absolute"
                style={{
                  left: `${12 + event.position * 0.76}%`,
                  top: isAbove ? '25%' : '75%',
                  transform: 'translateX(-50%)',
                }}
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: index * 0.1, type: 'spring' }}
              >
                <motion.button
                  whileHover={{ scale: 1.2 }}
                  whileTap={{ scale: 0.95 }}
                  onHoverStart={() => setHoveredNode(event.id)}
                  onHoverEnd={() => setHoveredNode(null)}
                  onClick={() => {
                    setSelectedEvent(event);
                    selectTimeframe(event.year);
                  }}
                  className="relative"
                >
                  <div 
                    className="w-20 h-20 border-3 border-[#1A1A1A] rounded-full flex flex-col items-center justify-center cursor-pointer relative bg-white overflow-hidden"
                    style={{ 
                      boxShadow: selectedTimeframe === event.year
                        ? `0 0 20px ${event.color}, 4px 4px 0px ${event.color}, 4px 4px 0px 2px #1A1A1A`
                        : `4px 4px 0px ${event.color}, 4px 4px 0px 2px #1A1A1A`,
                    }}
                  >
                    <div className="text-center p-2 z-10">
                      <div className="comic-title text-[10px]" style={{ color: event.color }}>
                        {event.date}
                      </div>
                      <div className="comic-text text-[8px] opacity-70 leading-tight">
                        {event.cartoonTheme.split(' ').slice(0, 2).join(' ')}
                      </div>
                    </div>
                    
                    <div 
                      className="absolute inset-0 opacity-15 halftone"
                      style={{ backgroundColor: event.color }}
                    />
                  </div>

                  {/* Connection line to timeline */}
                  <svg 
                    className="absolute left-1/2 transform -translate-x-1/2"
                    style={{
                      [isAbove ? 'bottom' : 'top']: '-20px',
                    }}
                    width="3" 
                    height="25"
                  >
                    <line 
                      x1="1.5" 
                      y1="0" 
                      x2="1.5" 
                      y2="25" 
                      stroke={event.color} 
                      strokeWidth="3"
                    />
                  </svg>

                  {/* Hover tooltip */}
                  <AnimatePresence>
                    {hoveredNode === event.id && (
                      <motion.div
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.8 }}
                        className="absolute left-1/2 transform -translate-x-1/2 z-50"
                        style={{
                          [isAbove ? 'top' : 'bottom']: '100%',
                          marginTop: isAbove ? '-10px' : '0',
                          marginBottom: isAbove ? '0' : '-10px'
                        }}
                      >
                        <div className="w-48 p-3 bg-white border-3 border-[#1A1A1A] rounded" style={{ boxShadow: '3px 3px 0 #1A1A1A' }}>
                          <p className="comic-title text-xs mb-1" style={{ color: event.color }}>
                            {event.cartoonTheme}
                          </p>
                          <p className="comic-text text-[10px] opacity-70">
                            Click to explore!
                          </p>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.button>
              </motion.div>
            );
          })}
        </div>

        {/* Legend */}
        <div className="mt-8 flex flex-wrap justify-center gap-3 text-xs">
          {[
            { label: 'Political', color: '#457B9D' },
            { label: 'Tech', color: '#F4A261' },
            { label: 'Work-Life', color: '#2A9D8F' },
            { label: 'Pandemic', color: '#E63946' },
          ].map((item, index) => (
            <div key={index} className="flex items-center gap-1">
              <div
                className="w-3 h-3 border-2 border-[#1A1A1A] rounded-full"
                style={{ backgroundColor: item.color }}
              />
              <span className="comic-text">{item.label}</span>
            </div>
          ))}
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
