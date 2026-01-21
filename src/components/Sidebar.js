import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from './ui/button';
import { Shield, Heart, Cloud, Sprout, Wind, Menu, X } from 'lucide-react';

export const Sidebar = ({ activeSection, setActiveSection }) => {
  const [isOpen, setIsOpen] = useState(false);

  const menuItems = [
    { id: 'hero', label: 'Home', icon: Heart, emoji: '🏠' },
    { id: 'truth', label: 'The Truth', icon: Shield, emoji: '🛡️' },
    { id: 'timeline', label: 'Her Support', icon: Heart, emoji: '❤️' },
    { id: 'safespace', label: 'Safe Space', icon: Cloud, emoji: '☁️' },
    { id: 'promise', label: 'Our Future', icon: Sprout, emoji: '🌱' },
    { id: 'venting', label: 'Release', icon: Wind, emoji: '🌪️' },
  ];

  const handleSectionChange = (sectionId) => {
    setActiveSection(sectionId);
    setIsOpen(false);
  };

  return (
    <>
      {/* Mobile Menu Toggle */}
      <motion.button
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
        onClick={() => setIsOpen(!isOpen)}
        className="fixed top-6 left-6 z-50 lg:hidden glass rounded-full p-3 hover:scale-105 transition-transform"
      >
        {isOpen ? <X className="w-6 h-6 text-foreground" /> : <Menu className="w-6 h-6 text-foreground" />}
      </motion.button>

      {/* Sidebar */}
      <AnimatePresence>
        <motion.aside
          initial={{ x: -300, opacity: 0 }}
          animate={{ 
            x: isOpen || window.innerWidth >= 1024 ? 0 : -300, 
            opacity: isOpen || window.innerWidth >= 1024 ? 1 : 0 
          }}
          exit={{ x: -300, opacity: 0 }}
          transition={{ type: 'spring', damping: 20 }}
          className="fixed left-0 top-0 h-screen w-72 z-40 p-6 glass-strong border-r border-glass-border"
        >
          <div className="flex flex-col h-full">
            {/* Logo/Title */}
            <div className="mb-12 pt-2">
              <h3 className="text-2xl font-light text-gradient"
                  style={{ fontFamily: "'Cormorant Garamond', serif" }}>
                Healing Journey
              </h3>
              <p className="text-xs text-muted-foreground mt-2">Navigate your peace</p>
            </div>

            {/* Navigation */}
            <nav className="flex-1 space-y-2">
              {menuItems.map((item, index) => {
                const Icon = item.icon;
                const isActive = activeSection === item.id;
                
                return (
                  <motion.div
                    key={item.id}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.1 * index }}
                  >
                    <Button
                      variant="ghost"
                      onClick={() => handleSectionChange(item.id)}
                      className={`w-full justify-start gap-3 text-left h-auto py-4 px-4 rounded-2xl transition-all duration-300 ${
                        isActive 
                          ? 'bg-primary/20 text-primary border border-primary/30 glow' 
                          : 'text-foreground/70 hover:text-foreground hover:bg-muted/10'
                      }`}
                    >
                      <span className="text-2xl">{item.emoji}</span>
                      <div className="flex-1">
                        <span className="block font-medium">{item.label}</span>
                      </div>
                      {isActive && (
                        <motion.div
                          layoutId="activeIndicator"
                          className="w-2 h-2 rounded-full bg-primary"
                          transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                        />
                      )}
                    </Button>
                  </motion.div>
                );
              })}
            </nav>

            {/* Footer */}
            <div className="mt-auto pt-6 border-t border-glass-border">
              <p className="text-xs text-muted-foreground text-center leading-relaxed">
                Take your time.<br />
                This space is yours.
              </p>
            </div>
          </div>
        </motion.aside>
      </AnimatePresence>

      {/* Overlay for mobile */}
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={() => setIsOpen(false)}
          className="fixed inset-0 bg-background/80 backdrop-blur-sm z-30 lg:hidden"
        />
      )}
    </>
  );
};

export default Sidebar;