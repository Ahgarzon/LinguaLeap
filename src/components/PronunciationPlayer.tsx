'use client';

import { useState, useTransition, useRef } from 'react';
import { Button } from './ui/button';
import { Volume2, Loader2 } from 'lucide-react';
import { getPronunciation } from '@/app/actions';
import { useToast } from '@/hooks/use-toast';

interface PronunciationPlayerProps {
  englishWord: string;
  spanishWord: string;
  mnemonic: string;
}

export function PronunciationPlayer({ englishWord, spanishWord, mnemonic }: PronunciationPlayerProps) {
  const [isPending, startTransition] = useTransition();
  const { toast } = useToast();
  const audioRef = useRef<HTMLAudioElement | null>(null);

  const handlePlay = () => {
    startTransition(async () => {
      const textToSpeak = `In English: ${englishWord}. In Spanish: ${spanishWord}. Remember this connection: ${mnemonic}`;
      const result = await getPronunciation(textToSpeak);

      if (result.success && result.audioDataUri) {
        if (audioRef.current) {
          audioRef.current.src = result.audioDataUri;
          audioRef.current.play().catch(e => console.error("Audio playback failed:", e));
        }
      } else {
        toast({
          variant: 'destructive',
          title: 'Error',
          description: result.error,
        });
      }
    });
  };

  return (
    <>
      <Button onClick={handlePlay} disabled={isPending} variant="outline" size="icon">
        {isPending ? <Loader2 className="h-5 w-5 animate-spin" /> : <Volume2 className="h-5 w-5" />}
        <span className="sr-only">Listen to pronunciation</span>
      </Button>
      <audio ref={audioRef} className="hidden" />
    </>
  );
}
