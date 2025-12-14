import React, { useMemo, useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Starburst } from "./ComicElements";
import { JournalSpread } from "./JournalSpread";
import type { EventId } from "web/plots_website_timeline/plotRegistry";

interface TimelinePoint {
  id: EventId;
  title: string;
  date: string;
  year: number;
  color: string;
  icon: string;
  description: string;
  keyEvents: string[];
  position: number;
  cluster: string;
  keywords: string[];
  cartoonTheme: string;
  worldEvents: string[];
}

export function TimelineInteractive() {
  const [hoveredPoint, setHoveredPoint] = useState<EventId | null>(null);
  const [selectedPoint, setSelectedPoint] = useState<TimelinePoint | null>(null);
  const [showJournalSpread, setShowJournalSpread] = useState(false);

  const timelinePoints: TimelinePoint[] = useMemo(
    () => [
      {
        id: "trump",
        title: "US Elections",
        date: "2016 & 2020",
        year: 2016,
        color: "#457B9D",
        icon: "🗳️",
        description:
          "Political satire dominated humor during election cycles, with sharp commentary on campaigns and results.",
        keyEvents: [
          "Trump elected (2016)",
          "Election campaign humor surge",
          "Biden vs Trump (2020)",
          "Mail-in voting debates",
        ],
        position: 15,
        cluster: "Political Satire",
        keywords: ["election", "vote", "campaign", "debate", "president", "politics"],
        cartoonTheme: "Election Season",
        worldEvents: [
          "Trump elected President (Nov 2016)",
          "Unprecedented campaign rhetoric",
          "Post-election protests nationwide",
          "Biden vs Trump rematch (2020)",
          "Mail-in voting controversy",
          "Capitol riots aftermath (2021)",
        ],
      },
      {
        id: "covid",
        title: "COVID-19 Pandemic",
        date: "Mar 2020 - 2021",
        year: 2020,
        color: "#E63946",
        icon: "😷",
        description:
          "The pandemic reshaped humor with themes of masks, Zoom calls, quarantine, and social distancing.",
        keyEvents: [
          "WHO declares pandemic (Mar 2020)",
          "Global lockdowns begin",
          "Zoom fatigue sets in",
          "Vaccine rollout (2021)",
        ],
        position: 50,
        cluster: "Pandemic Life",
        keywords: ["mask", "zoom", "quarantine", "lockdown", "covid", "distance"],
        cartoonTheme: "Life in Lockdown",
        worldEvents: [
          "WHO declares COVID-19 pandemic (March 2020)",
          "Global lockdowns implemented",
          "Toilet paper shortage becomes meme",
          "Zoom becomes household name",
          "Mask mandates nationwide",
          "Vaccine distribution begins (Dec 2020)",
        ],
      },
      {
        id: "war",
        title: "Global Conflicts",
        date: "Feb 2022",
        year: 2022,
        color: "#8D5B4C",
        icon: "🌍",
        description:
          "International tensions and conflicts became a recurring theme, reflecting global anxiety.",
        keyEvents: [
          "Russia invades Ukraine (Feb 2022)",
          "Energy crisis begins",
          "Global sanctions imposed",
          "Humanitarian concerns rise",
        ],
        position: 75,
        cluster: "Political Satire",
        keywords: ["war", "ukraine", "russia", "conflict", "peace", "sanctions"],
        cartoonTheme: "Global Tensions",
        worldEvents: [
          "Russia invades Ukraine (February 2022)",
          "Massive international sanctions",
          "Energy crisis in Europe",
          "Global supply chain disruptions",
          "Humanitarian refugee crisis",
          "Nuclear threat concerns",
        ],
      },
      {
        id: "climate",
        title: "Climate Crisis",
        date: "2019 - 2023",
        year: 2019,
        color: "#2A9D8F",
        icon: "🌡️",
        description:
          "Environmental humor grew steadily, becoming increasingly urgent as climate events intensified.",
        keyEvents: [
          "Youth climate strikes (2019)",
          "Record heat waves",
          "Extreme weather events",
          "Hottest year on record (2023)",
        ],
        position: 90,
        cluster: "Climate Crisis",
        keywords: ["climate", "earth", "environment", "heat", "weather", "crisis"],
        cartoonTheme: "Our Warming World",
        worldEvents: [
          "Youth climate strikes worldwide (2019)",
          "Amazon rainforest fires",
          "Record-breaking heat waves",
          "Extreme weather becomes norm",
          "COP climate summits",
          "2023 declared hottest year on record",
        ],
      },
    ],
    []
  );

  const handlePointClick = (point: TimelinePoint) => {
    setSelectedPoint(point);
    setShowJournalSpread(true);
  };

  return (
    <>
      <div className="h-full flex flex-col">
        {/* Page Title */}
        <div className="text-center mb-4">
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: "spring", duration: 0.8 }}
          >
            <Starburst color="#E63946" size={120}>
              Timeline
            </Starburst>
          </motion.div>
          <motion.h2
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="comic-title text-xl text-[#8B4513] mt-3"
          >
            How Major World Events Shaped Humor (2016–2023)
          </motion.h2>
        </div>

        <p className="text-center comic-text mb-6 text-sm">
          <span className="comic-title text-[#457B9D]">🗳️ Elections</span> •{" "}
          <span className="comic-title text-[#E63946]">😷 Pandemic</span> •{" "}
          <span className="comic-title text-[#8D5B4C]">🌍 Conflicts</span> •{" "}
          <span className="comic-title text-[#2A9D8F]">🌡️ Climate</span> — Click to explore!
        </p>

        {/* Timeline Visualization */}
        <div className="flex-1 relative mb-6">
          {/* Timeline line */}
          <div
            className="absolute top-[30%] left-8 right-8 h-2 rounded-full"
            style={{
              background:
                "linear-gradient(90deg, #457B9D 0%, #E63946 40%, #8D5B4C 70%, #2A9D8F 100%)",
              boxShadow: "0 4px 0 rgba(0,0,0,0.2)",
            }}
          />

          {/* Year markers */}
          {[2016, 2017, 2018, 2019, 2020, 2021, 2022, 2023].map((year, idx) => {
            const position = (idx / 7) * 100;
            return (
              <div
                key={year}
                className="absolute top-[30%] transform -translate-y-1/2"
                style={{ left: `calc(8% + ${position * 0.84}%)` }}
              >
                <div
                  className="w-8 h-8 border-3 border-[#1A1A1A] rounded-full bg-white flex items-center justify-center transform -translate-x-1/2"
                  style={{ boxShadow: "2px 2px 0 #1A1A1A" }}
                >
                  <span className="comic-text text-[9px]">{year}</span>
                </div>
              </div>
            );
          })}

          {/* Timeline points */}
          {timelinePoints.map((point, index) => {
            const isHovered = hoveredPoint === point.id;
            const isAbove = index % 2 === 0;

            return (
              <motion.div
                key={point.id}
                className="absolute"
                style={{
                  left: `${8 + point.position * 0.84}%`,
                  top: isAbove ? "10%" : "50%",
                }}
                initial={{ scale: 0, rotate: 180 }}
                animate={{ scale: 1, rotate: 0 }}
                transition={{ delay: index * 0.2, type: "spring", bounce: 0.6 }}
              >
                <motion.button
                  whileHover={{ scale: 1.15 }}
                  whileTap={{ scale: 0.95 }}
                  onHoverStart={() => setHoveredPoint(point.id)}
                  onHoverEnd={() => setHoveredPoint(null)}
                  onClick={() => handlePointClick(point)}
                  className="relative transform -translate-x-1/2 z-10"
                >
                  <div
                    className="w-16 h-16 border-4 border-[#1A1A1A] rounded-full flex flex-col items-center justify-center cursor-pointer bg-white"
                    style={{
                      backgroundColor: isHovered ? point.color : "white",
                      boxShadow: `5px 5px 0 ${point.color}, 5px 5px 0 3px #1A1A1A`,
                    }}
                  >
                    <span className="text-2xl">{point.icon}</span>
                  </div>

                  {/* Connection line */}
                  <div
                    className="absolute left-1/2 w-0.5 bg-[#1A1A1A]"
                    style={{
                      [isAbove ? "top" : "bottom"]: "100%",
                      height: "60px",
                      transform: "translateX(-50%)",
                    }}
                  />

                  {/* Label */}
                  <div
                    className={`absolute ${
                      isAbove ? "bottom-full mb-20" : "top-full mt-20"
                    } left-1/2 transform -translate-x-1/2 whitespace-nowrap`}
                  >
                    <div
                      className="comic-title text-xs px-2 py-1 bg-white border-2 border-[#1A1A1A] rounded"
                      style={{ color: point.color }}
                    >
                      {point.title}
                    </div>
                  </div>

                  {/* Hover tooltip */}
                  <AnimatePresence>
                    {isHovered && (
                      <motion.div
                        initial={{ opacity: 0, scale: 0.8, y: isAbove ? -10 : 10 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.8, y: isAbove ? -10 : 10 }}
                        className={`absolute ${
                          isAbove ? "top-full mt-2" : "bottom-full mb-2"
                        } left-1/2 transform -translate-x-1/2 z-50`}
                      >
                        <div
                          className="w-56 p-4 bg-white border-3 border-[#1A1A1A] rounded-lg shadow-[0_0_15px_rgba(0,0,0,0.2)]"
                          style={{
                            boxShadow: "4px 4px 0 #1A1A1A",
                            backgroundColor: `${point.color}10`,
                          }}
                        >
                          <p className="comic-title text-sm mb-2" style={{ color: point.color }}>
                            💥 Click to explore!
                          </p>
                          <p className="comic-text text-xs opacity-80">
                            {point.description.substring(0, 60)}...
                          </p>
                          <div className="mt-2 flex gap-1 flex-wrap">
                            {point.keywords.slice(0, 3).map((kw, i) => (
                              <span
                                key={i}
                                className="text-[9px] px-2 py-0.5 bg-white/60 rounded-full border border-[#1A1A1A]/20"
                              >
                                #{kw}
                              </span>
                            ))}
                          </div>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.button>
              </motion.div>
            );
          })}
        </div>

        {/* Instruction text */}
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-center">
          <p className="handwritten text-lg text-[#8B4513]">
            👆 Click on any event to see detailed analysis
          </p>
        </motion.div>
      </div>

      {/* Journal Spread Modal */}
      <AnimatePresence>
        {showJournalSpread && selectedPoint && (
          <JournalSpread
            event={selectedPoint}
            onClose={() => {
              setShowJournalSpread(false);
              setSelectedPoint(null);
            }}
          />
        )}
      </AnimatePresence>
    </>
  );
}
