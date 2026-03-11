import { useRef, useEffect, useState, useCallback } from 'react';
import { createPortal } from 'react-dom';
import { isSafariDesktop } from '../lib/utils';

const Hero = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const [videoDuration, setVideoDuration] = useState(0);
  const [isVideoReady, setIsVideoReady] = useState(false);
  const [isVideoFullyLoaded, setIsVideoFullyLoaded] = useState(false);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);
  const currentTimeRef = useRef(0);
  const targetTimeRef = useRef(0);
  const rafRef = useRef<number | null>(null);
  const isMobileRef = useRef(false);
  const hasReachedEndRef = useRef(false);
  const scrollThrottleRef = useRef(false);

  useEffect(() => {
    const video = videoRef.current;
    if (!video || videoDuration === 0) return;

    if (scrollProgress >= 1) {
      hasReachedEndRef.current = true;
      try {
        if (video.readyState >= 2) {
          video.currentTime = videoDuration;
          video.pause();
        }
      } catch (e) {
        // Ignore errors
      }
    } else if (scrollProgress < 0.99) {
      hasReachedEndRef.current = false;
    }
  }, [scrollProgress, videoDuration]);

  useEffect(() => {
    isMobileRef.current = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) ||
      ('ontouchstart' in window) ||
      (navigator.maxTouchPoints > 0);
  }, []);

  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    setPrefersReducedMotion(mediaQuery.matches);

    const handleChange = (e: MediaQueryListEvent) => {
      setPrefersReducedMotion(e.matches);
    };

    mediaQuery.addEventListener('change', handleChange);
    return () => mediaQuery.removeEventListener('change', handleChange);
  }, []);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    let checkInterval: number | null = null;
    let loadTimeout: number | null = null;

    const handleLoadedMetadata = () => {
      setVideoDuration(video.duration);
      video.pause();
      video.currentTime = 0;
      setIsVideoReady(true);
    };

    const checkVideoReady = () => {
      if (video.readyState >= 2 && video.duration > 0) {
        const buffered = video.buffered;
        let hasEnoughData = false;

        const minBufferThreshold = isMobileRef.current ? 0.1 : 0.3;

        for (let i = 0; i < buffered.length; i++) {
          if (buffered.start(i) <= 0.1 && buffered.end(i) >= video.duration * minBufferThreshold) {
            hasEnoughData = true;
            break;
          }
        }

        if (hasEnoughData || video.readyState >= 3) {
          if (checkInterval) {
            clearInterval(checkInterval);
            checkInterval = null;
          }
          if (loadTimeout) {
            clearTimeout(loadTimeout);
            loadTimeout = null;
          }
          setIsVideoFullyLoaded(true);
        }
      }
    };

    const handleCanPlay = () => {
      video.pause();
      if (isMobileRef.current) {
        if (checkInterval) {
          clearInterval(checkInterval);
          checkInterval = null;
        }
        setIsVideoFullyLoaded(true);
      } else {
        checkVideoReady();
      }
    };

    const handleCanPlayThrough = () => {
      video.pause();
      checkVideoReady();
    };

    const handleProgress = () => {
      checkVideoReady();
    };

    const handleSeeking = () => {
      if (hasReachedEndRef.current && video.duration > 0) {
        video.currentTime = video.duration;
      }
    };

    const handleTimeUpdate = () => {
      if (hasReachedEndRef.current && video.duration > 0 && video.currentTime < video.duration - 0.01) {
        video.currentTime = video.duration;
      }
    };

    video.addEventListener('loadedmetadata', handleLoadedMetadata);
    video.addEventListener('canplay', handleCanPlay);
    video.addEventListener('canplaythrough', handleCanPlayThrough);
    video.addEventListener('progress', handleProgress);
    video.addEventListener('seeking', handleSeeking);
    video.addEventListener('timeupdate', handleTimeUpdate);

    checkInterval = window.setInterval(checkVideoReady, isMobileRef.current ? 200 : 100);

    loadTimeout = window.setTimeout(() => {
      if (!isVideoFullyLoaded) {
        if (checkInterval) {
          clearInterval(checkInterval);
          checkInterval = null;
        }
        setIsVideoFullyLoaded(true);
      }
    }, isMobileRef.current ? 5000 : 8000);

    return () => {
      video.removeEventListener('loadedmetadata', handleLoadedMetadata);
      video.removeEventListener('canplay', handleCanPlay);
      video.removeEventListener('canplaythrough', handleCanPlayThrough);
      video.removeEventListener('progress', handleProgress);
      video.removeEventListener('seeking', handleSeeking);
      video.removeEventListener('timeupdate', handleTimeUpdate);
      if (checkInterval) {
        clearInterval(checkInterval);
      }
      if (loadTimeout) {
        clearTimeout(loadTimeout);
      }
    };
  }, [isVideoFullyLoaded]);

  const calculateScrollProgress = useCallback(() => {
    const container = containerRef.current;
    if (!container) return 0;

    const scrollY = window.pageYOffset || document.documentElement.scrollTop;
    const containerTop = container.offsetTop;
    const containerHeight = container.offsetHeight;
    const viewportHeight = window.innerHeight;
    const scrollableDistance = containerHeight - viewportHeight;

    if (scrollableDistance <= 0) return 0;

    const scrolledIntoContainer = scrollY - containerTop;
    const progress = scrolledIntoContainer / scrollableDistance;

    return Math.max(0, Math.min(1, progress));
  }, []);

  useEffect(() => {
    if (!isVideoReady || videoDuration === 0 || !isVideoFullyLoaded) return;

    const video = videoRef.current;
    if (!video) return;

    // Faster lerp on mobile for more responsive feel
    const lerpFactor = prefersReducedMotion ? 1 : (isMobileRef.current ? 0.4 : 0.35);
    let isUpdating = true;

    const updateVideoTime = () => {
      if (!isUpdating) return;

      if (hasReachedEndRef.current) {
        try {
          if (video.readyState >= 2 && video.currentTime < videoDuration - 0.01) {
            video.currentTime = videoDuration;
            currentTimeRef.current = videoDuration;
            video.pause();
          }
        } catch (e) {
          // Ignore errors
        }
        rafRef.current = requestAnimationFrame(updateVideoTime);
        return;
      }

      const diff = targetTimeRef.current - currentTimeRef.current;

      if (Math.abs(diff) > 0.001) {
        currentTimeRef.current += diff * lerpFactor;

        try {
          if (video.readyState >= 2) {
            const newTime = Math.max(0, Math.min(currentTimeRef.current, videoDuration));
            video.currentTime = newTime;
          }
        } catch (e) {
          // Ignore errors during seeking
        }
      } else if (targetTimeRef.current >= videoDuration - 0.01) {
        try {
          if (video.readyState >= 2 && video.currentTime < videoDuration - 0.01) {
            video.currentTime = videoDuration;
            currentTimeRef.current = videoDuration;
          }
        } catch (e) {
          // Ignore errors during seeking
        }
      }

      rafRef.current = requestAnimationFrame(updateVideoTime);
    };

    const updateScrollProgress = () => {
      const progress = calculateScrollProgress();
      setScrollProgress(progress);
      if (progress >= 1) {
        targetTimeRef.current = videoDuration;
      } else {
        targetTimeRef.current = progress * videoDuration;
      }
    };

    // Throttled scroll handler for better mobile performance
    const handleScroll = () => {
      if (scrollThrottleRef.current) return;
      scrollThrottleRef.current = true;
      
      requestAnimationFrame(() => {
        updateScrollProgress();
        scrollThrottleRef.current = false;
      });
    };

    window.addEventListener('scroll', handleScroll, { passive: true });

    handleScroll();
    rafRef.current = requestAnimationFrame(updateVideoTime);

    return () => {
      isUpdating = false;
      window.removeEventListener('scroll', handleScroll);
      if (rafRef.current) {
        cancelAnimationFrame(rafRef.current);
      }
    };
  }, [isVideoReady, isVideoFullyLoaded, videoDuration, prefersReducedMotion, calculateScrollProgress]);

  const safariDesktop = isSafariDesktop();

  const videoElement = (
    <>
      <video
        ref={videoRef}
        muted
        playsInline
        preload="auto"
        className="w-full h-full object-cover"
        style={{
          willChange: 'contents',
          transform: 'translateZ(0)',
          backfaceVisibility: 'hidden',
        }}
        {...{ 'webkit-playsinline': 'true' } as React.VideoHTMLAttributes<HTMLVideoElement>}
      >
        <source src="/hero-keyframed.mp4" type="video/mp4" />
      </video>
      <div
        className="absolute inset-0 bg-gradient-to-b from-black/40 via-transparent to-black/60 pointer-events-none"
      />
    </>
  );

  const fixedContainer = (
    <div
      className="fixed inset-0 w-screen h-screen overflow-hidden"
      style={{
        zIndex: 0,
        transform: 'translateZ(0)',
        contain: 'strict',
      }}
    >
      {videoElement}
    </div>
  );

  return (
    <>
      {safariDesktop ? createPortal(fixedContainer, document.body) : fixedContainer}
      <div
        ref={containerRef}
        className="relative"
        style={{ height: '700vh', pointerEvents: 'none' }}
      />
    </>
  );
};

export default Hero;
