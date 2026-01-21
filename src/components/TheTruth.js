import React from 'react';
import { motion } from 'framer-motion';
import { Shield } from 'lucide-react';

export const TheTruth = () => {
  return (
    <div className="min-h-screen flex items-center justify-center px-6 py-20 lg:pl-80">
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="max-w-4xl mx-auto"
      >
        {/* Header */}
        <div className="text-center mb-12">
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.3, type: 'spring' }}
            className="inline-flex items-center justify-center w-20 h-20 rounded-full glass mb-6"
          >
            <Shield className="w-10 h-10 text-primary" />
          </motion.div>
          <h2 className="text-5xl md:text-6xl font-light text-gradient mb-4"
              style={{ fontFamily: "'Cormorant Garamond', serif" }}>
            The Truth
          </h2>
          <p className="text-muted-foreground">Clearing the air with complete honesty</p>
        </div>

        {/* Content Cards */}
        <div className="space-y-8">


          {/* Card 2: October & The Words */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.8, duration: 0.8 }}
            className="glass-strong rounded-3xl p-8 md:p-10"
          >
            <h3 className="text-2xl md:text-3xl font-medium text-accent mb-6"
                style={{ fontFamily: "'Cormorant Garamond', serif" }}>
              The "Crazy Stuff" I Said
            </h3>
            <div className="space-y-4 text-lg leading-relaxed text-foreground/90">
              <p>
                I am sorry from July 2025. I am sorry for all the harsh words, the "crazy stuff" I said as if you weren't the <span className="text-accent font-medium">sensitive soul</span> I love.
              </p>
              <p>
                You were right from the beginning you were a nice person i should have treated you with more respect and not like a man you are the best person i have ever met who cares about others.
              </p>
              <p>
                You weren't "too sensitive" or "too emotional." You were just <span className="text-accent font-medium">asking to be heard</span>, and I failed you.
              </p>
              <p className="bg-accent/10 border border-accent/30 rounded-2xl p-6 mt-6">
                <span className="block text-accent font-medium mb-2">The real truth:</span>
                You are a nice person who didn't deserve any of this. The problem was never in you—it was in my inability to handle your pain with the care it deserved.
              </p>
            </div>
          </motion.div>

          {/* Card 3: Taking Responsibility */}
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.1, duration: 0.8 }}
            className="glass-strong rounded-3xl p-8 md:p-10 border-2 border-primary/30"
          >
            <div className="flex items-start gap-4 mb-6">
              <span className="text-4xl">😔</span>
              <span className="text-4xl">🙏</span>
              <span className="text-4xl">❤️</span>
            </div>
            <h3 className="text-2xl md:text-3xl font-medium text-foreground mb-6"
                style={{ fontFamily: "'Cormorant Garamond', serif" }}>
              Full Accountability
            </h3>
            <div className="space-y-4 text-lg leading-relaxed text-foreground/90">
              <p>
                I know I dragged you into this relationship and then didn't know how to protect you from the exhaustion of it.
              </p>
              <p>
                <span className="text-primary font-semibold">I take full responsibility for the scars that I created.</span>
              </p>
              <p>
                While you were fighting for your peace, I was adding to your burden. That ends now.
              </p>
              <p className="text-xl text-primary italic pt-4">
                You weren't the problem. You never were.
              </p>
            </div>
          </motion.div>

          {/* Card 4: Unnecessarily Harsh Words */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 1.4, duration: 0.8 }}
            className="glass-strong rounded-3xl p-8 md:p-10"
          >
            <h3 className="text-2xl md:text-3xl font-medium text-accent mb-6"
                style={{ fontFamily: "'Cormorant Garamond', serif" }}>
              You Were Right About My Words
            </h3>
            <div className="space-y-4 text-lg leading-relaxed text-foreground/90">
              <p>
                You were right that my words were unnecessarily harsh. I acknowledge that I used words toward you that you never used toward me, even when you were upset.
              </p>
            </div>
          </motion.div>

          {/* Card 5: Handling Your Sensitivity */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 1.7, duration: 0.8 }}
            className="glass-strong rounded-3xl p-8 md:p-10"
          >
            <h3 className="text-2xl md:text-3xl font-medium text-accent mb-6"
                style={{ fontFamily: "'Cormorant Garamond', serif" }}>
              You Were Right About Your Sensitivity
            </h3>
            <div className="space-y-4 text-lg leading-relaxed text-foreground/90">
              <p>
                You were right that I should have handled your sensitivity with more care. I see now that I treated you as if you were a man instead of being the gentler person you needed me to be.
              </p>
            </div>
          </motion.div>

          {/* Card 6: The Small Things Matter */}
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 2.0, duration: 0.8 }}
            className="glass-strong rounded-3xl p-8 md:p-10 border-2 border-accent/30"
          >
            <h3 className="text-2xl md:text-3xl font-medium text-foreground mb-6"
                style={{ fontFamily: "'Cormorant Garamond', serif" }}>
              You Were Right About The Small Things
            </h3>
            <div className="space-y-4 text-lg leading-relaxed text-foreground/90">
              <p>
                You were right that the "small things" matter. When something bothered you, it deserved to be fixed rather than dismissed or ignored as if it weren't important.
              </p>
            </div>
          </motion.div>

     
          {/* Card 8: Understanding Your Side */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 2.6, duration: 0.8 }}
            className="glass-strong rounded-3xl p-8 md:p-10"
          >
            <h3 className="text-2xl md:text-3xl font-medium text-accent mb-6"
                style={{ fontFamily: "'Cormorant Garamond', serif" }}>
              You Were Right About Understanding
            </h3>
            <div className="space-y-4 text-lg leading-relaxed text-foreground/90">
              <p>
                You were right that I didn't always try to understand your side. Too often, I wasn't willing to see things from your perspective, which left you feeling alone in the relationship.
              </p>
            </div>
          </motion.div>

          {/* Card 9: Anger As An Excuse */}
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 2.9, duration: 0.8 }}
            className="glass-strong rounded-3xl p-8 md:p-10 border-2 border-primary/30"
          >
            <h3 className="text-2xl md:text-3xl font-medium text-foreground mb-6"
                style={{ fontFamily: "'Cormorant Garamond', serif" }}>
              You Were Right About My Anger
            </h3>
            <div className="space-y-4 text-lg leading-relaxed text-foreground/90">
              <p>
                You were right that I used anger as an excuse. Being angry did not justify the things I said to you or the way I made you feel.
              </p>
            </div>
          </motion.div>

          {/* Card 10: I Was At Fault */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 3.2, duration: 0.8 }}
            className="glass-strong rounded-3xl p-8 md:p-10"
          >
            <h3 className="text-2xl md:text-3xl font-medium text-accent mb-6"
                style={{ fontFamily: "'Cormorant Garamond', serif" }}>
              You Were Right About The Arguments
            </h3>
            <div className="space-y-4 text-lg leading-relaxed text-foreground/90">
              <p>
                You were right that I was the one at fault in many of our arguments. I admit that my behavior and reactions were often the root cause of the tension between us.
              </p>
            </div>
          </motion.div>

          {/* Card 11: Growing Up */}
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 3.5, duration: 0.8 }}
            className="glass-strong rounded-3xl p-8 md:p-10 border-2 border-accent/30"
          >
            <h3 className="text-2xl md:text-3xl font-medium text-foreground mb-6"
                style={{ fontFamily: "'Cormorant Garamond', serif" }}>
              You Were Right About Me
            </h3>
            <div className="space-y-4 text-lg leading-relaxed text-foreground/90">
              <p>
                You were right that I needed to grow up. I acknowledge that I wasn't mature enough to provide the emotional support and consistency you deserved.
              </p>
              <p className="text-xl text-primary italic pt-4">
                You deserved better from me. Always.
              </p>
            </div>
          </motion.div>
        </div>
      </motion.div>
    </div>
  );
};

export default TheTruth;