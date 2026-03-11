import { useEffect } from 'react';
import Hero from './components/Hero';
import StarrySection from './components/StarrySection';
import { isSafariDesktop } from './lib/utils';

function App() {
  useEffect(() => {
    if (isSafariDesktop()) {
      document.documentElement.classList.add('safari-desktop');
    }
  }, []);

  return (
    <div className="min-h-screen">
      <Hero />
      <div className="relative z-[1]">
        <StarrySection />
      </div>
    </div>
  );
}

export default App;
