import React from 'react';
import { motion } from 'motion/react';
import { Starburst } from './ComicElements';
import { useData } from '@/context/DataContext';

export function ClustersBook() {
  const { selectedCluster, selectCluster } = useData();

  const clusters = [
    {
      name: 'Political Satire',
      color: '#457B9D',
      percentage: 28,
      keywords: ['election', 'campaign', 'politics', 'vote', 'president'],
      description: 'Sharp commentary on political events and figures'
    },
    {
      name: 'Tech Anxiety',
      color: '#F4A261',
      percentage: 24,
      keywords: ['phone', 'AI', 'social media', 'robot', 'tech'],
      description: 'Concerns about digital life and automation'
    },
    {
      name: 'Work-Life Absurdity',
      color: '#2A9D8F',
      percentage: 22,
      keywords: ['office', 'meeting', 'boss', 'remote', 'work'],
      description: 'Corporate culture and workplace humor'
    },
    {
      name: 'Pandemic',
      color: '#E63946',
      percentage: 18,
      keywords: ['mask', 'zoom', 'quarantine', 'lockdown', 'covid'],
      description: 'Life during the COVID-19 pandemic'
    },
    {
      name: 'Climate Crisis',
      color: '#8D5B4C',
      percentage: 8,
      keywords: ['climate', 'earth', 'environment', 'heat', 'crisis'],
      description: 'Environmental concerns and climate change'
    }
  ];

  return (
    <div className="h-full flex flex-col">
      {/* Page Title */}
      <div className="text-center mb-6">
        <Starburst color="#F4A261" size={120}>
          Clusters
        </Starburst>
      </div>

      <p className="text-center comic-text mb-6 max-w-2xl mx-auto text-sm">
        Five distinct humor types identified through machine learning analysis
      </p>

      {/* Clusters Grid */}
      <div className="grid grid-cols-2 gap-4 flex-1">
        {clusters.slice(0, 4).map((cluster, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: index * 0.1 }}
            onClick={() => selectCluster(cluster.name)}
            className={`border-4 border-[#1A1A1A] p-4 bg-white relative overflow-hidden cursor-pointer transition-all duration-300 ${
              selectedCluster === cluster.name 
                ? 'selected-state' 
                : 'hover:scale-105'
            }`}
            style={{ 
              boxShadow: selectedCluster === cluster.name 
                ? `0 0 20px ${cluster.color}, 4px 4px 0 #1A1A1A` 
                : '4px 4px 0 #1A1A1A',
            }}
          >
            {/* Background color */}
            <div 
              className="absolute inset-0 opacity-10"
              style={{ backgroundColor: cluster.color }}
            />

            <div className="relative z-10">
              {/* Title */}
              <div className="flex items-center gap-2 mb-3">
                <div
                  className="w-4 h-4 border-2 border-[#1A1A1A] rounded-full"
                  style={{ backgroundColor: cluster.color }}
                />
                <h3 className="comic-title text-sm" style={{ color: cluster.color }}>
                  {cluster.name}
                </h3>
              </div>

              {/* Percentage */}
              <div className="mb-3">
                <span className="comic-title text-3xl" style={{ color: cluster.color }}>
                  {cluster.percentage}%
                </span>
              </div>

              {/* Description */}
              <p className="comic-text text-xs mb-3 opacity-80">
                {cluster.description}
              </p>

              {/* Keywords */}
              <div className="flex flex-wrap gap-1">
                {cluster.keywords.slice(0, 3).map((keyword, i) => (
                  <span
                    key={i}
                    className="text-[10px] px-2 py-1 bg-[#FDFDF8] border border-[#1A1A1A] comic-text"
                  >
                    {keyword}
                  </span>
                ))}
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Fifth cluster - full width at bottom */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        onClick={() => selectCluster(clusters[4].name)}
        className={`border-4 border-[#1A1A1A] p-4 bg-white relative overflow-hidden mt-4 cursor-pointer transition-all duration-300 ${
          selectedCluster === clusters[4].name 
            ? 'selected-state' 
            : 'hover:scale-105'
        }`}
        style={{ 
          boxShadow: selectedCluster === clusters[4].name 
            ? `0 0 20px ${clusters[4].color}, 4px 4px 0 #1A1A1A` 
            : '4px 4px 0 #1A1A1A'
        }}
      >
        <div 
          className="absolute inset-0 opacity-10"
          style={{ backgroundColor: clusters[4].color }}
        />

        <div className="relative z-10 flex items-center justify-between">
          <div className="flex-1">
            <div className="flex items-center gap-2 mb-2">
              <div
                className="w-4 h-4 border-2 border-[#1A1A1A] rounded-full"
                style={{ backgroundColor: clusters[4].color }}
              />
              <h3 className="comic-title text-sm" style={{ color: clusters[4].color }}>
                {clusters[4].name}
              </h3>
            </div>
            <p className="comic-text text-xs opacity-80">
              {clusters[4].description}
            </p>
          </div>
          
          <div className="text-right">
            <span className="comic-title text-3xl" style={{ color: clusters[4].color }}>
              {clusters[4].percentage}%
            </span>
          </div>
        </div>
      </motion.div>

      {/* Note */}
      <div className="mt-4 text-center">
        <p className="handwritten text-sm text-[#8B4513] opacity-70">
          Identified using k-means clustering with TF-IDF vectorization
        </p>
      </div>
    </div>
  );
}
