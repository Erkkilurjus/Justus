import React, { useRef, useEffect, useState, useCallback, forwardRef, useImperativeHandle } from 'react';
import { createPortal } from 'react-dom';
import { isSafariDesktop } from '../lib/utils';

export interface HeroRef {
  isReady: boolean;
}

interface HeroProps {
  onReady?: () => void;
  startAutoScroll?: boolean;
}

const Hero = forwardRef<HeroRef, HeroProps>(({ onReady, startAutoScroll = false }, ref) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const [videoDuration, setVideoDuration] = useState(0);
  const [isVideoReady, setIsVideoReady] = useState(false);
  const [isVideoFullyLoaded, setIsVideoFullyLoaded] = useState(false);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [isAutoScrolling, setIsAutoScrolling] = useState(false);
  const currentTimeRef = useRef(0);
  const targetTimeRef = useRef(0);
  const rafRef = useRef<number | null>(null);
  const lastScrollY = useRef(0);
  const isMobileRef = useRef(false);
  const isAndroidRef = useRef(false);
  const hasReachedEndRef = useRef(false);
  const autoScrollRafRef = useRef<number | null>(null);
  const autoScrollStartTimeRef = useRef<number | null>(null);
  const autoScrollDurationRef = useRef(150);
  const autoScrollTargetRef = useRef(0);
  const autoScrollStartPosRef = useRef(0);

  useImperativeHandle(ref, () => ({
    isReady: isVideoFullyLoaded
  }), [isVideoFullyLoaded]);

  useEffect(() => {
    if (startAutoScroll && !isAutoScrolling) {
      // Start immediately when loading finishes
      const container = containerRef.current;
      if (!container) {
        console.log("[v0] No container found for auto-scroll");
        return;
      }
      
      // Calculate target scroll position (end of hero section)
      const containerHeight = container.offsetHeight;
      const viewportHeight = window.innerHeight;
      const containerTop = container.offsetTop;
      autoScrollTargetRef.current = containerTop + containerHeight - viewportHeight;
      
      console.log("[v0] Auto-scroll starting", {
        containerHeight,
        viewportHeight,
        containerTop,
        target: autoScrollTargetRef.current
      });
      
      // If user prefers reduced motion, skip animation and jump to end
      if (prefersReducedMotion) {
        window.scrollTo(0, autoScrollTargetRef.current);
        return;
      }
      
      // Very fast duration - 150ms (10x faster than before)
      autoScrollDurationRef.current = 150;
      
      // Store current scroll position as start (never scroll up)
      autoScrollStartPosRef.current = window.scrollY || 0;
      
      // Reset start time so it gets set fresh in the animation loop
      autoScrollStartTimeRef.current = null;
      setIsAutoScrolling(true);
    }
  }, [startAutoScroll, isAutoScrolling, prefersReducedMotion]);

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
    const checkMobile = () => {
      isMobileRef.current = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) ||
        ('ontouchstart' in window) ||
        (navigator.maxTouchPoints > 0);
      isAndroidRef.current = /Android/i.test(navigator.userAgent);
    };
    checkMobile();
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
          onReady?.();
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
        onReady?.();
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
        onReady?.();
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
  }, [onReady, isVideoFullyLoaded]);

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

  // Easing function for smooth scroll animation (ease-in-out quad)
  // This creates a natural acceleration then deceleration
  const easeInOutQuad = (t: number): number => {
    return t < 0.5 ? 2 * t * t : 1 - Math.pow(-2 * t + 2, 2) / 2;
  };

  useEffect(() => {
    if (!isAutoScrolling) return;
    
    console.log("[v0] Auto-scroll animation effect triggered");
    
    const startScroll = autoScrollStartPosRef.current;
    const targetScroll = autoScrollTargetRef.current;
    const scrollDistance = targetScroll - startScroll;
    const duration = autoScrollDurationRef.current;
    let animationFrame: number;
    
    console.log("[v0] Animation params", { startScroll, targetScroll, scrollDistance, duration });
    
    // If already at or past target, don't animate
    if (scrollDistance <= 0) {
      console.log("[v0] No scroll distance, skipping animation");
      setIsAutoScrolling(false);
      return;
    }
    
    const animate = (currentTime: number) => {
      if (!autoScrollStartTimeRef.current) {
        autoScrollStartTimeRef.current = currentTime;
      }
      
      const elapsed = currentTime - autoScrollStartTimeRef.current;
      const rawProgress = Math.min(elapsed / duration, 1);
      const easedProgress = easeInOutQuad(rawProgress);
      
      // Scroll from start position to target (only down, never up)
      const newScrollY = startScroll + (scrollDistance * easedProgress);
      window.scrollTo(0, newScrollY);
      
      if (rawProgress < 1) {
        animationFrame = requestAnimationFrame(animate);
        autoScrollRafRef.current = animationFrame;
      } else {
        // Ensure we're exactly at the target position
        console.log("[v0] Animation complete, final scroll:", targetScroll);
        window.scrollTo(0, targetScroll);
        setIsAutoScrolling(false);
        autoScrollStartTimeRef.current = null;
      }
    };
    
    animationFrame = requestAnimationFrame(animate);
    autoScrollRafRef.current = animationFrame;
    
    return () => {
      if (autoScrollRafRef.current) {
        cancelAnimationFrame(autoScrollRafRef.current);
      }
    };
  }, [isAutoScrolling]);

  useEffect(() => {
    if (!isVideoReady || videoDuration === 0 || !isVideoFullyLoaded) return;

    const video = videoRef.current;
    if (!video) return;

    const lerpFactor = prefersReducedMotion ? 1 : (isAndroidRef.current ? 0.5 : (isMobileRef.current ? 0.25 : 0.35));
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

    const handleScroll = () => {
      if (isAutoScrolling) return;
      lastScrollY.current = window.pageYOffset || document.documentElement.scrollTop;
      updateScrollProgress();
    };

    let touchStartY = 0;
    let isTouching = false;

    const handleTouchStart = (e: TouchEvent) => {
      if (isAutoScrolling) {
        e.preventDefault();
        return;
      }
      touchStartY = e.touches[0].clientY;
      isTouching = true;
    };

    const handleTouchMove = (e: TouchEvent) => {
      if (isAutoScrolling) {
        e.preventDefault();
        return;
      }
      if (!isTouching) return;
      updateScrollProgress();
    };

    const handleTouchEnd = () => {
      isTouching = false;
      updateScrollProgress();
    };

    const handleWheel = (e: WheelEvent) => {
      if (isAutoScrolling) {
        e.preventDefault();
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('touchstart', handleTouchStart, { passive: false });
    window.addEventListener('touchmove', handleTouchMove, { passive: false });
    window.addEventListener('touchend', handleTouchEnd, { passive: true });
    window.addEventListener('wheel', handleWheel, { passive: false });

    handleScroll();
    rafRef.current = requestAnimationFrame(updateVideoTime);

    const scrollInterval = setInterval(() => {
      updateScrollProgress();
    }, 16);

    return () => {
      isUpdating = false;
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('touchstart', handleTouchStart);
      window.removeEventListener('touchmove', handleTouchMove);
      window.removeEventListener('touchend', handleTouchEnd);
      window.removeEventListener('wheel', handleWheel);
      clearInterval(scrollInterval);
      if (rafRef.current) {
        cancelAnimationFrame(rafRef.current);
      }
    };
  }, [isVideoReady, isVideoFullyLoaded, videoDuration, prefersReducedMotion, calculateScrollProgress, isAutoScrolling]);

  const safariDesktop = isSafariDesktop();

  const videoElement = (
    <>
      <video
        ref={videoRef}
        muted
        playsInline
        preload={isMobileRef.current ? "metadata" : "auto"}
        className="w-full h-full object-cover"
        style={{
          willChange: 'transform',
          transform: 'translate3d(0,0,0)',
          WebkitTransform: 'translate3d(0,0,0)',
          backfaceVisibility: 'hidden',
          WebkitBackfaceVisibility: 'hidden',
          WebkitTransformStyle: 'preserve-3d',
          transformStyle: 'preserve-3d',
        }}
        {...{ 'webkit-playsinline': 'true' } as React.VideoHTMLAttributes<HTMLVideoElement>}
      >
        <source src="/hero-keyframed.mp4" type="video/mp4" />
      </video>
      <div
        className="absolute inset-0 bg-gradient-to-b from-black/40 via-transparent to-black/60"
        style={{
          willChange: 'opacity',
          WebkitTransformStyle: 'preserve-3d',
          transformStyle: 'preserve-3d',
        }}
      />
    </>
  );

  const fixedContainer = (
    <div
      className="fixed inset-0 w-screen h-screen overflow-hidden"
      style={{
        zIndex: 0,
        opacity: 1,
        visibility: 'visible',
        willChange: 'transform',
        transform: 'translateZ(0)',
        WebkitTransform: 'translateZ(0)',
        WebkitTransformStyle: 'preserve-3d',
        transformStyle: 'preserve-3d',
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
});

Hero.displayName = 'Hero';

export default Hero;
