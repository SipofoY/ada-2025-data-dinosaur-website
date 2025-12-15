import React, { useState } from 'react';
import { motion } from 'motion/react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, LineChart, Line, Area, AreaChart } from 'recharts';
import { Starburst } from './ComicElements';
import { Users, TrendingUp, AlertCircle } from 'lucide-react';
import { useData } from '@/context/DataContext';
import gender_timeline from '@/data/df_vc.json';
import climat_timeline from '@/data/climate.json';
import covid_timeline from '@/data/covid.json';
import war_timeline from '@/data/war.json';
import trump_timeline from '@/data/trump.json';
import humor_labels from '@/data/gender_humor_labels.json';
import gender_sentiment from '@/data/gender_sentiment.json';
import gender_eventgroupe from '@/data/event_groups.json';
type SectionData = typeof gender_timeline;



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

const SectionHeader = ({ title, subtitle }: { title: string, subtitle: string }) => (
  <div className="mb-8 mt-12 border-b-4 border-[#1A1A1A] pb-4">
    <div className="flex items-start gap-4">
      <div>
        <h2 className="comic-title text-3xl mb-1">{title}</h2>
        <p className="comic-text text-sm opacity-80 max-w-2xl">{subtitle}</p>
      </div>
    </div>
  </div>
);


export function GenderPage() {
  const [selectedView, setSelectedView] = useState<'timeline' | 'comparison' | 'gapRate'>('timeline');
  const { selectedCluster } = useData();
  const gtimeline = gender_timeline as unknown as SectionData;
  const {section1} = gtimeline;
  
  
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
    color: '#457B9D',
  },
  {
    name: `men`,
    uv: 167583,
    color: '#F4A261',
  },
  {
    name: `dino`,
    uv: 1952,
    color: '#2A9D8F',
  },
    {
    name: `witch`,
    uv: 3232,
    color: '#E76F51',
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
          
          <ComicBox title="Gender mentions distribution overall">
            <p className="text-xs font-mono mb-4 leading-relaxed opacity-80">
              This chart shows the times each word group for <strong>women</strong> and <strong>men</strong> is mentioned. Additionally the counts of the word <strong>dino</strong> and <strong>witch</strong> are shown as well. This is due to the fact, that when observing the cartoons, there are more dinos and witches alone on one image than there is a women alone on a image. With this analysis social inequalities should be statistically uncovered.
              </p>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={general_genderdata} margin={{ top: 20, right: 30, left: 20, bottom: 50 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#e0e0e0" vertical={false} />
                <XAxis dataKey="name" tick={{ fontSize: 10, fontFamily: 'monospace' }} interval={0} angle={-20} textAnchor="end" />
                <YAxis hide />
                <Tooltip
                  contentStyle={{ border: '2px solid #1A1A1A', fontFamily: 'monospace' }}
                  cursor={{ fill: '#f0f0f0' }}
                />
                <Legend wrapperStyle={{ fontSize: '10px', paddingTop: '20px' }} />
                <Bar name="mentions" dataKey="uv" fill="#2A9D8F" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
            <AnalysisText>
              The results are shocking. Even in an unpolitical caption contest that probably tries to have an equal amount of genders representation shows a big gap between mentions of women and men. Moreover, when we check the captions and images individually, we can notice that there is almost never a women alone in a picture (unless it is a witch).
            </AnalysisText>
          </ComicBox>
        </section>
         
      {/* Toggle View */}
      <div className="flex justify-center gap-4 mb-6">
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => setSelectedView('timeline')}
          className={`interactive-cta transition-colors ${
            selectedView === 'timeline' 
              ? 'bg-[#E63946] text-[#FDFDF8]' 
              : 'bg-white text-[#1A1A1A]'
          }`}
          style={{ boxShadow: '3px 3px 0 #1A1A1A' }}
        > 
        
          General Timeline View
        </motion.button>
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => setSelectedView('comparison')}
          className={`interactive-cta transition-colors ${
            selectedView === 'comparison' 
              ? 'bg-[#E63946] text-[#FDFDF8]' 
              : 'bg-white text-[#1A1A1A]'
          }`}
          style={{ boxShadow: '3px 3px 0 #1A1A1A' }}
        >
          By Topic
        </motion.button>
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => setSelectedView('gapRate')}
          className={`interactive-cta transition-colors ${
            selectedView === 'gapRate' 
              ? 'bg-[#E63946] text-[#FDFDF8]' 
              : 'bg-white text-[#1A1A1A]'
          }`}
          style={{ boxShadow: '3px 3px 0 #1A1A1A' }}
        >
          Differences
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
                ? 'Gender by Topic'
                : 'Gender Differences'}
            </h3>
          </div>
          {/*Timeline View of only Gender Distribution Over Time*/}
          {selectedView === 'timeline' && (
            <ComicBox title="The genereal gender distribution over time" className="mb-8">
              <p className="text-xs font-mono mb-6 leading-relaxed opacity-80 border-b border-gray-200 pb-4">
              blabalal
              </p>
              <ResponsiveContainer width="100%" height={350}>
                <LineChart data={section1} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
                  <CartesianGrid strokeDasharray="3 3" opacity={0.2} />
                  <XAxis dataKey="date" tick={{ fontSize: 10 }} />
                  <YAxis tick={{ fontSize: 10 }} label={{ value: 'mentions', angle: -90, position: 'insideLeft' }} />
                  <Tooltip contentStyle={{ border: '2px solid #1A1A1A' }} />
                  <Line type="monotone" dataKey="men" stroke="#E63946" dot={false}/>
                  <Line type="monotone" dataKey="women" stroke="#2A9D8F" dot={false} />
                </LineChart>
              </ResponsiveContainer>
              <AnalysisText>
                blabalabl
              </AnalysisText>
            </ComicBox>
          )}

          {/*Timeline View with combined data*/}  
            {selectedView === 'comparison' && (
            <section>
              <ComicBox title="Eventgroup by Gender">
                <p className="text-xs font-mono mb-4 leading-relaxed opacity-80">
                  blabalbal
                </p>
                <ResponsiveContainer width="100%" height={300}>
                  <BarChart data={gender_eventgroupe} margin={{ top: 20, right: 30, left: 20, bottom: 50 }}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#e0e0e0" vertical={false} />
                    <XAxis dataKey="event" tick={{ fontSize: 10, fontFamily: 'monospace' }} interval={0} angle={-20} textAnchor="end" />
                    <YAxis hide />
                    <Tooltip
                      contentStyle={{ border: '2px solid #1A1A1A', fontFamily: 'monospace' }}
                      cursor={{ fill: '#f0f0f0' }}
                    />
                    <Legend wrapperStyle={{ fontSize: '10px', paddingTop: '20px' }} />
                    <Bar name="men" dataKey="df_man" fill="#F4A261" radius={[4, 4, 0, 0]} />
                    <Bar name="woman" dataKey="df_woman" fill="#E76F51" radius={[4, 4, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
                <AnalysisText>
                  blabalbla
                </AnalysisText>
              </ComicBox>
              <ComicBox title="Climat change" className="mb-8">
                <p className="text-xs font-mono mb-6 leading-relaxed opacity-80 border-b border-gray-200 pb-4">
                  blabalbal
                </p>
                <ResponsiveContainer width="100%" height={350}>
                  <LineChart data={climat_timeline} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
                    <CartesianGrid strokeDasharray="3 3" opacity={0.2} />
                    <XAxis dataKey="date" tick={{ fontSize: 10 }} />
                    <YAxis tick={{ fontSize: 5 }} label={{ value: 'caption percentage [%]', angle: -90}} />
                    <Tooltip contentStyle={{ border: '2px solid #1A1A1A' }} formatter={(value: any, name: any, item: any) => [`${value}%`, name]} />
                    <Line type="bump" dataKey="ma_pct_man" stroke="#E63946" dot={false} strokeWidth={3} name="man"/>
                    <Line type="bump" dataKey="ma_pct_woman" stroke="#2A9D8F" dot={false}  strokeWidth={3} name="woman"/>
                    <Line type="bump" dataKey="combined_pct" stroke="#264653" dot={false} strokeWidth={3} name="combined"/>
                  </LineChart>
                </ResponsiveContainer>
                <AnalysisText>
                  blblbbla
                </AnalysisText>
              </ComicBox>
 
              <ComicBox title="Covid" className="mb-8">
                <p className="text-xs font-mono mb-6 leading-relaxed opacity-80 border-b border-gray-200 pb-4">
                  blabalbal
                </p>
                <ResponsiveContainer width="100%" height={350}>
                  <LineChart data={covid_timeline} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
                    <CartesianGrid strokeDasharray="3 3" opacity={0.2} />
                    <XAxis dataKey="date" tick={{ fontSize: 10 }} />
                    <YAxis tick={{ fontSize: 5 }} label={{ value: 'caption percentage [%]', angle: -90}} />
                    <Tooltip contentStyle={{ border: '2px solid #1A1A1A' }} formatter={(value: any, name: any, item: any) => [`${value}%`, name]} />
                    <Line type="bump" dataKey="ma_pct_man" stroke="#E63946" dot={false} strokeWidth={3} name="man"/>
                    <Line type="bump" dataKey="ma_pct_woman" stroke="#2A9D8F" dot={false}  strokeWidth={3} name="woman"/>
                    <Line type="bump" dataKey="combined_pct" stroke="#264653" dot={false} strokeWidth={3} name="combined"/>
                  </LineChart>
                </ResponsiveContainer>
                <AnalysisText>
                  blablabla
                </AnalysisText>
              </ComicBox>

              <ComicBox title="War" className="mb-8">
                <p className="text-xs font-mono mb-6 leading-relaxed opacity-80 border-b border-gray-200 pb-4">
                blablabla
                </p>
                <ResponsiveContainer width="100%" height={350}>
                  <LineChart data={war_timeline} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
                    <CartesianGrid strokeDasharray="3 3" opacity={0.2} />
                    <XAxis dataKey="date" tick={{ fontSize: 10 }} />
                    <YAxis tick={{ fontSize: 5 }} label={{ value: 'caption percentage [%]', angle: -90}} />
                    <Tooltip contentStyle={{ border: '2px solid #1A1A1A' }} formatter={(value: any, name: any, item: any) => [`${value}%`, name]} />
                    <Line type="bump" dataKey="ma_pct_man" stroke="#E63946" dot={false} strokeWidth={3} name="man"/>
                    <Line type="bump" dataKey="ma_pct_woman" stroke="#2A9D8F" dot={false}  strokeWidth={3} name="woman"/>
                    <Line type="bump" dataKey="combined_pct" stroke="#264653" dot={false} strokeWidth={3} name="combined"/>
                  </LineChart>
                </ResponsiveContainer>
                <AnalysisText>
                  blablabla
                </AnalysisText>
              </ComicBox>
              <ComicBox title="Trump" className="mb-8">
                <p className="text-xs font-mono mb-6 leading-relaxed opacity-80 border-b border-gray-200 pb-4">
                 blablabla
                </p>
                <ResponsiveContainer width="100%" height={350}>
                  <LineChart data={trump_timeline} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
                    <CartesianGrid strokeDasharray="3 3" opacity={0.2} />
                    <XAxis dataKey="date" tick={{ fontSize: 10 }} />
                    <YAxis tick={{ fontSize: 5 }} label={{ value: 'caption percentage [%]', angle: -90}} />
                    <Tooltip contentStyle={{ border: '2px solid #1A1A1A' }} formatter={(value: any, name: any, item: any) => [`${value}%`, name]} />
                    <Line type="bump" dataKey="ma_pct_man" stroke="#E63946" dot={false} strokeWidth={3} name="man"/>
                    <Line type="bump" dataKey="ma_pct_woman" stroke="#2A9D8F" dot={false}  strokeWidth={3} name="woman"/>
                    <Line type="bump" dataKey="combined_pct" stroke="#264653" dot={false} strokeWidth={3} name="combined"/>
                  </LineChart>
                </ResponsiveContainer>
                <AnalysisText>
                  blablabla
                </AnalysisText>
              </ComicBox>
            </section>
          )}
          {/*Humor Chart*/}
          {selectedView === 'gapRate' && (
          <section>
            <ComicBox title="Humor Lables by Gender">
            <p className="text-xs font-mono mb-4 leading-relaxed opacity-80">
              blabalbal
            </p>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={humor_labels} margin={{ top: 20, right: 30, left: 20, bottom: 50 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#e0e0e0" vertical={false} />
                <XAxis dataKey="category" tick={{ fontSize: 10, fontFamily: 'monospace' }} interval={0} angle={-20} textAnchor="end" />
                <YAxis hide />
                <Tooltip
                  contentStyle={{ border: '2px solid #1A1A1A', fontFamily: 'monospace' }}
                  cursor={{ fill: '#f0f0f0' }}
                  formatter={(value: any, name: any, item: any) => [`${value}%`, name]}
                />
                <Legend wrapperStyle={{ fontSize: '10px', paddingTop: '20px' }} />
                <Bar name="men" dataKey="pct_man" fill="#E76F51" radius={[4, 4, 0, 0]} />
                <Bar name="woman" dataKey="pct_woman" fill="#F4A261" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
            <AnalysisText>
              blabalbla
            </AnalysisText>
          </ComicBox>
          <ComicBox title="Sentiment by Gender">
            <p className="text-xs font-mono mb-4 leading-relaxed opacity-80">
              blabalbal
            </p>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={gender_sentiment} margin={{ top: 20, right: 30, left: 20, bottom: 50 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#e0e0e0" vertical={false} />
                <XAxis dataKey="category" tick={{ fontSize: 10, fontFamily: 'monospace' }} interval={0} angle={-20} textAnchor="end" />
                <YAxis hide />
                <Tooltip
                  contentStyle={{ border: '2px solid #1A1A1A', fontFamily: 'monospace' }}
                  cursor={{ fill: '#f0f0f0' }}
                  formatter={(value: any, name: any, item: any) => [`${value}%`, name]}
                />
                <Legend wrapperStyle={{ fontSize: '10px', paddingTop: '20px' }} />
                <Bar name="men" dataKey="pct_man" fill="#264653" radius={[4, 4, 0, 0]} />
                <Bar name="woman" dataKey="pct_woman" fill="#2A9D8F" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
            <AnalysisText>
              blabalbla
            </AnalysisText>
          </ComicBox>
        </section>
          )}
        </motion.div> 
    </div>
  </div>
  );
} 