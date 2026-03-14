"use client";

import { useState } from "react";
import TeamTable from "./TeamTable";
import ReferralTree from "./GraphTree";
import TeamMap from "./TeamMap";

export default function TeamView() {
  const [view, setView] = useState<"table" | "tree" | "map">("table");

  const tabs = [
    {
      key: "table" as const,
      label: "Table",
      icon: (
        <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h18M3 14h18M3 6h18M3 18h18" />
        </svg>
      ),
    },
    {
      key: "tree" as const,
      label: "Tree",
      icon: (
        <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 5a1 1 0 011-1h4a1 1 0 011 1v4a1 1 0 01-1 1H5a1 1 0 01-1-1V5zM14 15a1 1 0 011-1h4a1 1 0 011 1v4a1 1 0 01-1 1h-4a1 1 0 01-1-1v-4zM14 5a1 1 0 011-1h4a1 1 0 011 1v4a1 1 0 01-1 1h-4a1 1 0 01-1-1V5zM4 15a1 1 0 011-1h4a1 1 0 011 1v4a1 1 0 01-1 1H5a1 1 0 01-1-1v-4z" />
        </svg>
      ),
    },
    {
      key: "map" as const,
      label: "Map",
      icon: (
        <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
        </svg>
      ),
    },
  ];

  return (
    <div>
      {/* View Toggle */}
      <div className="flex items-center gap-2 mb-6">
        <div className="inline-flex rounded-lg border border-gray-200 bg-white shadow-sm overflow-hidden">
          {tabs.map((tab, i) => (
            <button
              key={tab.key}
              onClick={() => setView(tab.key)}
              className={`px-4 py-2 text-sm font-medium transition-colors ${
                view === tab.key
                  ? "bg-[#00A8E3] text-white"
                  : "text-gray-600 hover:text-[#00A8E3]"
              } ${i > 0 ? "border-l border-gray-200" : ""}`}
            >
              <span className="flex items-center gap-2">
                {tab.icon}
                {tab.label}
              </span>
            </button>
          ))}
        </div>
      </div>

      {view === "table" && <TeamTable />}
      {view === "tree" && <ReferralTree />}
      {view === "map" && <TeamMap />}
    </div>
  );
}
