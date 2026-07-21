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

export interface PortfolioItem {
  id: number;
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
  id: number;
  title: string;
  link: string;
  contributionLink?: string;
  logo?: PortfolioAsset;
  description: string;
  categories: string[];
  languages: string[];
}

export const portfolioItems: PortfolioItem[] = [
  {
    id: 430,
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
    id: 6,
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
    id: 2,
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
    id: 3,
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
    id: 7,
    title: "Arizona Water Observatory",
    link: "https://arizonawaterobservatory.asu.edu/",
    description:
      "Created a hydrology data portal for the Center for Hydrologic Innovations at Arizona State University",
    categories: ["Data Engineering", "Backend"],
    languages: ["Python", "PostGIS", "Terraform"],
    media: awo,
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
      '<iframe width="560" height="315" src="https://www.youtube.com/embed/FctiTs6D2tM?si=PfovY2SHI_QEFkOB" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>',
  },
  // {
  //   id: 4,
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
    id: 101,
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
    id: 101,
    title: "pygeoapi",
    link: "https://github.com/geopython/pygeoapi",
    contributionLink:
      "https://github.com/geopython/pygeoapi/commits?author=c-loftus",
    description:
      "Open source Geospatial API backend solution, used by dozens of government agencies and the UN.",
    categories: ["Backend"],
    languages: ["Python"],
    logo: pygeoapi,
  },
  {
    id: 102,
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
