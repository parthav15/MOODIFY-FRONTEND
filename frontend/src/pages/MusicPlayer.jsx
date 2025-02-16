import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';

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
    <div className="h-screen bg-gradient-to-br from-[#1a1a1a] to-[#2d2d2d] text-white p-8">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 bg-white/5 backdrop-blur-lg rounded-2xl p-8 shadow-xl">
            <div className="relative aspect-video rounded-xl overflow-hidden">
              <div id="youtube-player" />
            </div>
            <div className="mt-6 space-y-4">
              <div>
                <h2 className="text-3xl font-bold">{tracks[currentTrack]?.song_title}</h2>
                <div className="flex justify-between text-gray-400 mt-1">
                  <span>{formatTime(currentTime)}</span>
                  <span>{formatTime(duration)}</span>
                </div>
              </div>
              <input
                type="range"
                min="0"
                max="100"
                value={progress}
                onChange={handleSeek}
                className="w-full accent-purple-500"
              />
              <div className="flex items-center justify-between">
                <button
                  onClick={handlePlayPause}
                  className="p-3 rounded-full bg-purple-600 hover:bg-purple-700 transition-colors"
                >
                  {isPlaying ? (
                    <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 9v6m4-6v6m7-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  ) : (
                    <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  )}
                </button>
                <div className="flex items-center space-x-4">
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15.536 8.464a5 5 0 010 7.072M12 18.364a7 7 0 010-12.728M8.464 15.536a5 5 0 010-7.072" />
                  </svg>
                  <input
                    type="range"
                    min="0"
                    max="100"
                    value={volume}
                    onChange={handleVolumeChange}
                    className="w-32 accent-purple-500"
                  />
                </div>
              </div>
            </div>
          </div>
          <div className="bg-white/5 backdrop-blur-lg rounded-2xl p-6 h-[calc(100vh-100px)] overflow-y-auto">
            <h3 className="text-xl font-bold mb-6">Playlist</h3>
            <div className="space-y-4">
              {tracks.map((track, index) => (
                <motion.div
                  key={index}
                  whileHover={{ scale: 1.02 }}
                  className={`p-4 rounded-lg cursor-pointer transition-colors ${
                    index === currentTrack ? 'bg-purple-500/20 border-l-4 border-purple-500' : 'hover:bg-white/10'
                  }`}
                  onClick={() => handleTrackChange(index)}
                >
                  <div className="flex items-center space-x-4">
                    <img
                      src={track.song_thumbnail}
                      alt={track.song_title}
                      className="w-12 h-12 rounded-md"
                    />
                    <div>
                      <p className="font-medium">{track.song_title}</p>
                      <p className="text-sm text-gray-400">YouTube Music</p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MusicPlayer;