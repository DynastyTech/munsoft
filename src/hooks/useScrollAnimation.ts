import { useEffect, useRef, useState, useCallback } from 'react';

// Shared IntersectionObserver for better performance
const observerMap = new Map<string, IntersectionObserver>();

const getObserver = (threshold: number, callback: (entry: IntersectionObserverEntry) => void) => {
  const key = `${threshold}`;
  
  if (!observerMap.has(key)) {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const cb = (entry.target as HTMLElement).dataset.observerCallback;
          if (cb && entry.isIntersecting) {
            callback(entry);
          }
        });
      },
      { 
        threshold,
        rootMargin: '50px 0px', // Start loading slightly before visible
      }
    );
    observerMap.set(key, observer);
  }
  
  return observerMap.get(key)!;
};

export const useScrollAnimation = (threshold = 0.1) => {
  const ref = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  const handleIntersection = useCallback(() => {
    setIsVisible(true);
  }, []);

  useEffect(() => {
    const currentRef = ref.current;
    if (!currentRef) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          // Unobserve after becoming visible (one-time animation)
          observer.unobserve(currentRef);
        }
      },
      { 
        threshold,
        rootMargin: '50px 0px',
      }
    );

    observer.observe(currentRef);

    return () => {
      observer.unobserve(currentRef);
    };
  }, [threshold, handleIntersection]);

  return { ref, isVisible };
};
