/**
 * Copyright 2026 Colton Loftus
 * SPDX-License-Identifier: AGPL-3.0-only
 */

import type { ImageMetadata } from "astro";

import icebergLogo from "../assets/iceberg.svg";
import awo from "../assets/portfolio/awo.png";
import explorer from "../assets/portfolio/explorer.png";
import piper from "../assets/portfolio/piper.png";
import wis2 from "../assets/portfolio/wis2.png";
import wwdh from "../assets/portfolio/wwdh.png";
import pygeoapi from "../assets/portfolio/pygeoapi.png";
import arrowLogo from "../assets/arrow.png";

type PortfolioAsset = ImageMetadata | string;

/**
 * Entries are identified by their title: it is the React key, the row's
 * anchor on /portfolio, and how the landing page looks a project up. Keep
 * titles unique within a list — assertUniqueTitles below enforces it.
 */
export function rowSlug(title: string) {
  return title
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");
}

function assertUniqueTitles(listName: string, items: { title: string }[]) {
  const seen = new Set<string>();
  for (const { title } of items) {
    const slug = rowSlug(title);
    if (seen.has(slug)) {
      throw new Error(
        `Duplicate title "${title}" in ${listName}: titles must be unique, since they identify each entry`,
      );
    }
    seen.add(slug);
  }
}

export interface PortfolioItem {
  title: string;
  link: string;
  sourceLink?: string;
  media?: PortfolioAsset;
  iframe?: string;
  description: string;
  categories: string[];
  languages: string[];
}

export interface OpenSourceContributionItem {
  title: string;
  link: string;
  contributionLink?: string;
  logo?: PortfolioAsset;
  description: string;
  categories: string[];
  languages: string[];
}

export interface PresentationItem {
  title: string;
  /** My slides, recording, or speaker bio page for this talk */
  presentationLink?: string;
  /** Conference, meetup, or org the talk was given at */
  venue: string;
  /** The conference's own site */
  conferenceLink?: string;
  /** ISO date, e.g. "2026-04-17"; rendered in UTC */
  date?: string;
  description?: string;
}

export const portfolioItems: PortfolioItem[] = [
  {
    title: "US Bureau of Reclamation Reservoir Dashboard",
    link: "https://dashboard.wwdh.internetofwater.app/",
    description:
      "Created a dashboard and geospatial API for the US Bureau of Reclamation to monitor critical reservoir data",
    categories: ["Data Engineering", "Backend"],
    languages: ["Python", "Terraform"],
    media: wwdh,
    sourceLink: "https://github.com/internetofwater/wwdh",
  },
  {
    title: "Geoconnex",
    link: "https://explorer.geoconnex.us/",
    sourceLink: "https://github.com/internetofwater/scheduler",
    description:
      "Created a distributed graph database for the US Geological Survey, allowing hydrologists to link water data across government agencies on the same river",
    categories: ["Data Engineering", "Backend"],
    languages: ["Python", "Go", "Rust"],
    media: explorer,
  },
  {
    title: "WIS2Box UI",
    link: "https://demo.wis2box.wis.wmo.int/",
    sourceLink:
      "https://github.com/World-Meteorological-Organization/wis2box-ui",
    description:
      "Created a Typescript rewrite of the frontend for the World Meterological Foundation's distributed weather system, WIS2. Deployed by dozens of governments in the UN",
    categories: ["Frontend", "Distributed Systems"],
    languages: ["TypeScript"],
    media: wis2,
  },
  {
    title: "QuickPiperAudiobook",
    description:
      "Generate AI audiobooks from any text format. Over 1k Stars on Github",
    categories: ["Accessibility", "AI"],
    link: "https://github.com/C-Loftus/QuickPiperAudiobook",
    sourceLink: "https://github.com/C-Loftus/QuickPiperAudiobook",
    languages: ["Go"],
    media: piper,
  },
  {
    title: "Arizona Water Observatory",
    link: "https://arizonawaterobservatory.asu.edu/",
    description:
      "Created a hydrology data portal for the Center for Hydrologic Innovations at Arizona State University",
    categories: ["Data Engineering", "Backend"],
    languages: ["Python", "PostGIS", "Terraform"],
    media: awo,
    sourceLink: "https://github.com/cgs-earth/ArizonaWaterObservatory",
  },
  // {
  //   title: "Talon-AI-Tools",
  //   description:
  //     "Integrate the Talon voice dictation software with large language models for more accessible and intelligent voice control",
  //   categories: ["Accessibility", "Voice control"],
  //   link: "https://github.com/C-Loftus/talon-ai-tools/",
  //   sourceLink: "https://github.com/C-Loftus/talon-ai-tools/",
  //   languages: ["Python"],
  //   iframe:
  //     '<iframe width="560" height="315" src="https://www.youtube.com/embed/FctiTs6D2tM?si=PfovY2SHI_QEFkOB" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>',
  // },
  // {
  //   title: "Sight-free-talon",
  //   description:
  //     "Integrate the Talon voice dictation software with a screen reader for use by blind individuals",
  //   categories: ["Accessibility", "Screen readers"],
  //   link: "https://github.com/C-Loftus/sight-free-talon/",
  //   sourceLink: "https://github.com/C-Loftus/sight-free-talon/",
  //   languages: ["Python"],
  //   iframe:
  //     '<iframe width="560" height="315" src="https://www.youtube.com/embed/i-XcpnVwvR0?si=Ljrc_vwow1kJtnqq" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>',
  // },
];

export const openSourceContributions: OpenSourceContributionItem[] = [
  {
    title: "iceberg-go",
    link: "https://github.com/apache/iceberg-go",
    contributionLink:
      "https://github.com/apache/iceberg-go/commits?author=c-loftus",
    description: "The Go implementation of Apache Iceberg",
    categories: ["Data Engineering"],
    languages: ["Go"],
    logo: icebergLogo,
  },

  {
    title: "pygeoapi",
    link: "https://github.com/geopython/pygeoapi",
    contributionLink:
      "https://github.com/geopython/pygeoapi/commits?author=c-loftus",
    description:
      "Open source Geospatial API backend solution, used by dozens of government agencies and the UN",
    categories: ["Backend"],
    languages: ["Python"],
    logo: pygeoapi,
  },
  {
    title: "arrow-go",
    link: "https://github.com/apache/arrow-go",
    contributionLink:
      "https://github.com/apache/arrow-go/commits?author=c-loftus",
    description: "The Go implementation of Apache Arrow",
    categories: ["Data Engineering"],
    languages: ["Go"],
    logo: arrowLogo,
  },
];

// The Presentations section only renders once this has at least one entry.
export const presentations: PresentationItem[] = [
  {
    title: "Creating cross-organizational knowledge graphs with Golang",
    venue: "Boston Golang Meetup at Datadog Offices",
    conferenceLink: "https://www.meetup.com/bostongo/events/311095441/?eventOrigin=group_past_events",
    // My slides, recording, or speaker bio page for the talk
    presentationLink: "https://www.meetup.com/bostongo/events/311095441/?eventOrigin=group_past_events",
    date: "2025-10-22",
  },
  {
    title: "4 Talks on Improving Water Data Analysis",
    venue: "FOSS4G 2026, Hiroshima Japan",
    conferenceLink: "https://2026.foss4g.org/en/",
    // My slides, recording, or speaker bio page for the talk
    presentationLink: "https://talks.osgeo.org/foss4g-2026/speaker/U3KYYC/",
    date: "2026-09-02",
  },
  {
    title: "Reproducible Geospatial Knowledge Graphs with Apache Iceberg and RDF",
    venue: "Harvard Center for Geographic Analysis Conference, 2026",
    conferenceLink: "https://harvard-cga.github.io/cga-conference-2026/",
    // My slides, recording, or speaker bio page for the talk
    presentationLink: "https://harvard-cga.github.io/cga-conference-2026/#c-systems-and-infrastructure-209---west-hollow",
    date: "2026-10-02",
  },
  {
    title: "Simplifying US Water Data Infrastructure with FlatGeobuf and GeoParquet",
    venue: "Cloud Native Geospatial Forum, 2026",
    conferenceLink: "https://2026.cloudnativegeo.org/#/?lang=en",
    // My slides, recording, or speaker bio page for the talk
    presentationLink: "https://2026.cloudnativegeo.org/#/speakers?lang=en&speakerId=200860000001005090",
    date: "2026-10-08",
  },
];

assertUniqueTitles("portfolioItems", portfolioItems);
assertUniqueTitles("openSourceContributions", openSourceContributions);
assertUniqueTitles("presentations", presentations);
