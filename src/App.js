import React, { useState } from 'react';
import Particles from 'react-tsparticles';
import { loadSlim } from 'tsparticles-slim';
import { motion } from 'framer-motion';
import HeroSection from './components/HeroSection';
import Sidebar from './components/Sidebar';
import TheTruth from './components/TheTruth';
import OurTimeline from './components/OurTimeline';
import SafeSpace from './components/SafeSpace';
import ThePromise from './components/ThePromise';
import VentingBox from './components/VentingBox';
import InteractiveHeart from './components/InteractiveHeart';
import { Toaster } from './components/ui/sonner';

function App() {
  const [activeSection, setActiveSection] = useState('hero');

  const particlesInit = async (engine) => {
    await loadSlim(engine);
  };

  const particlesOptions = {
    fullScreen: {
      enable: true,
      zIndex: 0
    },
    particles: {
      number: {
        value: 30,
        density: {
          enable: true,
          value_area: 800
        }
      },
      color: {
        value: ['#FFE6B6', '#FFCC98', '#FFC4D6', '#E6D5FF']
      },
      shape: {
        type: ['circle', 'image'],
        image: [
          {
            src: 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjQiIGhlaWdodD0iMjQiIHZpZXdCb3g9IjAgMCAyNCAyNCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cGF0aCBkPSJNMTIgMkM2LjQ4IDIgMiA2LjQ4IDIgMTJzNC40OCAxMCAxMCAxMCAxMC00LjQ4IDEwLTEwUzE3LjUyIDIgMTIgMnptMCAxOGMtNC40MSAwLTgtMy41OS04LThzMy41OS04IDgtOCA4IDMuNTkgOCA4LTMuNTkgOC04IDh6IiBmaWxsPSIjRkZFNkI2IiBvcGFjaXR5PSIwLjYiLz48L3N2Zz4=',
            height: 20,
            width: 20
          }
        ]
      },
      opacity: {
        value: 0.5,
        random: true,
        anim: {
          enable: true,
          speed: 1,
          opacity_min: 0.2,
          sync: false
        }
      },
      size: {
        value: 8,
        random: true,
        anim: {
          enable: true,
          speed: 3,
          size_min: 3,
          sync: false
        }
      },
      move: {
        enable: true,
        speed: 0.8,
        direction: 'top',
        random: true,
        straight: false,
        out_mode: 'out',
        bounce: false,
      }
    },
    interactivity: {
      detect_on: 'canvas',
      events: {
        onhover: {
          enable: true,
          mode: 'bubble'
        },
        resize: true
      },
      modes: {
        bubble: {
          distance: 200,
          size: 12,
          duration: 2,
          opacity: 0.8
        }
      }
    },
    retina_detect: true
  };

  const renderSection = () => {
    switch (activeSection) {
      case 'truth':
        return <TheTruth />;
      case 'timeline':
        return <OurTimeline />;
      case 'safespace':
        return <SafeSpace />;
      case 'promise':
        return <ThePromise />;
      case 'venting':
        return <VentingBox />;
      default:
        return <HeroSection />;
    }
  };

  return (
    <div className="relative min-h-screen overflow-hidden">
      <Particles
        id="tsparticles"
        init={particlesInit}
        options={particlesOptions}
      />
      
      <div className="relative z-10">
        <Sidebar activeSection={activeSection} setActiveSection={setActiveSection} />
        
        <motion.main
          className="min-h-screen"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1 }}
        >
          {renderSection()}
        </motion.main>
        
        <InteractiveHeart />
      </div>
      
      <Toaster position="top-center" />
    </div>
  );
}

export default App;