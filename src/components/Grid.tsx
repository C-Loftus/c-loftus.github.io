interface PortfolioItem {
  id: number;
  title: string;
  link: string;
  sourceLink?: string;
  mediaLink?: string;
  iframe?: string;
  description: string;
  categories: string[];
  languages: string[];
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
    mediaLink: "/portfolio/wwdh.png",
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
    mediaLink: "/portfolio/explorer.png",
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
    mediaLink: "/portfolio/wis2.png",
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
    mediaLink: "/portfolio/piper.png",
  },
    {
    id: 430,
    title: "Arizona Water Observatory",
    link: "https://arizonawaterobservatory.asu.edu/",
    description:
      "Created a hydrology data portal for the Center for Hydrologic Innovations at Arizona State University",
    categories: ["Data Engineering", "Backend"],
    languages: ["Python", "PostGIS", "Terraform"],
    mediaLink: "/portfolio/awo.png",
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
    mediaLink: "",
   iframe: '<iframe width=\"560\" height=\"315\" src=\"https://www.youtube.com/embed/FctiTs6D2tM?si=PfovY2SHI_QEFkOB\" title=\"YouTube video player\" frameborder=\"0\" allow=\"accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share\" referrerpolicy=\"strict-origin-when-cross-origin\" allowfullscreen></iframe>'
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
    mediaLink: "",
    iframe: "<iframe width=\"560\" height=\"315\" src=\"https://www.youtube.com/embed/i-XcpnVwvR0?si=Ljrc_vwow1kJtnqq\" title=\"YouTube video player\" frameborder=\"0\" allow=\"accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share\" referrerpolicy=\"strict-origin-when-cross-origin\" allowfullscreen></iframe>"  },
];

export default function PortfolioTable() {
  return (
    <section className="relative left-1/2 w-[calc(100vw-2rem)] max-w-7xl -translate-x-1/2 py-6 sm:w-[calc(100vw-4rem)]">
      <div className="overflow-hidden rounded-lg border border-neutral-200 bg-white shadow-xl shadow-neutral-900/10 dark:border-neutral-700 dark:bg-neutral-900 dark:shadow-black/30">
        <table className="w-full table-fixed text-left">
          <thead>
            <tr className="border-b border-neutral-200 bg-neutral-100 text-xs uppercase tracking-wide text-neutral-600 dark:border-neutral-700 dark:bg-neutral-800 dark:text-neutral-300">
              <th
                scope="col"
                className="w-[42%] px-3 py-4 font-semibold sm:px-6"
              >
                Project
              </th>
              <th scope="col" className="w-[58%] px-3 py-4 font-semibold sm:px-6">
                Visual
              </th>
            </tr>
          </thead>
          <tbody>
            {portfolioItems.map((item) => (
              <tr
                key={item.id}
                className="border-b border-neutral-200 last:border-b-0 hover:bg-neutral-50 dark:border-neutral-800 dark:hover:bg-neutral-800/80"
              >
                <td className="px-3 py-5 align-middle sm:px-6">
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
                      {item.sourceLink ? (
                        <a
                          href={item.sourceLink}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="mt-2 inline-block text-sm italic text-neutral-600 underline decoration-neutral-300 underline-offset-4 hover:decoration-current dark:text-neutral-400 dark:decoration-neutral-600"
                        >
                          Source code
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
                </td>
                <td className="px-3 py-5 align-middle sm:px-6">
                  {item.iframe ? (
                    <div
                      className="aspect-[16/9] w-full overflow-hidden rounded-md border border-neutral-200 bg-neutral-100 shadow-md shadow-neutral-900/10 dark:border-neutral-700 dark:bg-neutral-800 dark:shadow-black/30 [&>iframe]:h-full [&>iframe]:w-full"
                      dangerouslySetInnerHTML={{ __html: item.iframe }}
                    />
                  ) : item.mediaLink ? (
                    <a
                      href={item.mediaLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="block w-full !no-underline"
                      aria-label={`View media for ${item.title}`}
                    >
                      <img
                        src={item.mediaLink}
                        alt={`${item.title} preview`}
                        className="aspect-[16/9] w-full rounded-md border border-neutral-200 bg-neutral-100 object-contain shadow-md shadow-neutral-900/10 transition-transform duration-200 hover:scale-[1.01] dark:border-neutral-700 dark:bg-neutral-800 dark:shadow-black/30"
                        loading="lazy"
                      />
                    </a>
                  ) : (
                    <span className="flex aspect-[16/9] w-full items-center justify-center rounded-md border border-dashed border-neutral-300 bg-neutral-50 p-4 text-center text-sm font-medium text-neutral-500 dark:border-neutral-600 dark:bg-neutral-800/70 dark:text-neutral-400">
                      Add project image
                    </span>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
}
