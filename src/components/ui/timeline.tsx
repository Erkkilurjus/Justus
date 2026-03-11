"use client";
import {
  useMotionValueEvent,
  useScroll,
  useTransform,
  motion,
  useReducedMotion,
} from "framer-motion";
import React, { useEffect, useRef, useState } from "react";

interface TimelineEntry {
  title: string;
  content: React.ReactNode;
}

export const Timeline = ({ data }: { data: TimelineEntry[] }) => {
  const ref = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [height, setHeight] = useState(0);
  const prefersReducedMotion = useReducedMotion();

  useEffect(() => {
    if (ref.current) {
      const rect = ref.current.getBoundingClientRect();
      setHeight(rect.height);
    }
  }, [ref]);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start 10%", "end 50%"],
  });

  const heightTransform = useTransform(scrollYProgress, [0, 1], [0, height]);
  const opacityTransform = useTransform(scrollYProgress, [0, 0.1], [0, 1]);

  return (
    <div
      className="w-full bg-gradient-to-b from-green-900 to-black font-sans md:px-10 relative"
      ref={containerRef}
    >
      <div className="absolute inset-0">
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage: `url('https://images.pexels.com/photos/3243090/pexels-photo-3243090.jpeg?auto=compress&cs=tinysrgb&w=1920&h=1080&fit=crop')`,
            willChange: 'transform',
            transform: 'translateZ(0)',
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-black/70 to-black/80" />
        <div className="absolute inset-0 bg-gradient-to-r from-green-900/40 to-amber-900/30" />
      </div>

      <div className="max-w-7xl mx-auto py-20 px-4 md:px-8 lg:px-10 relative z-10">
        <h2 className="text-3xl md:text-5xl mb-4 text-amber-400 font-serif max-w-4xl">
          The Evolution of Strategic Warfare
        </h2>
        <p className="text-gray-300 text-sm md:text-base max-w-2xl">
          From ancient battlefields to modern strategic gaming, witness the journey that shaped Lehtimaki Games into the ultimate war board game experience.
        </p>
      </div>

      <div ref={ref} className="relative max-w-7xl mx-auto pb-20">
        {data.map((item, index) => (
          <div
            key={index}
            className="flex justify-start pt-10 md:pt-40 md:gap-10 relative z-10"
          >
            <div className="sticky flex flex-col md:flex-row z-40 items-center top-40 self-start max-w-xs lg:max-w-sm md:w-full">
              <div className="h-10 absolute left-3 md:left-3 w-10 rounded-full bg-gradient-to-br from-amber-400 to-yellow-500 flex items-center justify-center border-2 border-amber-400/30">
                <div className="h-4 w-4 rounded-full bg-green-900 border border-amber-400 p-2" />
              </div>
              <h3 className="hidden md:block text-xl md:pl-20 md:text-4xl font-serif font-bold text-amber-400">
                {item.title}
              </h3>
            </div>

            <div className="relative pl-20 pr-4 md:pl-4 w-full">
              <h3 className="md:hidden block text-2xl mb-4 text-left font-serif font-bold text-amber-400">
                {item.title}
              </h3>
              <div className="bg-black/20 backdrop-blur-sm border border-amber-400/30 rounded-lg p-6">
                {item.content}
              </div>
            </div>
          </div>
        ))}
        <div
          style={{
            height: height + "px",
          }}
          className="absolute md:left-8 left-8 top-0 overflow-hidden w-[2px] bg-[linear-gradient(to_bottom,var(--tw-gradient-stops))] from-transparent from-[0%] via-amber-400/50 to-transparent to-[99%] [mask-image:linear-gradient(to_bottom,transparent_0%,black_10%,black_90%,transparent_100%)]"
        >
          <motion.div
            style={{
              height: heightTransform,
              opacity: opacityTransform,
              willChange: 'height, opacity',
            }}
            transition={prefersReducedMotion ? { duration: 0 } : { type: "spring", stiffness: 300, damping: 30 }}
            className="absolute inset-x-0 top-0 w-[2px] bg-gradient-to-t from-amber-400 via-yellow-500 to-transparent from-[0%] via-[10%] rounded-full"
          />
        </div>
      </div>
    </div>
  );
};
