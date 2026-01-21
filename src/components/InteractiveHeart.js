import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Heart } from 'lucide-react';

export const InteractiveHeart = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);

  const reasons = [
    "You are amazing because you fought through your difficult times with incredible strength. You managed to keep going even when you felt like you had a \"shitty life\" and were surviving on music and little sleep.",
    "You are amazing because you traveled those long Daewoo journeys with courage. You continued to make the trip home to be with your family, seeking peace and a better environment even when things were tough.",
    "You are amazing because your sensitivity isn't a weakness—it's your superpower. While you felt you were \"too sensitive\" for me to handle, your ability to feel deeply is what makes you unique and kind.",
    "You are Emotionally Aware & Reflective. You openly share your feelings, reflect on your past mistakes, and are willing to learn from them.",
    "You are Empathetic & Caring. You show concern for others' feelings, even when you're hurting, and listen supportively.",
    "You are Honest & Transparent. You don't hide your struggles and are straightforward about your emotional state and past experiences.",
    "You are Family-Oriented. You care deeply for your mother, spend time with her, and value family bonds despite personal challenges.",
    "You are Resilient. You have been through difficult phases (breakups, family health issues) but continue to move forward with strength.",
    "You are Self-Aware & Growth-Minded. You acknowledge your flaws (overthinking, need for reassurance) and are actively working on them.",
    "You are Genuine & Unpretentious. You share funny, embarrassing, and vulnerable stories without trying to appear perfect.",
    "You are Respectful of Boundaries. You understand when to step back in conversations and respect others' emotional space.",
    "You are Spiritually Grounded. You turn to prayer and faith in tough times, seeking peace and guidance sincerely.",
    "You are Warm & Relatable. Your mix of humor, vulnerability, and realness makes you someone easy to connect with and trust.",
  ];

  const handleClick = () => {
    if (isOpen) {
      setCurrentIndex((prev) => (prev + 1) % reasons.length);
    } else {
      setIsOpen(true);
    }
  };

  return (
    <>
      {/* Floating Heart Button */}
      <motion.button
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 1, type: 'spring' }}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
        onClick={handleClick}
        className="fixed bottom-8 right-8 z-50 w-16 h-16 rounded-full glass-strong flex items-center justify-center group hover:shadow-2xl transition-all duration-300 glow-hover"
      >
        <motion.div
          animate={{ 
            scale: [1, 1.2, 1],
          }}
          transition={{ 
            duration: 1.5, 
            repeat: Infinity,
            ease: 'easeInOut'
          }}
        >
          <Heart className="w-7 h-7 text-primary fill-primary/50 group-hover:fill-primary transition-all" />
        </motion.div>
        
        {/* Pulse ring */}
        <motion.div
          animate={{ 
            scale: [1, 1.5, 1],
            opacity: [0.5, 0, 0.5]
          }}
          transition={{ 
            duration: 2, 
            repeat: Infinity,
            ease: 'easeOut'
          }}
          className="absolute inset-0 rounded-full border-2 border-primary"
        />
      </motion.button>

      {/* Popup Message */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8, x: 100 }}
            animate={{ opacity: 1, scale: 1, x: 0 }}
            exit={{ opacity: 0, scale: 0.8, x: 100 }}
            transition={{ type: 'spring', damping: 20 }}
            className="fixed bottom-28 right-8 z-50 w-96 max-w-[90vw] glass-strong rounded-3xl p-6 shadow-2xl"
          >
            <div className="flex items-start gap-3 mb-4">
              <Heart className="w-6 h-6 text-primary fill-primary flex-shrink-0 mt-1" />
              <div className="flex-1">
                <h4 className="text-sm font-medium text-primary mb-2">Why you?</h4>
                <motion.p
                  key={currentIndex}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className="text-foreground leading-relaxed"
                >
                  {reasons[currentIndex]}
                </motion.p>
              </div>
            </div>
            
            <div className="flex items-center justify-between pt-4 border-t border-glass-border">
              <span className="text-xs text-muted-foreground">
                {currentIndex + 1} of {reasons.length}
              </span>
              <div className="flex gap-2">
                <button
                  onClick={() => setIsOpen(false)}
                  className="text-xs text-muted-foreground hover:text-foreground transition-colors"
                >
                  Close
                </button>
                <button
                  onClick={handleClick}
                  className="text-xs text-primary hover:text-primary/80 transition-colors font-medium"
                >
                  Next →
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default InteractiveHeart;