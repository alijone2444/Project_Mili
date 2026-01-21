import React from 'react';
import { motion } from 'framer-motion';

export const HeroSection = () => {
  return (
    <div className="min-h-screen flex items-center justify-center px-6 py-20">
      <div className="max-w-5xl mx-auto text-center">
        {/* Name in beautiful script */}
        <motion.div
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.3 }}
          className="mb-12"
        >
          <h1 className="text-7xl md:text-8xl lg:text-9xl font-light tracking-wide mb-4"
              style={{ fontFamily: "'Cormorant Garamond', serif" }}>
            <span className="text-gradient">Maleeha</span>
          </h1>
          <div className="flex items-center justify-center gap-4 text-foreground/70">
            <div className="h-px w-16 bg-primary/50"></div>
            <span className="text-sm tracking-[0.3em] uppercase">A Space for Healing</span>
            <div className="h-px w-16 bg-primary/50"></div>
          </div>
        </motion.div>

        {/* Main shock message */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, delay: 0.8 }}
          className="glass-strong rounded-3xl p-12 md:p-16 mb-8"
        >
          <div className="flex items-center justify-center gap-4 mb-6">
            <span className="text-4xl">🌊</span>
            <span className="text-4xl">✨</span>
            <span className="text-4xl">🕊️</span>
          </div>
          
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-light leading-relaxed text-foreground mb-8"
              style={{ fontFamily: "'Cormorant Garamond', serif" }}>
            I finally stopped listening to respond,<br />
            and started listening to understand.
          </h2>
          
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.5, duration: 1 }}
            className="text-lg md:text-xl text-muted-foreground leading-relaxed max-w-3xl mx-auto"
          >
            Maleeha, I realized that while you were fighting for your peace,
            I was sometimes the one disturbing it.
            <span className="block mt-4 text-primary font-medium">No more.</span>
          </motion.p>
        </motion.div>

        {/* Gentle instruction */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2, duration: 1 }}
          className="text-muted-foreground text-sm flex items-center justify-center gap-3 animate-pulse-soft"
        >
          <span>Explore using the sidebar</span>
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M9 18l6-6-6-6"/>
          </svg>
        </motion.div>
      </div>
    </div>
  );
};

export default HeroSection;