import { useEffect, useRef, useState } from "react";

export const useInViewOnce = <T extends HTMLElement>(options?: IntersectionObserverInit) => {
  const ref = useRef<T | null>(null);
  const [isInView, setIsInView] = useState(false);
  const root = options?.root;
  const rootMargin = options?.rootMargin;
  const threshold = options?.threshold;

  useEffect(() => {
    if (isInView) return;

    const element = ref.current;
    if (!element) return;

    if (!("IntersectionObserver" in window)) {
      setIsInView(true);
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsInView(true);
          observer.disconnect();
        }
      },
      {
        threshold: threshold ?? 0.25,
        rootMargin: "0px 0px -8% 0px",
        ...(root ? { root } : {}),
        ...(rootMargin ? { rootMargin } : {}),
      }
    );

    observer.observe(element);

    return () => observer.disconnect();
  }, [isInView, root, rootMargin, threshold]);

  return { ref, isInView };
};
