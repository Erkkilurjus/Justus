import React from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';

interface MediaShowcaseProps {
  mediaUrl: string;
  mediaType: 'image' | 'video';
  title: string;
  description: string;
  alignment?: 'left' | 'center' | 'right';
  mediaSize?: 'small' | 'medium' | 'large';
  textBlend?: boolean;
  overlayImageUrl?: string;
}

export const MediaShowcase: React.FC<MediaShowcaseProps> = ({
  mediaUrl,
  mediaType,
  title,
  description,
  alignment = 'center',
  mediaSize = 'large',
  textBlend = false,
  overlayImageUrl,
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  const scale = useTransform(scrollYProgress, [0, 0.5, 1], [0.8, 1, 1.2]);
  const opacity = useTransform(scrollYProgress, [0, 0.3, 0.7, 1], [0, 1, 1, 0]);
  const y = useTransform(scrollYProgress, [0, 1], [100, -100]);

  const sizeClasses = {
    small: 'h-64 md:h-80',
    medium: 'h-80 md:h-96',
    large: 'h-96 md:h-[32rem]',
    xlarge: 'h-[40rem] md:h-[50rem]'
  };

  const alignmentClasses = {
    left: 'text-left',
    center: 'text-center',
    right: 'text-right'
  };

  return (
    <div ref={containerRef} className="relative w-full overflow-hidden">
      <motion.div
        style={{ scale, opacity, y }}
        className="relative w-full"
      >
        <div className={`relative ${sizeClasses[mediaSize]} rounded-lg overflow-hidden`}>
          {mediaType === 'video' ? (
            <video
              autoPlay
              loop
              muted
              playsInline
              className="w-full h-full object-cover"
            >
              <source src={mediaUrl} type="video/mp4" />
            </video>
          ) : (
            <img
              src={mediaUrl}
              alt={title}
              className="w-full h-full object-cover"
            />
          )}
          
          {/* Overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/30" />

          {/* Small Photo Overlay */}
          {overlayImageUrl && (
            <div className="absolute bottom-8 right-8 w-32 h-40 rounded-lg border-2 border-amber-400/50 shadow-lg overflow-hidden">
              <img
                src={overlayImageUrl}
                alt="Overlay"
                className="w-full h-full object-cover"
              />
            </div>
          )}

          {/* Content */}
          <div className={`absolute inset-0 flex flex-col ${title === 'Our Story' ? 'justify-start pt-16' : 'justify-center'} items-center p-8 ${alignmentClasses[alignment]}`}>
            <motion.h3 
              style={{ opacity }}
              className={`gradient-text text-3xl md:text-5xl font-serif mb-4 ${textBlend ? 'mix-blend-difference' : 'mix-blend-normal'}`}
            >
              {title}
            </motion.h3>
            <motion.p 
              style={{ opacity }}
              className={`text-lg md:text-xl text-gray-300 max-w-2xl leading-relaxed ${textBlend ? 'mix-blend-difference' : 'mix-blend-normal'}`}
            >
              {description}
            </motion.p>
          </div>
        </div>
      </motion.div>
    </div>
  );
};