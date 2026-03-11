import React from 'react';
import { Star, Users, Clock, Award } from 'lucide-react';

const GameSection: React.FC = () => {
  const handleBuyNowClick = () => {
    // Scroll to the BuyNow section
    const buyNowSection = document.querySelector('#buy-now-section');
    if (buyNowSection) {
      buyNowSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section className="py-20 bg-gradient-to-b from-green-800 via-gray-900 to-gray-800 relative overflow-hidden">
      {/* Parchment Background */}
      <div 
        className="absolute inset-0 opacity-5"
        style={{
          backgroundImage: `url('data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><defs><pattern id="vintage" patternUnits="userSpaceOnUse" width="40" height="40"><rect width="40" height="40" fill="%23d4af37"/><circle cx="10" cy="10" r="1" fill="%23b8941f" opacity="0.3"/><circle cx="30" cy="25" r="0.8" fill="%23b8941f" opacity="0.2"/></pattern></defs><rect width="100" height="100" fill="url(%23vintage)"/></svg>')`,
        }}
      />
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center max-w-6xl mx-auto">
          {/* Game Image - Left Side */}
          <div className="order-2 lg:order-1">
            <div className="relative group">
              <div className="absolute -inset-4 bg-gradient-to-r from-amber-400/20 to-yellow-500/20 rounded-lg blur opacity-75 group-hover:opacity-100 transition duration-300"></div>
              <div className="relative bg-black/20 backdrop-blur-sm border-2 border-amber-400/30 rounded-lg p-4">
                <img
                  src="/A perfect ad photo of the _board_game_ with a realistic desert background, from a birdseye view, and the board game integrated into the background, with the board game itself being more horizontal..png"
                  alt="Lehtimäki Games Board Game"
                  className="w-full h-auto object-cover rounded-lg shadow-lg"
                />
              </div>
            </div>
          </div>

          {/* Game Info - Right Side */}
          <div className="order-1 lg:order-2">
            <div className="space-y-6">
              <div>
                <h2 className="text-3xl md:text-4xl font-serif text-amber-400 mb-4">
                  KING OF THE MIDDLE EAST
                </h2>
                <div className="flex items-center mb-4">
                  <div className="flex text-amber-400 mr-3">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-5 h-5 fill-current" />
                    ))}
                  </div>
                  <span className="text-gray-300 text-lg">(127 reviews)</span>
                </div>
              </div>

              <p className="text-gray-300 text-lg leading-relaxed">
                Command the battlefield in this premium strategic war board game.
                Experience realistic diplomatic situations with meticulously crafted
                components and immersive gameplay that brings military history to life.
              </p>

              {/* Game Features */}
              <div className="grid grid-cols-2 gap-4">
                <div className="flex items-center text-gray-300">
                  <Users className="w-5 h-5 text-amber-400 mr-3" />
                  <span>1-4 Players</span>
                </div>
                <div className="flex items-center text-gray-300">
                  <Clock className="w-5 h-5 text-amber-400 mr-3" />
                  <span>90-180 min</span>
                </div>
              </div>

              {/* Key Features List */}
              <div className="space-y-3">
                <h3 className="text-xl font-serif text-amber-400 mb-3">What's Included:</h3>
                <ul className="space-y-2 text-gray-300">
                  <li className="flex items-start">
                    <span className="w-2 h-2 bg-amber-400 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                    Premium wooden game pieces and detailed miniatures
                  </li>
                  <li className="flex items-start">
                    <span className="w-2 h-2 bg-amber-400 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                    Large-format historical battle maps
                  </li>
                  <li className="flex items-start">
                    <span className="w-2 h-2 bg-amber-400 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                    Comprehensive 120-page strategy guide
                  </li>
                  <li className="flex items-start">
                    <span className="w-2 h-2 bg-amber-400 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                    Collector's edition packaging with certificate
                  </li>
                </ul>
              </div>

              {/* Price and CTA */}
              <div className="pt-6">
                <div className="flex items-center mb-4">
                  <span className="text-gray-400 line-through text-xl mr-3">€69</span>
                  <span className="text-3xl font-serif text-amber-400">€49</span>
                  <span className="ml-3 bg-amber-400 text-green-900 px-2 py-1 rounded text-sm font-semibold">
                    Save €20
                  </span>
                </div>
                
                <button
                  onClick={handleBuyNowClick}
                  className="w-full bg-gradient-to-r from-amber-400 to-yellow-500 text-green-900 px-8 py-4 rounded-lg font-semibold text-lg transition-all duration-300 hover:from-amber-500 hover:to-yellow-600 hover:shadow-lg hover:shadow-amber-500/25 transform hover:scale-105"
                >
                  Order Now
                </button>
                
                <p className="text-sm text-gray-400 text-center mt-3">
                  Free worldwide shipping • 30-day money-back guarantee
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default GameSection;