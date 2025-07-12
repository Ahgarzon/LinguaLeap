'use client';

import Link from 'next/link';
import { getTopicBySlug } from '@/lib/data';
import { notFound, useParams } from 'next/navigation';
import { Card, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import { useUser } from '@/hooks/use-user';

export default function TopicPage() {
  const params = useParams<{ topic: string }>();
  const { currentUser } = useUser();
  
  // Pass the user's topics to the data fetching function
  const topic = getTopicBySlug(params.topic, currentUser?.topics);

  if (!topic) {
    notFound();
  }

  return (
    <div className="container mx-auto py-8 px-4 md:px-6">
      <div className="mb-8">
        <Button variant="ghost" asChild>
          <Link href="/">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Topics
          </Link>
        </Button>
      </div>
      <h1 className="text-4xl font-bold font-headline mb-2 text-center">{topic.name}</h1>
      <p className="text-lg text-muted-foreground text-center mb-10">{topic.description}</p>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {topic.connections.map((conn) => (
          <Link key={conn.slug} href={`/connections/${topic.slug}/${conn.slug}`} className="group">
            <Card className="h-full hover:border-primary transition-colors duration-300">
              <CardHeader>
                <CardTitle className="flex justify-between items-center text-xl font-headline">
                  <span>{conn.spanish} &rarr; {conn.english}</span>
                  <ArrowRight className="h-5 w-5 text-muted-foreground group-hover:text-primary transition-colors duration-300" />
                </CardTitle>
                <CardDescription className="pt-2 italic">"{conn.mnemonic}"</CardDescription>
              </CardHeader>
            </Card>
          </Link>
        ))}
      </div>
    </div>
  );
}
