import React, { useState } from 'react';
import { motion } from 'motion/react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, LineChart, Line, Area, AreaChart } from 'recharts';
import { Starburst } from './ComicElements';
import { Users, TrendingUp, AlertCircle } from 'lucide-react';
import { useData } from '@/context/DataContext';
/*import general_genderdata from '@/data/df_averages_wm.json';*/


const ComicBox = ({ children, className = '', title }: { children: React.ReactNode, className?: string, title?: string }) => (
  <div className={`border-4 border-[#1A1A1A] bg-white p-4 relative ${className}`} style={{ boxShadow: '6px 6px 0 #1A1A1A' }}>
    {title && (
      <div className="absolute -top-4 left-4 bg-[#F4A261] border-2 border-[#1A1A1A] px-3 py-1 z-10">
        <h3 className="comic-title text-xs font-bold text-[#1A1A1A]">{title}</h3>
      </div>
    )}
    {children}
  </div>
);

const AnalysisText = ({ children }: { children: React.ReactNode }) => (
  <div className="bg-[#FDFDF8] border-l-4 border-[#2A9D8F] p-4 my-4 font-mono text-xs leading-relaxed text-[#1A1A1A] opacity-90">
    {children}
  </div>
);


export function GenderPage() {
  const [selectedView, setSelectedView] = useState<'timeline' | 'comparison' | 'gapRate'>('timeline');
  const { selectedCluster } = useData();

  
  // Data for Box Plot
  /*const general_genderdata = general_genderdata.values.map((value, index) => ({
    name: `Data ${index + 1}`,
    value: value
  }));  
*/
  // Data for gender representation overall
  const general_genderdata = [
  {
    name: `women`,
    uv: 33893,
  },
  {
    name: `men`,
    uv: 167583,
  },
  {
    name: `dino`,
    uv: 1952,
  },
    {
    name: `witch`,
    uv: 3232,
  }
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
    <div className="flex flex-col gap-8 pb-20">

      {/* HEADER */}
      <div className="flex justify-between items-center mb-4">
        <h1
          className="comic-title"
          style={{
            fontSize: "40px",
            fontWeight: "bold",
            marginBottom: "8px",
            color: "#1A1A1A",
            lineHeight: 1.2
          }}
        >
          Gender Representation in the Newyorker Cartoon Caption Contest
        </h1>
      </div>

        

        {/* --- SECTION 1: GENERAL ANALYSIS Barplot overall --- */}
        <section>
          
          <ComicBox title="Humor Engagement Profiles">
            <p className="text-xs font-mono mb-4 leading-relaxed opacity-80">
              This chart shows each humor type based on <strong>Popularity</strong> (average votes) and <strong>Engagement</strong> (average submitted captions). We compare normalized scores to see which types drive passive appreciation versus active participation.
            </p>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={general_genderdata} margin={{ top: 20, right: 30, left: 20, bottom: 50 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#e0e0e0" vertical={false} />
                <XAxis dataKey="name" tick={{ fontSize: 10, fontFamily: 'monospace' }} interval={0} angle={-20} textAnchor="end" />
                <YAxis hide />
                <Tooltip
                  contentStyle={{ border: '2px solid #1A1A1A', fontFamily: 'monospace' }}
                  cursor={{ fill: '#f0f0f0' }}
                  formatter={(value: any, name: any, props: any) => {
                    if (name === 'name') return [props.payload.uv.toLocaleString(), 'uv'];
                  /*  if (name === 'Engagement') return [props.payload.captionsRaw.toLocaleString(), 'Avg Captions'];*/
                    return [uv, name];
                  }}
                />
                <Legend wrapperStyle={{ fontSize: '10px', paddingTop: '20px' }} />
                <Bar name="mentions" dataKey="ov" fill="#2A9D8F" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
            <AnalysisText>
              Comparing engagement metrics reveals interesting trade-offs. <strong>Wit & Surprise</strong> often garners high vote counts (Popularity), suggesting it resonates broadly with voters. Meanwhile, <strong>Incongruity & Absurdity</strong> often spikes in caption volume (Engagement), indicating that these complex visual puzzles invite more community attempts to solve them.
            </AnalysisText>
          </ComicBox>
        </section>





          
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
        </motion.div>
      </div>
    </div>
  );
}