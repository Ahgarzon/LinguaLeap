
'use client';

import Link from 'next/link';
import { Utensils, Home as HomeIcon, Plane, Briefcase, Laptop, ArrowRight, BrainCircuit, School, Building, Shield, Menu } from 'lucide-react';
import { Connection } from '@/lib/data';
import { Card, CardHeader, CardTitle, CardDescription, CardFooter } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { useUser, type UserLevel } from '@/hooks/use-user';
import { WelcomeWizard } from '@/components/WelcomeWizard';
import { DailyConnection } from '@/components/DailyConnection';
import { useState, useEffect } from 'react';
import { getAllConnections } from '@/lib/data';

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
  militar: Shield,
};

const levelMapping: Record<UserLevel, string> = {
    'beginner': 'Principiante',
    'lower-intermediate': 'Intermedio-Bajo',
    'upper-intermediate': 'Intermedio-Alto',
    'advanced': 'Avanzado',
}


export default function Home() {
  const { currentUser } = useUser();
  const [dailyConnection, setDailyConnection] = useState<Connection | null>(null);

  useEffect(() => {
    if (currentUser?.topics) {
      const allConns = getAllConnections(currentUser.topics);
      if (allConns.length > 0) {
        const dayOfYear = Math.floor((Date.now() - new Date(new Date().getFullYear(), 0, 0).getTime()) / (1000 * 60 * 60 * 24));
        const index = dayOfYear % allConns.length;
        setDailyConnection(allConns[index]);
      }
    }
  }, [currentUser?.topics]);

  if (!currentUser || !currentUser.level) {
    return <WelcomeWizard />;
  }
  
  const topicsForLevel = currentUser.topics?.map(topic => {
    const filteredConnections = topic.connections.filter(conn => conn.level === currentUser.level || !conn.level);
    if (filteredConnections.length === 0) return null;
    return { ...topic, connections: filteredConnections };
  }).filter(Boolean) || [];

  return (
    <div className="container mx-auto py-8 px-4 md:px-6">
      <section className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold font-headline text-primary mb-2">¡Hola, {currentUser.name}!</h1>
          <p className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto">
            Tienes <Badge variant="secondary">{topicsForLevel.reduce((acc, t) => acc + (t?.connections.length || 0), 0)}</Badge> conexiones para tu nivel de <strong>{levelMapping[currentUser.level]}</strong>.
          </p>
      </section>

      {dailyConnection && <DailyConnection connection={dailyConnection} />}

      <section>
          <h2 className="text-3xl font-bold font-headline mb-8 text-center mt-12">Temas Disponibles</h2>
          {topicsForLevel.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {topicsForLevel.map((topic, index) => {
                if (!topic) return null;
                const Icon = topicIcons[topic.slug] || BrainCircuit;
                return (
                    <Card key={`${topic.slug}-${index}`} className="flex flex-col hover:shadow-lg transition-shadow duration-300 bg-card">
                    <CardHeader>
                        <div className="flex items-center gap-4 mb-2">
                        <Icon className="w-8 h-8 text-primary" />
                        <CardTitle className="text-2xl font-headline">{topic.name}</CardTitle>
                        </div>
                        <CardDescription>{topic.description}</CardDescription>
                    </CardHeader>
                    <CardFooter className="flex justify-between items-center mt-auto pt-4">
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
            <div className="text-center text-muted-foreground mt-8">
              <p className="mb-2">Aún no tienes temas de estudio.</p>
              <Button asChild variant="link">
                <Link href="/assistant">¡Pídele a tu asistente que cree un plan de aprendizaje para ti!</Link>
              </Button>
            </div>
           )}
      </section>
    </div>
  );
}
