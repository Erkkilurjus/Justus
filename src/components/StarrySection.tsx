import React, { useState, useEffect } from 'react';
import { MediaShowcase } from './ui/media-showcase';
import { Users, Clock, ChevronDown } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  FadeIn,
  ScaleIn,
  PopIn,
  ImageReveal,
  StaggerContainer,
  StaggerItem,
  Floating,
  GlowPulse,
} from './ui/motion';
import FlipCard from './ui/flip-card';
import ContactFlipCard from './ui/contact-flip-card';

const isMobile = (): boolean => {
  if (typeof navigator === 'undefined') return false;
  return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) ||
    ('ontouchstart' in window) ||
    (navigator.maxTouchPoints > 0);
};

interface FAQItemProps {
  question: string;
  answer: React.ReactNode;
  index: number;
}

const FAQItem: React.FC<FAQItemProps> = ({ question, answer, index }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <FadeIn delay={index * 0.1} direction="up">
      <motion.div
        className="bg-black/40 backdrop-blur-sm border border-amber-400/30 rounded-lg overflow-hidden"
        whileHover={{ borderColor: 'rgba(251, 191, 36, 0.5)' }}
        transition={{ duration: 0.2 }}
      >
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="w-full p-6 flex items-center justify-between text-left"
        >
          <h3 className="text-xl font-serif text-amber-400 pr-4">{question}</h3>
          <motion.div
            animate={{ rotate: isOpen ? 180 : 0 }}
            transition={{ duration: 0.3 }}
            className="flex-shrink-0"
          >
            <ChevronDown className="w-5 h-5 text-amber-400" />
          </motion.div>
        </button>
        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.3, ease: [0.25, 0.1, 0.25, 1] }}
            >
              <div className="px-6 pb-6 text-gray-300 leading-relaxed">
                {answer}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </FadeIn>
  );
};

const StarrySection: React.FC = () => {
  const [mobile, setMobile] = useState(false);

  useEffect(() => {
    setMobile(isMobile());
  }, []);

  const handleBuyNowClick = () => {
    window.open('https://www.amazon.de/dp/B0GQZPYC6F', '_blank');
  };

  const features = [
    { icon: Users, label: '2-6 Players' },
    { icon: Clock, label: '1-6 hours' },
  ];

  const includedItems = [
    'Premium Cardboard Pieces',
    'Large-Format Gameboard',
    'Comprehensive Rulebook',
  ];

  const faqs = [
    {
      question: "My package hasn't arrived - what should I do?",
      answer: (
        <>
          Please visit{' '}
          <a
            href="https://www.amazon.com/gp/help/customer/display.html?nodeId=GCU8BWGTQNJKQEBS"
            target="_blank"
            rel="noopener noreferrer"
            className="text-amber-400 hover:text-amber-300 underline"
          >
            Amazon's package tracking help page
          </a>{' '}
          for assistance with your delivery.
        </>
      ),
    },
    {
      question: 'What payment methods do you accept?',
      answer: 'We accept all payment methods available through Amazon.',
    },
    {
      question: 'Are prices displayed with tax included?',
      answer: 'Prices are displayed with VAT included.',
    },
    {
      question: 'Is the game available in multiple languages?',
      answer: 'No! At the moment the game is only available in English.',
    },
    {
      question: 'Does the game include all instructions and manuals?',
      answer: 'Yes! The package includes all essentials for playing.',
    },
  ];

  return (
    <section id="king-section" className="relative overflow-hidden">
      <div className="relative z-10">
        <div className="min-h-screen flex items-center justify-center py-20">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center max-w-6xl mx-auto">
              <div className="order-2 lg:order-1">
                {mobile ? (
                  <ScaleIn delay={0.2}>
                    <div className="relative group">
                      <div className="absolute -inset-4 rounded-lg bg-gradient-to-r from-amber-400/20 to-yellow-500/20 blur opacity-75" />
                      <FlipCard
                        frontImage="/image-1.png"
                        frontAlt="Lehtimaki Games Board Game"
                        backImage="/board-game-map.png"
                        backAlt="Board Game Map"
                      />
                    </div>
                  </ScaleIn>
                ) : (
                  <Floating duration={4} distance={8}>
                    <ScaleIn delay={0.2}>
                      <div className="relative group">
                        <GlowPulse className="absolute -inset-4 rounded-lg">
                          <div className="w-full h-full bg-gradient-to-r from-amber-400/20 to-yellow-500/20 rounded-lg blur opacity-75" />
                        </GlowPulse>
                        <FlipCard
                          frontImage="/image-1.png"
                          frontAlt="Lehtimaki Games Board Game"
                          backImage="/board-game-map.png"
                          backAlt="Board Game Map"
                        />
                      </div>
                    </ScaleIn>
                  </Floating>
                )}
              </div>

              <div className="order-1 lg:order-2">
                <div className="space-y-6">
                  <FadeIn direction="right" delay={0}>
                    <h2 className="text-3xl md:text-4xl font-serif gradient-text mb-4">
                      KING OF THE MIDDLE EAST
                    </h2>
                  </FadeIn>

                  <FadeIn direction="right" delay={0.1}>
                    <p className="text-gray-300 text-lg leading-relaxed">
                      Command the battlefield in this premium strategic war
                      board game. Experience realistic diplomatic situations
                      with meticulously crafted components and immersive
                      gameplay that brings military history to life.
                    </p>
                  </FadeIn>

                  <StaggerContainer
                    className="grid grid-cols-2 gap-4"
                    staggerDelay={0.1}
                  >
                    {features.map((feature, index) => (
                      <StaggerItem key={index}>
                        <div className="flex items-center text-gray-300">
                          <feature.icon className="w-5 h-5 text-amber-400 mr-3" />
                          <span>{feature.label}</span>
                        </div>
                      </StaggerItem>
                    ))}
                  </StaggerContainer>

                  <FadeIn direction="up" delay={0.3}>
                    <div className="space-y-3">
                      <h3 className="text-xl font-serif text-amber-400 mb-3">
                        What's Included:
                      </h3>
                      <StaggerContainer className="space-y-2" staggerDelay={0.08}>
                        {includedItems.map((item, index) => (
                          <StaggerItem key={index}>
                            <li className="flex items-start list-none text-gray-300">
                              <motion.span
                                className="w-2 h-2 bg-amber-400 rounded-full mt-2 mr-3 flex-shrink-0"
                                initial={{ scale: 0 }}
                                animate={{ scale: 1 }}
                                transition={{
                                  delay: 0.5 + index * 0.1,
                                  type: 'spring',
                                  stiffness: 400,
                                }}
                              />
                              {item}
                            </li>
                          </StaggerItem>
                        ))}
                      </StaggerContainer>
                    </div>
                  </FadeIn>

                  <PopIn delay={0.5}>
                    <div className="pt-6">
                      <motion.button
                        onClick={handleBuyNowClick}
                        className="gradient-button w-full px-8 py-4 text-lg font-semibold text-white rounded-[11px]"
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                      >
                        Order Now
                      </motion.button>
                    </div>
                  </PopIn>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="relative w-full min-h-screen flex items-center justify-center py-20">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center max-w-6xl mx-auto">
              <div className="order-1 lg:order-1">
                <div className="space-y-6">
                  <FadeIn direction="left" delay={0}>
                    <h2 className="text-4xl md:text-5xl font-serif gradient-text mb-6">
                      Our Story
                    </h2>
                  </FadeIn>
                  <FadeIn direction="left" delay={0.15}>
                    <p className="text-gray-300 text-lg leading-relaxed">
                      I am Justus Lehtimaki, a Finnish board game designer born
                      in Espoo, Finland. My dream was to create a military
                      strategy game that realistically represents the
                      geopolitical situation and diplomatic atmosphere of the
                      Cold War era Middle East. The Middle East has always
                      enthralled me and King of the Middle East is my piece of
                      art. The goal of the game is to conquer the Middle East
                      with your troops as a dictator of a Middle Eastern nation.
                      The design of the game began in the early 2020s and took
                      years but the game is now produced and going to be for
                      sale in board game stores and on Amazon this spring. The
                      game is revolutionizing the whole board game scene with
                      its emphasis on social and diplomatic skills. Are you
                      ready to challenge your friends and rule your country to
                      victory?
                    </p>
                  </FadeIn>
                </div>
              </div>

              <div className="order-2 lg:order-2 flex justify-center lg:justify-end">
                {mobile ? (
                  <ScaleIn delay={0.3}>
                    <div className="relative group max-w-sm">
                      <div className="absolute -inset-3 rounded-lg bg-gradient-to-r from-amber-400/20 to-yellow-500/20 blur opacity-75" />
                      <ContactFlipCard
                        frontImage="/image.png"
                        frontAlt="Our Story"
                        email="justus.lehtimaki@gmail.com"
                        instagramUrl="https://www.instagram.com/lehtimakigames/"
                        instagramHandle="@lehtimakigames"
                      />
                    </div>
                  </ScaleIn>
                ) : (
                  <Floating duration={5} distance={6}>
                    <ScaleIn delay={0.3}>
                      <div className="relative group max-w-sm">
                        <GlowPulse className="absolute -inset-3 rounded-lg">
                          <div className="w-full h-full bg-gradient-to-r from-amber-400/20 to-yellow-500/20 rounded-lg blur opacity-75" />
                        </GlowPulse>
                        <ContactFlipCard
                          frontImage="/image.png"
                          frontAlt="Our Story"
                          email="justus.lehtimaki@gmail.com"
                          instagramUrl="https://www.instagram.com/lehtimakigames/"
                          instagramHandle="@lehtimakigames"
                        />
                      </div>
                    </ScaleIn>
                  </Floating>
                )}
              </div>
            </div>
          </div>
        </div>

        <div className="relative w-full min-h-screen flex items-center justify-center py-20">
          <div className="container mx-auto px-4 max-w-4xl">
            <FadeIn direction="up" delay={0}>
              <h2 className="text-4xl md:text-5xl font-serif gradient-text text-center mb-12">
                Frequently Asked Questions
              </h2>
            </FadeIn>

            <div className="space-y-4">
              {faqs.map((faq, index) => (
                <FAQItem
                  key={index}
                  question={faq.question}
                  answer={faq.answer}
                  index={index}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default StarrySection;
