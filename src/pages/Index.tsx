
import React, { useState, useEffect } from 'react';
import NadhaswaramKeyboard from '@/components/NadhaswaramKeyboard';
import KeyChart from '@/components/KeyChart';
import Recorder from '@/components/Recorder';
import NadhaswaramAnimation from '@/components/NadhaswaramAnimation';
import { useToast } from '@/components/ui/use-toast';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { MusicIcon } from 'lucide-react';

const Index = () => {
  const [activeNote, setActiveNote] = useState<string | null>(null);
  const [playedNotes, setPlayedNotes] = useState<string[]>([]);
  const { toast } = useToast();

  // Handle custom events from recorded playback
  useEffect(() => {
    const handlePlayNote = (e: Event) => {
      const customEvent = e as CustomEvent;
      const { note } = customEvent.detail;
      setActiveNote(note);
      setPlayedNotes(prev => [...prev, note]);
    };

    document.addEventListener('playNoteEvent', handlePlayNote);
    
    return () => {
      document.removeEventListener('playNoteEvent', handlePlayNote);
    };
  }, []);

  const handleNotePlay = (note: string) => {
    setActiveNote(note);
    setPlayedNotes(prev => [...prev, note]);
  };

  return (
    <div className="min-h-screen bg-nadhaswaram-light px-4 py-8">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <header className="text-center mb-8">
          <h1 className="text-4xl md:text-5xl font-bold text-nadhaswaram-primary font-kerala mb-2">
            <MusicIcon className="inline-block mr-2 mb-1" /> Nadhaswaram Melody Maker
          </h1>
          <p className="text-nadhaswaram-accent max-w-2xl mx-auto">
            Experience the beautiful sounds of Nadhaswaram, the traditional South Indian wind instrument.
            Play melodies using your keyboard, record your creations, and enjoy the musical journey!
          </p>
        </header>
        
        {/* Instrument Animation */}
        <NadhaswaramAnimation activeNote={activeNote} />
        
        {/* Keyboard */}
        <div className="bg-white rounded-lg p-4 shadow-md mb-6">
          <h2 className="text-xl font-semibold mb-4 text-center text-nadhaswaram-primary">Play Nadhaswaram</h2>
          <p className="text-sm text-center mb-4">
            Use your computer keyboard or click on the keys to play. 
            Press keys A, S, D, F, J, K, L, and ; to play Sa, Ri, Ga, Ma, Pa, Dha, Ni, and higher Sa.
          </p>
          <NadhaswaramKeyboard onNotePlay={handleNotePlay} />
        </div>
        
        {/* Tabs for Recorder and Key Chart */}
        <Tabs defaultValue="recorder" className="mt-8">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="recorder">Melody Recorder</TabsTrigger>
            <TabsTrigger value="keyChart">Key Chart</TabsTrigger>
          </TabsList>
          <TabsContent value="recorder">
            <Recorder playedNotes={playedNotes} />
          </TabsContent>
          <TabsContent value="keyChart">
            <KeyChart />
          </TabsContent>
        </Tabs>
        
        {/* Instructions/Footer */}
        <footer className="mt-12 text-center text-sm text-gray-600">
          <p>
            The Nadhaswaram is one of the most ancient wind instruments of India and is considered to be
            very auspicious. It's commonly played in South Indian temples and at cultural events.
          </p>
          <p className="mt-2">
            © 2025 Nadhaswaram Melody Maker - Create, Record, and Share beautiful melodies.
          </p>
        </footer>
      </div>
    </div>
  );
};

export default Index;
