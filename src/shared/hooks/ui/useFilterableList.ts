/**
 * @file useFilterableList.ts
 * @description Custom hook to handle filtering, infinite scroll, and transitions for lists.
 * @module shared/hooks/ui
 */

import { useState, useMemo, useRef, useTransition, useCallback, useEffect } from "react";
import useIntersectionObserver from "../observers/useIntersectionObserver";

interface UseFilterableListOptions<T> {
  items: T[];
  filterFn: (items: T[], category: string) => T[];
  pageSize?: number;
  initialCategory?: string;
}

/**
 * @hook useFilterableList
 * @description Logic for filtering, Infinite Scroll (IntersectionObserver), and Transitions.
 */
export function useFilterableList<T>({
  items,
  filterFn,
  pageSize = 6,
  initialCategory = "Todos",
}: UseFilterableListOptions<T>) {
  const [activeCategory, setActiveCategory] = useState(initialCategory);
  const [displayCount, setDisplayCount] = useState(pageSize);
  const [isPending, startTransition] = useTransition();
  const loaderRef = useRef<HTMLDivElement>(null);
  const rafRef = useRef<number | null>(null);

  // Memoize filtered items
  const filteredItems = useMemo(() => {
    return filterFn(items, activeCategory);
  }, [items, activeCategory, filterFn]);

  // Handle category change with transition
  const handleFilterChange = useCallback((category: string) => {
    startTransition(() => {
      setActiveCategory(category);
      setDisplayCount(pageSize);
    });
  }, [pageSize]);

  // Infinite Scroll logic
  const rootMargin = typeof window !== "undefined" && window.innerWidth < 768 ? "200px" : "400px";

  useIntersectionObserver(
    loaderRef,
    () => {
      if (displayCount >= filteredItems.length) return;
      
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
    return filteredItems.slice(0, displayCount);
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
