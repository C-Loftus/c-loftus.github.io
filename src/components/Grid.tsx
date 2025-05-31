import React, { useState } from "react";

interface PortfolioItem {
  id: number;
  title: string;
  link: string;
  description: string;
  category: string;
  language: string;
}

const portfolioItems: PortfolioItem[] = [
  {
    id: 6,
    title: "Geoconnex Scheduler",
    link: "https://github.com/internetofwater/scheduler/",
    description:
      "A data orchestrator for distributed water data; funded by the US Geological Survey",
    category: "Data Engineering",
    language: "Python",
  },
  {
    id: 2,
    title: "WIS2Box UI",
    link: "https://github.com/World-Meteorological-Organization/wis2box-ui",
    description:
      "Typescript rewrite of the frontend for the World Meterological Foundation's distributed weather system",
    category: "Frontend",
    language: "Typescript",
  },
  {
    id: 1,
    title: "Nabu",
    link: "https://github.com/internetofwater/nabu",
    description:
      "Synchronize the contents of a S3 bucket with a graph database",
    category: "Data Engineering",
    language: "Go / Rust",
  },
  {
    id: 3,
    title: "QuickPiperAudiobook",
    description:
      "Generate AI audiobooks from any text format; contains a custom epub parser",
    category: "Accessibility",
    link: "https://github.com/C-Loftus/QuickPiperAudiobook",
    language: "Go",
  },
  {
    id: 5,
    title: "Talon-AI-Tools",
    description:
      "Integrate the Talon voice dictation software with large language models for more accessible and intelligent voice control",
    category: "Accessibility",
    link: "https://github.com/C-Loftus/talon-ai-tools/",
    language: "Python",
  },
  {
    id: 4,
    title: "Sight-free-talon",
    description:
      "Integrate the Talon voice dictation software with a screen reader for use by blind individuals",
    category: "Accessibility",
    link: "https://github.com/C-Loftus/sight-free-talon/",
    language: "Python",
  },
];

export default function PortfolioTable() {
  const [sortField, setSortField] = useState<
    "title" | "language" | "category" | null
  >(null);
  const [sortDirection, setSortDirection] = useState<"asc" | "desc">("asc");

  const handleSort = (field: "title" | "language" | "category") => {
    if (sortField === field) {
      setSortDirection((prev) => (prev === "asc" ? "desc" : "asc"));
    } else {
      setSortField(field);
      setSortDirection("asc");
    }
  };

  const sortedItems = [...portfolioItems].sort((a, b) => {
    if (!sortField) return 0;
    const aVal = a[sortField].toLowerCase();
    const bVal = b[sortField].toLowerCase();
    if (aVal < bVal) return sortDirection === "asc" ? -1 : 1;
    if (aVal > bVal) return sortDirection === "asc" ? 1 : -1;
    return 0;
  });

  return (
    <div className="p-4 max-w-7xl mx-auto">
      <div className="overflow-x-auto">
        <table className="min-w-full table-auto border border-gray-200 dark:border-gray-700 text-left">
          <thead>
            <tr className="bg-gray-100 dark:bg-neutral-800 text-sm text-gray-800 dark:text-gray-200">
              <th
                className="p-3 cursor-pointer"
                onClick={() => handleSort("title")}
              >
                Name{" "}
                {sortField === "title" && (sortDirection === "asc" ? "↑" : "↓")}
              </th>
              <th className="p-3">Description</th>
              <th
                className="p-3 cursor-pointer"
                onClick={() => handleSort("category")}
              >
                Category{" "}
                {sortField === "category" &&
                  (sortDirection === "asc" ? "↑" : "↓")}
              </th>
              <th
                className="cursor-pointer"
                onClick={() => handleSort("language")}
              >
                Language{" "}
                {sortField === "language" &&
                  (sortDirection === "asc" ? "↑" : "↓")}
              </th>
            </tr>
          </thead>
          <tbody>
            {sortedItems.map((item) => (
              <tr
                key={item.id}
                className="border-t border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-neutral-800"
              >
                <td className="p-3 font-medium text-neutral-900 dark:text-gray-100">
                  <a href={item.link} target="_blank" rel="noopener noreferrer">
                    {item.title}
                  </a>
                </td>
                <td className="p-3 text-sm">{item.description}</td>
                <td className="p-3 text-sm">{item.category}</td>
                <td className="p-3 text-sm">{item.language}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
