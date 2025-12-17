'use client';

import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Mail, Github, Linkedin, ArrowLeft, ArrowRight } from 'lucide-react';
import { Starburst } from './ComicElements';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, LineChart, Line, Area, AreaChart } from 'recharts';


import frequency_caption from '@/data/introduction/introduction_frequency_captions.json';
import image_location from '@/data/introduction/top_50_terms_image_locations.json';
import image_description from '@/data/introduction/top_50_terms_image_descriptions.json';
import summary_votes from '@/data/introduction/summary_votes.json';


interface AboutBookProps {
  onNext?: () => void;
  onPrev?: () => void;
}


export const ComicBox = ({ children, className = '', title }: { children: React.ReactNode, className?: string, title?: string }) => (
  <div className={`border-4 border-[#1A1A1A] bg-white p-4 relative ${className}`} style={{ boxShadow: '6px 6px 0 #1A1A1A' }}>
    {title && (
      <div className="absolute -top-4 left-4 bg-[#F4A261] border-2 border-[#1A1A1A] px-3 py-1 z-10">
        <h3 className="comic-title text-xs font-bold text-[#1A1A1A]">{title}</h3>
      </div>
    )}
    {children}
  </div>
);

export const AnalysisText = ({ children }: { children: React.ReactNode }) => (
  <div className="bg-[#FDFDF8] border-l-4 border-[#2A9D8F] p-4 my-4 font-mono text-xs leading-relaxed text-[#1A1A1A] opacity-90">
    {children}
  </div>
);

export function AboutBook({ onNext, onPrev }: AboutBookProps) {
  const [currentId, setCurrentId] = useState(510);
  const minId = 510;
  const maxId = 895;

  // Base path for GitHub Pages deployment
  const basePath = process.env.NODE_ENV === 'production' ? '/ada-2025-data-dinosaur-website' : '';

  const handlePrevImage = () => {
    setCurrentId((prev) => {
      let nextId = prev - 1;
      if (nextId === 525) nextId = 524; // Skip missing 525
      return nextId < minId ? maxId : nextId;
    });
  };

  const handleNextImage = () => {
    setCurrentId((prev) => {
      let nextId = prev + 1;
      if (nextId === 525) nextId = 526; // Skip missing 525
      return nextId > maxId ? minId : nextId;
    });
  };

  const [currentCaption, setCurrentCaption] = useState<string>('');
  const [maxImage] = '514';

  React.useEffect(() => {
    const fetchCaption = async () => {
      try {
        const response = await fetch(`${basePath}/data/data_with_llm_top30/${currentId}.csv`);
        const text = await response.text();
        const lines = text.split('\n');
        if (lines.length > 1) {
          // Parse the first data line (index 1)
          // Regex to capture rank, then caption (quoted or unquoted)
          // Matches: start | digits | comma | "groups" OR non-comma | comma
          const match = lines[1].match(/^(\d+),(?:"([^"]*)"|([^,]*)),/);
          if (match) {
            // Group 2 is quoted caption, Group 3 is unquoted
            setCurrentCaption(match[2] || match[3] || '');
          }
        }
      } catch (error) {
        console.error('Error fetching caption:', error);
        setCurrentCaption('');
      }
    };

    fetchCaption();
  }, [currentId, basePath]);

  const findings = [
    {
      title: 'Pandemic Dominance',
      text: '26.7% of captions from 2020-2021',
      color: '#E63946'
    },
    {
      title: 'Tech Anxiety Surge',
      text: '340% growth from 2016 to 2023',
      color: '#F4A261'
    },
    {
      title: 'Political Cyclicity',
      text: '85% correlation with Google Trends',
      color: '#457B9D'
    },
    {
      title: 'Climate Persistence',
      text: 'Steady growth, increasingly urgent',
      color: '#2A9D8F'
    }
  ];

  const contest_steps = [
  {
    title: 'Round 1: Submit',
    text: 'Every week the readers can enter a caption of 250 characters or less for a new cartoon either on the  <a href="https://www.newyorker.com/cartoons/contest"> webpage </a> or on Instagram (@newyorkermag) using the hashtag #MyNewYorkerCaption.',
    color: '#E63946'
  },
  {
    title: 'Round 2: Rate',
    text: 'Decide if the captions from the previous week are unfunny, somewhat funny or funny to help narrow down the finalists.',
    color: '#F4A261'
  },
  {
    title: 'Round 3: Vote',
    text: 'The three finalists are selected from each Contest by a member or members of the editorial staff of The New Yorker. Select the winning caption by voting on three finalists from the week prior. ',
    color: '#457B9D'
  },
  {
    title: 'Round 3: Winner',
    text: 'The winner is shown the week after. The winner of each Contest will be the person whose caption received the greatest number of valid votes (“Votes”) from the public and who satisfies all of the rules (“Qualified Winner”). <a href="https://www.newyorker.com/about/caption-contest-rules"> [rules] </a>',
    color: '#2A9D8F'
  }
];


  return (
    <div className="h-full flex flex-col">
      {/* Page Title */}
      <div className="text-center mb-6">
        <Starburst color="#2A9D8F" size={120}>
          About
        </Starburst>
      </div>

      

      {/* Two Column Layout with Separator */}
      <div className="flex flex-row gap-0 flex-1 relative">
        {/* Left Column - Story & Cartoons */}
        <div className="flex-1 pr-8">
          <div className="inline-block mb-4 px-4 py-2 bg-[#457B9D] border-3 border-[#1A1A1A]">
            <h2 className="comic-title text-sm text-[#FDFDF8]">The Story</h2>
          </div>

          <div className="border-4 border-[#1A1A1A] p-4 bg-white mb-4" style={{ boxShadow: '4px 4px 0 #1A1A1A' }}>
            <div className="space-y-3 comic-text text-xs leading-relaxed">
              <p>
                The New Yorker Cartoon-caption contest started in 1998 as an annual event. In 2005 it was then changed into a weekly event. 
                 <a href="https://www.newyorker.com/magazine/2005/05/02/your-caption-here">[source] </a> 
              </p>
              <p>
                Participants are invited to submit their own humorous captions for a selected cartoon published in The New Yorker magazine.
              </p>
              <p>
                Anyone aged 13 or older can enter, with one entry allowed per person, email address, or Instagram account. Employees,
                affiliates, or family members connected to the contest’s organizers are not eligible to participate.
              </p>                
              
              <div className="space-y-3 mb-4">
                  {contest_steps.map((contest_steps, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.1 }}
                      className="border-4 border-[#1A1A1A] p-3 bg-white"
                      style={{ boxShadow: '3px 3px 0 #1A1A1A' }}
                    >
                      <div className="flex items-start gap-2">
                        <div
                          className="w-2 h-2 border-2 border-[#1A1A1A] rounded-full flex-shrink-0 mt-1"
                          style={{ backgroundColor: contest_steps.color }}
                        />
                        <div>
                          <h4 className="comic-title text-xs mb-1" style={{ color: contest_steps.color }}>
                            {contest_steps.title}
                          </h4>
                          <p className="comic-text text-[10px] opacity-80">
                            {contest_steps.text}
                          </p>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              
              
            </div>
          </div>

          <div
            className="mb-4"
            style={{
              backgroundColor: 'transparent',
              paddingTop: '2rem',
              paddingBottom: '3rem',
              width: '100%',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center'
            }}
          >
            {/* Aligned Container for Everything */}
            <div style={{ width: '440px', maxWidth: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>

              <div className="inline-block mb-2 px-4 py-2 bg-[#F4A261] border-3 border-[#1A1A1A]">
                <h2 className="comic-title text-sm text-[#FDFDF8]">Cartoons</h2>
              </div>
              <p className="comic-text text-sm mb-6 text-center w-full" style={{ fontWeight: 'bold', fontStyle: 'italic' }}>#{currentId}</p>

              {/* Caption Display */}
              <div className="min-h-[3rem] mb-4 flex items-end justify-center px-4">
                <p className="comic-text text-lg text-center font-bold leading-tight w-full">
                  {currentCaption && `"${currentCaption}"`}
                </p>
              </div>

              {/* The Square - Now Displaying Images */}
              <div
                style={{
                  width: '100%',
                  height: '350px',
                  border: '6px solid #000000ff',
                  backgroundColor: '#FFFFFF',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  position: 'relative',
                  overflow: 'hidden',
                  boxShadow: '4px 4px 0 #1A1A1A'
                }}
              >
                <img
                  src={`${basePath}/data/images/${currentId}.jpg`}
                  alt={`New Yorker Cartoon ${currentId}`}
                  style={{
                    width: '100%',
                    height: '100%',
                    objectFit: 'contain',
                    display: 'block'
                  }}
                  onError={(e) => {
                    (e.target as HTMLImageElement).style.display = 'none';
                  }}
                />
              </div>

              {/* Navigation Buttons */}
              <div style={{ marginTop: '1rem', display: 'flex', justifyContent: 'space-between', width: '100%' }}>
                <button
                  onClick={handlePrevImage}
                  className="interactive-cta bg-white text-[#1A1A1A] hover:opacity-100 transition-opacity"
                >
                  ← Previous
                </button>
                <button
                  onClick={handleNextImage}
                  className="interactive-cta bg-[#F4A261] text-white"
                >
                  Next →
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Central Separator - Robust Implementation */}
        <div className="w-[1px] border-r-2 border-dashed border-[#1A1A1A] h-auto my-12 opacity-30 mx-6 self-stretch"></div>

        {/* Right Column - Key Findings & Credits */}
        <div className="flex-1 pl-8">
          <div className="inline-block mb-4 px-4 py-2 bg-[#E63946] border-3 border-[#1A1A1A]">
            <h2 className="comic-title text-sm text-[#FDFDF8]">Key Findings</h2>
          </div>

          <div className="space-y-3 mb-4">
            {findings.map((finding, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
                className="border-4 border-[#1A1A1A] p-3 bg-white"
                style={{ boxShadow: '3px 3px 0 #1A1A1A' }}
              >
                <div className="flex items-start gap-2">
                  <div
                    className="w-2 h-2 border-2 border-[#1A1A1A] rounded-full flex-shrink-0 mt-1"
                    style={{ backgroundColor: finding.color }}
                  />
                  <div>
                    <h4 className="comic-title text-xs mb-1" style={{ color: finding.color }}>
                      {finding.title}
                    </h4>
                    <p className="comic-text text-[10px] opacity-80">
                      {finding.text}
                    </p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* --- SECTION 1: GENERAL ANALYSIS Barplot overall --- */}
      <section>
        <ComicBox title="Number of Captions" className="mb-8">
          <p className="text-xs font-mono mb-6 leading-relaxed opacity-80 border-b border-gray-200 pb-4">
          Over time there is a steady increase in the number of captions submitted. This is probably due to the increasing popularity of the contest and the increasing reach of the New Yorker Magazine. 
          </p>
          <ResponsiveContainer width="100%" height={350}>
            <LineChart data={frequency_caption} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" opacity={0.2} />
              <XAxis dataKey="date" tick={{ fontSize: 10 }} />
              <YAxis tick={{ fontSize: 5 }} label={{ value: 'Number of Captions', angle: -90 }} />
              <Tooltip contentStyle={{ border: '2px solid #1A1A1A' }} formatter={(value: any, name: any, item: any) => [`${value}%`, name]} />
              <Line type="bump" dataKey="num_captions" stroke="#264653" dot={false} strokeWidth={3} name="number of caption" />
            </LineChart>
          </ResponsiveContainer>
          <AnalysisText>
            blub blub
          </AnalysisText>
          </ComicBox>
          <ComicBox title="Number of Votes" className="mb-8">
            <p className="text-xs font-mono mb-6 leading-relaxed opacity-80 border-b border-gray-200 pb-4">
            Over time there is a steady increase in the number of captions submitted. This is probably due to the increasing popularity of the contest and the increasing reach of the New Yorker Magazine. 
            </p>
            <ResponsiveContainer width="100%" height={350}>
              <AreaChart data={summary_votes} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" opacity={0.2} />
                <XAxis dataKey="contest_id" tick={{ fontSize: 10 }} />
                <YAxis tick={{ fontSize: 5 }} label={{ value: 'Number of Votes', angle: -90 }} />
                <Tooltip contentStyle={{ border: '2px solid #1A1A1A' }} formatter={(value: any, name: any, item: any) => [`${value}`, name]} />
                
                <Area
                  type="monotone"
                  dataKey="total_votes"
                  stroke="#8884d8"
                  fill="#8884d8"
                  fillOpacity={1}
                  
                />
                <Area
                  type="monotone"
                  dataKey="total_not_funny"
                  stroke="#E63946"
                  fillOpacity={1}
                  fill="#E63946"
                />
                <Area
                  type="monotone"
                  dataKey="total_somewhat_funny"
                  stroke="#2A9D8F"
                  fillOpacity={1}
                  fill="#2A9D8F"
                />
                <Area
                  type="monotone"
                  dataKey="total_funny"
                  stroke="#82ca9d"
                  fillOpacity={1}
                  fill="#82ca9d"
                />
              </AreaChart>
            </ResponsiveContainer>
            <AnalysisText>
              blub blub
            </AnalysisText>
          </ComicBox>

          <ComicBox title="Places" className="mb-8">
            <p className="text-xs font-mono mb-6 leading-relaxed opacity-80 border-b border-gray-200 pb-4">
            Over time there is a steady increase in the number of captions submitted. This is probably due to the increasing popularity of the contest and the increasing reach of the New Yorker Magazine. 
            </p>
            <div style={{ width: '100%', height: 250 }}>
              <ResponsiveContainer>
                <BarChart data={image_location} layout="vertical">
                  <CartesianGrid strokeDasharray="3 3" stroke="#1A1A1A" opacity={0.1} />
                  <XAxis type="number" tick={{ fontSize: 9, fill: '#1A1A1A' }} stroke="#1A1A1A" />
                  <YAxis
                    type="category"
                    dataKey="term"
                    tick={{ fontSize: 10, fill: '#1A1A1A' }}
                    stroke="#1A1A1A"
                    width={60}
                  />
                  <Tooltip
                    contentStyle={{
                      border: '2px solid #1A1A1A',
                      borderRadius: '4px',
                      fontSize: '10px'
                    }}
                  />
                  <Bar dataKey="count" fill="#F4A261" stroke="#1A1A1A" strokeWidth={2} />
                </BarChart>
              </ResponsiveContainer>
            </div>
            <AnalysisText>
              blub blub
            </AnalysisText>
          </ComicBox>

          <ComicBox title="Image description" className="mb-8">
            <p className="text-xs font-mono mb-6 leading-relaxed opacity-80 border-b border-gray-200 pb-4">
            Over time there is a steady increase in the number of captions submitted. This is probably due to the increasing popularity of the contest and the increasing reach of the New Yorker Magazine. 
            </p>
            <div style={{ width: '100%', height: 300 }}>
              <ResponsiveContainer>
                <BarChart data={image_description} layout="vertical">
                  <CartesianGrid strokeDasharray="3 3" stroke="#1A1A1A" opacity={0.1} />
                  <XAxis type="number" tick={{ fontSize: 9, fill: '#1A1A1A' }} stroke="#1A1A1A" />
                  <YAxis
                    type="category"
                    dataKey="term"
                    tick={{ fontSize: 10, fill: '#1A1A1A' }}
                    stroke="#1A1A1A"
                    width={60}
                  />
                  <Tooltip
                    contentStyle={{
                      border: '2px solid #1A1A1A',
                      borderRadius: '4px',
                      fontSize: '10px'
                    }}
                  />
                  <Bar dataKey="count" fill="#F4A261" stroke="#1A1A1A" strokeWidth={2} />
                </BarChart>
              </ResponsiveContainer>
            </div>
            <AnalysisText>
              blub blub
            </AnalysisText>
          </ComicBox>


          {/* Aligned Container for Everything */}
          <div style={{ width: '440px', maxWidth: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>

            <div className="inline-block mb-2 px-4 py-2 bg-[#F4A261] border-3 border-[#1A1A1A]">
              <h2 className="comic-title text-sm text-[#FDFDF8]">Cartoons</h2>
            </div>
            <p className="comic-text text-sm mb-6 text-center w-full" style={{ fontWeight: 'bold', fontStyle: 'italic' }}>#{currentId}</p>

            {/* Caption Display */}
            <div className="min-h-[3rem] mb-4 flex items-end justify-center px-4">
              <p className="comic-text text-lg text-center font-bold leading-tight w-full">
                {maxImage && `"${maxImage}"`}
              </p>
            </div>

            {/* The Square - Now Displaying Images */}
            <div
              style={{
                width: '100%',
                height: '350px',
                border: '6px solid #000000ff',
                backgroundColor: '#FFFFFF',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                position: 'relative',
                overflow: 'hidden',
                boxShadow: '4px 4px 0 #1A1A1A'
              }}
            >
              <img
                src={`${basePath}/data/images/${maxImage}.jpg`}
                alt={`New Yorker Cartoon ${maxImage}`}
                style={{
                  width: '100%',
                  height: '100%',
                  objectFit: 'contain',
                  display: 'block'
                }}
                onError={(e) => {
                  (e.target as HTMLImageElement).style.display = 'none';
                }}
              />
            </div>
          </div>
        
      </section>
      </div>
    </div>
  );
}
