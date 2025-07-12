'use client';

import Link from 'next/link';
import { Utensils, Home as HomeIcon, Plane, Briefcase, Laptop, ArrowRight, BrainCircuit, School, Building, MessageCircle, Loader2, Send, Bot, User, Sparkles } from 'lucide-react';
import { topicsData, type Topic, getTopicBySlug } from '@/lib/data';
import { Card, CardHeader, CardTitle, CardDescription, CardFooter } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { useUser } from '@/hooks/use-user';
import { WelcomeWizard } from '@/components/WelcomeWizard';
import { FormEvent, useState, useTransition } from 'react';
import { Input } from '@/components/ui/input';
import { getTopicSuggestions } from './actions';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import type { ProposeTopicsOutput } from '@/ai/flows/propose-topics';

const topicIcons: { [key: string]: React.ElementType } = {
  viajes: Plane,
  trabajo: Briefcase,
  tecnologia: Laptop,
  comida: Utensils,
  casa: HomeIcon,
  negocios: Building,
  academia: School,
  'conceptos-abstractos': BrainCircuit,
  'entrevista-trabajo': Briefcase,
  'desarrollo-software': Laptop,
};

export default function Home() {
  const { currentUser } = useUser();
  const [goal, setGoal] = useState('');
  const [isPending, startTransition] = useTransition();
  const [suggestions, setSuggestions] = useState<ProposeTopicsOutput | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    setError(null);
    setSuggestions(null);
    startTransition(async () => {
      const result = await getTopicSuggestions(goal);
      if(result.success && result.data) {
        setSuggestions(result.data);
      } else {
        setError(result.error || 'An unknown error occurred.');
      }
    });
  };

  if (!currentUser || !currentUser.level) {
    return <WelcomeWizard />;
  }

  const suggestedTopics = suggestions?.topics.map(suggestion => {
    const topic = getTopicBySlug(suggestion.slug);
    if (!topic) return null;

    const filteredConnections = topic.connections.filter(conn => conn.level === currentUser.level);
    if (filteredConnections.length === 0) return null; // Don't show topic if no words for user's level

    return { ...topic, connections: filteredConnections, reason: suggestion.reason };
  }).filter((t): t is Topic & { reason: string; } => t !== null);

  return (
    <div className="container mx-auto max-w-4xl py-8 px-4 md:px-6">
      <section className="mb-10">
        <Card className="bg-muted/30">
          <CardHeader>
            <div className="flex items-center gap-4">
              <Bot className="w-8 h-8 text-primary" />
              <div>
                <CardTitle className="text-2xl font-headline">Tu Asistente de Aprendizaje</CardTitle>
                <CardDescription>Hola, {currentUser.name}. Dime, ¿qué te gustaría aprender hoy?</CardDescription>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="flex items-center gap-2">
              <Input
                value={goal}
                onChange={(e) => setGoal(e.target.value)}
                placeholder="Ej: Tengo una entrevista de trabajo en inglés..."
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
            <p className="text-muted-foreground">Buscando los mejores temas para ti...</p>
         </div>
      )}

      {suggestions && (
        <section>
           <Alert className="mb-8 border-primary/30 bg-primary/10">
            <Sparkles className="h-4 w-4 text-primary" />
            <AlertTitle className="text-primary font-bold">Sugerencia del Asistente</AlertTitle>
            <AlertDescription className="text-primary-foreground/90">
                {suggestions.response}
            </AlertDescription>
          </Alert>

          <h2 className="text-3xl font-bold font-headline mb-8 text-center">Temas Recomendados</h2>

          {suggestedTopics && suggestedTopics.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {suggestedTopics.map((topic) => {
                const Icon = topicIcons[topic.slug] || HomeIcon;
                return (
                  <Card key={topic.slug} className="flex flex-col hover:shadow-lg transition-shadow duration-300 bg-card">
                    <CardHeader>
                      <div className="flex items-center gap-4 mb-2">
                        <Icon className="w-8 h-8 text-primary" />
                        <CardTitle className="text-2xl font-headline">{topic.name}</CardTitle>
                      </div>
                      <CardDescription className='italic'>"{topic.reason}"</CardDescription>
                    </CardHeader>
                    <div className="flex-grow p-6 pt-0">
                      <p className="text-sm text-muted-foreground">{topic.description}</p>
                    </div>
                    <CardFooter className="flex justify-between items-center pt-4">
                      <Badge variant="secondary">{topic.connections.length} Conexiones</Badge>
                      <Button asChild>
                        <Link href={`/connections/${topic.slug}`}>
                          Explorar <ArrowRight className="ml-2 h-4 w-4" />
                        </Link>
                      </Button>
                    </CardFooter>
                  </Card>
                );
              })}
            </div>
          ) : (
            <Card>
                <CardContent className="p-6 text-center">
                    <p className="text-muted-foreground">No encontré temas con palabras de tu nivel ({currentUser.level}) para esta meta. ¡Intenta con otra!</p>
                </CardContent>
            </Card>
          )}

          <div className="text-center mt-8">
            <Button variant="outline" onClick={() => setSuggestions(null)}>
                <MessageCircle className="mr-2"/>
                Empezar una nueva conversación
            </Button>
          </div>
        </section>
      )}
    </div>
  );
}
