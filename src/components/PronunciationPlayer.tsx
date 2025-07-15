'use client';

import { useState, useEffect } from 'react';
import { Button } from './ui/button';
import { Volume2, Loader2 } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface PronunciationPlayerProps {
  englishWord: string;
  // We no longer need spanishWord and mnemonic for TTS
}

export function PronunciationPlayer({ englishWord }: PronunciationPlayerProps) {
  const [isSpeaking, setIsSpeaking] = useState(false);
  const { toast } = useToast();

  // Pre-load voices on component mount
  useEffect(() => {
    if (typeof window !== 'undefined' && window.speechSynthesis) {
      window.speechSynthesis.getVoices();
    }
  }, []);

  const handlePlay = () => {
    if (typeof window === 'undefined' || !window.speechSynthesis) {
      toast({
        variant: 'destructive',
        title: 'Error',
        description: 'Your browser does not support speech synthesis.',
      });
      return;
    }

    if (isSpeaking) {
      window.speechSynthesis.cancel();
      setIsSpeaking(false);
      return;
    }

    setIsSpeaking(true);
    const utterance = new SpeechSynthesisUtterance(englishWord);
    
    // Find an English voice for better pronunciation
    const voices = window.speechSynthesis.getVoices();
    const englishVoice = voices.find(voice => voice.lang.startsWith('en-'));
    if (englishVoice) {
        utterance.voice = englishVoice;
    }
    
    utterance.onend = () => {
      setIsSpeaking(false);
    };
    utterance.onerror = (event) => {
      console.error('SpeechSynthesis Error: ', event.error);
      toast({
        variant: 'destructive',
        title: 'Playback Error',
        description: 'Could not play the pronunciation.',
      });
      setIsSpeaking(false);
    };
    
    window.speechSynthesis.speak(utterance);
  };

  return (
    <Button onClick={handlePlay} disabled={isSpeaking} variant="outline" size="icon">
      {isSpeaking ? <Loader2 className="h-5 w-5 animate-spin" /> : <Volume2 className="h-5 w-5" />}
      <span className="sr-only">Listen to pronunciation</span>
    </Button>
  );
}
