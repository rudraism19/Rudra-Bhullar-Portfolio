'use client';

import { useEffect, useRef, useState, useCallback } from 'react';

export interface ParallaxOptions {
  /**
   * Speed multiplier. 
   * Higher values produce more translation. Default: 0.15
   */
  speed?: number;
  /**
   * Maximum pixel shift in either direction to prevent clipping or excessive movement.
   * Default: 80
   */
  maxOffset?: number;
  /**
   * Respect user's accessibility reduced motion preferences.
   * Default: true
   */
  disableOnReducedMotion?: boolean;
}

export function useScrollParallax<T extends HTMLElement = HTMLElement>(
  options: ParallaxOptions = {}
) {
  const {
    speed = 0.15,
    maxOffset = 80,
    disableOnReducedMotion = true,
  } = options;

  const ref = useRef<T | null>(null);
  const [offset, setOffset] = useState<number>(0);
  const [progress, setProgress] = useState<number>(0);
  const [isInView, setIsInView] = useState<boolean>(false);

  const calculate = useCallback(() => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const windowH = window.innerHeight;

    // Total distance from when the top of element enters viewport bottom to when bottom leaves viewport top
    const totalDist = windowH + rect.height;
    const currentDist = windowH - rect.top;
    const rawProgress = totalDist > 0 ? currentDist / totalDist : 0;
    const p = Math.min(1, Math.max(0, rawProgress));
    setProgress(p);

    // Distance from center of element to center of viewport
    const elementCenter = rect.top + rect.height / 2;
    const viewportCenter = windowH / 2;
    const centerDiff = viewportCenter - elementCenter;

    // Calculate parallax pixel translation
    const rawOffset = centerDiff * speed;
    const clampedOffset = Math.max(-maxOffset, Math.min(maxOffset, rawOffset));
    setOffset(clampedOffset);
  }, [speed, maxOffset]);

  useEffect(() => {
    if (typeof window === 'undefined') return;

    if (
      disableOnReducedMotion &&
      window.matchMedia('(prefers-reduced-motion: reduce)').matches
    ) {
      return;
    }

    let rafId: number | null = null;
    let observer: IntersectionObserver | null = null;
    let isVisible = false;

    const onScrollOrResize = () => {
      if (!isVisible) return;
      if (rafId === null) {
        rafId = requestAnimationFrame(() => {
          calculate();
          rafId = null;
        });
      }
    };

    observer = new IntersectionObserver(
      ([entry]) => {
        isVisible = entry.isIntersecting;
        setIsInView(entry.isIntersecting);
        if (isVisible) {
          calculate();
        }
      },
      { rootMargin: '120px 0px 120px 0px' }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    // Passive scroll and resize listeners
    window.addEventListener('scroll', onScrollOrResize, { passive: true });
    window.addEventListener('resize', onScrollOrResize, { passive: true });

    // Initial calculation
    calculate();

    return () => {
      if (rafId !== null) cancelAnimationFrame(rafId);
      if (observer) observer.disconnect();
      window.removeEventListener('scroll', onScrollOrResize);
      window.removeEventListener('resize', onScrollOrResize);
    };
  }, [calculate, disableOnReducedMotion]);

  return { ref, offset, progress, isInView };
}
