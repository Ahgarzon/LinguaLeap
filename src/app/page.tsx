import Link from 'next/link';
import { Utensils, Home as HomeIcon, Plane, Briefcase, Laptop, ArrowRight } from 'lucide-react';
import { topicsData } from '@/lib/data';
import { Card, CardHeader, CardTitle, CardDescription, CardFooter } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';

const topicIcons: { [key: string]: React.ElementType } = {
  trabajo: Briefcase,
  viajes: Plane,
  tecnologia: Laptop,
  comida: Utensils,
  casa: HomeIcon,
};

export default function Home() {
  return (
    <div className="container mx-auto py-8 px-4 md:px-6">
      <section className="text-center mb-12">
        <h1 className="text-4xl md:text-5xl font-bold font-headline text-primary mb-2">¡Bienvenido a LinguaLeap!</h1>
        <p className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto">
          Desbloquea la fluidez en inglés con divertidas e inolvidables conexiones mnemotécnicas español-inglés.
        </p>
      </section>

      <section>
        <h2 className="text-3xl font-bold font-headline mb-8 text-center">Elige un Tema para Empezar</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {topicsData.map((topic) => {
            const Icon = topicIcons[topic.slug] || HomeIcon;
            return (
              <Card key={topic.slug} className="flex flex-col hover:shadow-lg transition-shadow duration-300 bg-card">
                <CardHeader>
                  <div className="flex items-center gap-4 mb-2">
                    <Icon className="w-8 h-8 text-primary" />
                    <CardTitle className="text-2xl font-headline">{topic.name}</CardTitle>
                  </div>
                  <CardDescription>{topic.description}</CardDescription>
                </CardHeader>
                <div className="flex-grow"></div>
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
      </section>
    </div>
  );
}
