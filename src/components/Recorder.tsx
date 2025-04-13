
import React, { useState, useEffect, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Mic, StopCircle, Save, Trash, Play } from 'lucide-react';
import { toast } from 'sonner';

interface RecorderProps {
  playedNotes: string[];
}

interface Recording {
  id: number;
  name: string;
  notes: string[];
  timestamp: string;
}

const Recorder: React.FC<RecorderProps> = ({ playedNotes }) => {
  const [isRecording, setIsRecording] = useState(false);
  const [recordedNotes, setRecordedNotes] = useState<string[]>([]);
  const [recordings, setRecordings] = useState<Recording[]>([]);
  const [recordingName, setRecordingName] = useState('');
  const [isPlaying, setIsPlaying] = useState(false);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    // Load recordings from localStorage
    const savedRecordings = localStorage.getItem('nadhaswaramRecordings');
    if (savedRecordings) {
      setRecordings(JSON.parse(savedRecordings));
    }
  }, []);

  useEffect(() => {
    if (isRecording && playedNotes.length > 0) {
      const lastNote = playedNotes[playedNotes.length - 1];
      setRecordedNotes(prev => [...prev, lastNote]);
    }
  }, [playedNotes, isRecording]);

  const startRecording = () => {
    setIsRecording(true);
    setRecordedNotes([]);
    toast("Recording started");
  };

  const stopRecording = () => {
    setIsRecording(false);
    setRecordingName(`Melody ${new Date().toLocaleTimeString()}`);
    toast("Recording stopped");
  };

  const saveRecording = () => {
    if (recordedNotes.length === 0) {
      toast("Nothing to save! Play some notes while recording.");
      return;
    }

    const newRecording: Recording = {
      id: Date.now(),
      name: recordingName || `Melody ${new Date().toLocaleTimeString()}`,
      notes: [...recordedNotes],
      timestamp: new Date().toISOString(),
    };

    const updatedRecordings = [...recordings, newRecording];
    setRecordings(updatedRecordings);
    
    // Save to localStorage
    localStorage.setItem('nadhaswaramRecordings', JSON.stringify(updatedRecordings));
    
    setRecordedNotes([]);
    toast("Recording saved successfully!");
  };

  const deleteRecording = (id: number) => {
    const updatedRecordings = recordings.filter(recording => recording.id !== id);
    setRecordings(updatedRecordings);
    localStorage.setItem('nadhaswaramRecordings', JSON.stringify(updatedRecordings));
    toast("Recording deleted");
  };

  const playRecording = (notes: string[]) => {
    if (isPlaying) return;
    setIsPlaying(true);
    
    // Trigger custom event for each note with delay
    const playNotes = async () => {
      for (let i = 0; i < notes.length; i++) {
        if (timeoutRef.current) {
          clearTimeout(timeoutRef.current);
        }
        
        timeoutRef.current = setTimeout(() => {
          // Dispatch a custom event that will be caught by the keyboard component
          const event = new CustomEvent('playNoteEvent', { detail: { note: notes[i] } });
          document.dispatchEvent(event);
          
          if (i === notes.length - 1) {
            setIsPlaying(false);
          }
        }, i * 500); // 500ms delay between notes
      }
    };
    
    playNotes();
  };

  useEffect(() => {
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, []);

  return (
    <div className="bg-white rounded-lg p-4 shadow-md">
      <h2 className="text-xl font-semibold mb-4 text-nadhaswaram-primary">Melody Recorder</h2>
      
      <div className="flex flex-wrap gap-2 mb-4">
        {!isRecording ? (
          <Button 
            onClick={startRecording} 
            className="bg-nadhaswaram-accent hover:bg-nadhaswaram-primary"
          >
            <Mic className="mr-2 h-4 w-4" /> Start Recording
          </Button>
        ) : (
          <Button 
            onClick={stopRecording} 
            variant="destructive"
            className={`recording`}
          >
            <StopCircle className="mr-2 h-4 w-4" /> Stop Recording
          </Button>
        )}
        
        {!isRecording && recordedNotes.length > 0 && (
          <>
            <Button onClick={saveRecording} variant="outline">
              <Save className="mr-2 h-4 w-4" /> Save Recording
            </Button>
            <input
              type="text"
              value={recordingName}
              onChange={(e) => setRecordingName(e.target.value)}
              placeholder="Recording name"
              className="px-2 py-1 border rounded"
            />
          </>
        )}
      </div>
      
      {isRecording && (
        <div className="mb-4">
          <Badge variant="outline" className="bg-red-50">Recording in progress...</Badge>
          <div className="mt-2 flex flex-wrap gap-1">
            {recordedNotes.map((note, idx) => (
              <Badge key={idx} className="bg-nadhaswaram-secondary text-black">
                {note}
              </Badge>
            ))}
          </div>
        </div>
      )}
      
      {recordings.length > 0 && (
        <>
          <h3 className="font-medium mb-2">Saved Recordings</h3>
          <div className="space-y-2">
            {recordings.map((recording) => (
              <div key={recording.id} className="border rounded p-2 flex justify-between items-center">
                <div>
                  <div className="font-medium">{recording.name}</div>
                  <div className="text-xs text-gray-500">
                    {new Date(recording.timestamp).toLocaleString()} • {recording.notes.length} notes
                  </div>
                </div>
                <div className="flex space-x-2">
                  <Button 
                    size="sm" 
                    variant="outline"
                    onClick={() => playRecording(recording.notes)}
                    disabled={isPlaying}
                  >
                    <Play className="h-4 w-4" />
                  </Button>
                  <Button 
                    size="sm" 
                    variant="outline" 
                    onClick={() => deleteRecording(recording.id)}
                  >
                    <Trash className="h-4 w-4 text-red-500" />
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
};

export default Recorder;
