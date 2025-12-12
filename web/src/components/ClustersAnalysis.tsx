'use client';
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  PieChart, Pie, Cell, ResponsiveContainer, Tooltip,
  LineChart, Line, XAxis, YAxis, CartesianGrid, Legend,
  BarChart, Bar, ScatterChart, Scatter, ZAxis, AreaChart, Area,
  Radar, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis
} from 'recharts';
import { Starburst } from './ComicElements';
import { ChevronDown, ChevronUp, TrendingUp, Info, Calendar, Zap, Search } from 'lucide-react';
import fullData from '@/data/clusters_data_full.json';



// --- Types ---
type SectionData = typeof fullData;

// --- Helper Components ---

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

const AnalysisText = ({ children }: { children: React.ReactNode }) => (
  <div className="bg-[#FDFDF8] border-l-4 border-[#2A9D8F] p-4 my-4 font-mono text-xs leading-relaxed text-[#1A1A1A] opacity-90">
    {children}
  </div>
);

// --- Custom Heatmap Component ---
const Heatmap = ({ data }: { data: any[] }) => {
  const maxVal = Math.max(...data.flatMap(r => r.data.map((c: any) => c.y)));

  return (
    <div className="w-full overflow-x-auto">
      <table className="w-full border-collapse">
        <thead>
          <tr>
            <th className="p-1"></th>
            {data[0].data.map((col: any) => (
              <th key={col.x} className="p-1 text-[9px] comic-text rotate-45 text-left h-24 align-bottom whitespace-nowrap">
                {col.x}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data.map((row: any) => (
            <tr key={row.id}>
              <td className="p-1 text-[9px] comic-text text-right whitespace-nowrap font-bold pr-2">
                {row.name}
              </td>
              {row.data.map((cell: any) => {
                const intensity = cell.y / maxVal;
                // Generate color from light to dark teal
                const bg = `rgba(42, 157, 143, ${intensity * 0.9 + 0.1})`;
                return (
                  <td key={cell.x} className="p-0">
                    <motion.div
                      whileHover={{ scale: 1.1, zIndex: 10, borderColor: '#1A1A1A' }}
                      className="w-8 h-8 border border-white relative group"
                      style={{ backgroundColor: bg }}
                    >
                      <div className="opacity-0 group-hover:opacity-100 absolute -top-8 left-1/2 transform -translate-x-1/2 bg-[#1A1A1A] text-white text-[9px] px-1 py-0.5 rounded whitespace-nowrap pointer-events-none z-20">
                        {cell.y} overlap
                      </div>
                    </motion.div>
                  </td>
                );
              })}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};


export function ClustersAnalysis() {
  const [distSource, setDistSource] = useState<'image_descriptions' | 'image_uncanny_descriptions' | 'questions'>('image_descriptions');
  const [sentimentSource, setSentimentSource] = useState<'image_descriptions' | 'image_uncanny_descriptions' | 'questions'>('image_descriptions');

  const data = fullData as unknown as SectionData;
  const { section1, section2, section3 } = data;

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
          Distinct humor types identified through machine learning
        </h1>
      </div>

      {/* --- SECTION 1: GENERAL ANALYSIS --- */}
      <section>
        <SectionHeader
          title="The Landscape of Humor"
          subtitle="An comprehensive overview of the dominant humor types found in the dataset, characterized by machine learning models."
        />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">

          <ComicBox title="Humor Type Distribution">
            <p className="text-xs font-mono mb-4 leading-relaxed opacity-80">
              In this section, we visualize the <strong>distribution of humor types</strong> predicted by the LLMs for each field of the <em>Cartoon Caption Contest</em> dataset (<code className="bg-gray-100 px-1 rounded">image_descriptions</code>, <code className="bg-gray-100 px-1 rounded">image_uncanny_descriptions</code>, and <code className="bg-gray-100 px-1 rounded">questions</code>).
              This helps us understand which kinds of humor dominate across the dataset. The classifications were generated using a fine-tuned <strong>Llama 3-8B</strong> model. <span style={{ color: '#9CA3AF', fontSize: '10px' }}>(Use your cursor over the chart segments to see details)</span>
            </p>

            <div className="flex gap-2 mb-2 justify-center">
              {[
                { id: 'image_descriptions', label: 'Image Description' },
                { id: 'image_uncanny_descriptions', label: 'Uncanny Description' },
                { id: 'questions', label: 'Questions' }
              ].map((opt) => (
                <button
                  key={opt.id}
                  onClick={() => setDistSource(opt.id as any)}
                  className="interactive-cta transition-colors"
                  style={{
                    backgroundColor: distSource === opt.id ? '#E63946' : 'white',
                    color: distSource === opt.id ? 'white' : '#1A1A1A'
                  }}
                >
                  {opt.label}
                </button>
              ))}
            </div>
            <div className="text-center mb-4">
              <span style={{ color: '#9CA3AF', fontSize: '10px' }}>(Click buttons to switch analysis source)</span>
            </div>
            <div className="relative">
              <ResponsiveContainer width="100%" height={300}>
                <PieChart>
                  <Pie
                    data={section1.distributions[distSource]}
                    cx="50%"
                    cy="50%"
                    outerRadius={100}
                    fill="#8884d8"
                    dataKey="value"
                    label={false}
                    labelLine={false}
                  >
                    {section1.distributions[distSource].map((entry: any, index: number) => (
                      <Cell key={`cell-${index}`} fill={entry.color} stroke="#1A1A1A" strokeWidth={2} />
                    ))}
                  </Pie>
                  <Tooltip
                    contentStyle={{ border: '3px solid #1A1A1A', boxShadow: '4px 4px 0 #1A1A1A' }}
                    itemStyle={{ fontFamily: 'monospace' }}
                    formatter={(value: any, name: any, item: any) => [`${value} (${item.payload.percentage}%)`, name]}
                  />
                </PieChart>
              </ResponsiveContainer>
            </div>
            <AnalysisText>
              {(() => {
                const currentDist = section1.distributions[distSource];
                const top = currentDist[0];
                const second = currentDist[1];

                if (distSource === 'image_descriptions') {
                  return (
                    <>
                      The distribution of humor in high-ranking captions reveals a distinct preference for <strong>{top?.name}</strong>, accounting for <strong>{top?.percentage}%</strong> of the corpus. This aligns with the <em>New Yorker</em>'s stylistic tradition, where humor often emerges from the semantic gap between the visual scene and the textual anchor. The substantial presence of <strong>{second?.name}</strong> ({second?.percentage}%) further suggests that entrants frequently leverage these distinct modes to subvert the expectations established by the image.
                    </>
                  );
                } else if (distSource === 'image_uncanny_descriptions') {
                  return (
                    <>
                      In the 'Uncanny' descriptions—which isolate the visual oddities—we observe a skew towards <strong>{top?.name}</strong> (<strong>{top?.percentage}%</strong>). This is structurally inherent; the task of objectively describing visual anomalies naturally results in identifying <strong>{top?.name}</strong> as the primary mechanism of cognitive dissonance. Unlike stylized captions, the humor here is descriptive rather than constructed, leading to a more concentrated distribution.
                    </>
                  );
                } else {
                  return (
                    <>
                      The interrogative dataset exhibits a profile dominated by <strong>{top?.name}</strong> (<strong>{top?.percentage}%</strong>). Questions in this context often serve as rhetorical devices to highlight the scene's illogical premises. The shift in distribution compared to declarative captions suggests that the grammatical form substantially influences the classification of humor, pivoting from descriptive absurdity to interrogative <strong>{top?.name}</strong>.
                    </>
                  );
                }
              })()}
            </AnalysisText>
          </ComicBox>

          {/* Chart 1.2: Radar Profile */}
          <ComicBox title="Humor Engagement Profiles">
            <p className="text-xs font-mono mb-4 leading-relaxed opacity-80">
              This chart profiles each humor type based on <strong>Popularity</strong> (average votes) and <strong>Engagement</strong> (average submitted captions). We compare normalized scores to see which types drive passive appreciation versus active participation.
            </p>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={section1.radarData} margin={{ top: 20, right: 30, left: 20, bottom: 50 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#e0e0e0" vertical={false} />
                <XAxis dataKey="subject" tick={{ fontSize: 10, fontFamily: 'monospace' }} interval={0} angle={-20} textAnchor="end" />
                <YAxis hide />
                <Tooltip
                  contentStyle={{ border: '2px solid #1A1A1A', fontFamily: 'monospace' }}
                  cursor={{ fill: '#f0f0f0' }}
                  formatter={(value: any, name: any, props: any) => {
                    if (name === 'Popularity') return [props.payload.votesRaw.toLocaleString(), 'Avg Votes'];
                    if (name === 'Engagement') return [props.payload.captionsRaw.toLocaleString(), 'Avg Captions'];
                    return [value, name];
                  }}
                />
                <Legend wrapperStyle={{ fontSize: '10px', paddingTop: '20px' }} />
                <Bar name="Popularity" dataKey="votesScore" fill="#2A9D8F" radius={[4, 4, 0, 0]} />
                <Bar name="Engagement" dataKey="captionsScore" fill="#264653" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
            <AnalysisText>
              Comparing engagement metrics reveals interesting trade-offs. <strong>Wit & Surprise</strong> often garners high vote counts (Popularity), suggesting it resonates broadly with voters. Meanwhile, <strong>Incongruity & Absurdity</strong> often spikes in caption volume (Engagement), indicating that these complex visual puzzles invite more community attempts to solve them.
            </AnalysisText>
          </ComicBox>
        </div>
      </section>


      {/* --- SECTION 2: TEMPORAL EVOLUTION --- */}
      <section>
        <SectionHeader
          title="Evolution & Contests"
          subtitle="How humor preferences have shifted over time (2016-2023), correlated with real-world dates and contest events."
        />

        {/* Chart 2.1: Stacked Area Evolution */}
        <ComicBox title="Temporal Shifts in Humor Types" className="mb-8">
          <p className="text-xs font-mono mb-6 leading-relaxed opacity-80 border-b border-gray-200 pb-4">
            This chart tracks the prevalence of each humor category from 2016 to 2023 based on the analysis of the <strong>top 30 most-voted captions</strong> for every contest. We classified these high-ranking captions using LLMs and linked each contest to its precise publication date. This longitudinal approach allows us to detect if editorial preferences or reader tastes have shifted—for instance, favoring <strong>Irony</strong> or <strong>Incongruity</strong>—over specific time periods.
          </p>
          <ResponsiveContainer width="100%" height={350}>
            <AreaChart
              data={section2.timelineData}
              margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
            >
              <CartesianGrid strokeDasharray="3 3" opacity={0.2} />
              <XAxis dataKey="name" tick={{ fontSize: 10 }} />
              <YAxis tick={{ fontSize: 10 }} label={{ value: 'Count', angle: -90, position: 'insideLeft' }} />
              <Tooltip contentStyle={{ border: '2px solid #1A1A1A' }} />
              <Legend verticalAlign="top" height={36} />
              {section1.distributions.image_descriptions.map((type: any) => (
                <Area
                  key={type.name}
                  type="monotone"
                  dataKey={type.name}
                  stackId="1"
                  stroke={type.color}
                  fill={type.color}
                  strokeWidth={1}
                />
              ))}
            </AreaChart>
          </ResponsiveContainer>
          <AnalysisText>
            The temporal evolution reveals a remarkably resilient distribution of humor types over the years. <strong>Incongruity & Absurdity</strong> remains the dominant category, consistently forming the backbone of the <em>New Yorker</em>'s visual style. Interestingly, while the volume of contests varies, the relative proportions of <strong>Sarcasm</strong> and <strong>Wit</strong> remain stable, suggesting an editorial preference that transcends short-term news cycles.
          </AnalysisText>
        </ComicBox>

        {/* Section 2.2: Sentiment Analysis */}
        <div className="grid grid-cols-1 gap-6">
          <ComicBox title="🎭 The Emotional Spectrum of Humor">
            <p className="text-xs font-mono mb-6 leading-relaxed opacity-80 border-b border-gray-200 pb-4">
              In this section, we visualize the distribution of sentiment tones <strong>(Positive, Neutral, Negative)</strong> predicted by the LLMs for each field of the Cartoon Caption Contest dataset (image_descriptions, image_uncanny_descriptions, and questions). This helps us understand the emotional tendencies underlying the dataset and how the "mood" shifts across different content types. The classifications were generated using a fine-tuned RoBERTa model.
            </p>

            <div className="flex flex-col gap-8">

              {/* Buttons to select Sentiment Source */}
              <div className="flex gap-2 mb-2 justify-center">
                {[
                  { id: 'image_descriptions', label: 'Image Description' },
                  { id: 'image_uncanny_descriptions', label: 'Uncanny Description' },
                  { id: 'questions', label: 'Questions' }
                ].map((opt) => (
                  <button
                    key={opt.id}
                    onClick={() => setSentimentSource(opt.id as any)}
                    className="interactive-cta transition-colors"
                    style={{
                      backgroundColor: sentimentSource === opt.id ? '#E63946' : 'white',
                      color: sentimentSource === opt.id ? 'white' : '#1A1A1A'
                    }}
                  >
                    {opt.label}
                  </button>
                ))}
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {/* Chart 1: Radar Chart (Kiviat) - Sentiment Profile by Cluster */}
                <div className="border-4 border-[#1A1A1A] bg-white p-4" style={{ boxShadow: '4px 4px 0 #1A1A1A' }}>
                  <div className="bg-[#E63946] text-white px-2 py-1 inline-block mb-4 border-2 border-[#1A1A1A] transform -rotate-1">
                    <h4 className="comic-title text-sm">Emotional Profile by Humor Type</h4>
                  </div>
                  <ResponsiveContainer width="100%" height={350}>
                    <RadarChart cx="50%" cy="50%" outerRadius="70%" data={
                      Object.keys((data as any).sentimentAnalysis?.byClusterAndField || {}).map(key => {
                        const clusterData = (data as any).sentimentAnalysis?.byClusterAndField?.[key];
                        if (!clusterData) return null;

                        const val = clusterData[sentimentSource];
                        if (!val) return { subject: key, positive: 0, neutral: 0, negative: 0 };
                        const total = val.total || 1;

                        const names: Record<string, string> = {
                          'absurd_surreal': 'Absurd',
                          'sarcasm_irony': 'Irony',
                          'dark_humor': 'Black Humor',
                          'animals': 'Wit',
                          'relationship_family': 'Life',
                          'topical_political': 'Politics',
                          'wordplay_puns': 'Wordplay',
                          'workplace_office': 'Work'
                        };

                        return {
                          subject: names[key] || key,
                          positive: (val.positive / total) * 100,
                          neutral: (val.neutral / total) * 100,
                          negative: (val.negative / total) * 100
                        };
                      }).filter((x: any) => x !== null)
                    }>
                      <PolarGrid stroke="#1A1A1A" strokeDasharray="3 3" />
                      <PolarAngleAxis dataKey="subject" tick={{ fill: '#1A1A1A', fontSize: 10, fontWeight: 'bold' }} />
                      <PolarRadiusAxis angle={30} domain={[0, 50]} tickCount={6} tick={{ fill: '#1A1A1A', fontSize: 10 }} />

                      <Radar name="Positive 😊" dataKey="positive" stroke="#2A9D8F" strokeWidth={2} fill="#2A9D8F" fillOpacity={0.3} />
                      <Radar name="Neutral 😐" dataKey="neutral" stroke="#F4A261" strokeWidth={2} fill="#F4A261" fillOpacity={0.3} />
                      <Radar name="Negative 😠" dataKey="negative" stroke="#E63946" strokeWidth={2} fill="#E63946" fillOpacity={0.3} />

                      <Legend wrapperStyle={{ fontSize: '12px', paddingTop: '10px' }} />
                      <Tooltip
                        formatter={(val: number) => `${val.toFixed(1)}%`}
                        contentStyle={{ border: '2px solid #1A1A1A', fontSize: '12px' }}
                        itemStyle={{ color: '#1A1A1A' }}
                      />
                    </RadarChart>
                  </ResponsiveContainer>
                  <div className="mt-6 border-t border-dashed border-gray-300 pt-4">
                    <p className="text-xs text-justify leading-relaxed opacity-80">
                      Across all contexts, <strong>Neutrality</strong> dominates, which makes sense for factual image descriptions. However, distinct patterns emerge per category: <strong>Exaggeration</strong> and <strong>Sarcasm</strong> are uniquely prone to piercing this neutrality with sharp <strong>Negative</strong> spikes, particularly in Uncanny Descriptions. In contrast, <strong>Wit</strong> and <strong>Absurdity</strong> remain safer, anchoring themselves firmly in the neutral zone, proving that specialized humor doesn't always require negative framing.
                    </p>
                  </div>
                </div>

                {/* Chart 2: Evolution of Negativity */}
                {/* Chart 2: Evolution of Negativity */}
                <div className="border-4 border-[#1A1A1A] bg-white p-4" style={{ boxShadow: '4px 4px 0 #1A1A1A' }}>
                  <div className="bg-[#2A9D8F] text-white px-2 py-1 inline-block mb-4 border-2 border-[#1A1A1A] transform rotate-1">
                    <h4 className="comic-title text-sm">The "Cynicism Index" (2016-2023)</h4>
                  </div>

                  <p className="text-xs font-mono mb-4 leading-relaxed opacity-80 border-b border-dashed border-gray-200 pb-2">
                    To measure the true pulse of societal humor, we analyze the top 30 captions from every single contest between 2016 and 2023. By aggregating thousands of finalists, we track year-over-year shifts in emotional tone. This allows us to answer a key question: Does the world get meaner when times get tough?
                  </p>

                  <ResponsiveContainer width="100%" height={300}>
                    <AreaChart
                      data={Object.entries((data as any).sentimentAnalysis?.byYear || {}).sort((a: any, b: any) => a[0].localeCompare(b[0])).map(([year, val]: any) => ({
                        year,
                        negative: (val.negative / val.total) * 100,
                        neutral: (val.neutral / val.total) * 100,
                        positive: (val.positive / val.total) * 100
                      }))}
                      margin={{ left: -20, top: 10 }}
                    >
                      <CartesianGrid strokeDasharray="3 3" opacity={0.2} />
                      <XAxis dataKey="year" tick={{ fontSize: 10 }} />
                      <YAxis tick={{ fontSize: 10 }} unit="%" />
                      <Tooltip
                        formatter={(val: number) => `${val.toFixed(1)}%`}
                        contentStyle={{ border: '2px solid #1A1A1A', fontSize: '12px' }}
                      />
                      <Legend wrapperStyle={{ fontSize: '10px', paddingTop: '10px' }} />
                      <Area type="monotone" dataKey="negative" stackId="1" stroke="#E63946" fill="#E63946" fillOpacity={0.8} name="% Negative" />
                      <Area type="monotone" dataKey="neutral" stackId="1" stroke="#F4A261" fill="#F4A261" fillOpacity={0.8} name="% Neutral" />
                      <Area type="monotone" dataKey="positive" stackId="1" stroke="#2A9D8F" fill="#2A9D8F" fillOpacity={0.8} name="% Positive" />
                    </AreaChart>
                  </ResponsiveContainer>

                  <div className="mt-6 border-t border-dashed border-gray-300 pt-4">
                    <p className="text-xs text-justify leading-relaxed opacity-80">
                      The timeline reveals that while <strong>Neutral</strong> sentiment (orange) remains the baseline for most captions, there are visible fluctuations in <strong>Negative</strong> sentiment (red). This "Cynicism Index" acts as a barometer for societal mood—when the red area expands, it often correlates with periods of higher global stress, suggesting that our humor becomes a coping mechanism that leans into the darkness.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </ComicBox>
        </div>
      </section>





    </div>
  );
}
