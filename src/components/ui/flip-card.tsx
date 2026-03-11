import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { isSafariDesktop } from '../../lib/utils';

interface FlipCardProps {
  frontImage: string;
  frontAlt: string;
  backImage: string;
  backAlt: string;
  className?: string;
}

const FlipCard: React.FC<FlipCardProps> = ({
  frontImage,
  frontAlt,
  backImage,
  backAlt,
  className = '',
}) => {
  const [isFlipped, setIsFlipped] = useState(false);
  const safariDesktop = isSafariDesktop();

  return (
    <div
      className={`cursor-pointer ${className}`}
      style={{ perspective: '1200px', WebkitPerspective: '1200px' }}
      onClick={() => setIsFlipped(!isFlipped)}
    >
      <motion.div
        className="relative w-full"
        style={{ transformStyle: 'preserve-3d', WebkitTransformStyle: 'preserve-3d' }}
        animate={{ rotateY: isFlipped ? 180 : 0 }}
        transition={{ duration: 0.7, ease: [0.4, 0, 0.2, 1] }}
      >
        <div
          className="relative w-full"
          style={{
            backfaceVisibility: 'hidden',
            WebkitBackfaceVisibility: 'hidden',
            transform: 'rotateY(0deg)',
          }}
        >
          <div className={`relative border-2 border-amber-400/30 rounded-lg p-4 ${safariDesktop ? 'bg-black/40' : 'bg-black/20 backdrop-blur-sm'}`}>
            <img
              src={frontImage}
              alt={frontAlt}
              className="w-full h-auto object-cover rounded-lg shadow-lg"
            />
          </div>
          <p className="text-center text-amber-400/60 text-sm mt-3 select-none">
            Tap to reveal
          </p>
        </div>

        <div
          className="absolute inset-0 w-full"
          style={{
            backfaceVisibility: 'hidden',
            WebkitBackfaceVisibility: 'hidden',
            transform: 'rotateY(180deg)',
          }}
        >
          <div className={`relative border-2 border-amber-400/30 rounded-lg p-4 ${safariDesktop ? 'bg-black/40' : 'bg-black/20 backdrop-blur-sm'}`}>
            <img
              src={backImage}
              alt={backAlt}
              className="w-full h-auto object-cover rounded-lg shadow-lg"
            />
          </div>
          <p className="text-center text-amber-400/60 text-sm mt-3 select-none">
            Tap to flip back
          </p>
        </div>
      </motion.div>
    </div>
  );
};

export default FlipCard;
