import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, LineChart, Line, XAxis, YAxis, CartesianGrid, Legend, BarChart, Bar } from 'recharts';
import { Starburst } from './ComicElements';
import { ChevronDown, ChevronUp, TrendingUp } from 'lucide-react';
import { useData } from '@/context/DataContext';

interface Cluster {
  name: string;
  color: string;
  percentage: number;
  keywords: string[];
  topWords: { word: string; count: number }[];
  description: string;
  examples: string[];
  trend: string;
  icon: string;
}

export function ClustersAnalysis() {
  const [selectedCluster, setSelectedCluster] = useState<Cluster | null>(null);
  const [expandedTopWords, setExpandedTopWords] = useState<string | null>(null);
  const [showEvolution, setShowEvolution] = useState(false);
  const { selectedCluster: contextSelectedCluster } = useData();
  // Sync internal state with context when a cluster is selected from ClustersBook
  React.useEffect(() => {
    if (contextSelectedCluster) {
      const cluster = clusters.find(c => c.name === contextSelectedCluster);
      if (cluster) {
        setSelectedCluster(cluster);
      }
    }
  }, [contextSelectedCluster]);

  const clusters: Cluster[] = [
    {
      name: 'Political Satire',
      color: '#457B9D',
      percentage: 28,
      keywords: ['election', 'vote', 'campaign', 'president', 'politics', 'debate'],
      topWords: [
        { word: 'election', count: 245 },
        { word: 'vote', count: 198 },
        { word: 'president', count: 176 },
        { word: 'campaign', count: 154 },
        { word: 'debate', count: 132 }
      ],
      description: 'Sharp commentary on political figures, events, and the electoral process. Peaks during election years.',
      examples: [
        '"I voted for the other guy"',
        '"This is fine" (during political chaos)',
        '"Make it stop" (election fatigue)'
      ],
      trend: 'Cyclical - spikes every 4 years',
      icon: '🗳️'
    },
    {
      name: 'Tech Anxiety',
      color: '#F4A261',
      percentage: 24,
      keywords: ['AI', 'phone', 'social media', 'robot', 'screen', 'algorithm'],
      topWords: [
        { word: 'AI', count: 312 },
        { word: 'phone', count: 289 },
        { word: 'robot', count: 234 },
        { word: 'screen', count: 198 },
        { word: 'algorithm', count: 176 }
      ],
      description: 'Concerns about technology\'s impact on society, from social media addiction to AI fears.',
      examples: [
        '"The algorithm thinks I\'m interesting"',
        '"My phone knows too much"',
        '"ChatGPT wrote this caption"'
      ],
      trend: 'Rapid growth - 340% increase',
      icon: '🤖'
    },
    {
      name: 'Work-Life Absurdity',
      color: '#2A9D8F',
      percentage: 22,
      keywords: ['office', 'meeting', 'boss', 'remote', 'work', 'email'],
      topWords: [
        { word: 'meeting', count: 356 },
        { word: 'boss', count: 298 },
        { word: 'office', count: 276 },
        { word: 'email', count: 245 },
        { word: 'remote', count: 223 }
      ],
      description: 'Corporate culture humor, workplace dynamics, and the modern work experience.',
      examples: [
        '"This meeting could have been an email"',
        '"I\'m on mute" (Zoom era)',
        '"Synergy achieved"'
      ],
      trend: 'Steady with pandemic spike',
      icon: '💼'
    },
    {
      name: 'Pandemic Life',
      color: '#E63946',
      percentage: 18,
      keywords: ['mask', 'zoom', 'quarantine', 'lockdown', 'covid', 'distance'],
      topWords: [
        { word: 'mask', count: 456 },
        { word: 'zoom', count: 398 },
        { word: 'quarantine', count: 367 },
        { word: 'distance', count: 334 },
        { word: 'home', count: 312 }
      ],
      description: 'COVID-19 specific humor capturing the surreal experience of pandemic life.',
      examples: [
        '"Day 437 of quarantine"',
        '"You\'re on mute"',
        '"Is this essential?"'
      ],
      trend: 'Explosive 2020-2021, declining',
      icon: '😷'
    },
    {
      name: 'Climate Crisis',
      color: '#8D5B4C',
      percentage: 8,
      keywords: ['climate', 'earth', 'environment', 'heat', 'weather', 'crisis'],
      topWords: [
        { word: 'heat', count: 378 },
        { word: 'climate', count: 345 },
        { word: 'earth', count: 298 },
        { word: 'weather', count: 267 },
        { word: 'planet', count: 234 }
      ],
      description: 'Environmental concerns with increasingly urgent tone as climate events intensify.',
      examples: [
        '"At least it\'s a dry heat"',
        '"The planet will be fine without us"',
        '"This is fine" (house on fire)'
      ],
      trend: 'Persistent growth, urgent tone',
      icon: '🌡️'
    }
  ];

  // Evolution of humor categories over time (2016-2023)
  const evolutionData = [
    { year: '2016', Political: 32, Tech: 18, WorkLife: 28, Pandemic: 0, Climate: 12 },
    { year: '2017', Political: 30, Tech: 20, WorkLife: 26, Pandemic: 0, Climate: 14 },
    { year: '2018', Political: 28, Tech: 22, WorkLife: 24, Pandemic: 0, Climate: 16 },
    { year: '2019', Political: 25, Tech: 24, WorkLife: 22, Pandemic: 2, Climate: 18 },
    { year: '2020', Political: 18, Tech: 20, WorkLife: 15, Pandemic: 38, Climate: 9 },
    { year: '2021', Political: 20, Tech: 22, WorkLife: 18, Pandemic: 28, Climate: 12 },
    { year: '2022', Political: 26, Tech: 26, WorkLife: 24, Pandemic: 8, Climate: 16 },
    { year: '2023', Political: 24, Tech: 28, WorkLife: 26, Pandemic: 4, Climate: 18 }
  ];

  const pieData = clusters.map(c => ({ name: c.name, value: c.percentage, color: c.color }));

  return (
    <div className="h-full flex flex-col">
      {/* Page Title */}
      <div className="text-center mb-4">
        <motion.div
          initial={{ scale: 0, rotate: -180 }}
          animate={{ scale: 1, rotate: 0 }}
          transition={{ type: 'spring' }}
        >
          <Starburst color="#2A9D8F" size={100}>
            Clusters
          </Starburst>
        </motion.div>
      </div>

      <div className="flex justify-between items-center mb-4">
        <p className="comic-text text-sm">
          Five distinct humor types identified through machine learning
        </p>
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => setShowEvolution(!showEvolution)}
          className={`px-4 py-2 border-3 border-[#1A1A1A] comic-title text-xs ${
            showEvolution ? 'bg-[#2A9D8F] text-[#FDFDF8]' : 'bg-white text-[#1A1A1A]'
          }`}
          style={{ boxShadow: '3px 3px 0 #1A1A1A' }}
        >
          <TrendingUp size={14} className="inline mr-2" />
          {showEvolution ? 'Hide' : 'Show'} Evolution
        </motion.button>
      </div>

      {/* Evolution Chart (conditionally shown) */}
      <AnimatePresence>
        {showEvolution && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="mb-4"
          >
            <div className="border-4 border-[#1A1A1A] bg-white p-4" style={{ boxShadow: '6px 6px 0 #1A1A1A' }}>
              <div className="inline-block mb-3 px-4 py-1 bg-[#2A9D8F] border-2 border-[#1A1A1A]">
                <h3 className="comic-title text-xs text-[#FDFDF8]">Evolution of Humor Categories (2016-2023)</h3>
              </div>
              <ResponsiveContainer width="100%" height={200}>
                <LineChart data={evolutionData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#1A1A1A" opacity={0.1} />
                    <XAxis 
                      dataKey="year" 
                      tick={{ fontSize: 10, fill: '#1A1A1A' }}
                      stroke="#1A1A1A"
                    />
                  <YAxis 
                    tick={{ fontSize: 10, fill: '#1A1A1A' }}
                    stroke="#1A1A1A"
                    label={{ value: 'Percentage (%)', angle: -90, position: 'insideLeft', style: { fontSize: 10 } }}
                  />
                  <Tooltip 
                    contentStyle={{ 
                      border: '2px solid #1A1A1A', 
                      borderRadius: '4px',
                      fontSize: '10px'
                    }}
                  />
                  <Legend wrapperStyle={{ fontSize: '10px' }} iconType="line" />
                  <Line type="monotone" dataKey="Political" stroke="#457B9D" strokeWidth={2} dot={{ r: 3 }} name="Political" />
                  <Line type="monotone" dataKey="Tech" stroke="#F4A261" strokeWidth={2} dot={{ r: 3 }} name="Tech" />
                  <Line type="monotone" dataKey="WorkLife" stroke="#2A9D8F" strokeWidth={2} dot={{ r: 3 }} name="Work-Life" />
                  <Line type="monotone" dataKey="Pandemic" stroke="#E63946" strokeWidth={2} dot={{ r: 3 }} name="Pandemic" />
                  <Line type="monotone" dataKey="Climate" stroke="#8D5B4C" strokeWidth={2} dot={{ r: 3 }} name="Climate" />
                </LineChart>
              </ResponsiveContainer>
              <p className="comic-text text-[9px] mt-2 opacity-70">
                Shows how each humor type increased/decreased between 2016 and 2023
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Main Content */}
      <div className="flex-1 grid grid-cols-2 gap-6">
        {/* Left: Pie Chart */}
        <motion.div 
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          className="border-4 border-[#1A1A1A] bg-white p-4"
          style={{ boxShadow: '6px 6px 0 #1A1A1A' }}
        >
          <div className="inline-block mb-3 px-4 py-1 bg-[#E63946] border-2 border-[#1A1A1A]">
            <h3 className="comic-title text-xs text-[#FDFDF8]">Distribution</h3>
          </div>

          <ResponsiveContainer width="100%" height="60%">
            <PieChart>
                <Pie
                data={pieData}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={({ percent }) => `${typeof percent === 'number' ? Math.round(percent * 100) : 0}%`}
                outerRadius={80}
                fill="#8884d8"
                dataKey="value"
                stroke="#1A1A1A"
                strokeWidth={3}
              >
                {pieData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip 
                contentStyle={{ 
                  border: '2px solid #1A1A1A', 
                  borderRadius: '4px',
                  fontSize: '11px'
                }}
              />
            </PieChart>
          </ResponsiveContainer>

          {/* Legend with Icons */}
          <div className="space-y-2">
            {clusters.map((cluster, index) => (
              <motion.button
                key={index}
                whileHover={{ scale: 1.02, x: 5 }}
                onClick={() => setSelectedCluster(selectedCluster?.name === cluster.name ? null : cluster)}
                className={`flex items-center gap-3 w-full p-2 border-2 border-[#1A1A1A] ${
                  selectedCluster?.name === cluster.name ? 'bg-[#FFF9E6]' : 'bg-white'
                }`}
              >
                <span className="text-lg">{cluster.icon}</span>
                <span className="comic-title text-xs flex-1 text-left" style={{ color: cluster.color }}>
                  {cluster.name}
                </span>
                <span className="comic-text text-xs">{cluster.percentage}%</span>
              </motion.button>
            ))}
          </div>
        </motion.div>

        {/* Right: Cluster Details */}
        <div>
          <AnimatePresence mode="wait">
            {selectedCluster ? (
              <motion.div
                key={selectedCluster.name}
                initial={{ opacity: 0, x: 30 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 30 }}
                className="border-4 border-[#1A1A1A] bg-white p-4 h-full overflow-y-auto"
                style={{ boxShadow: '6px 6px 0 #1A1A1A' }}
              >
                {/* Header */}
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-2">
                    <span className="text-2xl">{selectedCluster.icon}</span>
                    <h3 className="comic-title text-base" style={{ color: selectedCluster.color }}>
                      {selectedCluster.name}
                    </h3>
                  </div>
                  <span className="comic-title text-2xl" style={{ color: selectedCluster.color }}>
                    {selectedCluster.percentage}%
                  </span>
                </div>

                {/* Description */}
                <p className="comic-text text-xs mb-3 leading-relaxed">
                  {selectedCluster.description}
                </p>

                {/* Trend */}
                <div className="mb-3 p-2 bg-[#FFF9E6] border-l-4" style={{ borderColor: selectedCluster.color }}>
                  <p className="comic-title text-[10px] mb-1" style={{ color: selectedCluster.color }}>
                    Trend Analysis:
                  </p>
                  <p className="handwritten text-xs text-[#8B4513]">
                    {selectedCluster.trend}
                  </p>
                </div>

                {/* Top Words Accordion */}
                <div className="mb-3">
                  <button
                    onClick={() => setExpandedTopWords(expandedTopWords === selectedCluster.name ? null : selectedCluster.name)}
                    className="w-full flex items-center justify-between p-2 bg-[#FDFDF8] border-2 border-[#1A1A1A] hover:bg-[#FFF9E6] transition-colors"
                  >
                    <span className="comic-title text-[10px]" style={{ color: selectedCluster.color }}>
                      Top Words per Cluster
                    </span>
                    {expandedTopWords === selectedCluster.name ? <ChevronUp size={14} /> : <ChevronDown size={14} />}
                  </button>
                  
                  <AnimatePresence>
                    {expandedTopWords === selectedCluster.name && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        className="border-2 border-t-0 border-[#1A1A1A] p-2 bg-white"
                      >
                        <ResponsiveContainer width="100%" height={120}>
                          <BarChart data={selectedCluster.topWords} layout="horizontal">
                            <XAxis type="category" dataKey="word" tick={{ fontSize: 9 }} stroke="#1A1A1A" />
                            <YAxis type="number" tick={{ fontSize: 9 }} stroke="#1A1A1A" />
                            <Tooltip 
                              contentStyle={{ 
                                border: '2px solid #1A1A1A', 
                                fontSize: '10px' 
                              }}
                            />
                            <Bar dataKey="count" fill={selectedCluster.color} stroke="#1A1A1A" strokeWidth={1} />
                          </BarChart>
                        </ResponsiveContainer>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>

                {/* Keywords */}
                <div className="mb-3">
                  <p className="comic-title text-[10px] mb-2" style={{ color: selectedCluster.color }}>
                    Keywords:
                  </p>
                  <div className="flex flex-wrap gap-1">
                    {selectedCluster.keywords.map((keyword, i) => (
                      <span
                        key={i}
                        className="text-[10px] px-2 py-1 bg-[#FDFDF8] border border-[#1A1A1A] comic-text"
                      >
                        #{keyword}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Examples */}
                <div>
                  <p className="comic-title text-[10px] mb-2" style={{ color: selectedCluster.color }}>
                    Example Captions:
                  </p>
                  <div className="space-y-2">
                    {selectedCluster.examples.map((example, i) => (
                      <div
                        key={i}
                        className="p-2 bg-[#FDFDF8] border border-[#1A1A1A] rounded"
                      >
                        <p className="handwritten text-xs text-[#1A1A1A] italic">
                          {example}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              </motion.div>
            ) : (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="border-4 border-[#1A1A1A] border-dashed bg-[#FDFDF8] p-12 h-full flex items-center justify-center"
              >
                <div className="text-center">
                  <div className="mb-4 text-6xl">🎭</div>
                  <p className="handwritten text-xl text-[#8B4513]">
                    Click on a cluster to explore
                  </p>
                  <p className="comic-text text-sm mt-2 opacity-70">
                    See keywords, examples, and trend analysis
                  </p>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>

      {/* Method Note */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
        className="mt-3 text-center"
      >
        <p className="handwritten text-xs text-[#8B4513] opacity-70">
          Identified using k-means clustering with TF-IDF vectorization (k=5) + LLM classification
        </p>
      </motion.div>
    </div>
  );
}
