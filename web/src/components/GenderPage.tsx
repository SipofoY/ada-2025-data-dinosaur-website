import React, { useEffect, useState } from 'react';
import { motion } from 'motion/react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, LineChart, Line, Area, AreaChart } from 'recharts';
import { Starburst } from './ComicElements';
import { Users, TrendingUp, AlertCircle } from 'lucide-react';
import { useData } from '@/context/DataContext';
import gender_timeline from '@/data/gender_data/df_vc.json';
import climat_timeline from '@/data/gender_data/climate.json';
import covid_timeline from '@/data/gender_data/covid.json';
import war_timeline from '@/data/gender_data/war.json';
import trump_timeline from '@/data/gender_data/trump.json';
import humor_labels from '@/data/gender_data/gender_humor_labels.json';
import gender_sentiment from '@/data/gender_data/gender_sentiment.json';
import gender_eventgroupe from '@/data/gender_data/event_groups.json';
import trends_focusgroup from '@/data/gender_data/google_trends_focus_groups_timeseries.json';
import trends_zscore from '@/data/gender_data/google_trends_zscored_focus_groups.json';
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
  const { section1 } = gtimeline;


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
          Gender Representation
        </h1>
      </div>



      {/* --- SECTION 1: GENERAL ANALYSIS Barplot overall --- */}
      <section>

        <ComicBox title="Gender mentions distribution overall">
          <p className="text-xs font-mono mb-4 leading-relaxed opacity-80">
            This chart shows the times each word group for <strong>women</strong> and <strong>men</strong> is mentioned. Additionally, the counts of the word <strong>dino</strong> and <strong>witch</strong> are shown as well. This is due to the fact, that when observing the cartoons, there are more dinos and witches alone on one image than there is a woman alone on an image. With this analysis, social inequalities should be statistically uncovered.
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
            Turns out, the differences in mentions of the word groups man and woman mentions are shocking. There is more than <strong>four times</strong> more man mentioned in the captions. So, even an unpolitical caption contest shows massive difference between the genders. This empathizes once more how social inequalities are strongly enforced in the society.
          </AnalysisText>
        </ComicBox>
      </section>

      {/* Toggle View */}
      <div className="flex justify-center gap-4 mb-6">
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => setSelectedView('timeline')}
          className="interactive-cta transition-colors"
          style={{
            backgroundColor: selectedView === 'timeline' ? '#E63946' : 'white',
            color: selectedView === 'timeline' ? 'white' : '#1A1A1A',
            boxShadow: '3px 3px 0 #1A1A1A'
          }}
        >
          General Timeline View
        </motion.button>
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => setSelectedView('comparison')}
          className="interactive-cta transition-colors"
          style={{
            backgroundColor: selectedView === 'comparison' ? '#E63946' : 'white',
            color: selectedView === 'comparison' ? 'white' : '#1A1A1A',
            boxShadow: '3px 3px 0 #1A1A1A'
          }}
        >
          By Topic
        </motion.button>
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => setSelectedView('gapRate')}
          className="interactive-cta transition-colors"
          style={{
            backgroundColor: selectedView === 'gapRate' ? '#E63946' : 'white',
            color: selectedView === 'gapRate' ? 'white' : '#1A1A1A',
            boxShadow: '3px 3px 0 #1A1A1A'
          }}
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
            <ComicBox>
              <p className="text-xs font-mono mb-6 leading-relaxed opacity-80 border-b border-gray-200 pb-4">
                Here, the previous analysis is looked at on a timeline. Maybe there is a variation in time? Or maybe the inequality in mentions even decreased over time?
              </p>
              <ResponsiveContainer width="100%" height={350}>
                <LineChart data={section1} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
                  <CartesianGrid strokeDasharray="3 3" opacity={0.2} />
                  <XAxis dataKey="date" tick={{ fontSize: 10 }} />
                  <YAxis tick={{ fontSize: 10 }} label={{ value: 'mentions', angle: -90, position: 'insideLeft' }} />
                  <Tooltip contentStyle={{ border: '2px solid #1A1A1A' }} />
                  <Line type="monotone" dataKey="men" stroke="#E63946" dot={false} />
                  <Line type="monotone" dataKey="women" stroke="#2A9D8F" dot={false} />
                </LineChart>
              </ResponsiveContainer>
              <AnalysisText>
                This graph shows that there is no such thing happening. The inequality doesn’t seem to change. And it is even more striking to see, that also for specific captions, the word group woman, overpasses the word group man only 7 times…
              </AnalysisText>
            </ComicBox>
          )}

          {/*Timeline View with combined data*/}
          {selectedView === 'comparison' && (
            <section>
              <ComicBox title="Eventgroup by Gender">
                <p className="text-xs font-mono mb-4 leading-relaxed opacity-80">
                  During the caption contest, different topics were analysed on its development over time. There is the <strong>covid-pandemic</strong>, several <strong>wars</strong>, the presidency of Donald <strong>Trump</strong> and <strong>climate change</strong>. Maybe for certain topics, the gender related word groups are mentioned more or less often? Let's see!
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
                  The inequality in the mentions between the gender word groups remains for all topics. Visibly, one can see that captions correlated with <strong>Trump</strong> are texts that have the <strong>least amount</strong> of women word group mentioned compared to the men word groups. Whereas <strong>climate change</strong> captions have the <strong>least gender difference</strong>, even if it is still pronounced there. <i>This could hint, that certain topics are more open for a more equal discourse?</i> Unfortunately, after a <strong>chi-test</strong> one statistical evidence is shown and therefore the null hypothesis has to be accepted!
                </AnalysisText>
              </ComicBox>
              <ComicBox title="Climat change" className="mb-8">
                <p className="text-xs font-mono mb-6 leading-relaxed opacity-80 border-b border-gray-200 pb-4">
                  The public perception of the climate crisis changed a lot between 2016 and 2023. The <strong>Fridays for Future</strong> movements started with Greta Thunberg in 2018.
                </p>
                <ResponsiveContainer width="100%" height={350}>
                  <LineChart data={climat_timeline} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
                    <CartesianGrid strokeDasharray="3 3" opacity={0.2} />
                    <XAxis dataKey="date" tick={{ fontSize: 10 }} />
                    <YAxis tick={{ fontSize: 5 }} label={{ value: 'caption percentage [%]', angle: -90 }} />
                    <Tooltip contentStyle={{ border: '2px solid #1A1A1A' }} formatter={(value: any, name: any, item: any) => [`${value}%`, name]} />
                    <Line type="bump" dataKey="ma_pct_man" stroke="#E63946" dot={false} strokeWidth={3} name="man" />
                    <Line type="bump" dataKey="ma_pct_woman" stroke="#2A9D8F" dot={false} strokeWidth={3} name="woman" />
                    <Line type="bump" dataKey="combined_pct" stroke="#264653" dot={false} strokeWidth={3} name="combined" />
                  </LineChart>
                </ResponsiveContainer>
                <AnalysisText>
                  The gender distribution as expected: man word groups are still bigger at almost every point of time. Also, there is no significant rise of climate topic in the caption contest, the Fridays for future didn’t influence, even if there is peak in beginning of the year 2019.
                </AnalysisText>
              </ComicBox>

              <ComicBox title="Covid" className="mb-8">
                <p className="text-xs font-mono mb-6 leading-relaxed opacity-80 border-b border-gray-200 pb-4">
                  Then there was the pandemic…
                </p>
                <ResponsiveContainer width="100%" height={350}>
                  <LineChart data={covid_timeline} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
                    <CartesianGrid strokeDasharray="3 3" opacity={0.2} />
                    <XAxis dataKey="date" tick={{ fontSize: 10 }} />
                    <YAxis tick={{ fontSize: 5 }} label={{ value: 'caption percentage [%]', angle: -90 }} />
                    <Tooltip contentStyle={{ border: '2px solid #1A1A1A' }} formatter={(value: any, name: any, item: any) => [`${value}%`, name]} />
                    <Line type="bump" dataKey="ma_pct_man" stroke="#E63946" dot={false} strokeWidth={3} name="man" />
                    <Line type="bump" dataKey="ma_pct_woman" stroke="#2A9D8F" dot={false} strokeWidth={3} name="woman" />
                    <Line type="bump" dataKey="combined_pct" stroke="#264653" dot={false} strokeWidth={3} name="combined" />
                  </LineChart>
                </ResponsiveContainer>
                <AnalysisText>
                  The covid word group shows a clear phase when there was the pandemic. The small percentage before the pandemic comes from words like <i>virus, vaccine and mask</i> as part of the covid-word-group. At the peak of the pandemic in <strong>spring 2020</strong>, the word group women are bigger. This is very exceptional but also only for a <strong>short period</strong> of time.
                </AnalysisText>
              </ComicBox>

              <ComicBox title="War" className="mb-8">
                <p className="text-xs font-mono mb-6 leading-relaxed opacity-80 border-b border-gray-200 pb-4">
                  Wars are a very patriarchal, in my opinion. Is there a difference in representation?
                </p>
                <ResponsiveContainer width="100%" height={350}>
                  <LineChart data={war_timeline} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
                    <CartesianGrid strokeDasharray="3 3" opacity={0.2} />
                    <XAxis dataKey="date" tick={{ fontSize: 10 }} />
                    <YAxis tick={{ fontSize: 5 }} label={{ value: 'caption percentage [%]', angle: -90 }} />
                    <Tooltip contentStyle={{ border: '2px solid #1A1A1A' }} formatter={(value: any, name: any, item: any) => [`${value}%`, name]} />
                    <Line type="bump" dataKey="ma_pct_man" stroke="#E63946" dot={false} strokeWidth={3} name="man" />
                    <Line type="bump" dataKey="ma_pct_woman" stroke="#2A9D8F" dot={false} strokeWidth={3} name="woman" />
                    <Line type="bump" dataKey="combined_pct" stroke="#264653" dot={false} strokeWidth={3} name="combined" />
                  </LineChart>
                </ResponsiveContainer>
                <AnalysisText>
                  The war data is very irregular. The word groups aren’t connected to a specific war, but only on war words like <i>missile, army and invasion</i>. The irregularity certainly comes for the fact that the caption contest just doesn’t provide cartoons, where a link to war can be made. At the peaks of the combined caption percentage, there is often a big gab between the gender representation.
                </AnalysisText>
              </ComicBox>
              <ComicBox title="Trump" className="mb-8">
                <p className="text-xs font-mono mb-6 leading-relaxed opacity-80 border-b border-gray-200 pb-4">
                  For words around infamous Donald Trump change over time, depending on how controversial and political, Trump is at the moment of time. Is this also visible in the gender distribution?
                </p>
                <ResponsiveContainer width="100%" height={350}>
                  <LineChart data={trump_timeline} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
                    <CartesianGrid strokeDasharray="3 3" opacity={0.2} />
                    <XAxis dataKey="date" tick={{ fontSize: 10 }} />
                    <YAxis tick={{ fontSize: 5 }} label={{ value: 'caption percentage [%]', angle: -90 }} />
                    <Tooltip contentStyle={{ border: '2px solid #1A1A1A' }} formatter={(value: any, name: any, item: any) => [`${value}%`, name]} />
                    <Line type="bump" dataKey="ma_pct_man" stroke="#E63946" dot={false} strokeWidth={3} name="man" />
                    <Line type="bump" dataKey="ma_pct_woman" stroke="#2A9D8F" dot={false} strokeWidth={3} name="woman" />
                    <Line type="bump" dataKey="combined_pct" stroke="#264653" dot={false} strokeWidth={3} name="combined" />
                  </LineChart>
                </ResponsiveContainer>
                <AnalysisText>
                  For the gender distribution, there is no significant change over time. Also, the word groups are <strong>surprisingly equal</strong> over time . This is even more interesting, when considering, that over all the gender related differences for the word group trump is very waste.
                </AnalysisText>
              </ComicBox>
              <ComicBox>
                <p className="text-xs font-mono mb-6 leading-relaxed opacity-80 border-b border-gray-200 pb-4">
                  Here, it is also interesting to compare the previous results with the <strong>timeline of trump mentions</strong>.
                </p>
                <ResponsiveContainer width="100%" height={350}>
                  <LineChart data={section1} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
                    <CartesianGrid strokeDasharray="3 3" opacity={0.2} />
                    <XAxis dataKey="date" tick={{ fontSize: 10 }} />
                    <YAxis tick={{ fontSize: 10 }} label={{ value: 'mentions', angle: -90, position: 'insideLeft' }} />
                    <Tooltip contentStyle={{ border: '2px solid #1A1A1A' }} />
                    <Line type="monotone" dataKey="trump" stroke="#2A9D8F" dot={false} strokeWidth={3} />
                  </LineChart>
                </ResponsiveContainer>
                <AnalysisText>
                  The figure shows that Trump is mentioned frequently over time, and the frequency fluctuates by following a pattern. A massive surge in mentions is visible from 2016 to 2018 with a peak in early 2017, corresponding to <strong>Trump's presidential campaign</strong> and early presidency. Media and public attention were <strong>extremely high</strong> during this time. Then, after mid-2017, the mentions' frequency shows a downward trend. This likely reflects a normalization effect, where Trump remained relevant but no longer dominated headlines as much as during the election and early administration. Around 2019-2020, moderate peaks appear, which are possibly tied to the 2020 election and a <strong>major political event</strong>. Following his departure from office, the mentions drop, even if he still appears occasionally. Finally, Trump's mentions increase again mid-2023, where Trump <strong>announced his run for presidency</strong> again.
                </AnalysisText>
              </ComicBox>
            </section>
          )}
          {/*Humor Chart*/}
          {selectedView === 'gapRate' && (
            <section>
              <ComicBox title="Humor Lables by Gender">
                <p className="text-xs font-mono mb-4 leading-relaxed opacity-80">
                  Is there a difference in humour or sentiment, when it comes to gender distribution?
                  Each caption received a <strong>humour label</strong> with the help of a LLM. This is then sorted for the two gender related word groups.
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
                  This analysis is very interesting. Incongruity-absurdity, self-deprecating and sarcasm are more pronounced for the woman word groups, while irony, wit-surprise and all the unknown humour labels are more pronounced for man word groups. So there, is a difference in humour types depending on the gender related captions.
                </AnalysisText>
              </ComicBox>
              <ComicBox title="Sentiment by Gender">
                <p className="text-xs font-mono mb-4 leading-relaxed opacity-80">
                  Besides the humour labels, also the sentiment of the caption can change. So the type of humour also depends on the positivity, neutrality or negativity of its sentiment.
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
                  The woman captions are more neutral than the man captions, while the man captions, are more pronounced by negative and even more by positive sentiments. This shows that captions containing man word groups are <strong>more controversial</strong>.
                </AnalysisText>

                
              </ComicBox>                
              <p className="text-xs font-mono mb-6 leading-relaxed opacity-80 border-b border-gray-200 pb-4">
                  <strong>It is also interesting to compare the gender based analysis on the Google Trends: 
                  </strong>The following plots compare language used in our caption dataset with public attention measured by Google Trends. First, we aggregate unigram counts across multiple caption-derived CSV files (descriptions, locations, uncanny descriptions, and questions) to estimate how often each token appears in the dataset. We then align these tokens with Google Trends data (2016–2023, US) to study both overall popularity and temporal dynamics.
                </p>
              <ComicBox title="Google Trends Focus Groups Over Time">
                <ResponsiveContainer width="100%" height={350}>
                  <LineChart data={trends_focusgroup} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
                    <CartesianGrid strokeDasharray="3 3" opacity={0.2} />
                    <XAxis dataKey="date" tick={{ fontSize: 10 }} />
                    <YAxis tick={{ fontSize: 10 }} label={{ value: 'interest (0-100)', angle: -90, position: 'insideLeft' }} />
                    <Tooltip contentStyle={{ border: '2px solid #1A1A1A' }} />
                    <Line type="monotone" dataKey="women" stroke="#E76F51" dot={false} strokeWidth={3} />
                    <Line type="monotone" dataKey="men" stroke="#F4A261" dot={false} strokeWidth={3} />
                  </LineChart>
                </ResponsiveContainer>
                <AnalysisText>
                  This graph shows the Google Trends time series for selected “focus group” tokens (here: man/men and woman/women). It visualizes how public interest in these terms evolves over time and provides a direct comparison of their relative attention across months.
                </AnalysisText>
              </ComicBox>
              <ComicBox title="Google Trends Focus Groups Z-Score Over Time">

                <ResponsiveContainer width="100%" height={350}>
                  <LineChart data={trends_zscore} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
                    <CartesianGrid strokeDasharray="3 3" opacity={0.2} />
                    <XAxis dataKey="date" tick={{ fontSize: 10 }} />
                    <YAxis tick={{ fontSize: 10 }} label={{ value: 'z-score', angle: -90, position: 'insideLeft' }} />
                    <Tooltip contentStyle={{ border: '2px solid #1A1A1A' }} />
                    <Line type="monotone" dataKey="women" stroke="#264653" dot={false} strokeWidth={3} />
                    <Line type="monotone" dataKey="men" stroke="#2A9D8F" dot={false} strokeWidth={3} />
                  </LineChart>
                </ResponsiveContainer>
                <AnalysisText>
                  This graph compares the shape of the two focus-group Trends time series after z-scoring each one independently (so we compare deviations from each term’s own baseline). This highlights whether the two terms rise and fall together over time, reported via Pearson and Kendall tau correlations.
                </AnalysisText>
              </ComicBox>
            </section>
          )}
        </motion.div>
      </div>
    </div>
  );
} 