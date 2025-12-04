import React from 'react';
import { motion } from 'motion/react';
import { X, ChevronLeft, ChevronRight } from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line, PieChart, Pie, Cell, ComposedChart, Area } from 'recharts';

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

interface JournalSpreadProps {
  event: TimelineEvent;
  onClose: () => void;
}

export function JournalSpread({ event, onClose }: JournalSpreadProps) {
  // Mock cluster distribution data - showing how this event affected humor categories
  const clusterData = [
    { name: event.cluster, value: 45, color: event.color },
    { name: 'Work-Life', value: 22, color: '#2A9D8F' },
    { name: 'Tech Anxiety', value: 18, color: '#F4A261' },
    { name: 'Other', value: 15, color: '#8D5B4C' }
  ];

  // Dual line chart data - Google Trends vs Humor Mentions
  const trendComparisonData = [
    { month: 'Jan', googleTrends: 45, humorMentions: 38 },
    { month: 'Feb', googleTrends: 52, humorMentions: 44 },
    { month: 'Mar', googleTrends: 100, humorMentions: 82 },
    { month: 'Apr', googleTrends: 98, humorMentions: 95 },
    { month: 'May', googleTrends: 91, humorMentions: 88 },
    { month: 'Jun', googleTrends: 85, humorMentions: 78 },
  ];

  // Representative captions extracted by LLM
  const representativeCaptions = [
    event.id === 'covid' 
      ? "You're on mute again, Dave"
      : event.id === 'elections'
      ? "I voted for the other timeline"
      : event.id === 'climate'
      ? "At least we'll have beachfront property"
      : "This is fine",
    event.id === 'covid'
      ? "Day 437 of quarantine, or is it Tuesday?"
      : event.id === 'elections'
      ? "Make it stop"
      : event.id === 'climate'
      ? "The planet will be fine without us"
      : "Remember when things were normal?",
    event.id === 'covid'
      ? "My mask brings all the germs to the yard"
      : event.id === 'elections'
      ? "This is why we can't have nice democracies"
      : event.id === 'climate'
      ? "Turn up the AC, it's getting warm"
      : "I miss boring news cycles"
  ];

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 bg-[#1A1A1A]/80 backdrop-blur-sm flex items-center justify-center p-8"
      onClick={onClose}
    >
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.9, opacity: 0 }}
        className="relative bg-[#FDFDF8] rounded-lg shadow-2xl max-w-7xl w-full max-h-[90vh] overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-10 w-10 h-10 bg-[#E63946] text-[#FDFDF8] rounded-full flex items-center justify-center hover:bg-[#d32f3d] transition-colors border-3 border-[#1A1A1A]"
          style={{ boxShadow: '3px 3px 0 #1A1A1A' }}
        >
          <X size={20} />
        </button>

        {/* Journal Spread Content */}
        <div className="grid md:grid-cols-5 h-full max-h-[90vh] overflow-y-auto">
          {/* Left Page - 2 columns */}
          <div className="md:col-span-2 p-12 border-r border-[#1A1A1A]/10 bg-[#FDFDF8]">
            <motion.div
              initial={{ x: -50, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: 0.2 }}
            >
              {/* Date Header */}
              <div className="mb-8">
                <p className="text-sm text-[#1A1A1A]/60 mb-2">{event.year}</p>
                <h2 className="mb-2">{event.date}</h2>
                <div
                  className="inline-block px-4 py-2 rounded-full text-[#FDFDF8] text-sm border-2 border-[#1A1A1A]"
                  style={{ backgroundColor: event.color, boxShadow: '3px 3px 0 #1A1A1A' }}
                >
                  {event.cluster}
                </div>
              </div>

              {/* Featured Cartoon Placeholder */}
              <div className="mb-8 bg-white rounded-lg p-8 border-4 border-[#1A1A1A] aspect-square flex items-center justify-center" style={{ boxShadow: '4px 4px 0 #1A1A1A' }}>
                <div className="text-center">
                  <div className="text-6xl mb-4">🎨</div>
                  <p className="handwritten text-xl text-[#8B4513] italic">
                    {event.cartoonTheme}
                  </p>
                  <p className="comic-text text-xs text-[#1A1A1A]/60 mt-2">
                    Featured Cartoon Theme
                  </p>
                </div>
              </div>

              {/* Context Card */}
              <div className="bg-white p-6 rounded-lg border-3 border-[#1A1A1A]" style={{ boxShadow: '4px 4px 0 #1A1A1A' }}>
                <div className="inline-block mb-3 px-3 py-1 bg-[#E63946] border-2 border-[#1A1A1A]">
                  <h3 className="comic-title text-xs text-[#FDFDF8]">Historical Context</h3>
                </div>
                <ul className="space-y-3">
                  {event.worldEvents.map((evt, index) => (
                    <li key={index} className="flex items-start gap-3">
                      <div
                        className="w-2 h-2 rounded-full mt-2 flex-shrink-0 border-2 border-[#1A1A1A]"
                        style={{ backgroundColor: event.color }}
                      />
                      <span className="comic-text text-xs">{evt}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </motion.div>
          </div>

          {/* Right Page - 3 columns */}
          <div className="md:col-span-3 p-12 bg-white">
            <motion.div
              initial={{ x: 50, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: 0.3 }}
              className="space-y-6"
            >
              {/* Event-Related Word Frequency Spikes */}
              <div>
                <div className="inline-block mb-3 px-4 py-1 bg-[#457B9D] border-2 border-[#1A1A1A]">
                  <h3 className="comic-title text-xs text-[#FDFDF8]">Event-Related Word Spikes</h3>
                </div>
                <div className="bg-[#FDFDF8] p-4 rounded-lg border-2 border-[#1A1A1A]">
                  <ResponsiveContainer width="100%" height={180}>
                    <BarChart data={event.wordData}>
                      <CartesianGrid strokeDasharray="3 3" stroke="#1A1A1A20" />
                      <XAxis 
                        dataKey="word" 
                        tick={{ fill: '#1A1A1A', fontSize: 11 }}
                      />
                      <YAxis 
                        tick={{ fill: '#1A1A1A', fontSize: 11 }}
                        label={{ value: 'Frequency', angle: -90, position: 'insideLeft', style: { fontSize: 10 } }}
                      />
                      <Tooltip
                        contentStyle={{
                          backgroundColor: '#FDFDF8',
                          border: '2px solid #1A1A1A',
                          borderRadius: '8px',
                          fontSize: '11px'
                        }}
                      />
                      <Bar dataKey="count" fill={event.color} radius={[6, 6, 0, 0]} stroke="#1A1A1A" strokeWidth={2} />
                    </BarChart>
                  </ResponsiveContainer>
                  <p className="comic-text text-[9px] mt-2 opacity-70">
                    Keywords that spiked during this event period
                  </p>
                </div>
              </div>

              {/* Google Trends vs Humor Mentions - DUAL LINE CHART */}
              <div>
                <div className="inline-block mb-3 px-4 py-1 bg-[#F4A261] border-2 border-[#1A1A1A]">
                  <h3 className="comic-title text-xs text-[#FDFDF8]">Google Trends vs Humor Correlation</h3>
                </div>
                <div className="bg-[#FDFDF8] p-4 rounded-lg border-2 border-[#1A1A1A]">
                  <ResponsiveContainer width="100%" height={160}>
                    <LineChart data={trendComparisonData}>
                      <CartesianGrid strokeDasharray="3 3" stroke="#1A1A1A20" />
                      <XAxis 
                        dataKey="month" 
                        tick={{ fill: '#1A1A1A', fontSize: 11 }}
                      />
                      <YAxis 
                        tick={{ fill: '#1A1A1A', fontSize: 11 }}
                        domain={[0, 100]}
                        label={{ value: 'Index (0-100)', angle: -90, position: 'insideLeft', style: { fontSize: 10 } }}
                      />
                      <Tooltip
                        contentStyle={{
                          backgroundColor: '#FDFDF8',
                          border: '2px solid #1A1A1A',
                          borderRadius: '8px',
                          fontSize: '11px'
                        }}
                      />
                      <Line 
                        type="monotone" 
                        dataKey="googleTrends" 
                        stroke="#E63946" 
                        strokeWidth={3}
                        name="Google Search Interest"
                        dot={{ fill: '#E63946', r: 4, strokeWidth: 2, stroke: '#1A1A1A' }}
                      />
                      <Line 
                        type="monotone" 
                        dataKey="humorMentions" 
                        stroke="#457B9D" 
                        strokeWidth={3}
                        name="Humor Mentions"
                        dot={{ fill: '#457B9D', r: 4, strokeWidth: 2, stroke: '#1A1A1A' }}
                      />
                    </LineChart>
                  </ResponsiveContainer>
                  <div className="flex justify-center gap-4 mt-2">
                    <div className="flex items-center gap-2">
                      <div className="w-3 h-3 rounded-full bg-[#E63946] border-2 border-[#1A1A1A]" />
                      <span className="comic-text text-[9px]">Google Trends</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-3 h-3 rounded-full bg-[#457B9D] border-2 border-[#1A1A1A]" />
                      <span className="comic-text text-[9px]">Humor Mentions</span>
                    </div>
                  </div>
                  <p className="comic-text text-[9px] mt-2 opacity-70">
                    Shows whether real-world search interest aligns with humor topics in the contest
                  </p>
                </div>
              </div>

              {/* Topic Cluster Changes During Event */}
              <div>
                <div className="inline-block mb-3 px-4 py-1 bg-[#2A9D8F] border-2 border-[#1A1A1A]">
                  <h3 className="comic-title text-xs text-[#FDFDF8]">Humor Category Shift</h3>
                </div>
                <div className="bg-[#FDFDF8] p-4 rounded-lg border-2 border-[#1A1A1A]">
                  <div className="flex items-center gap-6">
                    <ResponsiveContainer width="45%" height={140}>
                      <PieChart>
                        <Pie
                          data={clusterData}
                          cx="50%"
                          cy="50%"
                          innerRadius={35}
                          outerRadius={55}
                          paddingAngle={3}
                          dataKey="value"
                          stroke="#1A1A1A"
                          strokeWidth={2}
                        >
                          {clusterData.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={entry.color} />
                          ))}
                        </Pie>
                        <Tooltip 
                          contentStyle={{
                            border: '2px solid #1A1A1A',
                            borderRadius: '6px',
                            fontSize: '10px'
                          }}
                        />
                      </PieChart>
                    </ResponsiveContainer>
                    <div className="flex-1 space-y-2">
                      {clusterData.map((cluster, index) => (
                        <div key={index} className="flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            <div
                              className="w-3 h-3 rounded border-2 border-[#1A1A1A]"
                              style={{ backgroundColor: cluster.color }}
                            />
                            <span className="comic-text text-[10px]">{cluster.name}</span>
                          </div>
                          <span className="comic-title text-xs" style={{ color: cluster.color }}>{cluster.value}%</span>
                        </div>
                      ))}
                    </div>
                  </div>
                  <p className="comic-text text-[9px] mt-2 opacity-70">
                    Certain humor categories increased sharply during this event
                  </p>
                </div>
              </div>

              {/* Representative Captions (LLM-extracted) */}
              <div>
                <div className="inline-block mb-3 px-4 py-1 bg-[#8D5B4C] border-2 border-[#1A1A1A]">
                  <h3 className="comic-title text-xs text-[#FDFDF8]">Representative Captions</h3>
                </div>
                <div className="space-y-2">
                  {representativeCaptions.map((caption, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.4 + index * 0.1 }}
                      className="p-3 bg-white border-2 border-[#1A1A1A] rounded-lg relative overflow-hidden"
                      style={{ boxShadow: '2px 2px 0 #1A1A1A' }}
                    >
                      <div 
                        className="absolute top-0 left-0 w-1 h-full"
                        style={{ backgroundColor: event.color }}
                      />
                      <p className="handwritten text-xs text-[#1A1A1A] italic pl-2">
                        "{caption}"
                      </p>
                    </motion.div>
                  ))}
                </div>
                <p className="comic-text text-[9px] mt-2 opacity-70">
                  Example captions selected using LLM similarity analysis
                </p>
              </div>

              {/* Keywords Display */}
              <div className="flex flex-wrap gap-2">
                {event.keywords.map((keyword, index) => (
                  <motion.span
                    key={index}
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ delay: 0.4 + index * 0.05 }}
                    className="px-3 py-1 bg-white border-2 border-[#1A1A1A] rounded-full comic-text text-[10px] hover:border-[#E63946] transition-colors"
                    style={{ boxShadow: '2px 2px 0 #1A1A1A' }}
                  >
                    #{keyword}
                  </motion.span>
                ))}
              </div>
            </motion.div>
          </div>
        </div>

        {/* Navigation Arrows */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex gap-4">
          <button className="w-12 h-12 bg-[#1A1A1A] text-[#FDFDF8] rounded-full flex items-center justify-center hover:bg-[#E63946] transition-colors border-2 border-[#FDFDF8]">
            <ChevronLeft size={20} />
          </button>
          <button className="w-12 h-12 bg-[#1A1A1A] text-[#FDFDF8] rounded-full flex items-center justify-center hover:bg-[#E63946] transition-colors border-2 border-[#FDFDF8]">
            <ChevronRight size={20} />
          </button>
        </div>
      </motion.div>
    </motion.div>
  );
}