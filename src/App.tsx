import { useEffect, useState, useCallback } from 'react';
import Hero from './components/Hero';
import StarrySection from './components/StarrySection';
import LoadingScreen from './components/LoadingScreen';
import { useAssetPreloader } from './hooks/useAssetPreloader';
import { isSafariDesktop } from './lib/utils';

function App() {
  const [heroReady, setHeroReady] = useState(false);
  const { progress, isComplete } = useAssetPreloader(heroReady);
  const [showContent, setShowContent] = useState(false);

  const handleHeroReady = useCallback(() => {
    setHeroReady(true);
  }, []);

  useEffect(() => {
    if (isSafariDesktop()) {
      document.documentElement.classList.add('safari-desktop');
    }
  }, []);

  useEffect(() => {
    if (!isComplete) {
      document.body.style.overflow = 'hidden';
      document.documentElement.style.overflow = 'hidden';
    } else {
      const timer = setTimeout(() => {
        document.body.style.overflow = '';
        document.documentElement.style.overflow = '';
        setShowContent(true);
        window.scrollTo(0, 0);
      }, 800);
      return () => clearTimeout(timer);
    }
  }, [isComplete]);

  return (
    <>
      <LoadingScreen progress={progress} isComplete={isComplete} />
      <div
        className="min-h-screen"
        style={{
          opacity: showContent ? 1 : 0,
          transition: 'opacity 0.5s ease-out',
          visibility: showContent ? 'visible' : 'hidden',
        }}
      >
        <Hero onReady={handleHeroReady} />
        <div className="relative z-[1]">
          <StarrySection />
        </div>
      </div>
    </>
  );
}

export default App;
