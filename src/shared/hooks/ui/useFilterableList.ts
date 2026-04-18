/**
 * @file useFilterableList.ts
 * @description Custom hook to handle filtering, infinite scroll, and concurrent transitions for large lists.
 * @module shared/hooks/ui
 */

import { useState, useMemo, useRef, useTransition, useCallback, useEffect } from "react";
import useIntersectionObserver from "../observers/useIntersectionObserver";

/**
 * Configuration options for the filterable list hook
 * @template T - The type of items in the list
 */
interface UseFilterableListOptions<T> {
  /** The full array of items to filter and display */
  items: T[];
  /** Function to filter items based on the selected category */
  filterFn: (items: T[], category: string) => T[];
  /** Number of items to show per page/scroll increment. Defaults to 6. */
  pageSize?: number;
  /** Initial category to display. Defaults to "Todos". */
  initialCategory?: string;
}

/**
 * Manages the state and logic for a filterable list with infinite scroll and smooth transitions.
 * @description Provides a performance-optimized way to handle large lists by using React 18 transitions
 * and requestAnimationFrame for UI updates.
 * @template T - The type of items in the list
 * @param options - Configuration options for the hook
 * @returns State and handlers for the filterable list
 * @remarks
 * - Uses `useTransition` to mark category changes as non-urgent, keeping the UI responsive.
 * - Employs `requestAnimationFrame` (rAF) in the scroll handler to throttle state updates and prevent layout thrashing.
 * - Integrates with `useIntersectionObserver` for efficient infinite scroll detection.
 */
export function useFilterableList<T>({
  items,
  filterFn,
  pageSize = 6,
  initialCategory = "Todos",
}: UseFilterableListOptions<T>) {
  const [activeCategory, setActiveCategory] = useState(initialCategory);

  // Debug: log when category changes
  useEffect(() => {
    console.log("useFilterableList: activeCategory CHANGED to:", activeCategory);
  }, [activeCategory]);
  const [displayCount, setDisplayCount] = useState(pageSize);
  const [isPending, startTransition] = useTransition();
  const [loaderNode, setLoaderNode] = useState<HTMLElement | null>(null);
  const loaderRef = useCallback((node: HTMLElement | null) => {
    setLoaderNode(node);
  }, []);
  const rafRef = useRef<number | null>(null);

  // Memoize filtered items
  const filteredItems = useMemo(() => {
    const result = filterFn(items, activeCategory);
    console.log("useFilterableList: filteredItems:", { activeCategory, inputCount: items.length, outputCount: result.length });
    return result;
  }, [items, activeCategory, filterFn]);

  // Handle category change with transition
  const handleFilterChange = useCallback((category: string) => {
    /**
     * Category transitions are marked as non-urgent.
     * This allows the browser to remain responsive during heavy filtering operations
     * or component re-renders.
     */
    startTransition(() => {
      setActiveCategory(category);
      setDisplayCount(pageSize);
    });
  }, [pageSize]);

  // Infinite Scroll logic
  const rootMargin = typeof window !== "undefined" && window.innerWidth < 768 ? "200px" : "400px";

  useIntersectionObserver(
    loaderNode,
    () => {
      if (displayCount >= filteredItems.length) return;
      
      /**
       * Throttles scroll updates using requestAnimationFrame.
       * This ensures that setDisplayCount is only called once per frame,
       * reducing the overhead of rapid scroll events.
       */
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
      rafRef.current = requestAnimationFrame(() => {
        setDisplayCount((prev) => Math.min(prev + pageSize, filteredItems.length));
      });
    },
    { threshold: 0.01, rootMargin }
  );

  // Cleanup rAF
  useEffect(() => {
    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, []);

  // Prepare paginated items
  const paginatedItems = useMemo(() => {
    const result = filteredItems.slice(0, displayCount);
    console.log("useFilterableList: paginatedItems:", { filteredLength: filteredItems.length, displayCount, resultLength: result.length });
    return result;
  }, [filteredItems, displayCount]);

  return {
    paginatedItems,
    activeCategory,
    displayCount,
    isPending,
    handleFilterChange,
    loaderRef,
    totalFilteredCount: filteredItems.length,
    hasMore: displayCount < filteredItems.length,
  };
}

export default useFilterableList;
