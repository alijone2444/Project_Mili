import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Wind, Sparkles, Star } from 'lucide-react';
import { Button } from './ui/button';
import { Textarea } from './ui/textarea';
import { toast } from 'sonner';

export const VentingBox = () => {
  const [ventText, setVentText] = useState('');
  const [particles, setParticles] = useState([]);
  const [isReleasing, setIsReleasing] = useState(false);
  const [releaseMessage, setReleaseMessage] = useState('');
  const [gameScore, setGameScore] = useState(0);
  const [isPlayingGame, setIsPlayingGame] = useState(false);
  const [gameBubbles, setGameBubbles] = useState([]);
  const [totalFeelingsShared, setTotalFeelingsShared] = useState(0);
  const [isAutoSaving, setIsAutoSaving] = useState(false);
  const [celebrationStars, setCelebrationStars] = useState([]);
  const gameScoreRef = useRef(0);
  const autoSaveTimeoutRef = useRef(null);

  // Load existing data from localStorage
  const loadVentingData = () => {
    try {
      const saved = localStorage.getItem('ventingData');
      return saved ? JSON.parse(saved) : { entries: [] };
    } catch (error) {
      console.error('Error loading data from localStorage:', error);
      return { entries: [] };
    }
  };

  // Save data to localStorage
  const saveVentingData = (data) => {
    try {
      localStorage.setItem('ventingData', JSON.stringify(data));
    } catch (error) {
      console.error('Error saving data to localStorage:', error);
    }
  };

  // Download all feelings as text file
  const downloadFeelingsAsTxt = () => {
    const data = loadVentingData();
    if (!data.entries || data.entries.length === 0) {
      toast.error('No feelings to download');
      return;
    }

    // Format entries as text
    let textContent = 'Feelings Released\n';
    textContent += '==================\n\n';
    
    data.entries.forEach((entry, index) => {
      const date = new Date(entry.timestamp);
      const dateStr = date.toLocaleDateString('en-US', { 
        year: 'numeric', 
        month: 'long', 
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
      });
      
      textContent += `Feeling #${index + 1}\n`;
      textContent += `Date: ${dateStr}\n`;
      textContent += `---\n`;
      textContent += `${entry.text}\n\n`;
      textContent += `==================\n\n`;
    });

    textContent += `\nTotal Feelings Released: ${data.entries.length}\n`;
    textContent += `Generated: ${new Date().toLocaleString()}\n`;

    // Create and download file
    const blob = new Blob([textContent], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `feelings_released_${new Date().toISOString().split('T')[0]}.txt`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
    
    toast.success('Feelings downloaded successfully! 📄');
  };

  // Load total feelings count on mount
  useEffect(() => {
    const data = loadVentingData();
    setTotalFeelingsShared(data.entries.length);
  }, []);

  // Auto-save as she types (debounced)
  useEffect(() => {
    if (!ventText.trim()) return;

    // Clear previous timeout
    if (autoSaveTimeoutRef.current) {
      clearTimeout(autoSaveTimeoutRef.current);
    }

    // Set new timeout for auto-save
    setIsAutoSaving(true);
    autoSaveTimeoutRef.current = setTimeout(() => {
      // Auto-save draft
      const draftData = {
        draft: ventText,
        lastSaved: new Date().toISOString(),
      };
      localStorage.setItem('ventingDraft', JSON.stringify(draftData));
      setIsAutoSaving(false);
    }, 2000); // Save after 2 seconds of no typing

    return () => {
      if (autoSaveTimeoutRef.current) {
        clearTimeout(autoSaveTimeoutRef.current);
      }
    };
  }, [ventText]);

  // Load draft on mount
  useEffect(() => {
    try {
      const draft = localStorage.getItem('ventingDraft');
      if (draft) {
        const draftData = JSON.parse(draft);
        if (draftData.draft) {
          setVentText(draftData.draft);
        }
      }
    } catch (e) {
      // Ignore errors
    }
  }, []);

  // Create celebration star animation
  const createCelebrationStars = () => {
    const stars = Array.from({ length: 30 }, (_, i) => ({
      id: Date.now() + i + Math.random(),
      x: Math.random() * 100,
      y: Math.random() * 100,
      delay: Math.random() * 0.5,
      size: Math.random() * 15 + 10,
      duration: Math.random() * 1 + 1.5,
    }));
    setCelebrationStars(stars);
    
    // Clear stars after animation
    setTimeout(() => {
      setCelebrationStars([]);
    }, 3000);
  };

  const handleRelease = async () => {
    if (!ventText.trim()) {
      toast.error('Write something first to release it');
      return;
    }

    setIsReleasing(true);
    setReleaseMessage('');

    // Create enhanced star particle effect
    const centerX = 50;
    const centerY = 50;
    const newParticles = Array.from({ length: 50 }, (_, i) => ({
      id: Date.now() + i,
      x: centerX + (Math.random() - 0.5) * 30,
      y: centerY + (Math.random() - 0.5) * 30,
      startX: centerX,
      startY: centerY,
      angle: (Math.PI * 2 * i) / 50,
      distance: 30 + Math.random() * 20,
      delay: Math.random() * 0.3,
      size: Math.random() * 8 + 4,
    }));
    setParticles(newParticles);

    // Load existing data and add new entry
    const data = loadVentingData();
    const entry = {
      text: ventText,
      timestamp: new Date().toISOString(),
      released: true,
    };
    data.entries.push(entry);
    
    // Save to localStorage
    saveVentingData(data);
    
    // Update total feelings shared
    const newTotal = data.entries.length;
    setTotalFeelingsShared(newTotal);
    
    // Create celebration star animation for sharing feeling
    createCelebrationStars();
    
    // Clear draft after release
    localStorage.removeItem('ventingDraft');

    // Show success message
    const messages = [
      'Your thoughts have transformed into stardust ✨',
      'Released into the universe, free and light 🌌',
      'You let go beautifully. You\'re lighter now 💫',
      'Those words are now floating among the stars ⭐',
      'Peace flows where worry once lived 🕊️',
    ];
    const randomMessage = messages[Math.floor(Math.random() * messages.length)];
    setReleaseMessage(randomMessage);

    // Clear and reset
    setTimeout(() => {
      setVentText('');
      setIsReleasing(false);
      setParticles([]);
      toast.success('Released into the universe ✨', {
        description: 'Your thoughts are free now',
      });
      setTimeout(() => setReleaseMessage(''), 5000);
    }, 2500);
  };

  // Feelings Release Game
  const startFeelingGame = () => {
    setIsPlayingGame(true);
    setGameScore(0);
    gameScoreRef.current = 0;
    
    // Create initial floating bubbles/feelings to pop
    const feelings = ['😔', '😤', '😢', '😰', '😫', '😡', '🤯'];
    const bubbles = Array.from({ length: 5 }, (_, i) => ({
      id: Date.now() + i,
      x: Math.random() * 80 + 10,
      y: 100,
      speed: Math.random() * 2 + 1,
      emoji: feelings[Math.floor(Math.random() * feelings.length)],
      size: Math.random() * 30 + 20,
    }));
    setGameBubbles(bubbles);

    // Game duration: 30 seconds
    setTimeout(() => {
      setIsPlayingGame(false);
      toast.success(`You released ${gameScoreRef.current} feelings! ✨`);
      setGameBubbles([]);
    }, 30000);
  };

  // Animate bubbles - fixed to continuously spawn
  useEffect(() => {
    if (!isPlayingGame) {
      setGameBubbles([]);
      return;
    }

    const feelings = ['😔', '😤', '😢', '😰', '😫', '😡', '🤯'];
    let bubbleCounter = 0;

    const interval = setInterval(() => {
      setGameBubbles((prev) => {
        // Move existing bubbles up
        const moved = prev
          .map((bubble) => ({
            ...bubble,
            y: bubble.y - bubble.speed,
          }))
          .filter((bubble) => bubble.y > -10);

        // Always add new bubbles if we have less than 8 visible
        if (moved.length < 8) {
          const newBubbles = Array.from({ length: 2 }, (_, i) => ({
            id: Date.now() + bubbleCounter++ + Math.random(),
            x: Math.random() * 80 + 10,
            y: 100,
            speed: Math.random() * 2 + 1,
            emoji: feelings[Math.floor(Math.random() * feelings.length)],
            size: Math.random() * 30 + 20,
          }));
          return [...moved, ...newBubbles];
        }

        return moved;
      });
    }, 150);

    return () => clearInterval(interval);
  }, [isPlayingGame, gameScore]);

  const popBubble = (id) => {
    setGameBubbles((prev) => prev.filter((b) => b.id !== id));
    setGameScore((prev) => {
      const newScore = prev + 1;
      gameScoreRef.current = newScore; // Update ref with latest score
      return newScore;
    });
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-6 py-20 lg:pl-80">
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="max-w-4xl mx-auto w-full"
      >
        {/* Header */}
        <div className="text-center mb-12">
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.3, type: 'spring' }}
            className="inline-flex items-center justify-center w-20 h-20 rounded-full glass mb-6"
          >
            <Wind className="w-10 h-10 text-primary" />
          </motion.div>
          <h2 className="text-5xl md:text-6xl font-light text-gradient mb-4"
              style={{ fontFamily: "'Cormorant Garamond', serif" }}>
            Release
          </h2>
          <p className="text-muted-foreground">Let go of what weighs on your heart</p>
        </div>

        {/* Main Venting Area */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.5 }}
          className="relative glass-strong rounded-3xl p-8 md:p-12 overflow-visible"
        >
          {/* Enhanced Star Particles during release */}
          <div className="absolute inset-0 overflow-visible pointer-events-none z-10">
            <AnimatePresence>
              {isReleasing && particles.map((particle) => {
                const endX = particle.startX + Math.cos(particle.angle) * particle.distance;
                const endY = particle.startY - 20 + Math.sin(particle.angle) * particle.distance;
                
                return (
                  <motion.div
                    key={particle.id}
                    initial={{ 
                      x: `${particle.startX}%`, 
                      y: `${particle.startY}%`, 
                      scale: 1, 
                      opacity: 1,
                      rotate: 0
                    }}
                    animate={{
                      x: `${endX}%`,
                      y: `${endY}%`,
                      scale: [1, 1.5, 0],
                      opacity: [1, 1, 0],
                      rotate: 360,
                    }}
                    exit={{ opacity: 0, scale: 0 }}
                    transition={{ 
                      duration: 2, 
                      delay: particle.delay,
                      ease: 'easeOut' 
                    }}
                    className="absolute pointer-events-none"
                    style={{
                      filter: 'drop-shadow(0 0 8px rgba(253, 187, 45, 0.8))',
                      left: 0,
                      top: 0,
                    }}
                  >
                    <Star 
                      className="text-primary fill-primary" 
                      style={{ width: particle.size, height: particle.size }}
                    />
                  </motion.div>
                );
              })}
            </AnimatePresence>

            {/* Celebration Stars when feeling is shared */}
            <AnimatePresence>
              {celebrationStars.map((star) => (
                <motion.div
                  key={star.id}
                  initial={{ 
                    x: `${star.x}%`, 
                    y: `${star.y}%`, 
                    scale: 0, 
                    opacity: 1,
                    rotate: 0
                  }}
                  animate={{
                    scale: [0, 1.5, 1, 0],
                    opacity: [1, 1, 1, 0],
                    rotate: [0, 180, 360],
                    y: `${star.y - 30}%`,
                  }}
                  exit={{ opacity: 0, scale: 0 }}
                  transition={{ 
                    duration: star.duration, 
                    delay: star.delay,
                    ease: 'easeOut' 
                  }}
                  className="absolute pointer-events-none"
                  style={{
                    filter: 'drop-shadow(0 0 12px rgba(253, 187, 45, 1))',
                    left: 0,
                    top: 0,
                  }}
                >
                  <Star 
                    className="text-primary fill-primary" 
                    style={{ width: star.size, height: star.size }}
                  />
                </motion.div>
              ))}
            </AnimatePresence>
          </div>

          <div className="mb-6">
            <div className="flex items-center gap-3 mb-4">
              <span className="text-3xl">🌪️</span>
              <h3 className="text-2xl font-medium text-foreground"
                  style={{ fontFamily: "'Cormorant Garamond', serif" }}>
                The Venting Box
              </h3>
              <span className="text-3xl">➡️</span>
              <span className="text-3xl">✨</span>
            </div>
            <p className="text-muted-foreground">
              This is for the "shitty feelings" you feel you shouldn't share.
              Write it here, then release it. Your words will dissolve into stars.
            </p>
          </div>

          {/* Textarea */}
          <motion.div
            animate={isReleasing ? { scale: 0.98, opacity: 0.7 } : { scale: 1, opacity: 1 }}
            className="mb-6"
          >
            <Textarea
              value={ventText}
              onChange={(e) => setVentText(e.target.value)}
              placeholder="Pour your heart out here... No judgment, no consequences. Just release."
              className="min-h-[300px] text-lg leading-relaxed glass border-primary/30 focus:border-primary rounded-2xl resize-none"
              disabled={isReleasing}
            />
          </motion.div>

          {/* Character count and Auto-save indicator */}
          <div className="flex items-center justify-between mb-6">
            <span className="text-sm text-muted-foreground">
              {ventText.length} characters
            </span>
            {isAutoSaving && ventText.trim() && (
              <span className="text-xs text-primary flex items-center gap-2">
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
                  className="w-3 h-3"
                >
                  ⭕
                </motion.div>
                Saving...
              </span>
            )}
          </div>

          {/* Progress Loader - Feelings Shared */}
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-6 glass rounded-2xl p-6 relative overflow-visible"
          >
            {/* Celebration stars around progress */}
            <div className="absolute inset-0 overflow-visible pointer-events-none">
              <AnimatePresence>
                {celebrationStars.length > 0 && celebrationStars.slice(0, 10).map((star) => (
                  <motion.div
                    key={star.id}
                    initial={{ 
                      x: `${star.x}%`, 
                      y: `${star.y}%`, 
                      scale: 0, 
                      opacity: 1
                    }}
                    animate={{
                      scale: [0, 1.2, 0],
                      opacity: [1, 1, 0],
                      y: `${star.y - 20}%`,
                    }}
                    exit={{ opacity: 0, scale: 0 }}
                    transition={{ 
                      duration: star.duration, 
                      delay: star.delay,
                      ease: 'easeOut' 
                    }}
                    className="absolute pointer-events-none"
                    style={{
                      filter: 'drop-shadow(0 0 10px rgba(253, 187, 45, 0.9))',
                    }}
                  >
                    <Star 
                      className="text-primary fill-primary" 
                      style={{ width: star.size * 0.8, height: star.size * 0.8 }}
                    />
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>
            <div className="flex items-center justify-between mb-3">
              <div>
                <h4 className="text-sm font-medium text-foreground mb-1">
                  Feelings Released
                </h4>
                <p className="text-xs text-muted-foreground">
                  {totalFeelingsShared === 0 
                    ? "Start releasing your feelings..." 
                    : totalFeelingsShared === 1
                    ? "1 feeling released. You're taking steps toward healing. 💪"
                    : `${totalFeelingsShared} feelings released. Each one brings you closer to peace. ✨`
                  }
                </p>
              </div>
              <div className="text-2xl">
                {totalFeelingsShared === 0 ? '🌟' : 
                 totalFeelingsShared < 5 ? '💫' :
                 totalFeelingsShared < 10 ? '⭐' :
                 totalFeelingsShared < 20 ? '✨' : '🕊️'}
              </div>
            </div>
            
            {/* Progress Bar */}
            <div className="w-full bg-muted/30 rounded-full h-3 overflow-hidden">
              <motion.div
                className="h-full bg-gradient-to-r from-primary via-accent to-secondary rounded-full"
                initial={{ width: 0 }}
                animate={{ 
                  width: `${Math.min((totalFeelingsShared / 50) * 100, 100)}%` 
                }}
                transition={{ duration: 0.5, ease: 'easeOut' }}
              />
            </div>
            
            {/* Milestones */}
            <div className="mt-4 flex items-center justify-between text-xs text-muted-foreground">
              <span>0</span>
              <span className="text-primary font-medium">
                {totalFeelingsShared < 10 
                  ? "Early days of healing"
                  : totalFeelingsShared < 25
                  ? "Building strength"
                  : totalFeelingsShared < 50
                  ? "Finding your peace"
                  : "Transformed ✨"}
              </span>
              <span>50+</span>
            </div>
          </motion.div>

          {/* Release Message */}
          <AnimatePresence>
            {releaseMessage && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="mb-6 text-center"
              >
                <p className="text-lg text-primary font-medium">{releaseMessage}</p>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Release Button */}
          <div className="relative z-0">
            <motion.div
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <Button
                onClick={handleRelease}
                disabled={isReleasing || !ventText.trim()}
                className="w-full bg-gradient-to-r from-primary via-accent to-secondary hover:opacity-90 text-background font-medium text-lg py-7 rounded-2xl transition-all duration-300 glow"
              >
                {isReleasing ? (
                  <span className="flex items-center gap-3">
                    <motion.div
                      animate={{ rotate: 360 }}
                      transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
                    >
                      <Sparkles className="w-5 h-5" />
                    </motion.div>
                    Releasing...
                  </span>
                ) : (
                  <span className="flex items-center gap-3">
                    <Wind className="w-5 h-5" />
                    Release Into the Universe
                    <Sparkles className="w-5 h-5" />
                  </span>
                )}
              </Button>
            </motion.div>

            {/* Download Feelings Button - Small and Stylish */}
            {totalFeelingsShared > 0 && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="mt-4 flex justify-center"
              >
                <Button
                  onClick={downloadFeelingsAsTxt}
                  variant="ghost"
                  className="text-xs text-muted-foreground hover:text-primary hover:bg-primary/5 rounded-full px-4 py-2 transition-all duration-300 border border-transparent hover:border-primary/20"
                >
                  <span className="flex items-center gap-2">
                    📄
                    <span>Download All Feelings</span>
                    <span className="text-primary">({totalFeelingsShared})</span>
                  </span>
                </Button>
              </motion.div>
            )}
          </div>

        </motion.div>

        {/* Feelings Release Game */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8 }}
          className="mt-8 glass-strong rounded-3xl p-8"
        >
          <div className="text-center mb-6">
            <h3 className="text-2xl font-medium text-primary mb-2"
                style={{ fontFamily: "'Cormorant Garamond', serif" }}>
              Release Your Feelings Game 🎮
            </h3>
            <p className="text-muted-foreground">
              Pop the floating feelings to release them. See how many you can release in 30 seconds!
            </p>
          </div>

          {!isPlayingGame ? (
            <div className="text-center">
              <Button
                onClick={startFeelingGame}
                className="bg-gradient-to-r from-primary via-accent to-secondary hover:opacity-90 text-background font-medium text-lg py-6 px-8 rounded-2xl"
              >
                Start Releasing Feelings
              </Button>
            </div>
          ) : (
            <div className="relative">
              <div className="text-center mb-4">
                <p className="text-xl text-primary font-medium">
                  Score: {gameScore} feelings released! ✨
                </p>
                <p className="text-sm text-muted-foreground mt-2">
                  Click the floating feelings to pop them
                </p>
              </div>
              <div 
                className="relative h-96 w-full rounded-2xl bg-gradient-to-b from-primary/10 to-accent/10 overflow-hidden"
                style={{ minHeight: '400px' }}
              >
                {gameBubbles.map((bubble) => (
                  <motion.button
                    key={bubble.id}
                    initial={{ scale: 0, y: '100%' }}
                    animate={{
                      y: `${bubble.y}%`,
                      scale: [1, 1.1, 1],
                    }}
                    whileHover={{ scale: 1.2 }}
                    whileTap={{ scale: 0.8 }}
                    onClick={() => popBubble(bubble.id)}
                    className="absolute text-4xl cursor-pointer select-none transition-all"
                    style={{
                      filter: 'drop-shadow(0 0 10px rgba(253, 187, 45, 0.5))',
                      left: `${bubble.x}%`,
                      top: 0,
                      transform: 'translateX(-50%)', // Center the emoji on its x position
                    }}
                  >
                    {bubble.emoji}
                  </motion.button>
                ))}
              </div>
            </div>
          )}
        </motion.div>

        {/* Explanation Card */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1 }}
          className="mt-8 glass rounded-2xl p-6 text-center"
        >
          <p className="text-muted-foreground leading-relaxed">
            <span className="text-primary font-medium">How it works:</span> Type your deepest thoughts,
            your angriest words, your saddest feelings. Then click "Release." Your words will be transformed into stardust. Come back anytime you need to let go.
          </p>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default VentingBox;
