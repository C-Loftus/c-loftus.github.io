/**
 * Copyright 2026 Colton Loftus
 * SPDX-License-Identifier: AGPL-3.0-only
 */

import { useEffect, useState } from "react";
import { createPortal } from "react-dom";

interface PortfolioItem {
  id: number;
  title: string;
  link: string;
  sourceLink?: string;
  mediaKey?: keyof PortfolioImages;
  iframe?: string;
  description: string;
  categories: string[];
  languages: string[];
}

interface OpenSourceContributionItem {
  id: number;
  title: string;
  link: string;
  contributionLink?: string;
  logoKey?: keyof ContributionLogos;
  description: string;
  categories: string[];
  languages: string[];
}

interface PortfolioImages {
  awo: string;
  explorer: string;
  piper: string;
  wis2: string;
  wwdh: string;
}

interface ContributionLogos {
  talon: string;
  orca: string;
  iceberg: string;
}

const portfolioItems: PortfolioItem[] = [
  {
    id: 430,
    title: "US Bureau of Reclamation Reservoir Dashboard",
    link: "https://dashboard.wwdh.internetofwater.app/",
    description:
      "Created a dashboard and geospatial API for the US Bureau of Reclamation to monitor critical reservoir data",
    categories: ["Data Engineering", "Backend"],
    languages: ["Python", "Terraform"],
    mediaKey: "wwdh",
    sourceLink: "https://github.com/internetofwater/wwdh",
  },
  {
    id: 6,
    title: "Geoconnex",
    link: "https://explorer.geoconnex.us/",
    sourceLink: "https://github.com/internetofwater/scheduler",
    description:
      "Created a distributed graph database for the US Geological Survey, allowing hydrologists to link water data across government agencies on the same river",
    categories: ["Data Engineering", "Backend"],
    languages: ["Python", "Go", "Rust"],
    mediaKey: "explorer",
  },
  {
    id: 2,
    title: "WIS2Box UI",
    link: "https://demo.wis2box.wis.wmo.int/",
    sourceLink:
      "https://github.com/World-Meteorological-Organization/wis2box-ui",
    description:
      "Created a Typescript rewrite of the frontend for the World Meterological Foundation's distributed weather system, WIS2. Deployed by dozens of governments in the UN",
    categories: ["Frontend", "Distributed Systems"],
    languages: ["TypeScript"],
    mediaKey: "wis2",
  },
  {
    id: 3,
    title: "QuickPiperAudiobook",
    description:
      "Generate AI audiobooks from any text format. Over 1k Stars on Github",
    categories: ["Accessibility", "AI"],
    link: "https://github.com/C-Loftus/QuickPiperAudiobook",
    sourceLink: "https://github.com/C-Loftus/QuickPiperAudiobook",
    languages: ["Go"],
    mediaKey: "piper",
  },
  {
    id: 7,
    title: "Arizona Water Observatory",
    link: "https://arizonawaterobservatory.asu.edu/",
    description:
      "Created a hydrology data portal for the Center for Hydrologic Innovations at Arizona State University",
    categories: ["Data Engineering", "Backend"],
    languages: ["Python", "PostGIS", "Terraform"],
    mediaKey: "awo",
    sourceLink: "https://github.com/cgs-earth/ArizonaWaterObservatory",
  },
  {
    id: 5,
    title: "Talon-AI-Tools",
    description:
      "Integrate the Talon voice dictation software with large language models for more accessible and intelligent voice control",
    categories: ["Accessibility", "Voice control"],
    link: "https://github.com/C-Loftus/talon-ai-tools/",
    sourceLink: "https://github.com/C-Loftus/talon-ai-tools/",
    languages: ["Python"],
    iframe:
      '<iframe width=\"560\" height=\"315\" src=\"https://www.youtube.com/embed/FctiTs6D2tM?si=PfovY2SHI_QEFkOB\" title=\"YouTube video player\" frameborder=\"0\" allow=\"accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share\" referrerpolicy=\"strict-origin-when-cross-origin\" allowfullscreen></iframe>',
  },
  {
    id: 4,
    title: "Sight-free-talon",
    description:
      "Integrate the Talon voice dictation software with a screen reader for use by blind individuals",
    categories: ["Accessibility", "Screen readers"],
    link: "https://github.com/C-Loftus/sight-free-talon/",
    sourceLink: "https://github.com/C-Loftus/sight-free-talon/",
    languages: ["Python"],
    iframe:
      '<iframe width=\"560\" height=\"315\" src=\"https://www.youtube.com/embed/i-XcpnVwvR0?si=Ljrc_vwow1kJtnqq\" title=\"YouTube video player\" frameborder=\"0\" allow=\"accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share\" referrerpolicy=\"strict-origin-when-cross-origin\" allowfullscreen></iframe>',
  },
];

const openSourceContributions: OpenSourceContributionItem[] = [
  {
    id: 101,
    title: "iceberg-go",
    link: "https://github.com/apache/iceberg-go",
    contributionLink:
      "https://github.com/apache/iceberg-go/commits?author=c-loftus",
    description:
      "Contributed to Apache Iceberg's Go implementation of the Apache Iceberg specification",
    categories: ["Data Engineering"],
    languages: ["Go"],
    logoKey: "iceberg",
  },
];

function ProjectText({
  item,
}: {
  item: Pick<
    PortfolioItem | OpenSourceContributionItem,
    "link" | "title" | "description" | "sourceLink" | "categories" | "languages"
  >;
}) {
  return (
    <div className="space-y-4">
      <div>
        <a
          href={item.link}
          target="_blank"
          rel="noopener noreferrer"
          className="text-xl font-semibold leading-tight text-neutral-950 underline decoration-neutral-300 underline-offset-4 hover:decoration-current dark:text-neutral-50 dark:decoration-neutral-600"
        >
          {item.title}
        </a>
        <p className="mt-3 text-sm leading-6 text-neutral-700 dark:text-neutral-300">
          {item.description}
        </p>
        {item.contributionLink ? (
          <a
            href={item.contributionLink}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-2 inline-block text-sm italic text-neutral-600 underline decoration-neutral-300 underline-offset-4 hover:decoration-current dark:text-neutral-400 dark:decoration-neutral-600"
          >
            Contributions
          </a>
        ) : (
          <span className="mt-2 inline-block text-sm italic text-neutral-500 dark:text-neutral-400">
            Add source code link
          </span>
        )}
      </div>
      <div className="flex flex-wrap gap-2">
        {[...item.categories, ...item.languages].map((tag) => (
          <span
            key={tag}
            className="inline-flex rounded-full border border-neutral-200 bg-neutral-100 px-3 py-1 text-xs font-medium text-neutral-700 dark:border-neutral-700 dark:bg-neutral-800 dark:text-neutral-200"
          >
            {tag}
          </span>
        ))}
      </div>
    </div>
  );
}

function LogoCell({ logo, title }: { logo?: string; title: string }) {
  return logo ? (
    <div className="flex h-full items-center sm:justify-center">
      <img
        src={logo}
        alt={`${title} logo`}
        className="h-20 w-20 rounded-md border border-neutral-200 bg-white object-contain p-2 shadow-md shadow-neutral-900/10 dark:border-neutral-700 dark:bg-neutral-800 dark:shadow-black/30"
        loading="lazy"
      />
    </div>
  ) : (
    <span className="flex h-20 w-20 items-center justify-center rounded-md border border-dashed border-neutral-300 bg-neutral-50 p-3 text-center text-xs font-medium text-neutral-500 dark:border-neutral-600 dark:bg-neutral-800/70 dark:text-neutral-400">
      Add project logo
    </span>
  );
}

export default function PortfolioTable({
  images,
  logos,
}: {
  images: PortfolioImages;
  logos: ContributionLogos;
}) {
  const [selectedImage, setSelectedImage] = useState<PortfolioItem | null>(
    null,
  );
  const [isBrowser, setIsBrowser] = useState(false);

  useEffect(() => {
    setIsBrowser(true);
  }, []);

  useEffect(() => {
    if (!selectedImage) {
      return;
    }

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setSelectedImage(null);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [selectedImage]);

  return (
    <section
      id="projects"
      className="relative left-1/2 w-[calc(100vw-2rem)] max-w-7xl -translate-x-1/2 py-6 sm:w-[calc(100vw-4rem)]"
    >
      <div className="overflow-hidden rounded-lg border border-neutral-200 bg-white shadow-xl shadow-neutral-900/10 dark:border-neutral-700 dark:bg-neutral-900 dark:shadow-black/30">
        <table className="block w-full text-left sm:table sm:table-fixed">
          <thead className="hidden sm:table-header-group">
            <tr className="border-b border-neutral-200 bg-neutral-100 text-xs uppercase tracking-wide text-neutral-600 dark:border-neutral-700 dark:bg-neutral-800 dark:text-neutral-300">
              <th
                scope="col"
                className="w-[42%] px-3 py-4 font-semibold sm:px-6"
              >
                Project
              </th>
              <th
                scope="col"
                className="w-[58%] px-3 py-4 font-semibold sm:px-6"
              >
                Visual
              </th>
            </tr>
          </thead>
          <tbody className="block sm:table-row-group">
            {portfolioItems.map((item) => {
              const mediaLink = item.mediaKey ? images[item.mediaKey] : "";

              return (
                <tr
                  key={item.id}
                  className="block border-b border-neutral-200 last:border-b-0 hover:bg-neutral-50 sm:table-row dark:border-neutral-800 dark:hover:bg-neutral-800/80"
                >
                  <td className="block px-3 pb-3 pt-5 align-middle sm:table-cell sm:px-6 sm:py-5">
                    <ProjectText item={item} />
                  </td>
                  <td className="block px-3 pb-5 pt-0 align-middle sm:table-cell sm:px-6 sm:py-5">
                    {item.iframe ? (
                      <div
                        className="aspect-[16/9] w-full overflow-hidden rounded-md border border-neutral-200 bg-neutral-100 shadow-md shadow-neutral-900/10 dark:border-neutral-700 dark:bg-neutral-800 dark:shadow-black/30 [&>iframe]:h-full [&>iframe]:w-full"
                        dangerouslySetInnerHTML={{ __html: item.iframe }}
                      />
                    ) : mediaLink ? (
                      <button
                        type="button"
                        className="block w-full cursor-zoom-in p-0 text-left"
                        aria-label={`Enlarge media for ${item.title}`}
                        onClick={() => setSelectedImage(item)}
                      >
                        <img
                          src={mediaLink}
                          alt={`${item.title} preview`}
                          className="aspect-[16/9] w-full rounded-md border border-neutral-200 bg-neutral-100 object-contain shadow-md shadow-neutral-900/10 transition-transform duration-200 hover:scale-[1.01] dark:border-neutral-700 dark:bg-neutral-800 dark:shadow-black/30"
                          loading="lazy"
                        />
                      </button>
                    ) : (
                      <span className="flex aspect-[16/9] w-full items-center justify-center rounded-md border border-dashed border-neutral-300 bg-neutral-50 p-4 text-center text-sm font-medium text-neutral-500 dark:border-neutral-600 dark:bg-neutral-800/70 dark:text-neutral-400">
                        Add project image
                      </span>
                    )}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
      <div
        id="open-source-contributions"
        className="mt-8 overflow-hidden rounded-lg border border-neutral-200 bg-white shadow-xl shadow-neutral-900/10 dark:border-neutral-700 dark:bg-neutral-900 dark:shadow-black/30"
      >
        <table className="block w-full text-left sm:table sm:table-fixed">
          <thead className="hidden sm:table-header-group">
            <tr className="border-b border-neutral-200 bg-neutral-100 text-xs uppercase tracking-wide text-neutral-600 dark:border-neutral-700 dark:bg-neutral-800 dark:text-neutral-300">
              <th
                scope="col"
                className="w-[76%] px-3 py-4 font-semibold sm:px-6"
              >
                Open Source Contributions
              </th>
              <th
                scope="col"
                className="w-[24%] px-3 py-4 font-semibold sm:px-6"
              ></th>
            </tr>
          </thead>
          <tbody className="block sm:table-row-group">
            {openSourceContributions.map((item) => {
              const logo = item.logoKey ? logos[item.logoKey] : "";

              return (
                <tr
                  key={item.id}
                  className="block border-b border-neutral-200 last:border-b-0 hover:bg-neutral-50 sm:table-row dark:border-neutral-800 dark:hover:bg-neutral-800/80"
                >
                  <td className="block px-3 pb-3 pt-5 align-middle sm:table-cell sm:px-6 sm:py-5">
                    <ProjectText item={item} />
                  </td>
                  <td className="block px-3 pb-5 pt-0 align-middle sm:table-cell sm:px-6 sm:py-5">
                    <LogoCell logo={logo} title={item.title} />
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
      {isBrowser && selectedImage?.mediaKey
        ? createPortal(
            <div
              className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4"
              role="dialog"
              aria-modal="true"
              aria-label={`${selectedImage.title} enlarged preview`}
              onClick={() => setSelectedImage(null)}
            >
              <button
                type="button"
                className="absolute right-4 top-4 flex h-10 w-10 items-center justify-center rounded-full border border-white/30 bg-black/70 text-xl font-semibold leading-none text-white shadow-lg hover:bg-black focus:outline-none focus:ring-2 focus:ring-white"
                aria-label="Close enlarged preview"
                onClick={() => setSelectedImage(null)}
              >
                X
              </button>
              <img
                src={images[selectedImage.mediaKey]}
                alt={`${selectedImage.title} preview`}
                className="max-h-[88vh] max-w-[94vw] rounded-md border border-white/20 bg-neutral-100 object-contain shadow-2xl"
                onClick={(event) => event.stopPropagation()}
              />
            </div>,
            document.body,
          )
        : null}
    </section>
  );
}
