import React from 'react';

const Shop: React.FC = () => {
  return (
    <section className="py-48 bg-gradient-to-b from-black via-green-900 to-green-800 relative overflow-hidden">
      {/* Parchment Background */}
      <div 
        className="absolute inset-0 opacity-5"
        style={{
          backgroundImage: `url('data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><defs><pattern id="vintage" patternUnits="userSpaceOnUse" width="40" height="40"><rect width="40" height="40" fill="%23d4af37"/><circle cx="10" cy="10" r="1" fill="%23b8941f" opacity="0.3"/><circle cx="30" cy="25" r="0.8" fill="%23b8941f" opacity="0.2"/></pattern></defs><rect width="100" height="100" fill="url(%23vintage)"/></svg>')`,
        }}
      />
      
      <div className="container mx-auto px-4 relative z-10">
        {/* Green gradient section with atmospheric spacing */}
      </div>
    </section>
  );
};

export default Shop;