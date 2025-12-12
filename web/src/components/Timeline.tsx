'use client';

import React from "react";

interface SimpleEvent {
  id: string;
  date: string;
  color: string;
}

const events: SimpleEvent[] = [
  { id: "election", date: "2016 & 2020", color: "#457B9D" },
  { id: "climate", date: "2018–2023", color: "#2A9D8F" },
  { id: "covid",   date: "2020–2021", color: "#E63946" },
  { id: "wars",    date: "2022–2023", color: "#8D5B4C" },
];

export default function Timeline() {
  return (
    <div className="w-full h-full flex flex-col items-center bg-[#FDFDF8] py-16 px-6">
      {/* Title */}
      <h1
        className="comic-title text-4xl md:text-5xl font-bold text-center mb-6"
        style={{ color: "#1A1A1A" }}
      >
        HOW MAJOR WORLD EVENTS SHAPED HUMOR (2016–2023)
      </h1>
      <p className="comic-text text-center mb-10 max-w-2xl">
        Four major moments that reshaped the news — and the way New Yorker
        captions joked about the world.
      </p>

      {/* SIMPLE VERTICAL TIMELINE */}
      <div className="relative mt-4" style={{ minHeight: "320px" }}>
        {/* Vertical line */}
        <div
          className="absolute left-4 top-0 bottom-0 w-[3px] rounded-full"
          style={{ backgroundColor: "#1A1A1A" }}
        />

        {/* Dots + year labels */}
        <div className="ml-10 flex flex-col justify-between h-full gap-8">
          {events.map((event) => (
            <div key={event.id} className="flex items-center gap-3">
              <div
                className="w-4 h-4 rounded-full border-[2px] border-[#1A1A1A]"
                style={{ backgroundColor: event.color }}
              />
              <span className="comic-text text-sm">{event.date}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
