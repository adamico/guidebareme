// Search index containing all chapter content for client-side search
import { introduction } from "../content/introduction";
import { chapitre1 } from "../content/chapitre-1";
import { chapitre2 } from "../content/chapitre-2";
import { chapitre3 } from "../content/chapitre-3";
import { chapitre4 } from "../content/chapitre-4";
import { chapitre5 } from "../content/chapitre-5";
import { chapitre6 } from "../content/chapitre-6";
import { chapitre7 } from "../content/chapitre-7";
import { chapitre8 } from "../content/chapitre-8";

export interface SearchableChapter {
  id: string;
  href: string;
  title: string;
  content: string; // Plain text content for searching
}

// Strip HTML tags and normalize whitespace
function stripHtml(html: string): string {
  return html
    .replace(/<[^>]*>/g, " ")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&amp;/g, "&")
    .replace(/&nbsp;/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

export const searchIndex: SearchableChapter[] = [
  {
    id: "introduction",
    href: "/chapitres",
    title: "Introduction",
    content: stripHtml(introduction),
  },
  {
    id: "chapitre-1",
    href: "/chapitres/chapitre-1",
    title: "Chapitre I – Déficiences intellectuelles et difficultés de comportement",
    content: stripHtml(chapitre1),
  },
  {
    id: "chapitre-2",
    href: "/chapitres/chapitre-2",
    title: "Chapitre II – Déficiences du psychisme",
    content: stripHtml(chapitre2),
  },
  {
    id: "chapitre-3",
    href: "/chapitres/chapitre-3",
    title: "Chapitre III – Déficiences de l'audition",
    content: stripHtml(chapitre3),
  },
  {
    id: "chapitre-4",
    href: "/chapitres/chapitre-4",
    title: "Chapitre IV – Déficiences du langage et de la parole",
    content: stripHtml(chapitre4),
  },
  {
    id: "chapitre-5",
    href: "/chapitres/chapitre-5",
    title: "Chapitre V – Déficiences de la vision",
    content: stripHtml(chapitre5),
  },
  {
    id: "chapitre-6",
    href: "/chapitres/chapitre-6",
    title: "Chapitre VI – Déficiences viscérales et générales",
    content: stripHtml(chapitre6),
  },
  {
    id: "chapitre-7",
    href: "/chapitres/chapitre-7",
    title: "Chapitre VII – Déficiences de l'appareil locomoteur",
    content: stripHtml(chapitre7),
  },
  {
    id: "chapitre-8",
    href: "/chapitres/chapitre-8",
    title: "Chapitre VIII – Déficiences esthétiques",
    content: stripHtml(chapitre8),
  },
];

export interface SearchResult {
  chapter: SearchableChapter;
  snippet: string;
  matchCount: number;
}

// Simple search function - case insensitive, returns chapters with matches
export function searchContent(query: string): SearchResult[] {
  if (!query || query.length < 2) return [];

  const normalizedQuery = query.toLowerCase().trim();
  const results: SearchResult[] = [];

  for (const chapter of searchIndex) {
    const lowerContent = chapter.content.toLowerCase();
    const matchIndex = lowerContent.indexOf(normalizedQuery);

    if (matchIndex !== -1) {
      // Count total matches
      let matchCount = 0;
      let searchIndex = 0;
      while ((searchIndex = lowerContent.indexOf(normalizedQuery, searchIndex)) !== -1) {
        matchCount++;
        searchIndex += normalizedQuery.length;
      }

      // Extract snippet around first match
      const snippetStart = Math.max(0, matchIndex - 60);
      const snippetEnd = Math.min(chapter.content.length, matchIndex + query.length + 60);
      let snippet = chapter.content.slice(snippetStart, snippetEnd);

      // Add ellipsis if we're not at the start/end
      if (snippetStart > 0) snippet = "…" + snippet;
      if (snippetEnd < chapter.content.length) snippet = snippet + "…";

      results.push({
        chapter,
        snippet,
        matchCount,
      });
    }
  }

  // Sort by match count (most matches first)
  return results.sort((a, b) => b.matchCount - a.matchCount);
}
