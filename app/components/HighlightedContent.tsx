"use client";

import { useEffect, useRef, Suspense } from "react";
import { useSearchParams } from "next/navigation";

interface HighlightedContentProps {
  html: string;
}

function HighlightedContentInner({ html }: HighlightedContentProps) {
  const contentRef = useRef<HTMLDivElement>(null);
  const searchParams = useSearchParams();
  const searchQuery = searchParams.get("q");

  useEffect(() => {
    if (!searchQuery || !contentRef.current) return;

    // Clear any previous highlights
    const existingMarks = contentRef.current.querySelectorAll("mark.search-highlight");
    existingMarks.forEach((mark) => {
      const parent = mark.parentNode;
      if (parent) {
        parent.replaceChild(document.createTextNode(mark.textContent || ""), mark);
        parent.normalize();
      }
    });

    // Find and highlight all occurrences using TreeWalker
    const walker = document.createTreeWalker(
      contentRef.current,
      NodeFilter.SHOW_TEXT,
      null
    );

    const textNodes: Text[] = [];
    let node: Text | null;
    while ((node = walker.nextNode() as Text | null)) {
      textNodes.push(node);
    }

    const queryLower = searchQuery.toLowerCase();
    let firstMatch: HTMLElement | null = null;

    for (const textNode of textNodes) {
      const text = textNode.textContent || "";
      const lowerText = text.toLowerCase();
      const index = lowerText.indexOf(queryLower);

      if (index !== -1) {
        // Split the text node and wrap the match in a mark element
        const before = text.slice(0, index);
        const match = text.slice(index, index + searchQuery.length);
        const after = text.slice(index + searchQuery.length);

        const parent = textNode.parentNode;
        if (!parent) continue;

        const fragment = document.createDocumentFragment();

        if (before) {
          fragment.appendChild(document.createTextNode(before));
        }

        const mark = document.createElement("mark");
        mark.className = "search-highlight bg-yellow-300 text-yellow-900 px-0.5 rounded scroll-mt-24";
        mark.textContent = match;
        fragment.appendChild(mark);

        if (!firstMatch) {
          firstMatch = mark;
          mark.id = "first-search-match";
        }

        if (after) {
          fragment.appendChild(document.createTextNode(after));
        }

        parent.replaceChild(fragment, textNode);
      }
    }

    // Scroll to the first match
    if (firstMatch) {
      // Small delay to ensure DOM is fully updated
      setTimeout(() => {
        firstMatch?.scrollIntoView({ behavior: "smooth", block: "center" });
        
        // Add a pulsing animation to draw attention
        firstMatch?.classList.add("animate-pulse");
        setTimeout(() => {
          firstMatch?.classList.remove("animate-pulse");
        }, 2000);
      }, 100);
    }

    // Cleanup function to remove highlights when query changes or component unmounts
    return () => {
      if (contentRef.current) {
        const marks = contentRef.current.querySelectorAll("mark.search-highlight");
        marks.forEach((mark) => {
          const parent = mark.parentNode;
          if (parent) {
            parent.replaceChild(document.createTextNode(mark.textContent || ""), mark);
            parent.normalize();
          }
        });
      }
    };
  }, [searchQuery]);

  return (
    <div ref={contentRef} dangerouslySetInnerHTML={{ __html: html }} />
  );
}

// Wrapper with Suspense for static export compatibility
export default function HighlightedContent({ html }: HighlightedContentProps) {
  return (
    <Suspense fallback={<div dangerouslySetInnerHTML={{ __html: html }} />}>
      <HighlightedContentInner html={html} />
    </Suspense>
  );
}
