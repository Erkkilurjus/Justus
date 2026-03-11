import { useState, useEffect, useCallback, useRef } from 'react';

interface AssetLoadingState {
  progress: number;
  isComplete: boolean;
  assetsLoaded: number;
  totalAssets: number;
}

const MINIMUM_LOAD_TIME = 1500;

const isMobile = (): boolean => {
  if (typeof navigator === 'undefined') return false;
  return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) ||
    ('ontouchstart' in window) ||
    (navigator.maxTouchPoints > 0);
};

const DESKTOP_IMAGE_ASSETS = [
  '/image (1).png',
  '/image.png',
];

const MOBILE_IMAGE_ASSETS = [
  '/image-1.png',
];

export function useAssetPreloader(heroReady: boolean = false): AssetLoadingState {
  const mobile = isMobile();
  const imageAssets = mobile ? MOBILE_IMAGE_ASSETS : DESKTOP_IMAGE_ASSETS;
  const totalAssets = imageAssets.length + 1;

  const [state, setState] = useState<AssetLoadingState>({
    progress: 0,
    isComplete: false,
    assetsLoaded: 0,
    totalAssets,
  });

  const [baseAssetsReady, setBaseAssetsReady] = useState(false);
  const [minTimeElapsed, setMinTimeElapsed] = useState(false);
  const loadedCountRef = useRef(0);

  const updateProgress = useCallback((loaded: number, total: number) => {
    const progress = Math.min(Math.round((loaded / total) * 100), 99);
    setState((prev) => ({
      ...prev,
      progress,
      assetsLoaded: loaded,
    }));
  }, []);

  useEffect(() => {
    const timer = setTimeout(() => {
      setMinTimeElapsed(true);
    }, MINIMUM_LOAD_TIME);

    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    const incrementLoaded = () => {
      loadedCountRef.current++;
      updateProgress(loadedCountRef.current, totalAssets);

      if (loadedCountRef.current >= totalAssets) {
        setBaseAssetsReady(true);
      }
    };

    const loadImage = (src: string): Promise<void> => {
      return new Promise((resolve) => {
        const img = new Image();
        const timeout = setTimeout(() => {
          incrementLoaded();
          resolve();
        }, 3000);

        img.onload = () => {
          clearTimeout(timeout);
          incrementLoaded();
          resolve();
        };
        img.onerror = () => {
          clearTimeout(timeout);
          incrementLoaded();
          resolve();
        };
        img.src = src;
      });
    };

    const loadFonts = async (): Promise<void> => {
      const timeout = setTimeout(() => {
        incrementLoaded();
      }, 2000);

      try {
        await document.fonts.ready;
        const fontPromises = mobile ? [
          document.fonts.load('400 1em "Crimson Text"'),
          document.fonts.load('400 1em Inter'),
          document.fonts.load('600 1em Inter'),
        ] : [
          document.fonts.load('400 1em "Crimson Text"'),
          document.fonts.load('600 1em "Crimson Text"'),
          document.fonts.load('400 1em Inter'),
          document.fonts.load('500 1em Inter'),
          document.fonts.load('600 1em Inter'),
          document.fonts.load('700 1em Inter'),
        ];
        await Promise.all(fontPromises);
        clearTimeout(timeout);
      } catch {
        clearTimeout(timeout);
      }
      incrementLoaded();
    };

    imageAssets.forEach(loadImage);
    loadFonts();
  }, [updateProgress, totalAssets, mobile, imageAssets]);

  useEffect(() => {
    const allReady = baseAssetsReady && minTimeElapsed && heroReady;

    if (allReady) {
      setState((prev) => ({
        ...prev,
        progress: 100,
        isComplete: true,
      }));
    }
  }, [baseAssetsReady, minTimeElapsed, heroReady]);

  return state;
}
