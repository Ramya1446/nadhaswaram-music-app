
import React from 'react';
import NadhaswaramKey from './NadhaswaramKey';

interface NadhaswaramKeyboardProps {
  onNotePlay: (note: string) => void;
}

const NadhaswaramKeyboard: React.FC<NadhaswaramKeyboardProps> = ({ onNotePlay }) => {
  // Define the keyboard layout with notes and their corresponding keyboard keys
  const keyboardConfig = [
    { note: 'Sa', keyboardKey: 'a', audioSrc: '/sounds/sa.mp3' },
    { note: 'Ri', keyboardKey: 's', audioSrc: '/sounds/ri.mp3' },
    { note: 'Ga', keyboardKey: 'd', audioSrc: '/sounds/ga.mp3' },
    { note: 'Ma', keyboardKey: 'f', audioSrc: '/sounds/ma.mp3' },
    { note: 'Pa', keyboardKey: 'j', audioSrc: '/sounds/pa.mp3' },
    { note: 'Dha', keyboardKey: 'k', audioSrc: '/sounds/dha.mp3' },
    { note: 'Ni', keyboardKey: 'l', audioSrc: '/sounds/ni.mp3' },
    { note: 'SA', keyboardKey: ';', audioSrc: '/sounds/sa_high.mp3' },
  ];

  return (
    <div className="flex justify-center space-x-1 my-6 relative">
      {keyboardConfig.map((config, index) => (
        <NadhaswaramKey
          key={config.note}
          note={config.note}
          keyboardKey={config.keyboardKey}
          audioSrc={config.audioSrc}
          onNotePlay={onNotePlay}
        />
      ))}
    </div>
  );
};

export default NadhaswaramKeyboard;
