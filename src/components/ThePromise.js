import React from 'react';
import { motion } from 'framer-motion';
import { Sprout, GraduationCap, Heart, Sparkles } from 'lucide-react';

export const ThePromise = () => {
  return (
    <div className="min-h-screen flex items-center justify-center px-6 py-20 lg:pl-80">
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="max-w-4xl mx-auto"
      >
        {/* Header */}
        <div className="text-center mb-16">
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.3, type: 'spring' }}
            className="inline-flex items-center justify-center w-20 h-20 rounded-full glass mb-6"
          >
            <Sprout className="w-10 h-10 text-primary" />
          </motion.div>
          <h2 className="text-5xl md:text-6xl font-light text-gradient mb-4"
              style={{ fontFamily: "'Cormorant Garamond', serif" }}>
            Our Future
          </h2>
          <p className="text-muted-foreground text-lg">What lies ahead, together or apart</p>
        </div>

        <div className="space-y-8">
          {/* Your Degree */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.5 }}
            className="glass-strong rounded-3xl p-8 md:p-10"
          >
            <div className="flex items-start gap-4 mb-6">
              <div className="w-16 h-16 rounded-2xl bg-primary/20 flex items-center justify-center flex-shrink-0">
                <GraduationCap className="w-8 h-8 text-primary" />
              </div>
              <div className="flex-1">
                <h3 className="text-3xl font-medium text-primary mb-3"
                    style={{ fontFamily: "'Cormorant Garamond', serif" }}>
                  Finish Your Degree
                </h3>
                <p className="text-lg leading-relaxed text-foreground/90">
                  This is non-negotiable. Your education is your foundation, your independence, your future.
                </p>
              </div>
            </div>
            <div className="space-y-3 text-foreground/80 pl-20">
              <p>• Focus on your studies without distraction</p>
              <p>• Let me worry about you from a distance if needed</p>
              <p>• Your success matters more than us</p>
            </div>
          </motion.div>

          {/* Suitable Proposal */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.7 }}
            className="glass-strong rounded-3xl p-8 md:p-10"
          >
            <div className="flex items-start gap-4 mb-6">
              <div className="w-16 h-16 rounded-2xl bg-accent/20 flex items-center justify-center flex-shrink-0">
                <Heart className="w-8 h-8 text-accent" />
              </div>
              <div className="flex-1">
                <h3 className="text-3xl font-medium text-accent mb-3"
                    style={{ fontFamily: "'Cormorant Garamond', serif" }}>
                  Your Suitable Proposal
                </h3>
                <p className="text-lg leading-relaxed text-foreground/90">
                  You deserve someone who gives you the stability and peace you've always craved.
                </p>
              </div>
            </div>
            <div className="space-y-3 text-foreground/80 pl-20">
              <p>• Someone who won't make you cry</p>
              <p>• Someone who understands your sensitivity</p>
              <p>• Someone who doesn't bring chaos to your life</p>
            </div>
          </motion.div>

          {/* Whether Together or Apart */}
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.9 }}
            className="glass-strong rounded-3xl p-10 md:p-12 border-2 border-primary/30 relative overflow-hidden"
          >
            {/* Decorative background */}
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 30, repeat: Infinity, ease: 'linear' }}
              className="absolute -top-20 -right-20 w-40 h-40 rounded-full bg-primary/10 blur-3xl"
            />
            <motion.div
              animate={{ rotate: -360 }}
              transition={{ duration: 25, repeat: Infinity, ease: 'linear' }}
              className="absolute -bottom-20 -left-20 w-40 h-40 rounded-full bg-accent/10 blur-3xl"
            />

            <div className="relative z-10">
              <div className="flex items-center justify-center gap-3 mb-8">
                <Sparkles className="w-8 h-8 text-primary" />
                <h3 className="text-3xl font-medium text-foreground"
                    style={{ fontFamily: "'Cormorant Garamond', serif" }}>
                  The Promise
                </h3>
                <Sparkles className="w-8 h-8 text-accent" />
              </div>

              <div className="space-y-6 text-center">
                <p className="text-2xl font-light leading-relaxed text-foreground"
                   style={{ fontFamily: "'Cormorant Garamond', serif" }}>
                  Whether we talk or not,<br />
                  whether we're together or apart,
                </p>
                
                <motion.p
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 1.2 }}
                  className="text-3xl font-medium text-gradient py-6"
                  style={{ fontFamily: "'Cormorant Garamond', serif" }}
                >
                  I will always be the one praying for your peace.
                </motion.p>

                <div className="flex items-center justify-center gap-3 pt-6">
                  <span className="text-3xl">📖</span>
                  <span className="text-3xl">🤲</span>
                  <span className="text-3xl">✨</span>
                </div>

                <div className="pt-8 space-y-4 text-lg text-foreground/80">
                  <p>Your happiness is my happiness.</p>
                  <p>Your success is my success.</p>
                  <p className="text-primary font-medium">Your peace is everything.</p>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Final Message */}
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.4 }}
            className="text-center glass rounded-3xl p-8"
          >
            <p className="text-xl font-light text-muted-foreground italic"
               style={{ fontFamily: "'Cormorant Garamond', serif" }}>
              I hope you have a life where you never have to cry again.
            </p>
          </motion.div>
        </div>
      </motion.div>
    </div>
  );
};

export default ThePromise;