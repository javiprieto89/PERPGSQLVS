import { useEffect, useState } from "react";

interface UseArrowKeyNavigationProps {
  isOpen: boolean;
  itemCount: number;
  onSelect: (index: number) => void;
  searchQuery?: string;
  listboxRef: React.RefObject<HTMLElement | null>;
}

export function useArrowKeyNavigation({
  isOpen,
  itemCount,
  onSelect,
  searchQuery = "",
  listboxRef,
}: UseArrowKeyNavigationProps) {
  const [highlightedIndex, setHighlightedIndex] = useState(-1);

  // Reset highlighted index when closing
  useEffect(() => {
    if (!isOpen) {
      setHighlightedIndex(-1);
    }
  }, [isOpen]);

  // Reset highlighted index when search query changes
  useEffect(() => {
    setHighlightedIndex(-1);
  }, [searchQuery]);

  // Scroll to highlighted item and focus it when it changes
  useEffect(() => {
    if (highlightedIndex >= 0 && listboxRef.current) {
      const highlightedElement = listboxRef.current.querySelector(
        `[data-index="${highlightedIndex}"]`
      ) as HTMLElement;
      if (highlightedElement) {
        highlightedElement.scrollIntoView({ block: "nearest" });
        highlightedElement.focus();
      }
    }
  }, [highlightedIndex, listboxRef]);

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "ArrowDown") {
      e.preventDefault();
      setHighlightedIndex((prev) => {
        if (prev === -1) return 0;
        return prev < itemCount - 1 ? prev + 1 : prev;
      });
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setHighlightedIndex((prev) => {
        if (prev === -1 || prev === 0) return 0;
        return prev - 1;
      });
    } else if (e.key === "Enter" && highlightedIndex >= 0) {
      e.preventDefault();
      onSelect(highlightedIndex);
    }
  };

  return {
    highlightedIndex,
    handleKeyDown,
    setHighlightedIndex,
  };
}
