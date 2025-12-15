'use client';


import { Book } from '@/components/Book';
import { BookCover } from '@/components/BookCover';
import { AboutBook } from '@/components/AboutBook';
import { StoryPage } from '@/components/StoryPage';
import TimelineBook from '@/components/TimelineBook';

import { GenderPage } from '@/components/GenderPage';
import { ClustersAnalysis } from '@/components/ClustersAnalysis';
import { CreditsPage } from '@/components/CreditsPage';
import { DataProvider } from '@/context/DataContext';


export default function HomePage() {
  const pages = [
    <BookCover key="cover" />,
    <AboutBook key="about-book" />,
    <StoryPage key="story" />,
    // 👇 THIS is the test timeline page
    <TimelineBook key="timeline-book" />,

    <GenderPage key="gender" />,
    <ClustersAnalysis key="clusters-analysis" />,
    <CreditsPage key="credits" />,
  ];

  const titles = [
    'Cover',
    'The Story & Dataset',
    'Story & Context',
    'Timeline',

    'Gender Analysis',
    'Clusters Deep-Dive',
    'Credits',
  ];

  return (
    <DataProvider>
      <Book pages={pages} titles={titles} />
    </DataProvider>
  );
}
