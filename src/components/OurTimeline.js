import React from 'react';
import { motion } from 'framer-motion';
import { Heart, Coffee, Phone, MessageCircle, Music, ShoppingBag, Film } from 'lucide-react';

export const OurTimeline = () => {
  const memories = [
    {
      icon: ShoppingBag,
      title: 'Our First Meeting',
      description: 'When we first met each other at the mall in person, we had a great time together. We had an optp burger, and that moment was special—the beginning of something real.',
      emoji: '🛍️'
    },
    {
      icon: Heart,
      title: 'Through Your Shitty Life',
      description: 'Even when you felt like everything was falling apart, you fought through it. I saw your strength when you could barely see it yourself.',
      emoji: '🫂'
    },
    {
      icon: Phone,
      title: 'The Daewoo Travels',
      description: 'Every journey you took, I worried about your safety. Those long rides, your phone battery, making sure you were okay—it mattered to me.',
      emoji: '🚌'
    },
    {
      icon: MessageCircle,
      title: 'Late Night Conversations',
      description: 'When the world was asleep and you needed someone to talk to, I was there. Those vulnerable moments meant everything.',
      emoji: '🌙'
    },
    {
      icon: Film,
      title: 'Watching Movies Together',
      description: 'When we watched a movie together on phone, sharing that experience even though we were apart. Those moments of togetherness meant so much—you chose to spend that time with me.',
      emoji: '🎬'
    },
    {
      icon: Music,
      title: 'Working Late, Listening Together',
      description: 'When I was working late, you stayed with me to keep me company. We listened to songs together, and your presence made those long nights bearable. You didn\'t have to be there, but you chose to be.',
      emoji: '🎵'
    },
    {
      icon: Coffee,
      title: 'Supporting Your Dreams',
      description: 'As you said that related nikah or shadi you dont want any of that till you get your degree ends.So now there is no need to worry about that.',
      emoji: '📚'
    },
  ];

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
            <Heart className="w-10 h-10 text-primary fill-primary" />
          </motion.div>
          <h2 className="text-5xl md:text-6xl font-light text-gradient mb-4"
              style={{ fontFamily: "'Cormorant Garamond', serif" }}>
            Her Support
          </h2>
          <p className="text-muted-foreground text-lg">Remembering the moments you gave so much</p>
        </div>

        {/* Timeline */}
        <div className="relative space-y-8">
          {/* Vertical Line */}
          <div className="absolute left-8 top-0 bottom-0 w-px bg-gradient-to-b from-primary via-accent to-secondary opacity-30" />

          {memories.map((memory, index) => {
            const Icon = memory.icon;
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.2 * index, duration: 0.8 }}
                className="relative flex gap-6 items-start"
              >
                {/* Icon */}
                <div className="relative z-10 flex-shrink-0">
                  <div className="w-16 h-16 rounded-full glass flex items-center justify-center glow-hover">
                    <span className="text-3xl">{memory.emoji}</span>
                  </div>
                </div>

                {/* Content Card */}
                <motion.div
                  whileHover={{ scale: 1.02 }}
                  transition={{ type: 'spring', stiffness: 300 }}
                  className="flex-1 glass-strong rounded-3xl p-8"
                >
                  <h3 className="text-2xl font-medium text-primary mb-3"
                      style={{ fontFamily: "'Cormorant Garamond', serif" }}>
                    {memory.title}
                  </h3>
                  <p className="text-lg leading-relaxed text-foreground/80">
                    {memory.description}
                  </p>
                </motion.div>
              </motion.div>
            );
          })}
        </div>

        {/* Closing Message */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1, duration: 0.8 }}
          className="mt-16 text-center glass-strong rounded-3xl p-10"
        >
          <p className="text-2xl font-light leading-relaxed text-foreground"
             style={{ fontFamily: "'Cormorant Garamond', serif" }}>
            You did so much for me, even when you were struggling.
            <span className="block mt-4 text-primary">I never acknowledged it enough.</span>
          </p>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default OurTimeline;