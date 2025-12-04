import React, { useState } from 'react';
import { motion } from 'motion/react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, LineChart, Line, Area, AreaChart } from 'recharts';
import { Starburst } from './ComicElements';
import { Users, TrendingUp, AlertCircle } from 'lucide-react';
import { useData } from '@/context/DataContext';

export function GenderPage() {
  const [selectedView, setSelectedView] = useState<'timeline' | 'comparison' | 'gapRate'>('timeline');
  const { selectedCluster } = useData();

  // Mock data for gender representation over time
  const timelineData = [
    { year: '2016', men: 68, women: 32 },
    { year: '2017', men: 65, women: 35 },
    { year: '2018', men: 62, women: 38 },
    { year: '2019', men: 58, women: 42 },
    { year: '2020', men: 55, women: 45 },
    { year: '2021', men: 52, women: 48 },
    { year: '2022', men: 48, women: 52 },
    { year: '2023', men: 46, women: 54 }
  ];

  // Comparison data - filtered by selected cluster if available
  const comparisonData = [
    { category: 'Political', men: 62, women: 38 },
    { category: 'Tech', men: 58, women: 42 },
    { category: 'Work-Life', men: 45, women: 55 },
    { category: 'Pandemic', men: 48, women: 52 },
    { category: 'Climate', men: 43, women: 57 }
  ];

  // Filter comparison data if a cluster is selected
  const displayComparisonData = selectedCluster
    ? comparisonData.filter(item => {
        if (selectedCluster === 'Political Satire') return item.category === 'Political';
        if (selectedCluster === 'Tech Anxiety') return item.category === 'Tech';
        if (selectedCluster === 'Work-Life Absurdity') return item.category === 'Work-Life';
        if (selectedCluster === 'Pandemic') return item.category === 'Pandemic';
        if (selectedCluster === 'Climate Crisis') return item.category === 'Climate';
        return true;
      })
    : comparisonData;

  // Gender gap change rate (slope chart data)
  const gapRateData = [
    { year: '2016', gap: 36, label: '36%' },
    { year: '2017', gap: 30, label: '30%' },
    { year: '2018', gap: 24, label: '24%' },
    { year: '2019', gap: 16, label: '16%' },
    { year: '2020', gap: 10, label: '10%' },
    { year: '2021', gap: 4, label: '4%' },
    { year: '2022', gap: -4, label: '-4%' },
    { year: '2023', gap: -8, label: '-8%' }
  ];

  const insights = [
    {
      icon: TrendingUp,
      color: '#E63946',
      title: 'Growing Parity',
      text: 'Women went from 32% to 54% of winning captions (2016-2023)'
    },
    {
      icon: Users,
      color: '#2A9D8F',
      title: 'Topic Variations',
      text: 'Women dominated climate and work-life humor categories'
    },
    {
      icon: AlertCircle,
      color: '#457B9D',
      title: 'Genre Shift',
      text: 'Political humor remains male-dominated but gap is narrowing'
    }
  ];

  return (
    <div className="h-full flex flex-col">
      {/* Page Title */}
      <div className="text-center mb-6">
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: 'spring' }}
        >
          <Starburst color="#F4A261" size={120}>
            Gender
          </Starburst>
        </motion.div>
      </div>

      <p className="text-center comic-text mb-6 text-sm">
        Analyzing gender representation in winning captions across time{selectedCluster && ` - Focused on ${selectedCluster}`}
      </p>

      {/* Toggle View */}
      <div className="flex justify-center gap-4 mb-6">
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => setSelectedView('timeline')}
          className={`px-6 py-2 border-3 border-[#1A1A1A] comic-title ${
            selectedView === 'timeline' 
              ? 'bg-[#E63946] text-[#FDFDF8]' 
              : 'bg-white text-[#1A1A1A]'
          }`}
          style={{ boxShadow: '3px 3px 0 #1A1A1A' }}
        >
          Timeline View
        </motion.button>
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => setSelectedView('comparison')}
          className={`px-6 py-2 border-3 border-[#1A1A1A] comic-title ${
            selectedView === 'comparison' 
              ? 'bg-[#E63946] text-[#FDFDF8]' 
              : 'bg-white text-[#1A1A1A]'
          }`}
          style={{ boxShadow: '3px 3px 0 #1A1A1A' }}
        >
          By Category
        </motion.button>
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => setSelectedView('gapRate')}
          className={`px-6 py-2 border-3 border-[#1A1A1A] comic-title ${
            selectedView === 'gapRate' 
              ? 'bg-[#E63946] text-[#FDFDF8]' 
              : 'bg-white text-[#1A1A1A]'
          }`}
          style={{ boxShadow: '3px 3px 0 #1A1A1A' }}
        >
          Gap Rate
        </motion.button>
      </div>

      {/* Main Content Area */}
      <div className="flex-1 grid grid-cols-3 gap-6">
        {/* Chart Area - Takes 2 columns */}
        <motion.div 
          key={selectedView}
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="col-span-2 border-4 border-[#1A1A1A] bg-white p-6"
          style={{ boxShadow: '6px 6px 0 #1A1A1A' }}
        >
          <div className="inline-block mb-4 px-4 py-2 bg-[#457B9D] border-3 border-[#1A1A1A]">
            <h3 className="comic-title text-sm text-[#FDFDF8]">
              {selectedView === 'timeline' 
                ? 'Gender Distribution Over Time' 
                : selectedView === 'comparison'
                ? 'Gender by Humor Category'
                : 'Gender Gap Change Rate'}
            </h3>
          </div>

          <ResponsiveContainer width="100%" height="85%">
            {selectedView === 'timeline' ? (
              <LineChart data={timelineData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#1A1A1A" opacity={0.1} />
                <XAxis 
                  dataKey="year" 
                  tick={{ fontSize: 12, fill: '#1A1A1A' }}
                  stroke="#1A1A1A"
                />
                <YAxis 
                  tick={{ fontSize: 12, fill: '#1A1A1A' }}
                  stroke="#1A1A1A"
                  label={{ value: 'Percentage (%)', angle: -90, position: 'insideLeft', style: { fontSize: 12 } }}
                />
                <Tooltip 
                  contentStyle={{ 
                    border: '2px solid #1A1A1A', 
                    borderRadius: '4px',
                    fontSize: '12px'
                  }}
                />
                <Legend 
                  wrapperStyle={{ fontSize: '14px' }}
                  iconType="square"
                />
                <Line 
                  type="monotone" 
                  dataKey="men" 
                  stroke="#457B9D" 
                  strokeWidth={4}
                  name="Men"
                  dot={{ r: 6, strokeWidth: 3, fill: 'white', stroke: '#457B9D' }}
                  label={({ value, index }) => (
                    <text 
                      x={0} 
                      y={0} 
                      dy={-10} 
                      fill="#457B9D" 
                      fontSize={11}
                      textAnchor="middle"
                    >
                      {value}%
                    </text>
                  )}
                />
                <Line 
                  type="monotone" 
                  dataKey="women" 
                  stroke="#E63946" 
                  strokeWidth={4}
                  name="Women"
                  dot={{ r: 6, strokeWidth: 3, fill: 'white', stroke: '#E63946' }}
                  label={({ value, index }) => (
                    <text 
                      x={0} 
                      y={0} 
                      dy={20} 
                      fill="#E63946" 
                      fontSize={11}
                      textAnchor="middle"
                    >
                      {value}%
                    </text>
                  )}
                />
              </LineChart>
            ) : selectedView === 'comparison' ? (
            <BarChart data={displayComparisonData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#1A1A1A" opacity={0.1} />
                <XAxis 
                  dataKey="category" 
                  tick={{ fontSize: 11, fill: '#1A1A1A' }}
                  stroke="#1A1A1A"
                />
                <YAxis 
                  tick={{ fontSize: 12, fill: '#1A1A1A' }}
                  stroke="#1A1A1A"
                  label={{ value: 'Percentage (%)', angle: -90, position: 'insideLeft', style: { fontSize: 12 } }}
                />
                <Tooltip 
                  contentStyle={{ 
                    border: '2px solid #1A1A1A', 
                    borderRadius: '4px',
                    fontSize: '12px'
                  }}
                />
                <Legend 
                  wrapperStyle={{ fontSize: '14px' }}
                  iconType="square"
                />
                <Bar 
                  dataKey="men" 
                  fill="#457B9D" 
                  name="Men"
                  stroke="#1A1A1A"
                  strokeWidth={2}
                />
                <Bar 
                  dataKey="women" 
                  fill="#E63946" 
                  name="Women"
                  stroke="#1A1A1A"
                  strokeWidth={2}
                />
              </BarChart>
            ) : (
              <AreaChart data={gapRateData}>
                <defs>
                  <linearGradient id="gapGradient" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#E63946" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="#457B9D" stopOpacity={0.3}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#1A1A1A" opacity={0.1} />
                <XAxis 
                  dataKey="year" 
                  tick={{ fontSize: 12, fill: '#1A1A1A' }}
                  stroke="#1A1A1A"
                />
                <YAxis 
                  tick={{ fontSize: 12, fill: '#1A1A1A' }}
                  stroke="#1A1A1A"
                  label={{ value: 'Gender Gap (Men % - Women %)', angle: -90, position: 'insideLeft', style: { fontSize: 11 } }}
                  domain={[-15, 40]}
                />
                <Tooltip 
                  contentStyle={{ 
                    border: '2px solid #1A1A1A', 
                    borderRadius: '4px',
                    fontSize: '12px'
                  }}
                  formatter={(value: number) => [`${value > 0 ? '+' : ''}${value}%`, 'Gap']}
                />
                <Area 
                  type="monotone" 
                  dataKey="gap" 
                  stroke="#E63946" 
                  strokeWidth={3}
                  fill="url(#gapGradient)"
                  dot={{ r: 5, fill: '#E63946', strokeWidth: 2, stroke: '#1A1A1A' }}
                  label={({ value, index }) => (
                    <text 
                      x={0} 
                        y={0} 
                        dy={typeof value === 'number' && value > 0 ? -10 : 15} 
                      fill="#1A1A1A" 
                      fontSize={10}
                      textAnchor="middle"
                    >
                        {typeof value === 'number' ? (value > 0 ? '+' : '') : ''}{value}%
                    </text>
                  )}
                />
                {/* Reference line at 0 */}
                <line 
                  x1="0%" 
                  y1="50%" 
                  x2="100%" 
                  y2="50%" 
                  stroke="#1A1A1A" 
                  strokeWidth={2} 
                  strokeDasharray="5 5"
                />
              </AreaChart>
            )}
          </ResponsiveContainer>

          {/* Additional context for gap rate view */}
          {selectedView === 'gapRate' && (
            <div className="mt-2 p-3 bg-[#FFF9E6] border-l-4 border-[#F4A261]">
              <p className="comic-text text-xs">
                <span className="comic-title text-[#E63946]">Positive values</span> = men dominate • 
                <span className="comic-title text-[#457B9D]"> Negative values</span> = women dominate • 
                <span className="comic-title text-[#2A9D8F]"> Zero</span> = perfect parity
              </p>
            </div>
          )}
        </motion.div>

        {/* Insights Panel - Takes 1 column */}
        <div className="space-y-4">
          <div className="border-4 border-[#1A1A1A] bg-white p-4" style={{ boxShadow: '6px 6px 0 #1A1A1A' }}>
            <div className="inline-block mb-3 px-3 py-1 bg-[#2A9D8F] border-2 border-[#1A1A1A]">
              <h3 className="comic-title text-xs text-[#FDFDF8]">Key Insights</h3>
            </div>

            <div className="space-y-4">
              {insights.map((insight, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.2 }}
                  className="border-2 border-[#1A1A1A] bg-[#FDFDF8] p-3 relative overflow-hidden"
                >
                  <div 
                    className="absolute inset-0 opacity-5"
                    style={{ backgroundColor: insight.color }}
                  />
                  <div className="relative z-10">
                    <div className="flex items-center gap-2 mb-2">
                      <insight.icon size={16} style={{ color: insight.color }} />
                      <h4 className="comic-title text-xs" style={{ color: insight.color }}>
                        {insight.title}
                      </h4>
                    </div>
                    <p className="comic-text text-[10px] leading-relaxed">
                      {insight.text}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Stats Box */}
          <div className="border-4 border-[#1A1A1A] bg-[#FFF9E6] p-4" style={{ boxShadow: '6px 6px 0 #1A1A1A' }}>
            <div className="space-y-3">
              <div>
                <div className="flex items-baseline gap-2 mb-1">
                  <span className="comic-title text-3xl text-[#457B9D]">68%</span>
                  <span className="comic-text text-xs">→</span>
                  <span className="comic-title text-3xl text-[#457B9D]">46%</span>
                </div>
                <p className="comic-text text-xs">Men (2016 → 2023)</p>
              </div>
              
              <div className="border-t-2 border-[#1A1A1A] border-dashed pt-3">
                <div className="flex items-baseline gap-2 mb-1">
                  <span className="comic-title text-3xl text-[#E63946]">32%</span>
                  <span className="comic-text text-xs">→</span>
                  <span className="comic-title text-3xl text-[#E63946]">54%</span>
                </div>
                <p className="comic-text text-xs">Women (2016 → 2023)</p>
              </div>

              <div className="mt-4 pt-3 border-t-2 border-[#1A1A1A] border-dashed">
                <p className="handwritten text-xs text-[#8B4513] italic">
                  2022 marked the first year women surpassed men in winning caption representation!
                </p>
              </div>
            </div>
          </div>

          {/* Gender by Topic mini chart */}
          <div className="border-4 border-[#1A1A1A] bg-white p-4" style={{ boxShadow: '6px 6px 0 #1A1A1A' }}>
            <div className="inline-block mb-3 px-3 py-1 bg-[#F4A261] border-2 border-[#1A1A1A]">
              <h3 className="comic-title text-xs text-[#FDFDF8]">Quick Facts</h3>
            </div>
            <div className="space-y-2 comic-text text-xs">
              <div className="flex justify-between items-center">
                <span>📊 Total Analyzed:</span>
                <span className="comic-title text-[#457B9D]">587</span>
              </div>
              <div className="flex justify-between items-center">
                <span>📈 Biggest Shift:</span>
                <span className="comic-title text-[#E63946]">+22%</span>
              </div>
              <div className="flex justify-between items-center">
                <span>🎯 Years to Parity:</span>
                <span className="comic-title text-[#2A9D8F]">6</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}