import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface LoadingScreenProps {
  progress: number;
  isComplete: boolean;
}

const KingIcon: React.FC<{ className?: string }> = ({ className }) => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    strokeWidth="1.5"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
  >
    <defs>
      <linearGradient id="kingGradient" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#d4af37" />
        <stop offset="25%" stopColor="#eab536" />
        <stop offset="50%" stopColor="#f0ce5f" />
        <stop offset="75%" stopColor="#26804b" />
        <stop offset="100%" stopColor="#339b5e" />
      </linearGradient>
    </defs>
    <path d="M12 2v4" stroke="url(#kingGradient)" />
    <path d="M10 4h4" stroke="url(#kingGradient)" />
    <path d="M6 8l6 4 6-4" stroke="url(#kingGradient)" />
    <path d="M6 8v8a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2V8" stroke="url(#kingGradient)" />
    <path d="M5 18h14" stroke="url(#kingGradient)" />
    <path d="M4 22h16" stroke="url(#kingGradient)" />
  </svg>
);

const LoadingScreen: React.FC<LoadingScreenProps> = ({ progress, isComplete }) => {
  return (
    <AnimatePresence>
      {!isComplete && (
        <motion.div
          className="fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-black"
          initial={{ opacity: 1 }}
          exit={{
            opacity: 0,
            transition: { duration: 0.8, ease: [0.25, 0.1, 0.25, 1] },
          }}
        >
          <div className="absolute inset-0 overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-black via-neutral-950 to-black" />
            <motion.div
              className="absolute top-1/4 left-1/4 w-96 h-96 rounded-full bg-amber-400/5 blur-3xl"
              animate={{
                scale: [1, 1.2, 1],
                opacity: [0.3, 0.5, 0.3],
              }}
              transition={{
                duration: 4,
                repeat: Infinity,
                ease: 'easeInOut',
              }}
            />
            <motion.div
              className="absolute bottom-1/4 right-1/4 w-80 h-80 rounded-full bg-emerald-600/5 blur-3xl"
              animate={{
                scale: [1.2, 1, 1.2],
                opacity: [0.3, 0.5, 0.3],
              }}
              transition={{
                duration: 4,
                repeat: Infinity,
                ease: 'easeInOut',
                delay: 2,
              }}
            />
          </div>

          <div className="relative z-10 flex flex-col items-center">
            <motion.div
              className="relative mb-8"
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.6, ease: [0.25, 0.1, 0.25, 1] }}
            >
              <motion.div
                className="absolute -inset-8 rounded-full bg-gradient-to-r from-amber-400/20 via-yellow-500/10 to-emerald-500/20 blur-2xl"
                animate={{
                  scale: [1, 1.15, 1],
                  opacity: [0.5, 0.8, 0.5],
                }}
                transition={{
                  duration: 2.5,
                  repeat: Infinity,
                  ease: 'easeInOut',
                }}
              />
              <div className="relative king-gradient-stroke">
                <KingIcon className="w-20 h-20 md:w-24 md:h-24" />
              </div>
            </motion.div>

            <motion.h1
              className="text-3xl md:text-4xl font-serif gradient-text mb-2 tracking-wide"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.6 }}
            >
              LEHTIMAKI GAMES
            </motion.h1>

            <motion.p
              className="text-amber-400/60 text-sm md:text-base font-sans tracking-widest uppercase mb-12"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5, duration: 0.6 }}
            >
              Command the Battlefield
            </motion.p>

            <motion.div
              className="w-64 md:w-80"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6, duration: 0.6 }}
            >
              <div className="relative h-1.5 bg-neutral-900 rounded-full overflow-hidden border border-amber-400/20">
                <motion.div
                  className="absolute inset-y-0 left-0 rounded-full loading-progress-bar"
                  initial={{ width: '0%' }}
                  animate={{ width: `${progress}%` }}
                  transition={{ duration: 0.3, ease: 'easeOut' }}
                />
              </div>

              <div className="mt-4 flex justify-center">
                <span className="text-2xl md:text-3xl font-serif gradient-text tabular-nums">
                  {progress}%
                </span>
              </div>
            </motion.div>

            <motion.div
              className="mt-8 flex items-center gap-2"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.8, duration: 0.6 }}
            >
              <motion.span
                className="w-1.5 h-1.5 rounded-full bg-amber-400"
                animate={{ opacity: [0.3, 1, 0.3] }}
                transition={{ duration: 1.5, repeat: Infinity, delay: 0 }}
              />
              <motion.span
                className="w-1.5 h-1.5 rounded-full bg-amber-400"
                animate={{ opacity: [0.3, 1, 0.3] }}
                transition={{ duration: 1.5, repeat: Infinity, delay: 0.2 }}
              />
              <motion.span
                className="w-1.5 h-1.5 rounded-full bg-amber-400"
                animate={{ opacity: [0.3, 1, 0.3] }}
                transition={{ duration: 1.5, repeat: Infinity, delay: 0.4 }}
              />
            </motion.div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default LoadingScreen;
