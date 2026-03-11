import React from "react";
import { Timeline } from "./ui/timeline";

export function GameTimeline() {
  const data = [
    {
      title: "Ancient Warfare",
      content: (
        <div>
          <p className="text-gray-300 text-xs md:text-sm font-normal mb-8">
            The foundations of strategic warfare were laid in ancient civilizations. From the tactical genius of Alexander the Great to the disciplined legions of Rome, these historical battles inspire every aspect of Lehtimäki Games.
          </p>
          <div className="grid grid-cols-2 gap-4">
            <img
              src="https://images.pexels.com/photos/3243090/pexels-photo-3243090.jpeg?auto=compress&cs=tinysrgb&w=500&h=300&fit=crop"
              alt="Ancient Middle Eastern city"
              className="rounded-lg object-cover h-20 md:h-44 lg:h-60 w-full shadow-lg border border-amber-400/20"
            />
            <img
              src="https://images.pexels.com/photos/2166553/pexels-photo-2166553.jpeg?auto=compress&cs=tinysrgb&w=500&h=300&fit=crop"
              alt="Jerusalem old city"
              className="rounded-lg object-cover h-20 md:h-44 lg:h-60 w-full shadow-lg border border-amber-400/20"
            />
            <img
              src="https://images.pexels.com/photos/1534560/pexels-photo-1534560.jpeg?auto=compress&cs=tinysrgb&w=500&h=300&fit=crop"
              alt="Damascus ancient architecture"
              className="rounded-lg object-cover h-20 md:h-44 lg:h-60 w-full shadow-lg border border-amber-400/20"
            />
            <img
              src="https://images.pexels.com/photos/2166559/pexels-photo-2166559.jpeg?auto=compress&cs=tinysrgb&w=500&h=300&fit=crop"
              alt="Ancient Middle Eastern fortress"
              className="rounded-lg object-cover h-20 md:h-44 lg:h-60 w-full shadow-lg border border-amber-400/20"
            />
          </div>
        </div>
      ),
    },
    {
      title: "Modern Strategy",
      content: (
        <div>
          <p className="text-gray-300 text-xs md:text-sm font-normal mb-8">
            The evolution of warfare brought new tactical challenges and opportunities. From the trenches of World War I to the mechanized warfare of World War II, modern conflicts shaped the strategic depth of our game mechanics.
          </p>
          <p className="text-gray-300 text-xs md:text-sm font-normal mb-8">
            Every unit, every terrain feature, and every strategic decision in Lehtimäki Games reflects the lessons learned from history's greatest military minds.
          </p>
          <div className="grid grid-cols-2 gap-4">
            <img
              src="https://images.pexels.com/photos/1534560/pexels-photo-1534560.jpeg?auto=compress&cs=tinysrgb&w=500&h=300&fit=crop"
              alt="Historic Middle Eastern city"
              className="rounded-lg object-cover h-20 md:h-44 lg:h-60 w-full shadow-lg border border-amber-400/20"
            />
            <img
              src="https://images.pexels.com/photos/2166553/pexels-photo-2166553.jpeg?auto=compress&cs=tinysrgb&w=500&h=300&fit=crop"
              alt="Ancient city walls and towers"
              className="rounded-lg object-cover h-20 md:h-44 lg:h-60 w-full shadow-lg border border-amber-400/20"
            />
            <img
              src="https://images.pexels.com/photos/3243090/pexels-photo-3243090.jpeg?auto=compress&cs=tinysrgb&w=500&h=300&fit=crop"
              alt="Middle Eastern architectural heritage"
              className="rounded-lg object-cover h-20 md:h-44 lg:h-60 w-full shadow-lg border border-amber-400/20"
            />
            <img
              src="https://images.pexels.com/photos/2166559/pexels-photo-2166559.jpeg?auto=compress&cs=tinysrgb&w=500&h=300&fit=crop"
              alt="Historic fortress and battlements"
              className="rounded-lg object-cover h-20 md:h-44 lg:h-60 w-full shadow-lg border border-amber-400/20"
            />
          </div>
        </div>
      ),
    },
    {
      title: "Game Development",
      content: (
        <div>
          <p className="text-gray-300 text-xs md:text-sm font-normal mb-4">
            Years of research, playtesting, and refinement have culminated in the ultimate strategic war board game experience.
          </p>
          <div className="mb-8">
            <div className="flex gap-2 items-center text-gray-300 text-xs md:text-sm mb-2">
              ⚔️ Historically accurate unit formations and tactics
            </div>
            <div className="flex gap-2 items-center text-gray-300 text-xs md:text-sm mb-2">
              🏰 Detailed terrain and fortification systems
            </div>
            <div className="flex gap-2 items-center text-gray-300 text-xs md:text-sm mb-2">
              📜 Comprehensive campaign scenarios
            </div>
            <div className="flex gap-2 items-center text-gray-300 text-xs md:text-sm mb-2">
              🎯 Balanced gameplay for 1-4 players
            </div>
            <div className="flex gap-2 items-center text-gray-300 text-xs md:text-sm mb-2">
              🏆 Premium collector's edition components
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <img
              src="https://images.pexels.com/photos/3243090/pexels-photo-3243090.jpeg?auto=compress&cs=tinysrgb&w=500&h=300&fit=crop"
              alt="Ancient Middle Eastern cityscape"
              className="rounded-lg object-cover h-20 md:h-44 lg:h-60 w-full shadow-lg border border-amber-400/20"
            />
            <img
              src="https://images.pexels.com/photos/2166553/pexels-photo-2166553.jpeg?auto=compress&cs=tinysrgb&w=500&h=300&fit=crop"
              alt="Historic city architecture"
              className="rounded-lg object-cover h-20 md:h-44 lg:h-60 w-full shadow-lg border border-amber-400/20"
            />
            <img
              src="https://images.pexels.com/photos/1534560/pexels-photo-1534560.jpeg?auto=compress&cs=tinysrgb&w=500&h=300&fit=crop"
              alt="Ancient fortress walls"
              className="rounded-lg object-cover h-20 md:h-44 lg:h-60 w-full shadow-lg border border-amber-400/20"
            />
            <img
              src="https://images.pexels.com/photos/2166559/pexels-photo-2166559.jpeg?auto=compress&cs=tinysrgb&w=500&h=300&fit=crop"
              alt="Middle Eastern historical site"
              className="rounded-lg object-cover h-20 md:h-44 lg:h-60 w-full shadow-lg border border-amber-400/20"
            />
          </div>
        </div>
      ),
    },
  ];
  
  return (
    <div className="w-full">
      <Timeline data={data} />
    </div>
  );
}