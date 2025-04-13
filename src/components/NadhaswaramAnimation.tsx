
import React, { useState, useEffect } from 'react';
import { Music2, Music4 } from 'lucide-react';

interface NadhaswaramAnimationProps {
  activeNote: string | null;
}

const NadhaswaramAnimation: React.FC<NadhaswaramAnimationProps> = ({ activeNote }) => {
  const [isAnimating, setIsAnimating] = useState(false);
  
  useEffect(() => {
    if (activeNote) {
      setIsAnimating(true);
      const timer = setTimeout(() => {
        setIsAnimating(false);
      }, 500);
      
      return () => clearTimeout(timer);
    }
  }, [activeNote]);
  
  return (
    <div className="relative h-64 w-full flex items-center justify-center overflow-hidden">
      <div className={`
        transform transition-all duration-500 ease-in-out
        ${isAnimating ? 'scale-110' : 'scale-100'}
        animate-float
      `}>
        {/* Simplified Nadhaswaram visualization */}
        <div className="relative">
          {/* Instrument body */}
          <div className="bg-gradient-to-r from-nadhaswaram-primary to-nadhaswaram-orange h-16 w-64 rounded-full mx-auto relative">
            {/* Bell end */}
            <div className="absolute -right-6 w-16 h-20 bg-gradient-to-r from-nadhaswaram-orange to-nadhaswaram-secondary rounded-tr-full rounded-br-full"></div>
            
            {/* Mouthpiece */}
            <div className="absolute -left-8 w-10 h-6 bg-nadhaswaram-dark rounded-full"></div>
            
            {/* Finger holes */}
            <div className="absolute top-4 left-16 flex space-x-6">
              {[1, 2, 3, 4, 5, 6].map((hole) => (
                <div 
                  key={hole} 
                  className={`w-3 h-3 rounded-full bg-nadhaswaram-dark ${
                    isAnimating ? 'animate-pulse' : ''
                  }`}
                ></div>
              ))}
            </div>
          </div>
          
          {/* Music notes flying out when played */}
          {isAnimating && (
            <div className="absolute top-0 w-full h-full">
              <Music2 
                className="absolute text-nadhaswaram-secondary animate-bounce" 
                style={{ 
                  top: '0%', 
                  right: '10%',
                  animation: 'float 1.5s ease-in-out infinite'
                }}
              />
              <Music4 
                className="absolute text-nadhaswaram-accent animate-bounce" 
                style={{ 
                  top: '-20%', 
                  right: '30%',
                  animation: 'float 2s ease-in-out infinite'
                }}
              />
              <Music2 
                className="absolute text-nadhaswaram-green animate-bounce" 
                style={{ 
                  top: '-10%', 
                  right: '50%',
                  animation: 'float 2.5s ease-in-out infinite'
                }}
              />
            </div>
          )}
        </div>
      </div>
      
      {/* Active note display */}
      {activeNote && (
        <div className="absolute bottom-4 text-center w-full">
          <div className="inline-block bg-nadhaswaram-accent text-white px-4 py-2 rounded-full font-bold text-2xl animate-note-play">
            {activeNote}
          </div>
        </div>
      )}
    </div>
  );
};

export default NadhaswaramAnimation;
