
import React, { useState, useEffect } from 'react';
import { cn } from '@/lib/utils';

interface NadhaswaramKeyProps {
  note: string;
  keyboardKey: string;
  audioSrc: string;
  isBlackKey?: boolean;
  onNotePlay?: (note: string) => void;
}

const NadhaswaramKey: React.FC<NadhaswaramKeyProps> = ({
  note,
  keyboardKey,
  audioSrc,
  isBlackKey = false,
  onNotePlay
}) => {
  const [isActive, setIsActive] = useState(false);
  const audioRef = React.useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    // Initialize audio with error handling
    try {
      audioRef.current = new Audio(audioSrc);
      
      const handleKeyDown = (e: KeyboardEvent) => {
        if (e.key.toLowerCase() === keyboardKey.toLowerCase() && !e.repeat) {
          playSound();
        }
      };
      
      const handleKeyUp = (e: KeyboardEvent) => {
        if (e.key.toLowerCase() === keyboardKey.toLowerCase()) {
          setIsActive(false);
        }
      };

      window.addEventListener('keydown', handleKeyDown);
      window.addEventListener('keyup', handleKeyUp);
      
      return () => {
        window.removeEventListener('keydown', handleKeyDown);
        window.removeEventListener('keyup', handleKeyUp);
        if (audioRef.current) {
          audioRef.current.pause();
          audioRef.current = null;
        }
      };
    } catch (error) {
      console.error("Audio initialization error:", error);
    }
  }, [keyboardKey, audioSrc, onNotePlay, note]);

  const playSound = () => {
    if (audioRef.current) {
      // Reset the audio to the beginning for quick successive plays
      audioRef.current.currentTime = 0;
      audioRef.current.play().catch(error => {
        console.error("Sound playback error:", error);
        // Optionally, show a user-friendly toast or notification
      });
      
      setIsActive(true);
      
      if (onNotePlay) {
        onNotePlay(note);
      }
      
      // Reset active state after animation completes
      setTimeout(() => setIsActive(false), 300);
    }
  };

  return (
    <div
      className={cn(
        'key h-28 w-14 rounded-b-md select-none',
        isBlackKey ? 'black-key' : '',
        isActive ? 'active animate-note-play' : ''
      )}
      onMouseDown={playSound}
      onTouchStart={playSound}
    >
      <div className="text-sm font-bold">{note}</div>
      <div className="key-label">{keyboardKey.toUpperCase()}</div>
    </div>
  );
};

export default NadhaswaramKey;
