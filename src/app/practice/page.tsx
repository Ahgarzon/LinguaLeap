import { getAllConnections } from '@/lib/data';
import { Quiz } from '@/components/Quiz';
import { Card, CardContent } from '@/components/ui/card';

export default function PracticePage() {
  const connections = getAllConnections();
  
  return (
    <div className="container mx-auto max-w-2xl py-8 px-4 md:px-6">
      <div className="text-center mb-8">
        <h1 className="text-4xl font-bold font-headline">Practice Zone</h1>
        <p className="text-lg text-muted-foreground">Test your knowledge of the mnemonic connections.</p>
      </div>
      {connections.length < 4 ? (
        <Card>
            <CardContent className="p-6 text-center">
                <p className="text-muted-foreground">More connections need to be added to the library before you can practice. Please check back later!</p>
            </CardContent>
        </Card>
      ) : (
        <Quiz allConnections={connections} />
      )}
    </div>
  );
}
