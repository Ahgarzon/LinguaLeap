'use client';

import { useState, useEffect } from 'react';
import { Button } from './ui/button';
import { Volume2, Loader2 } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface PronunciationPlayerProps {
  englishWord: string;
  mnemonic: string;
}

export function PronunciationPlayer({ englishWord, mnemonic }: PronunciationPlayerProps) {
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
    
    // Create utterance for the English word
    const utteranceEnglish = new SpeechSynthesisUtterance(englishWord);
    const voices = window.speechSynthesis.getVoices();
    const englishVoice = voices.find(voice => voice.lang.startsWith('en-'));
    if (englishVoice) {
      utteranceEnglish.voice = englishVoice;
    }

    // Create utterance for the mnemonic in Spanish
    const utteranceMnemonic = new SpeechSynthesisUtterance(mnemonic);
    const spanishVoice = voices.find(voice => voice.lang.startsWith('es-'));
     if (spanishVoice) {
      utteranceMnemonic.voice = spanishVoice;
    }

    utteranceEnglish.onend = () => {
      // Play mnemonic after the English word is spoken
      window.speechSynthesis.speak(utteranceMnemonic);
    };
    
    utteranceMnemonic.onend = () => {
      setIsSpeaking(false);
    };

    utteranceMnemonic.onerror = utteranceEnglish.onerror = (event) => {
      console.error('SpeechSynthesis Error: ', event.error);
      toast({
        variant: 'destructive',
        title: 'Playback Error',
        description: 'Could not play the pronunciation.',
      });
      setIsSpeaking(false);
    };
    
    // Start speaking the English word
    window.speechSynthesis.speak(utteranceEnglish);
  };

  return (
    <Button onClick={handlePlay} disabled={isSpeaking} variant="outline" size="icon">
      {isSpeaking ? <Loader2 className="h-5 w-5 animate-spin" /> : <Volume2 className="h-5 w-5" />}
      <span className="sr-only">Listen to pronunciation and mnemonic</span>
    </Button>
  );
}
