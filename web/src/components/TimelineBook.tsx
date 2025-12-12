'use client';

import React, { useState } from "react";
import { AnimatePresence } from "motion/react";
import { JournalSpread } from "./JournalSpread";
import { Vote, Leaf, Activity, Sword } from "lucide-react";

type IconType = "vote" | "leaf" | "activity" | "sword";

interface TimelineEvent {
  id: string;
  label: string;       // Short name shown next to dot
  title: string;
  date: string;
  timeRange: string;
  year: number;
  position: number;
  cluster: string;
  color: string;
  iconType: IconType;
  keywords: string[];
  cartoonTheme: string;
  worldEvents: string[];
  wordData: { word: string; count: number }[];
  trendsData: { month: string; interest: number }[];
}

const events: TimelineEvent[] = [
  {
    id: "election",
    label: "US Elections",
    title: "US Presidential Elections",
    date: "2016 & 2020",
    timeRange: "2016 & 2020",
    year: 2016,
    position: 5,
    cluster: "Political Satire",
    color: "#457B9D",
    iconType: "vote",
    keywords: ["election", "campaign", "vote", "results"],
    cartoonTheme: "Shock & Politics",
    worldEvents: [
      "2016: Trump vs. Clinton campaign + surprise result",
      "2020: COVID-era election, mail-in voting, delayed results",
      "Intense polarization reflected in caption tone",
    ],
    wordData: [
      { word: "election", count: 260 },
      { word: "vote", count: 210 },
      { word: "campaign", count: 180 },
      { word: "debate", count: 155 },
      { word: "results", count: 140 },
    ],
    trendsData: [
      { month: "Jan", interest: 30 },
      { month: "Mar", interest: 40 },
      { month: "Jun", interest: 55 },
      { month: "Sep", interest: 80 },
      { month: "Nov", interest: 100 },
      { month: "Dec", interest: 65 },
    ],
  },
  {
    id: "climate",
    label: "Climate Crisis",
    title: "Climate & Environment",
    date: "2018–2023",
    timeRange: "2018–2023",
    year: 2019,
    position: 35,
    cluster: "Existential Humor",
    color: "#2A9D8F",
    iconType: "leaf",
    keywords: ["climate", "heat", "flood", "planet"],
    cartoonTheme: "Warming World",
    worldEvents: [
      "Massive climate marches and youth movements",
      "Record-breaking heatwaves and wildfires",
      "Climate anxiety increasingly visible in humor",
    ],
    wordData: [
      { word: "planet", count: 190 },
      { word: "heat", count: 172 },
      { word: "storm", count: 150 },
      { word: "flood", count: 132 },
      { word: "future", count: 120 },
    ],
    trendsData: [
      { month: "Jan", interest: 40 },
      { month: "Mar", interest: 48 },
      { month: "Jun", interest: 60 },
      { month: "Aug", interest: 75 },
      { month: "Oct", interest: 82 },
      { month: "Dec", interest: 78 },
    ],
  },
  {
    id: "covid",
    label: "COVID-19",
    title: "COVID-19 Pandemic",
    date: "2020–2021",
    timeRange: "2020–2021",
    year: 2020,
    position: 65,
    cluster: "Pandemic",
    color: "#E63946",
    iconType: "activity",
    keywords: ["mask", "zoom", "home", "distance"],
    cartoonTheme: "Lockdown Life",
    worldEvents: [
      "Global lockdowns and social distancing",
      "Zoom meetings, remote work, and cabin fever",
      "Toilet paper, masks, and surreal daily life",
    ],
    wordData: [
      { word: "mask", count: 430 },
      { word: "zoom", count: 395 },
      { word: "home", count: 360 },
      { word: "distance", count: 320 },
      { word: "quarantine", count: 290 },
    ],
    trendsData: [
      { month: "Jan", interest: 10 },
      { month: "Feb", interest: 25 },
      { month: "Mar", interest: 100 },
      { month: "Apr", interest: 95 },
      { month: "May", interest: 88 },
      { month: "Jun", interest: 80 },
    ],
  },
  {
    id: "wars",
    label: "Wars & Conflicts",
    title: "Wars & Geopolitics",
    date: "2022–2023",
    timeRange: "2022–2023",
    year: 2022,
    position: 90,
    cluster: "Dark Humor",
    color: "#8D5B4C",
    iconType: "sword",
    keywords: ["war", "border", "sanctions", "energy"],
    cartoonTheme: "Fragile World Order",
    worldEvents: [
      "Russian invasion of Ukraine and ongoing war coverage",
      "Energy crisis and inflation spikes",
      "News fatigue and doomscrolling in captions",
    ],
    wordData: [
      { word: "war", count: 260 },
      { word: "border", count: 210 },
      { word: "sanctions", count: 175 },
      { word: "energy", count: 160 },
      { word: "news", count: 140 },
    ],
    trendsData: [
      { month: "Jan", interest: 20 },
      { month: "Feb", interest: 45 },
      { month: "Mar", interest: 85 },
      { month: "Apr", interest: 92 },
      { month: "May", interest: 88 },
      { month: "Jun", interest: 81 },
    ],
  },
];

function renderIcon(iconType: IconType, color: string) {
  const common = { size: 18, strokeWidth: 2 } as const;
  switch (iconType) {
    case "vote":
      return <Vote {...common} color={color} />;
    case "leaf":
      return <Leaf {...common} color={color} />;
    case "activity":
      return <Activity {...common} color={color} />;
    case "sword":
      return <Sword {...common} color={color} />;
    default:
      return null;
  }
}

export default function TimelineBook() {
  const [selectedEvent, setSelectedEvent] = useState<TimelineEvent | null>(null);
  const timelineHidden = selectedEvent !== null;

  return (
    <>
      <div
        style={{
          width: "100%",
          height: "100%",
          padding: "40px",
          background: "#FDFDF8",
          position: "relative",
        }}
      >
        <h1
          className="comic-title"
          style={{
            fontSize: "40px",
            fontWeight: "bold",
            marginBottom: "8px",
            color: "#1A1A1A",
          }}
        >
          HOW MAJOR WORLD EVENTS SHAPED HUMOR (2016–2023)
        </h1>

        <p className="comic-text" style={{ marginBottom: "40px" }}>
          Four major moments that reshaped the news — and the way New Yorker
          captions joked about the world. Click a dot to explore the event.
        </p>

        {/* Timeline only when modal is closed */}
        {!timelineHidden && (
          <>
            {/* Vertical line */}
            <div
              style={{
                position: "absolute",
                top: "220px",
                left: "120px",
                width: "6px",
                height: "320px",
                background: "black",
                borderRadius: "4px",
                zIndex: 10,
              }}
            />

            {/* Dots + labels + icons */}
            <div
              style={{
                position: "absolute",
                top: "220px",
                left: "120px",
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-between",
                height: "320px",
                paddingLeft: "40px",
                zIndex: 20,
              }}
            >
              {events.map((event) => (
                <button
                  key={event.id}
                  onClick={() => setSelectedEvent(event)}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "14px",
                    cursor: "pointer",
                    background: "none",
                    border: "none",
                    padding: 0,
                    textAlign: "left",
                  }}
                >
                  {/* Dot */}
                  <div
                    style={{
                      width: "22px",
                      height: "22px",
                      background: event.color,
                      borderRadius: "50%",
                      border: "4px solid black",
                    }}
                  />

                  {/* Icon */}
                  <div
                    style={{
                      width: "26px",
                      height: "26px",
                      borderRadius: "50%",
                      border: "2px solid #1A1A1A",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      background: "#FDFDF8",
                    }}
                  >
                    {renderIcon(event.iconType, event.color)}
                  </div>

                  {/* Text: name + date */}
                  <div
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "flex-start",
                    }}
                  >
                    <span
                      className="comic-title"
                      style={{
                        fontSize: "15px",
                        color: "#1A1A1A",
                        textTransform: "uppercase",
                      }}
                    >
                      {event.label}
                    </span>
                    <span
                      className="comic-text"
                      style={{ fontSize: "14px", opacity: 0.8 }}
                    >
                      {event.date}
                    </span>
                  </div>
                </button>
              ))}
            </div>
          </>
        )}
      </div>

      {/* Journal Spread Modal */}
      <AnimatePresence>
        {selectedEvent && (
          <JournalSpread
            event={selectedEvent}
            onClose={() => setSelectedEvent(null)}
          />
        )}
      </AnimatePresence>
    </>
  );
}
