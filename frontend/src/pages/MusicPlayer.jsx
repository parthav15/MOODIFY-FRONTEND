import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { Play, Pause, Volume2, ListMusic, SkipForward, Disc } from 'lucide-react';

const MusicPlayer = ({ recommendations }) => {
  const [currentTrack, setCurrentTrack] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [volume, setVolume] = useState(100);
  const [progress, setProgress] = useState(0);
  const [duration, setDuration] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);
  const playerRef = useRef(null);

  const tracks = recommendations.map(song => ({
    ...song,
    videoId: song.song_url.split('v=')[1].split('&')[0]
  }));

  useEffect(() => {
    const onYouTubeIframeAPIReady = () => {
      playerRef.current = new window.YT.Player('youtube-player', {
        height: '100%',
        width: '100%',
        videoId: tracks[currentTrack]?.videoId,
        playerVars: {
          autoplay: 1,
          controls: 0,
          disablekb: 0,
          modestbranding: 1,
          rel: 0
        },
        events: {
          onReady: (event) => {
            event.target.playVideo();
            setDuration(event.target.getDuration());
            startProgressUpdate();
          },
          onStateChange: (event) => {
            if (event.data === window.YT.PlayerState.PLAYING) {
              setIsPlaying(true);
              startProgressUpdate();
            } else if (event.data === window.YT.PlayerState.PAUSED) {
              setIsPlaying(false);
            } else if (event.data === window.YT.PlayerState.ENDED) {
              handleNextTrack();
            }
          }
        }
      });
    };

    if (!window.YT) {
      window.onYouTubeIframeAPIReady = onYouTubeIframeAPIReady;
    } else {
      onYouTubeIframeAPIReady();
    }

    return () => {
      if (playerRef.current) {
        playerRef.current.destroy();
      }
    };
  }, [recommendations, currentTrack]);

  useEffect(() => {
    setCurrentTrack(0);
  }, [recommendations]);

  const startProgressUpdate = () => {
    const interval = setInterval(() => {
      if (playerRef.current && playerRef.current.getCurrentTime) {
        const time = playerRef.current.getCurrentTime();
        const duration = playerRef.current.getDuration();
        setCurrentTime(time);
        setProgress((time / duration) * 100);
      }
    }, 1000);
    return () => clearInterval(interval);
  };

  const handlePlayPause = () => {
    if (isPlaying) {
      playerRef.current.pauseVideo();
    } else {
      playerRef.current.playVideo();
    }
  };

  const handleVolumeChange = (e) => {
    const newVolume = parseInt(e.target.value);
    setVolume(newVolume);
    playerRef.current.setVolume(newVolume);
  };

  const handleSeek = (e) => {
    const seekTime = (e.target.value / 100) * duration;
    playerRef.current.seekTo(seekTime, true);
  };

  const handleTrackChange = (index) => {
    setCurrentTrack(index);
    playerRef.current.loadVideoById(tracks[index].videoId);
    setIsPlaying(true);
  };

  const handleNextTrack = () => {
    const nextTrack = (currentTrack + 1) % tracks.length;
    handleTrackChange(nextTrack);
  };

  const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = Math.floor(seconds % 60);
    return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`;
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 p-8 relative overflow-hidden">
      {/* Floating Particles Background */}
      <div className="absolute inset-0 z-0">
        {[...Array(30)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 bg-purple-400 rounded-full"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`
            }}
            animate={{
              scale: [0.5, 1, 0.5],
              opacity: [0.3, 0.8, 0.3],
              x: Math.random() * 100 - 50,
              y: Math.random() * 100 - 50
            }}
            transition={{
              duration: 4 + Math.random() * 4,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          />
        ))}
      </div>

      <div className="relative z-10 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Player Section */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            className="lg:col-span-2 bg-slate-900/50 backdrop-blur-xl rounded-3xl p-8 border border-purple-500/20 hover:border-purple-500/40 transition-all shadow-2xl shadow-purple-900/20"
          >
            <div className="relative aspect-video rounded-2xl overflow-hidden border border-purple-500/20">
              <div id="youtube-player" className="rounded-xl" />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-900/50 to-transparent pointer-events-none" />
            </div>

            <div className="mt-8 space-y-6">
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="text-center"
              >
                <h2 className="text-3xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
                  {tracks[currentTrack]?.song_title}
                </h2>
                <div className="flex justify-center gap-4 mt-2 text-purple-300">
                  <span className="bg-purple-500/10 px-3 py-1 rounded-full text-sm">
                    {formatTime(currentTime)}
                  </span>
                  <span className="bg-purple-500/10 px-3 py-1 rounded-full text-sm">
                    {formatTime(duration)}
                  </span>
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="space-y-4"
              >
                <input
                  type="range"
                  min="0"
                  max="100"
                  value={progress}
                  onChange={handleSeek}
                  className="w-full range-purple accent-purple-500 hover:accent-purple-400 transition-colors"
                />

                <div className="flex items-center justify-between">
                  <motion.button
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={handlePlayPause}
                    className="p-4 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 hover:shadow-lg hover:shadow-purple-500/30 transition-all"
                  >
                    {isPlaying ? (
                      <Pause className="w-6 h-6 text-white" />
                    ) : (
                      <Play className="w-6 h-6 text-white" />
                    )}
                  </motion.button>

                  <div className="flex items-center gap-4">
                    <Volume2 className="w-5 h-5 text-purple-400" />
                    <input
                      type="range"
                      min="0"
                      max="100"
                      value={volume}
                      onChange={handleVolumeChange}
                      className="w-32 range-purple accent-purple-500 hover:accent-purple-400 transition-colors"
                    />
                  </div>
                </div>
              </motion.div>
            </div>
          </motion.div>

          {/* Playlist Section */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            className="bg-slate-900/50 backdrop-blur-xl rounded-3xl p-6 border border-purple-500/20 hover:border-purple-500/40 transition-all h-[calc(100vh-100px)] overflow-y-auto"
          >
            <div className="flex items-center gap-3 mb-6">
              <ListMusic className="w-6 h-6 text-purple-400" />
              <h3 className="text-xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
                Emotion Playlist
              </h3>
            </div>

            <div className="space-y-4">
              {tracks.map((track, index) => (
                <motion.div
                  key={index}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className={`p-4 rounded-xl cursor-pointer transition-all ${index === currentTrack
                    ? 'bg-gradient-to-r from-purple-500/20 to-pink-500/10 border-l-4 border-purple-500'
                    : 'hover:bg-slate-800/30'
                    }`}
                  onClick={() => handleTrackChange(index)}
                >
                  <div className="flex items-center gap-4">
                    <div className="relative">
                      <img
                        src={track.song_thumbnail}
                        alt={track.song_title}
                        className="w-12 h-12 rounded-lg"
                      />
                      {index === currentTrack && (
                        <div className="absolute inset-0 bg-purple-500/20 rounded-lg" />
                      )}
                    </div>
                    <div>
                      <p className="font-medium text-gray-100">{track.song_title}</p>
                      <div className="flex items-center gap-2 mt-1">
                        <Disc className="w-4 h-4 text-purple-400" />
                        <span className="text-sm text-purple-300">YouTube Music</span>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>

      {/* Floating Elements */}
      <motion.div
        className="absolute left-20 bottom-20 w-24 h-24 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full blur-xl opacity-10"
        animate={{
          y: [0, -40, 0],
          rotate: [0, 180, 360]
        }}
        transition={{
          duration: 12,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      />
    </div>
  );
};

export default MusicPlayer;