'use client';

import type { Connection } from '@/lib/data';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { ArrowRight, Sparkles } from 'lucide-react';
import { getTopicBySlug } from '@/lib/data';
import { useUser } from '@/hooks/use-user';

interface DailyConnectionProps {
    connection: Connection;
}

export function DailyConnection({ connection }: DailyConnectionProps) {
    const { currentUser } = useUser();

    // Find the topic this connection belongs to
    const topic = currentUser?.topics?.find(t => t.connections.some(c => c.id === connection.id));

    return (
        <section className="mb-12">
             <h2 className="text-3xl font-bold font-headline mb-4 text-center">Conexión del Día</h2>
            <Card className="bg-primary/5 border-primary/20 hover:shadow-lg transition-shadow">
                <CardHeader>
                    <div className="flex justify-between items-start">
                         <div>
                            <p className="text-sm text-muted-foreground">{connection.spanish}</p>
                            <CardTitle className="text-4xl font-headline text-primary">{connection.english}</CardTitle>
                        </div>
                        <div className="flex items-center gap-2 text-amber-500">
                           <Sparkles className="h-5 w-5"/>
                           <span className="font-semibold text-sm">¡Nuevo!</span>
                        </div>
                    </div>
                </CardHeader>
                <CardContent>
                    <p className="text-lg text-foreground/90 italic mb-6">"{connection.mnemonic}"</p>
                    {topic && (
                         <div className="text-right">
                             <Button asChild>
                                <Link href={`/connections/${topic.slug}/${connection.slug}`}>
                                    Aprender más <ArrowRight className="ml-2 h-4 w-4" />
                                </Link>
                            </Button>
                         </div>
                    )}
                </CardContent>
            </Card>
        </section>
    )
}
