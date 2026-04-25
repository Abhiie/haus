import { useEffect } from 'react';
import Lenis from 'lenis';

export const useSmoothScroll = () => {
  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: 'vertical',
      gestureOrientation: 'vertical',
      smoothWheel: true,
      wheelMultiplier: 1,
      touchMultiplier: 2,
      infinite: false,
    });

    // Expose lenis to window for global access (e.g. from IntroLoader or FloatingActions)
    (window as any).lenis = lenis;

    if ('scrollRestoration' in history) {
      history.scrollRestoration = 'manual';
    }

    // Initial resets
    window.scrollTo(0, 0);
    lenis.scrollTo(0, { immediate: true });

    // Force another reset after a tiny delay to catch any late browser restoration
    setTimeout(() => {
      window.scrollTo(0, 0);
      lenis.scrollTo(0, { immediate: true });
    }, 10);

    function raf(time: number) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);

    return () => {
      lenis.destroy();
      delete (window as any).lenis;
    };
  }, []);
};
