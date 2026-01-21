import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const phases = {
  inhale: { duration: 4, next: 'hold', text: 'Breathe In', color: 'hsl(28 85% 70%)' },
  hold: { duration: 4, next: 'exhale', text: 'Hold', color: 'hsl(245 40% 75%)' },
  exhale: { duration: 4, next: 'rest', text: 'Breathe Out', color: 'hsl(340 65% 75%)' },
  rest: { duration: 2, next: 'inhale', text: 'Rest', color: 'hsl(225 30% 25%)' },
};

export const BreathingExercise = () => {
  const [phase, setPhase] = useState('inhale'); // inhale, hold, exhale, rest
  const [count, setCount] = useState(4);

  useEffect(() => {
    const timer = setInterval(() => {
      setCount((prev) => {
        if (prev <= 1) {
          setPhase((currentPhase) => phases[currentPhase].next);
          return phases[currentPhase].duration;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [phase]);

  const currentPhase = phases[phase];
  const progress = (count / currentPhase.duration) * 100;

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.9 }}
      className="glass-strong rounded-3xl p-12 flex flex-col items-center justify-center min-h-[500px]"
    >
      <div className="relative">
        {/* Breathing Circle */}
        <motion.div
          animate={{
            scale: phase === 'inhale' ? 1.5 : phase === 'exhale' ? 0.7 : 1,
            opacity: phase === 'rest' ? 0.5 : 1,
          }}
          transition={{ duration: currentPhase.duration, ease: 'easeInOut' }}
          className="w-64 h-64 rounded-full flex items-center justify-center relative"
          style={{
            background: `radial-gradient(circle, ${currentPhase.color}40 0%, transparent 70%)`,
            boxShadow: `0 0 60px ${currentPhase.color}60`,
          }}
        >
          {/* Inner circle */}
          <div
            className="w-48 h-48 rounded-full glass-strong flex flex-col items-center justify-center"
            style={{
              borderColor: currentPhase.color,
              borderWidth: '2px',
            }}
          >
            <motion.p
              key={phase}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-3xl font-light text-foreground mb-2"
              style={{ fontFamily: "'Cormorant Garamond', serif" }}
            >
              {currentPhase.text}
            </motion.p>
            <motion.p
              key={count}
              initial={{ scale: 1.5 }}
              animate={{ scale: 1 }}
              className="text-6xl font-light"
              style={{ color: currentPhase.color }}
            >
              {count}
            </motion.p>
          </div>

          {/* Pulsing rings */}
          <motion.div
            animate={{ scale: [1, 1.2, 1], opacity: [0.5, 0.2, 0.5] }}
            transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
            className="absolute inset-0 rounded-full border-2"
            style={{ borderColor: currentPhase.color }}
          />
          <motion.div
            animate={{ scale: [1, 1.4, 1], opacity: [0.3, 0.1, 0.3] }}
            transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut', delay: 0.5 }}
            className="absolute inset-0 rounded-full border-2"
            style={{ borderColor: currentPhase.color }}
          />
        </motion.div>
      </div>

      {/* Instructions */}
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
        className="mt-12 text-center text-muted-foreground max-w-md"
      >
        Follow the circle. Breathe with intention. Let the rhythm calm your mind.
      </motion.p>

      {/* Progress indicator */}
      <div className="w-full max-w-xs mt-8">
        <div className="h-2 bg-muted/20 rounded-full overflow-hidden">
          <motion.div
            className="h-full rounded-full"
            style={{ backgroundColor: currentPhase.color }}
            animate={{ width: `${progress}%` }}
            transition={{ duration: 1, ease: 'linear' }}
          />
        </div>
      </div>
    </motion.div>
  );
};

export default BreathingExercise;