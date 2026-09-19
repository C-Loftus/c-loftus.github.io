/**
 * Copyright 2026 Colton Loftus
 * SPDX-License-Identifier: AGPL-3.0-only
 */

import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { rowSlug } from "../data/portfolio";
import type {
  OpenSourceContributionItem,
  PortfolioItem,
  PresentationItem,
} from "../data/portfolio";

type ResolvedPortfolioItem = Omit<PortfolioItem, "media"> & {
  media: string;
};

type ResolvedOpenSourceContributionItem = Omit<
  OpenSourceContributionItem,
  "logo"
> & {
  logo: string;
};

/** Anything that can be opened in the lightbox */
type ZoomableItem = { title: string; media: string };

function ProjectText({
  item,
}: {
  item: Pick<
    PortfolioItem,
    "link" | "title" | "description" | "sourceLink" | "categories" | "languages"
  > &
  Partial<Pick<OpenSourceContributionItem, "contributionLink">>;
}) {
  const sourceLink = item.sourceLink ?? item.contributionLink;
  const sourceLabel = item.contributionLink ? "Contributions" : "Source code";

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
        {sourceLink ? (
          <a
            href={sourceLink}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-2 inline-block text-sm italic text-neutral-600 underline decoration-neutral-300 underline-offset-4 hover:decoration-current dark:text-neutral-400 dark:decoration-neutral-600"
          >
            {sourceLabel}
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

const presentationLinkClass =
  "underline decoration-neutral-300 underline-offset-4 hover:decoration-current dark:decoration-neutral-600";

function MediaCell({
  item,
  onZoom,
  emptyLabel,
}: {
  item: { title: string; media?: string; iframe?: string };
  onZoom: (item: ZoomableItem) => void;
  emptyLabel: string;
}) {
  if (item.iframe) {
    return (
      <div
        className="aspect-[16/9] w-full overflow-hidden rounded-md border border-neutral-200 bg-neutral-100 shadow-md shadow-neutral-900/10 dark:border-neutral-700 dark:bg-neutral-800 dark:shadow-black/30 [&>iframe]:h-full [&>iframe]:w-full"
        dangerouslySetInnerHTML={{ __html: item.iframe }}
      />
    );
  }

  if (item.media) {
    const media = item.media;
    return (
      <button
        type="button"
        className="block w-full cursor-zoom-in p-0 text-left"
        aria-label={`Enlarge media for ${item.title}`}
        onClick={() => onZoom({ title: item.title, media })}
      >
        <img
          src={media}
          alt={`${item.title} preview`}
          className="aspect-[16/9] w-full rounded-md border border-neutral-200 bg-neutral-100 object-contain shadow-md shadow-neutral-900/10 transition-transform duration-200 hover:scale-[1.01] dark:border-neutral-700 dark:bg-neutral-800 dark:shadow-black/30"
          loading="lazy"
        />
      </button>
    );
  }

  return (
    <span className="flex aspect-[16/9] w-full items-center justify-center rounded-md border border-dashed border-neutral-300 bg-neutral-50 p-4 text-center text-sm font-medium text-neutral-500 dark:border-neutral-600 dark:bg-neutral-800/70 dark:text-neutral-400">
      {emptyLabel}
    </span>
  );
}

/** Section title that doubles as a copyable anchor link to its own section */
function SectionHeading({ id, children }: { id: string; children: string }) {
  return (
    <h2 className="border-b border-neutral-200 bg-neutral-100 text-left text-sm font-semibold text-neutral-700 dark:border-neutral-700 dark:bg-neutral-800 dark:text-neutral-200">
      <a
        href={`#${id}`}
        title={`Link to the ${children} section`}
        className="group flex items-center gap-2 px-3 py-4 !no-underline"
      >
        {children}
        <span
          aria-hidden="true"
          className="text-neutral-400 opacity-0 transition-opacity group-hover:opacity-100 group-focus-visible:opacity-100 dark:text-neutral-500"
        >
          #
        </span>
      </a>
    </h2>
  );
}

function LogoCell({ logo, title }: { logo?: string; title: string }) {
  return logo ? (
    <div className="flex h-full items-center sm:justify-center">
      <img
        src={logo}
        alt={`${title} logo`}
        className="h-20 w-20 rounded-md border border-neutral-200 bg-white object-contain p-2 shadow-md shadow-neutral-900/10 dark:border-neutral-700 dark:shadow-black/30"
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
  portfolioItems,
  openSourceContributions,
  presentations = [],
}: {
  portfolioItems: ResolvedPortfolioItem[];
  openSourceContributions: ResolvedOpenSourceContributionItem[];
  presentations?: PresentationItem[];
}) {
  const [selectedImage, setSelectedImage] = useState<ZoomableItem | null>(null);
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
    <section className="relative left-1/2 w-screen max-w-7xl -translate-x-1/2 py-6 sm:w-[calc(100vw-4rem)]">
      <div
        id="projects"
        className="scroll-mt-24 overflow-hidden border-y border-neutral-200 bg-white dark:border-neutral-700 dark:bg-neutral-900 sm:rounded-lg sm:border sm:shadow-xl sm:shadow-neutral-900/10 sm:dark:shadow-black/30"
      >
        <SectionHeading id="projects">Projects</SectionHeading>
        <table className="block w-full text-left sm:table sm:table-fixed">
          <thead className="hidden sm:table-header-group">
            <tr className="border-b border-neutral-200 bg-neutral-100 text-xs uppercase tracking-wide text-neutral-600 dark:border-neutral-700 dark:bg-neutral-800 dark:text-neutral-300"></tr>
          </thead>
          <tbody className="block sm:table-row-group">
            {portfolioItems.map((item) => {
              return (
                <tr
                  key={rowSlug(item.title)}
                  id={rowSlug(item.title)}
                  className="block scroll-mt-24 border-b border-neutral-200 last:border-b-0 hover:bg-neutral-50 target:bg-neutral-100 sm:table-row dark:border-neutral-800 dark:hover:bg-neutral-800/80 dark:target:bg-neutral-800"
                >
                  <td className="block px-3 pb-3 pt-5 align-middle sm:table-cell sm:px-6 sm:py-5">
                    <ProjectText item={item} />
                  </td>
                  <td className="block px-3 pb-5 pt-0 align-middle sm:table-cell sm:px-6 sm:py-5">
                    <MediaCell
                      item={item}
                      onZoom={setSelectedImage}
                      emptyLabel="Add project image"
                    />
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
      <div
        id="open-source-contributions"
        className="mt-8 scroll-mt-24 overflow-hidden border-y border-neutral-200 bg-white dark:border-neutral-700 dark:bg-neutral-900 sm:rounded-lg sm:border sm:shadow-xl sm:shadow-neutral-900/10 sm:dark:shadow-black/30"
      >
        <SectionHeading id="open-source-contributions">
          Contributions
        </SectionHeading>
        <table className="block w-full text-left sm:table sm:table-fixed">
          <thead className="hidden sm:table-header-group">
            <tr className="border-b border-neutral-200 bg-neutral-100 text-xs uppercase tracking-wide text-neutral-600 dark:border-neutral-700 dark:bg-neutral-800 dark:text-neutral-300"></tr>
          </thead>
          <tbody className="block sm:table-row-group">
            {openSourceContributions.map((item) => {
              return (
                <tr
                  key={rowSlug(item.title)}
                  id={rowSlug(item.title)}
                  className="grid scroll-mt-24 grid-cols-[1fr_auto] gap-x-4 border-b border-neutral-200 px-3 py-5 last:border-b-0 hover:bg-neutral-50 target:bg-neutral-100 sm:table-row sm:px-0 sm:py-0 dark:border-neutral-800 dark:hover:bg-neutral-800/80 dark:target:bg-neutral-800"
                >
                  <td className="min-w-0 align-middle sm:table-cell sm:px-6 sm:py-5">
                    <ProjectText item={item} />
                  </td>
                  <td className="align-start pt-1 sm:table-cell sm:px-6 sm:py-5 sm:align-middle">
                    <LogoCell logo={item.logo} title={item.title} />
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
      {presentations.length > 0 ? (
        <div
          id="presentations"
          className="mt-8 scroll-mt-24 overflow-hidden border-y border-neutral-200 bg-white dark:border-neutral-700 dark:bg-neutral-900 sm:rounded-lg sm:border sm:shadow-xl sm:shadow-neutral-900/10 sm:dark:shadow-black/30"
        >
          <SectionHeading id="presentations">Presentations</SectionHeading>
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm">
              <thead>
                <tr className="border-b border-neutral-200 text-xs uppercase tracking-wide text-neutral-500 dark:border-neutral-700 dark:text-neutral-400">
                  <th scope="col" className="px-3 py-2 font-medium sm:px-6">
                    Talk
                  </th>
                  <th scope="col" className="px-3 py-2 font-medium sm:px-6">
                    Venue
                  </th>
                  <th
                    scope="col"
                    className="whitespace-nowrap px-3 py-2 font-medium sm:px-6"
                  >
                    Date
                  </th>
                </tr>
              </thead>
              <tbody>
                {presentations.map((item) => {
                  return (
                    <tr
                      key={rowSlug(item.title)}
                      id={rowSlug(item.title)}
                      className="scroll-mt-24 border-b border-neutral-200 last:border-b-0 hover:bg-neutral-50 target:bg-neutral-100 dark:border-neutral-800 dark:hover:bg-neutral-800/80 dark:target:bg-neutral-800"
                    >
                      <td className="px-3 py-3 align-top sm:px-6">
                        {item.presentationLink ? (
                          <a
                            href={item.presentationLink}
                            target="_blank"
                            rel="noopener noreferrer"
                            className={`font-medium text-neutral-950 dark:text-neutral-50 ${presentationLinkClass}`}
                          >
                            {item.title}
                          </a>
                        ) : (
                          <span className="font-medium text-neutral-950 dark:text-neutral-50">
                            {item.title}
                          </span>
                        )}
                        {item.description ? (
                          <p className="mt-1 text-neutral-600 dark:text-neutral-400">
                            {item.description}
                          </p>
                        ) : null}
                      </td>
                      <td className="px-3 py-3 align-top text-neutral-700 dark:text-neutral-300 sm:px-6">
                        {item.conferenceLink ? (
                          <a
                            href={item.conferenceLink}
                            target="_blank"
                            rel="noopener noreferrer"
                            className={presentationLinkClass}
                          >
                            {item.venue}
                          </a>
                        ) : (
                          item.venue
                        )}
                      </td>
                      <td className="whitespace-nowrap px-3 py-3 align-top text-neutral-600 dark:text-neutral-400 sm:px-6">
                        {item.date
                          ? new Date(item.date).toLocaleDateString(undefined, {
                            year: "numeric",
                            month: "short",
                            day: "numeric",
                            timeZone: "UTC",
                          })
                          : null}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      ) : null}
      {isBrowser && selectedImage?.media
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
              src={selectedImage.media}
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
