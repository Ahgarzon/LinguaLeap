'use client';

import { getAllConnections } from '@/lib/data';
import { Quiz } from '@/components/Quiz';
import { Card, CardContent } from '@/components/ui/card';
import { useUser } from '@/hooks/use-user';
import { WelcomeWizard } from '@/components/WelcomeWizard';

export default function PracticePage() {
  const { currentUser } = useUser();

  if (!currentUser) {
    return <WelcomeWizard />;
  }
  
  const connections = getAllConnections(currentUser.topics);
  
  return (
    <div className="container mx-auto max-w-2xl py-8 px-4 md:px-6">
      <div className="text-center mb-8">
        <h1 className="text-4xl font-bold font-headline">Practice Zone</h1>
        <p className="text-lg text-muted-foreground">Test your knowledge of the mnemonic connections.</p>
      </div>
      {connections.length < 4 ? (
        <Card>
            <CardContent className="p-6 text-center">
                <p className="text-muted-foreground">You need at least 4 connections in your topics to practice. Try adding more with the assistant!</p>
            </CardContent>
        </Card>
      ) : (
        <Quiz allConnections={connections} />
      )}
    </div>
  );
}
