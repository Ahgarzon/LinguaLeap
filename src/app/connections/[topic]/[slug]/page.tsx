'use client';

import { getConnectionBySlug } from '@/lib/data';
import { notFound, useParams } from 'next/navigation';
import Link from 'next/link';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ArrowLeft, Lightbulb, Ear } from 'lucide-react';
import { Separator } from '@/components/ui/separator';
import { GenerateExample } from '@/components/GenerateExample';
import { PronunciationPlayer } from '@/components/PronunciationPlayer';
import { useUser } from '@/hooks/use-user';

export default function ConnectionPage() {
  const params = useParams<{ topic: string; slug: string }>();
  const { currentUser } = useUser();
  
  // Pass the user's topics to the data fetching function
  const connectionData = getConnectionBySlug(params.topic, params.slug, currentUser?.topics);

  if (!connectionData) {
    notFound();
  }

  const { topicName, ...connection } = connectionData;

  return (
    <div className="container mx-auto max-w-3xl py-8 px-4 md:px-6">
      <div className="mb-8">
        <Button variant="ghost" asChild>
          <Link href={`/connections/${params.topic}`}>
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to {topicName}
          </Link>
        </Button>
      </div>

      <Card className="overflow-hidden">
        <CardHeader className="bg-muted/30">
          <div className="flex justify-between items-start">
            <div>
              <p className="text-sm text-muted-foreground">{connection.spanish}</p>
              <CardTitle className="text-4xl font-headline text-primary">{connection.english}</CardTitle>
            </div>
            <PronunciationPlayer
              englishWord={connection.english}
            />
          </div>
        </CardHeader>
        <CardContent className="p-6">
          <div className="mb-6">
            <h3 className="flex items-center text-lg font-semibold mb-2 text-foreground/80">
              <Lightbulb className="mr-2 h-5 w-5 text-accent" />
              Mnemonic Connection
            </h3>
            <p className="text-lg text-foreground/90 italic">"{connection.mnemonic}"</p>
          </div>
          
          <Separator className="my-6" />

          {connection.phonetic_spelling && (
            <>
              <div>
                <h3 className="flex items-center text-lg font-semibold mb-2 text-foreground/80">
                  <Ear className="mr-2 h-5 w-5 text-accent" />
                  Pronunciación Figurada
                </h3>
                <p className="text-lg text-foreground/90 font-mono bg-muted px-3 py-2 rounded-md">
                  {connection.phonetic_spelling}
                </p>
              </div>
              <Separator className="my-6" />
            </>
          )}

          <div>
            <h3 className="text-lg font-semibold mb-2">Explanation</h3>
            <p className="text-foreground/80 leading-relaxed">{connection.explanation}</p>
          </div>
          
          <Separator className="my-6" />

          <GenerateExample connection={connection} />
        </CardContent>
      </Card>
    </div>
  );
}
