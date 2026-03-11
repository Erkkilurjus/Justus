import React from 'react';
import { Mail, Phone, MapPin } from 'lucide-react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-green-900 text-amber-100 py-12">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <h3 className="text-2xl font-serif text-amber-400 mb-4">Lehtimäki Games</h3>
            <p className="text-gray-300 mb-4">
              Crafting premium war board games that bring history to life through strategic gameplay.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-amber-400 hover:text-amber-300 transition-colors">
                <Mail className="w-5 h-5" />
              </a>
              <a href="#" className="text-amber-400 hover:text-amber-300 transition-colors">
                <Phone className="w-5 h-5" />
              </a>
              <a href="#" className="text-amber-400 hover:text-amber-300 transition-colors">
                <MapPin className="w-5 h-5" />
              </a>
            </div>
          </div>
          
          <div>
            <h4 className="text-lg font-serif text-amber-400 mb-4">Game Info</h4>
            <ul className="space-y-2">
              <li><a href="#" className="text-gray-300 hover:text-amber-400 transition-colors">Rules & Setup</a></li>
              <li><a href="#" className="text-gray-300 hover:text-amber-400 transition-colors">Strategy Guide</a></li>
              <li><a href="#" className="text-gray-300 hover:text-amber-400 transition-colors">Historical Context</a></li>
              <li><a href="#" className="text-gray-300 hover:text-amber-400 transition-colors">FAQ</a></li>
            </ul>
          </div>
          
          <div>
            <h4 className="text-lg font-serif text-amber-400 mb-4">Support</h4>
            <ul className="space-y-2">
              <li><a href="#" className="text-gray-300 hover:text-amber-400 transition-colors">Contact Us</a></li>
              <li><a href="#" className="text-gray-300 hover:text-amber-400 transition-colors">Shipping Info</a></li>
              <li><a href="#" className="text-gray-300 hover:text-amber-400 transition-colors">Returns</a></li>
              <li><a href="#" className="text-gray-300 hover:text-amber-400 transition-colors">Warranty</a></li>
            </ul>
          </div>
          
          <div>
            <h4 className="text-lg font-serif text-amber-400 mb-4">Legal</h4>
            <ul className="space-y-2">
              <li><a href="#" className="text-gray-300 hover:text-amber-400 transition-colors">About</a></li>
              <li><a href="#" className="text-gray-300 hover:text-amber-400 transition-colors">Terms of Service</a></li>
              <li><a href="#" className="text-gray-300 hover:text-amber-400 transition-colors">Privacy Policy</a></li>
              <li><a href="#" className="text-gray-300 hover:text-amber-400 transition-colors">Licensing</a></li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-amber-400/30 mt-8 pt-8 text-center">
          <p className="text-gray-300">
            © 2025 Lehtimäki Games. All rights reserved. | Crafted for strategists, by strategists.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;