import React from 'react';
import { ShoppingCart, Star, Shield, Truck } from 'lucide-react';

const BuyNow: React.FC = () => {
  return (
    <section id="buy-now-section" className="py-20 bg-gradient-to-b from-black to-green-900 relative">
      {/* Parchment Background */}
      <div 
        className="absolute inset-0 opacity-5"
        style={{
          backgroundImage: `url('data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><defs><pattern id="vintage" patternUnits="userSpaceOnUse" width="40" height="40"><rect width="40" height="40" fill="%23d4af37"/><circle cx="10" cy="10" r="1" fill="%23b8941f" opacity="0.3"/><circle cx="30" cy="25" r="0.8" fill="%23b8941f" opacity="0.2"/></pattern></defs><rect width="100" height="100" fill="url(%23vintage)"/></svg>')`,
        }}
      />
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-4xl md:text-5xl font-serif text-amber-400 mb-4">
              Claim Your Victory
            </h2>
            <p className="text-xl text-gray-300 mb-8">
              Join the ranks of strategic masterminds. Limited collector's edition available now.
            </p>
          </div>

          <div className="bg-black/30 backdrop-blur-sm border-2 border-amber-400/30 rounded-lg p-8 md:p-12">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
              <div>
                <h3 className="text-2xl font-serif text-amber-400 mb-4">
                  Lehtimäki Games: Collector's Edition
                </h3>
                <div className="flex items-center mb-4">
                  <div className="flex text-amber-400 mr-2">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-5 h-5 fill-current" />
                    ))}
                  </div>
                  <span className="text-gray-300">(127 reviews)</span>
                </div>
                <p className="text-gray-300 mb-6 leading-relaxed">
                  Premium wooden components, detailed historical maps, comprehensive rulebook, 
                  and exclusive collector's packaging. Each copy individually numbered.
                </p>
                
                <div className="space-y-3 mb-6">
                  <div className="flex items-center text-gray-300">
                    <Shield className="w-5 h-5 text-amber-400 mr-3" />
                    <span>Lifetime warranty on components</span>
                  </div>
                  <div className="flex items-center text-gray-300">
                    <Truck className="w-5 h-5 text-amber-400 mr-3" />
                    <span>Free worldwide shipping</span>
                  </div>
                  <div className="flex items-center text-gray-300">
                    <Star className="w-5 h-5 text-amber-400 mr-3" />
                    <span>Limited to 1,000 copies worldwide</span>
                  </div>
                </div>
              </div>

              <div className="text-center">
                <div className="mb-6">
                  <div className="text-gray-400 line-through text-xl mb-2">$299</div>
                  <div className="text-5xl font-serif text-amber-400 mb-2">$249</div>
                  <div className="text-gray-300">Limited time offer</div>
                </div>
                
                <button className="w-full bg-gradient-to-r from-amber-400 to-yellow-500 text-green-900 px-8 py-4 rounded-lg font-semibold text-lg transition-all duration-300 hover:from-amber-500 hover:to-yellow-600 hover:shadow-lg hover:shadow-amber-500/25 transform hover:scale-105 mb-4">
                  <ShoppingCart className="inline-block mr-2 w-5 h-5" />
                  Order Now
                </button>
                
                <p className="text-sm text-gray-400">
                  30-day money-back guarantee
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default BuyNow;