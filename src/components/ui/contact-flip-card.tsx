import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Mail, Instagram } from 'lucide-react';
import { isSafariDesktop } from '../../lib/utils';

interface ContactFlipCardProps {
  frontImage: string;
  frontAlt: string;
  email: string;
  instagramUrl: string;
  instagramHandle: string;
  className?: string;
}

const ContactFlipCard: React.FC<ContactFlipCardProps> = ({
  frontImage,
  frontAlt,
  email,
  instagramUrl,
  instagramHandle,
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
        animate={{ rotateX: isFlipped ? 180 : 0 }}
        transition={{ duration: 0.7, ease: [0.4, 0, 0.2, 1] }}
      >
        <div
          className="relative w-full"
          style={{
            backfaceVisibility: 'hidden',
            WebkitBackfaceVisibility: 'hidden',
            transform: 'rotateX(0deg)',
          }}
        >
          <div className={`relative border-2 border-amber-400/30 rounded-lg p-3 overflow-hidden ${safariDesktop ? 'bg-black/40' : 'bg-black/20 backdrop-blur-sm'}`}>
            <img
              src={frontImage}
              alt={frontAlt}
              className="w-full h-auto object-cover rounded-lg shadow-lg"
            />
          </div>
          <p className="text-center text-amber-400/60 text-sm mt-3 select-none">
            Tap for contacts
          </p>
        </div>

        <div
          className="absolute inset-0 w-full"
          style={{
            backfaceVisibility: 'hidden',
            WebkitBackfaceVisibility: 'hidden',
            transform: 'rotateX(180deg)',
          }}
        >
          <div className="relative border-2 border-amber-400/30 rounded-lg overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-amber-900/90 via-stone-900/95 to-amber-950/90" />
            <div
              className="absolute inset-0 opacity-[0.06]"
              style={{
                backgroundImage: `radial-gradient(circle at 20% 50%, rgba(251,191,36,0.4) 0%, transparent 50%),
                  radial-gradient(circle at 80% 20%, rgba(251,191,36,0.3) 0%, transparent 40%),
                  radial-gradient(circle at 60% 80%, rgba(245,158,11,0.3) 0%, transparent 45%)`,
              }}
            />
            <div
              className="absolute inset-0 opacity-[0.03]"
              style={{
                backgroundImage: `repeating-linear-gradient(
                  45deg,
                  transparent,
                  transparent 10px,
                  rgba(251,191,36,0.15) 10px,
                  rgba(251,191,36,0.15) 11px
                )`,
              }}
            />

            <div className="relative flex flex-col items-center justify-center p-8 min-h-[280px]">
              <h3 className="text-2xl font-serif text-amber-400 mb-8 tracking-wide">
                Get in Touch
              </h3>

              <div className="space-y-5 w-full max-w-[260px]">
                <a
                  href={`mailto:${email}`}
                  onClick={(e) => e.stopPropagation()}
                  className="flex items-center gap-3 group/link px-4 py-3 rounded-lg bg-black/20 border border-amber-400/20 hover:border-amber-400/50 transition-all duration-300"
                >
                  <div className="w-10 h-10 rounded-full bg-amber-400/10 flex items-center justify-center flex-shrink-0 group-hover/link:bg-amber-400/20 transition-colors duration-300">
                    <Mail className="w-5 h-5 text-amber-400" />
                  </div>
                  <div className="min-w-0">
                    <p className="text-amber-400/60 text-xs uppercase tracking-wider">Email</p>
                    <p className="text-gray-200 text-sm truncate">{email}</p>
                  </div>
                </a>

                <a
                  href={instagramUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={(e) => e.stopPropagation()}
                  className="flex items-center gap-3 group/link px-4 py-3 rounded-lg bg-black/20 border border-amber-400/20 hover:border-amber-400/50 transition-all duration-300"
                >
                  <div className="w-10 h-10 rounded-full bg-amber-400/10 flex items-center justify-center flex-shrink-0 group-hover/link:bg-amber-400/20 transition-colors duration-300">
                    <Instagram className="w-5 h-5 text-amber-400" />
                  </div>
                  <div className="min-w-0">
                    <p className="text-amber-400/60 text-xs uppercase tracking-wider">Instagram</p>
                    <p className="text-gray-200 text-sm truncate">{instagramHandle}</p>
                  </div>
                </a>
              </div>

              <p className="text-amber-400/40 text-xs mt-6 select-none">
                Tap to flip back
              </p>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default ContactFlipCard;
