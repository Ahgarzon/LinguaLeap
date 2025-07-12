'use client';

import { Bot, Loader2, Send, Sparkles, Lightbulb, Volume2 } from 'lucide-react';
import { Card, CardHeader, CardTitle, CardDescription, CardFooter, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useUser } from '@/hooks/use-user';
import { WelcomeWizard } from '@/components/WelcomeWizard';
import { FormEvent, useState, useTransition, useRef } from 'react';
import { Input } from '@/components/ui/input';
import { getLearningPlan, getPronunciation } from '@/app/actions';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import type { GenerateLearningPlanOutput } from '@/ai/flows/generate-learning-plan';
import { Separator } from '@/components/ui/separator';
import { useToast } from '@/hooks/use-toast';

export default function AssistantPage() {
  const { currentUser } = useUser();
  const [goal, setGoal] = useState('');
  const [isPending, startTransition] = useTransition();
  const [plan, setPlan] = useState<GenerateLearningPlanOutput | null>(null);
  const [error, setError] = useState<string | null>(null);
  const { toast } = useToast();

  // Pronunciation state
  const [audioStates, setAudioStates] = useState<{ [key: string]: 'idle' | 'loading' | 'playing' }>({});
  const audioRef = useRef<HTMLAudioElement | null>(null);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!currentUser?.level) {
        setError("Please complete your profile by selecting a level first.");
        return;
    }
    setError(null);
    setPlan(null);
    startTransition(async () => {
      const result = await getLearningPlan(goal, currentUser.level!);
      if(result.success && result.data) {
        setPlan(result.data);
      } else {
        setError(result.error || 'An unknown error occurred.');
      }
    });
  };

  const handlePlayPronunciation = async (wordKey: string, textToSpeak: string) => {
    setAudioStates(prev => ({ ...prev, [wordKey]: 'loading' }));
    
    const result = await getPronunciation(textToSpeak);
    if (result.success && result.audioDataUri) {
      if (audioRef.current) {
        audioRef.current.src = result.audioDataUri;
        audioRef.current.play().catch(e => console.error("Audio playback failed:", e));
        setAudioStates(prev => ({ ...prev, [wordKey]: 'playing' }));
        audioRef.current.onended = () => {
             setAudioStates(prev => ({ ...prev, [wordKey]: 'idle' }));
        }
      }
    } else {
        toast({ variant: 'destructive', title: 'Error', description: result.error });
        setAudioStates(prev => ({ ...prev, [wordKey]: 'idle' }));
    }
  };


  if (!currentUser || !currentUser.level) {
    return <WelcomeWizard />;
  }

  return (
    <div className="container mx-auto max-w-4xl py-8 px-4 md:px-6">
      <audio ref={audioRef} className="hidden" />
      <section className="mb-10">
        <Card className="bg-muted/30">
          <CardHeader>
            <div className="flex items-center gap-4">
              <Bot className="w-8 h-8 text-primary" />
              <div>
                <CardTitle className="text-2xl font-headline">Tu Asistente de Aprendizaje</CardTitle>
                <CardDescription>Hola, {currentUser.name}. Tu nivel es {currentUser.level}. Dime, ¿qué te gustaría aprender hoy para alcanzar tus metas?</CardDescription>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="flex items-center gap-2">
              <Input
                value={goal}
                onChange={(e) => setGoal(e.target.value)}
                placeholder="Ej: Tengo una entrevista de trabajo para ingeniero de software..."
                className="bg-background"
                disabled={isPending}
              />
              <Button type="submit" disabled={isPending}>
                {isPending ? <Loader2 className="animate-spin" /> : <Send />}
                <span className="sr-only">Enviar</span>
              </Button>
            </form>
             {error && (
              <Alert variant="destructive" className="mt-4">
                <AlertDescription>{error}</AlertDescription>
              </Alert>
            )}
          </CardContent>
        </Card>
      </section>

      {isPending && (
         <div className="text-center">
            <Loader2 className="h-8 w-8 animate-spin text-primary mx-auto mb-4" />
            <p className="text-muted-foreground">Generando tu plan de aprendizaje personalizado...</p>
         </div>
      )}

      {plan && (
        <section>
           <Alert className="mb-8 border-primary/30 bg-primary/10">
            <Sparkles className="h-4 w-4 text-primary" />
            <AlertTitle className="text-primary font-bold">¡Aquí tienes tu plan!</AlertTitle>
            <AlertDescription className="text-primary/90">
                {plan.response}
            </AlertDescription>
          </Alert>

          <h2 className="text-3xl font-bold font-headline mb-8 text-center">Vocabulario Recomendado</h2>

            <div className="space-y-6">
              {plan.connections.map((conn, index) => {
                const wordKey = `${conn.english}-${index}`;
                const audioState = audioStates[wordKey] || 'idle';
                const textToSpeak = `In English: ${conn.english}. Remember this connection: ${conn.mnemonic}`;

                return (
                  <Card key={wordKey} className="overflow-hidden">
                    <CardHeader>
                      <div className="flex justify-between items-start">
                        <div>
                            <p className="text-sm text-muted-foreground">{conn.spanish}</p>
                            <CardTitle className="text-4xl font-headline text-primary">{conn.english}</CardTitle>
                        </div>
                         <Button onClick={() => handlePlayPronunciation(wordKey, textToSpeak)} disabled={audioState === 'loading'} variant="outline" size="icon">
                            {audioState === 'loading' ? <Loader2 className="h-5 w-5 animate-spin" /> : <Volume2 className="h-5 w-5" />}
                            <span className="sr-only">Listen</span>
                        </Button>
                      </div>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <div>
                            <h3 className="flex items-center text-lg font-semibold mb-2 text-foreground/80">
                                <Lightbulb className="mr-2 h-5 w-5 text-accent" />
                                Conexión Mnemotécnica
                            </h3>
                            <p className="text-lg text-foreground/90 italic">"{conn.mnemonic}"</p>
                        </div>
                        <Separator/>
                        <div>
                            <h3 className="text-lg font-semibold mb-2 text-foreground/80">Pronunciación Figurada</h3>
                             <p className="text-lg text-foreground/90 font-mono bg-muted px-3 py-2 rounded-md">
                                {conn.phonetic_spelling}
                            </p>
                        </div>
                         <Separator/>
                        <div>
                            <h3 className="text-lg font-semibold mb-2 text-foreground/80">Explicación</h3>
                            <p className="text-foreground/80 leading-relaxed">{conn.explanation}</p>
                        </div>
                         <Separator/>
                        <div>
                            <h3 className="text-lg font-semibold mb-2 text-foreground/80">Ejemplo</h3>
                            <p className="text-foreground/80 leading-relaxed italic">"{conn.example}"</p>
                        </div>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          
          <div className="text-center mt-8">
            <Button variant="outline" onClick={() => { setPlan(null); setGoal(''); }}>
                Empezar una nueva conversación
            </Button>
          </div>
        </section>
      )}
    </div>
  );
}
