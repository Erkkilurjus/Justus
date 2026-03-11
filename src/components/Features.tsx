import React from 'react';
import { Shield, Users, Crown, Globe } from 'lucide-react';
import { motion } from 'framer-motion';
import { FadeIn, StaggerContainer, StaggerItem, PopIn, ScaleIn } from './ui/motion';

const Features: React.FC = () => {
  const features = [
    {
      icon: Shield,
      title: 'Authentic Historical Detail',
      description:
        'Meticulously researched battles and historically accurate unit formations bring the past to life.',
    },
    {
      icon: Crown,
      title: 'Premium Components',
      description:
        'Hand-crafted wooden pieces, detailed maps, and high-quality materials for an authentic experience.',
    },
    {
      icon: Users,
      title: 'Solo & Multiplayer Modes',
      description:
        'Command armies alone or challenge friends in epic strategic battles for 1-4 players.',
    },
    {
      icon: Globe,
      title: 'Global Strategy',
      description:
        'Experience strategic warfare across multiple theaters with complex diplomatic and military options.',
    },
  ];

  return (
    <section className="py-20 bg-gradient-to-b from-green-900 via-green-800 to-green-900 relative">
      <div
        className="absolute inset-0 opacity-5"
        style={{
          backgroundImage: `url('data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><defs><pattern id="paper" patternUnits="userSpaceOnUse" width="50" height="50"><rect width="50" height="50" fill="%23d4af37"/><path d="M0 0L50 0L50 50L0 50Z" fill="none" stroke="%23b8941f" stroke-width="0.5" opacity="0.3"/></pattern></defs><rect width="100" height="100" fill="url(%23paper)"/></svg>')`,
        }}
      />

      <div className="container mx-auto px-4 relative z-10">
        <FadeIn direction="up" delay={0}>
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-serif text-amber-400 mb-4">
              Why Generals Choose Lehtimaki
            </h2>
            <ScaleIn delay={0.3}>
              <div className="w-24 h-1 bg-amber-400 mx-auto" />
            </ScaleIn>
          </div>
        </FadeIn>

        <StaggerContainer
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8"
          staggerDelay={0.15}
        >
          {features.map((feature, index) => (
            <StaggerItem key={index}>
              <motion.div
                className="group bg-black/20 backdrop-blur-sm border border-amber-400/30 rounded-lg p-6 text-center h-full"
                whileHover={{
                  scale: 1.05,
                  backgroundColor: 'rgba(0, 0, 0, 0.3)',
                  boxShadow: '0 10px 40px rgba(251, 191, 36, 0.1)',
                }}
                transition={{ duration: 0.3 }}
              >
                <PopIn delay={0.1 + index * 0.1}>
                  <div className="mb-4 flex justify-center">
                    <motion.div
                      className="w-16 h-16 bg-gradient-to-br from-amber-400 to-yellow-500 rounded-full flex items-center justify-center"
                      whileHover={{
                        scale: 1.1,
                        rotate: 5,
                      }}
                      transition={{ type: 'spring', stiffness: 300 }}
                    >
                      <feature.icon className="w-8 h-8 text-green-900" />
                    </motion.div>
                  </div>
                </PopIn>
                <h3 className="text-xl font-serif text-amber-400 mb-3">
                  {feature.title}
                </h3>
                <p className="text-gray-300 leading-relaxed">
                  {feature.description}
                </p>
              </motion.div>
            </StaggerItem>
          ))}
        </StaggerContainer>
      </div>
    </section>
  );
};

export default Features;
