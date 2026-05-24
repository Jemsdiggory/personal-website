'use client'

import { useEffect, useRef, useState } from 'react'
import { FiPlay, FiPause, FiVolume2, FiVolumeX, FiMusic, FiX } from 'react-icons/fi'

export default function MusicWidget() {
  const audioRef = useRef(null)
  const volumeInputRef = useRef(null)
  const [isPlaying, setIsPlaying] = useState(false)
  const [currentTime, setCurrentTime] = useState(0)
  const [duration, setDuration] = useState(0)
  const [volume, setVolume] = useState(0.5)
  const [isMuted, setIsMuted] = useState(false)
  const [isOpen, setIsOpen] = useState(true)
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768)
    }
    checkMobile()
    window.addEventListener('resize', checkMobile)
    return () => window.removeEventListener('resize', checkMobile)
  }, [])

  useEffect(() => {
    const audio = audioRef.current
    if (!audio) return

    const updateTime = () => setCurrentTime(audio.currentTime)
    
    const updateDuration = () => {
      if (audio.duration && !isNaN(audio.duration) && isFinite(audio.duration)) {
        setDuration(audio.duration)
      }
    }
    
    const handleEnd = () => setIsPlaying(false)
    const handleError = () => console.error('Audio failed to load:', audio.error)

    audio.addEventListener('timeupdate', updateTime)
    audio.addEventListener('loadedmetadata', updateDuration)
    audio.addEventListener('loadeddata', updateDuration)
    audio.addEventListener('canplay', updateDuration)
    audio.addEventListener('durationchange', updateDuration)
    audio.addEventListener('ended', handleEnd)
    audio.addEventListener('error', handleError)

    // Set initial volume
    audio.volume = volume

    // Trigger duration check after a delay 
    const timer = setTimeout(() => {
      if (audio.duration && !isNaN(audio.duration)) {
        setDuration(audio.duration)
      }
    }, 1000)

    return () => {
      clearTimeout(timer)
      audio.removeEventListener('timeupdate', updateTime)
      audio.removeEventListener('loadedmetadata', updateDuration)
      audio.removeEventListener('loadeddata', updateDuration)
      audio.removeEventListener('canplay', updateDuration)
      audio.removeEventListener('durationchange', updateDuration)
      audio.removeEventListener('ended', handleEnd)
      audio.removeEventListener('error', handleError)
    }
  }, [volume])

  const togglePlay = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause()
        setIsPlaying(false)
      } else {
        const playPromise = audioRef.current.play()
        if (playPromise !== undefined) {
          playPromise
            .then(() => setIsPlaying(true))
            .catch(err => console.error('Play error:', err))
        } else {
          setIsPlaying(true)
        }
      }
    }
  }

  const toggleMute = () => {
    if (audioRef.current) {
      audioRef.current.volume = isMuted ? volume : 0
      setIsMuted(!isMuted)
    }
  }

  const handleVolumeChange = (e) => {
    const newVolume = parseFloat(e.target.value)
    setVolume(newVolume)
    if (audioRef.current) {
      audioRef.current.volume = newVolume
    }
    setIsMuted(newVolume === 0)
  }

  const handleVolumeTouchChange = (e) => {
    e.preventDefault()
    if (!volumeInputRef.current) return
    
    const rect = volumeInputRef.current.getBoundingClientRect()
    const touch = e.touches[0]
    const percent = Math.max(0, Math.min(1, (touch.clientX - rect.left) / rect.width))
    const newVolume = percent
    
    setVolume(newVolume)
    if (audioRef.current) {
      audioRef.current.volume = newVolume
    }
    setIsMuted(newVolume === 0)
  }

  const handleProgress = (e) => {
    const rect = e.currentTarget.getBoundingClientRect()
    const percent = (e.clientX - rect.left) / rect.width
    const newTime = percent * duration
    if (audioRef.current) {
      audioRef.current.currentTime = newTime
    }
    setCurrentTime(newTime)
  }

  const formatTime = (time) => {
    if (!time || isNaN(time)) return '0:00'
    const minutes = Math.floor(time / 60)
    const seconds = Math.floor(time % 60)
    return `${minutes}:${seconds.toString().padStart(2, '0')}`
  }

  return (
    <>
      {isOpen && (
        <div
          style={{
            position: 'fixed',
            bottom: isMobile ? '16px' : '24px',
            right: isMobile ? '16px' : '24px',
            background: 'rgba(13,17,23,0.9)',
            backdropFilter: 'blur(12px)',
            border: '1px solid rgba(99,102,241,0.3)',
            borderRadius: '12px',
            padding: isMobile ? '12px' : '16px',
            width: isMobile ? '220px' : '280px',
            zIndex: 50,
            boxShadow: '0 8px 32px rgba(0,0,0,0.4), 0 0 20px rgba(99,102,241,0.15)',
          }}
        >
          <audio 
            ref={audioRef} 
            src="/assets/music.mp3" 
            preload="auto"
            crossOrigin="anonymous"
          />

          {/* Header */}
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '12px' }}>
            <p
              style={{
                fontFamily: 'var(--font-mono)',
                fontSize: isMobile ? '0.6rem' : '0.65rem',
                letterSpacing: '0.1em',
                textTransform: 'uppercase',
                color: 'var(--accent)',
                margin: 0,
              }}
            >
              <span style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                <FiMusic size={isMobile ? 12 : 14} />
                {!isMobile && 'Now Playing'}
              </span>
            </p>
            <button
              onClick={() => setIsOpen(false)}
              style={{
                background: 'none',
                border: 'none',
                cursor: 'pointer',
                color: 'rgba(255,255,255,0.5)',
                display: 'flex',
                alignItems: 'center',
                padding: '4px',
                transition: 'color 0.2s ease',
              }}
              onMouseEnter={(e) => e.currentTarget.style.color = 'var(--accent)'}
              onMouseLeave={(e) => e.currentTarget.style.color = 'rgba(255,255,255,0.5)'}
            >
              <FiX size={16} />
            </button>
          </div>

          {/* Progress bar */}
          <div
            onClick={handleProgress}
            style={{
              width: '100%',
              height: '3px',
              background: 'rgba(255,255,255,0.1)',
              borderRadius: '2px',
              cursor: 'pointer',
              marginBottom: '10px',
              overflow: 'hidden',
            }}
          >
            <div
              style={{
                height: '100%',
                background: 'linear-gradient(90deg, var(--accent), var(--accent2))',
                width: `${duration ? (currentTime / duration) * 100 : 0}%`,
                transition: isPlaying ? 'none' : 'width 0.1s ease',
              }}
            />
          </div>

          {/* Time display */}
          <div
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              fontSize: isMobile ? '0.6rem' : '0.65rem',
              fontFamily: 'var(--font-mono)',
              color: 'rgba(255,255,255,0.4)',
              marginBottom: isMobile ? '10px' : '12px',
            }}
          >
            <span>{formatTime(currentTime)}</span>
            <span>{formatTime(duration)}</span>
          </div>

          {/* Controls */}
          <div style={{ display: 'flex', alignItems: 'center', gap: isMobile ? '6px' : '10px' }}>
            {/* Play/Pause */}
            <button
              onClick={togglePlay}
              style={{
                background: 'var(--accent)',
                border: 'none',
                borderRadius: '8px',
                width: isMobile ? '36px' : '44px',
                height: isMobile ? '36px' : '44px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                cursor: 'pointer',
                color: '#fff',
                transition: 'all 0.2s ease',
                boxShadow: '0 0 16px rgba(99,102,241,0.3)',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'scale(1.05)'
                e.currentTarget.style.boxShadow = '0 0 24px rgba(99,102,241,0.5)'
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'scale(1)'
                e.currentTarget.style.boxShadow = '0 0 16px rgba(99,102,241,0.3)'
              }}
            >
              {isPlaying ? <FiPause size={isMobile ? 16 : 20} /> : <FiPlay size={isMobile ? 16 : 20} style={{ marginLeft: '2px' }} />}
            </button>

            {/* Volume control */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '6px', flex: 1 }}>
              <button
                onClick={toggleMute}
                style={{
                  background: 'none',
                  border: 'none',
                  cursor: 'pointer',
                  color: 'rgba(255,255,255,0.5)',
                  display: 'flex',
                  alignItems: 'center',
                  padding: '4px',
                  transition: 'color 0.2s ease',
                  minWidth: isMobile ? '24px' : 'auto',
                }}
                onMouseEnter={(e) => e.currentTarget.style.color = 'var(--accent)'}
                onMouseLeave={(e) => e.currentTarget.style.color = 'rgba(255,255,255,0.5)'}
              >
                {isMuted || volume === 0 ? <FiVolumeX size={isMobile ? 14 : 16} /> : <FiVolume2 size={isMobile ? 14 : 16} />}
              </button>

              <input
                ref={volumeInputRef}
                type="range"
                min="0"
                max="1"
                step="0.01"
                value={isMuted ? 0 : volume}
                onChange={handleVolumeChange}
                onTouchMove={handleVolumeTouchChange}
                style={{
                  flex: 1,
                  height: '3px',
                  background: 'rgba(255,255,255,0.1)',
                  borderRadius: '2px',
                  outline: 'none',
                  cursor: 'pointer',
                  WebkitAppearance: 'none',
                  appearance: 'none',
                  touchAction: 'none',
                }}
              />
            </div>
          </div>

          {/* Volume slider styles */}
          <style>{`
            input[type="range"]::-webkit-slider-thumb {
              -webkit-appearance: none;
              appearance: none;
              width: 10px;
              height: 10px;
              background: var(--accent);
              border-radius: 50%;
              cursor: pointer;
              box-shadow: 0 0 8px rgba(99,102,241,0.5);
            }
            input[type="range"]::-moz-range-thumb {
              width: 10px;
              height: 10px;
              background: var(--accent);
              border-radius: 50%;
              cursor: pointer;
              border: none;
              box-shadow: 0 0 8px rgba(99,102,241,0.5);
            }
          `}</style>
        </div>
      )}
    </>
  )
}
