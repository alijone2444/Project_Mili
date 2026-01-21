import React, { useState, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Cloud, Play, Pause, Volume2, VolumeX } from 'lucide-react';
import { Button } from './ui/button';
import BreathingExercise from './BreathingExercise';

export const SafeSpace = () => {
  const [currentTrack, setCurrentTrack] = useState(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [volume, setVolume] = useState(1);
  const [showBreathing, setShowBreathing] = useState(false);
  const [showSoundCloudEmbed, setShowSoundCloudEmbed] = useState(false);
  const [soundCloudUrl, setSoundCloudUrl] = useState('');
  const audioRef = useRef(null);

  const playlist = [
    { 
      title: 'Harleys in Hawaii', 
      artist: 'Katy Perry', 
      duration: '3:18',
      url: '/kettypery.mp3', // Local file - change extension if needed (.mp3, .mp4, .m4a, etc.)
      isSoundCloud: false
    },
    { 
      title: 'Surah Ar-Rahman', 
      artist: 'Qari Abdul Basit', 
      duration: '0:00',
      url: 'https://soundcloud.com/m-sarmad-shafiq/surah-al-rehman-qari-abdul-basit',
      isSoundCloud: true,
      embedUrl: 'https://w.soundcloud.com/player/?url=https%3A//api.soundcloud.com/tracks/&color=%23ff5500&auto_play=false&hide_related=false&show_comments=true&show_user=true&show_reposts=false&show_teaser=true&visual=true'
    },
    { 
      title: 'Weightless', 
      artist: 'Marconi Union', 
      duration: '0:00',
      url: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-2.mp3',
      isSoundCloud: false
    },
  ];

  // Update current time
  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    const updateTime = () => setCurrentTime(audio.currentTime);
    const updateDuration = () => setDuration(audio.duration);

    audio.addEventListener('timeupdate', updateTime);
    audio.addEventListener('loadedmetadata', updateDuration);

    return () => {
      audio.removeEventListener('timeupdate', updateTime);
      audio.removeEventListener('loadedmetadata', updateDuration);
    };
  }, [currentTrack]);

  // Get SoundCloud embed URL from track URL
  const getSoundCloudEmbedUrl = (trackUrl) => {
    // SoundCloud embed format: https://w.soundcloud.com/player/?url=TRACK_URL
    const encodedUrl = encodeURIComponent(trackUrl);
    return `https://w.soundcloud.com/player/?url=${encodedUrl}&color=%23ff5500&auto_play=true&hide_related=false&show_comments=true&show_user=true&show_reposts=false&show_teaser=true&visual=true`;
  };

  // Handle play/pause
  const togglePlay = (track, index) => {
    // If it's a SoundCloud link, show iframe embed
    if (track.isSoundCloud) {
      if (currentTrack === index && showSoundCloudEmbed) {
        setShowSoundCloudEmbed(false);
        setCurrentTrack(null);
      } else {
        setCurrentTrack(index);
        setSoundCloudUrl(getSoundCloudEmbedUrl(track.url));
        setShowSoundCloudEmbed(true);
      }
      return;
    }

    if (currentTrack === index && audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
        setIsPlaying(false);
      } else {
        audioRef.current.play();
        setIsPlaying(true);
      }
    } else {
      setCurrentTrack(index);
      setShowSoundCloudEmbed(false);
      if (audioRef.current) {
        audioRef.current.src = track.url;
        audioRef.current.play();
        setIsPlaying(true);
      }
    }
  };

  // Handle audio ended
  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    const handleEnded = () => {
      setIsPlaying(false);
      setCurrentTrack(null);
    };

    audio.addEventListener('ended', handleEnded);
    return () => audio.removeEventListener('ended', handleEnded);
  }, []);

  // Update volume
  const handleVolumeChange = (e) => {
    const newVolume = parseFloat(e.target.value);
    setVolume(newVolume);
    if (audioRef.current) {
      audioRef.current.volume = newVolume;
    }
  };

  // Toggle mute
  const toggleMute = () => {
    if (audioRef.current) {
      audioRef.current.volume = volume === 0 ? 1 : 0;
      setVolume(volume === 0 ? 1 : 0);
    }
  };

  // Format time
  const formatTime = (seconds) => {
    if (!seconds || isNaN(seconds)) return '0:00';
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs.toString().padStart(2, '0')}`;
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
            <Cloud className="w-10 h-10 text-primary" />
          </motion.div>
          <h2 className="text-5xl md:text-6xl font-light text-gradient mb-4"
              style={{ fontFamily: "'Cormorant Garamond', serif" }}>
            Safe Space
          </h2>
          <p className="text-muted-foreground">Tools to help you breathe and find peace</p>
        </div>

        <div className="space-y-8">
          {/* Breathing Exercise */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.5 }}
            className="glass-strong rounded-3xl p-8 md:p-10"
          >
            <div className="flex items-center gap-3 mb-6">
              <span className="text-3xl">🫁</span>
              <h3 className="text-2xl font-medium text-foreground"
                  style={{ fontFamily: "'Cormorant Garamond', serif" }}>
                Breathing Exercise
              </h3>
            </div>
            <p className="text-muted-foreground mb-6">
              When anxiety hits, breathe with me. This simple exercise can help calm your nervous system.
            </p>
            <Button
              onClick={() => setShowBreathing(!showBreathing)}
              className="bg-primary/20 hover:bg-primary/30 text-primary border border-primary/30 rounded-2xl px-8 py-6 text-lg"
            >
              {showBreathing ? 'Hide Exercise' : 'Start Breathing Exercise'}
            </Button>
          </motion.div>

          {/* Breathing Exercise Component */}
          {showBreathing && <BreathingExercise />}

          {/* Music Player */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.7 }}
            className="glass-strong rounded-3xl p-8 md:p-10"
          >
            <div className="flex items-center gap-3 mb-6">
              <span className="text-3xl">🎵</span>
              <h3 className="text-2xl font-medium text-foreground"
                  style={{ fontFamily: "'Cormorant Garamond', serif" }}>
                Healing Sounds
              </h3>
            </div>
            <p className="text-muted-foreground mb-8">
              The rock songs you use to survive, and peaceful recitations for your soul.
            </p>

            {/* Hidden Audio Element */}
            <audio ref={audioRef} preload="metadata" />

            {/* Playlist */}
            <div className="space-y-3">
              {playlist.map((song, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.9 + (index * 0.1) }}
                  className={`flex items-center gap-4 p-4 rounded-2xl transition-colors group cursor-pointer ${
                    currentTrack === index 
                      ? 'bg-primary/20 border-2 border-primary/30' 
                      : 'bg-muted/10 hover:bg-muted/20'
                  }`}
                  onClick={() => togglePlay(song, index)}
                >
                  <div className="flex-shrink-0">
                    <div className="w-12 h-12 rounded-xl bg-primary/20 flex items-center justify-center group-hover:scale-110 transition-transform">
                      {song.isSoundCloud ? (
                        <Play className="w-5 h-5 text-primary" />
                      ) : isPlaying && currentTrack === index ? (
                        <Pause className="w-5 h-5 text-primary" />
                      ) : (
                        <Play className="w-5 h-5 text-primary" />
                      )}
                    </div>
                  </div>
                  <div className="flex-1 min-w-0">
                    <h4 className="font-medium text-foreground truncate">{song.title}</h4>
                    <p className="text-sm text-muted-foreground truncate">
                      {song.artist}
                      {song.isSoundCloud && (
                        <span className="ml-2 text-xs text-primary">(Plays below)</span>
                      )}
                    </p>
                    {currentTrack === index && !song.isSoundCloud && (
                      <div className="mt-2">
                        <div className="w-full bg-muted/30 rounded-full h-1.5">
                          <motion.div
                            className="bg-primary h-1.5 rounded-full"
                            initial={{ width: 0 }}
                            animate={{ 
                              width: duration > 0 ? `${(currentTime / duration) * 100}%` : 0 
                            }}
                          />
                        </div>
                        <div className="flex justify-between text-xs text-muted-foreground mt-1">
                          <span>{formatTime(currentTime)}</span>
                          <span>{formatTime(duration)}</span>
                        </div>
                      </div>
                    )}
                  </div>
                  <div className="flex-shrink-0 flex items-center gap-3">
                    {currentTrack === index && (
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          toggleMute();
                        }}
                        className="hover:scale-110 transition-transform"
                      >
                        {volume === 0 ? (
                          <VolumeX className="w-5 h-5 text-primary" />
                        ) : (
                          <Volume2 className="w-5 h-5 text-primary" />
                        )}
                      </button>
                    )}
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Volume Control */}
            {currentTrack !== null && !playlist[currentTrack]?.isSoundCloud && (
              <div className="mt-6 flex items-center gap-4">
                <Volume2 className="w-5 h-5 text-primary" />
                <input
                  type="range"
                  min="0"
                  max="1"
                  step="0.01"
                  value={volume}
                  onChange={handleVolumeChange}
                  className="flex-1 h-2 bg-muted/30 rounded-lg appearance-none cursor-pointer accent-primary"
                />
                <span className="text-sm text-muted-foreground w-12 text-right">
                  {Math.round(volume * 100)}%
                </span>
              </div>
            )}

            {/* SoundCloud Embed */}
            {showSoundCloudEmbed && soundCloudUrl && (
              <div className="mt-6">
                <iframe
                  width="100%"
                  height="166"
                  scrolling="no"
                  frameborder="no"
                  allow="autoplay"
                  src={soundCloudUrl}
                  className="rounded-xl"
                ></iframe>
              </div>
            )}
          </motion.div>

          {/* Caring Message */}
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.2 }}
            className="glass-strong rounded-3xl p-8 md:p-10 border-2 border-primary/30"
          >
            <div className="flex items-center gap-3 mb-6">
              <span className="text-3xl">🕯️</span>
              <span className="text-3xl">💭</span>
            </div>
            <p className="text-xl leading-relaxed text-foreground mb-6"
               style={{ fontFamily: "'Cormorant Garamond', serif" }}>
              Don't isolate yourself, Maleeha.
            </p>
            <div className="space-y-3 text-lg text-foreground/80">
              <p>✓ Stay close to your Mama—she's your strength</p>
              <p>✓ Take care of your health: eat well, sleep well</p>
              <p>✓ Keep your phone charged on those Daewoo travels</p>
              <p>✓ Focus on your degree and your future</p>
            </div>
            <p className="text-lg text-primary mt-6 font-medium">
              Your peace is my priority.
            </p>
          </motion.div>
        </div>
      </motion.div>
    </div>
  );
};

export default SafeSpace;