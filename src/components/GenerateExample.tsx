'use client';

import { useState, useTransition } from 'react';
import type { Connection } from '@/lib/data';
import { getAIExample } from '@/app/actions';
import { Button } from '@/components/ui/button';
import { Sparkles, Loader2 } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { Alert, AlertDescription } from '@/components/ui/alert';

interface GenerateExampleProps {
  connection: Connection;
}

export function GenerateExample({ connection }: GenerateExampleProps) {
  const [example, setExample] = useState(connection.example);
  const [isPending, startTransition] = useTransition();
  const { toast } = useToast();

  const handleGenerate = () => {
    startTransition(async () => {
      const result = await getAIExample(connection);
      if (result.success && result.example) {
        setExample(result.example);
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
    <div>
      <h3 className="text-lg font-semibold mb-2">Example Sentence</h3>
      <Alert className="bg-primary/10 border-primary/20">
        <AlertDescription className="text-lg text-primary italic">
          "{example}"
        </AlertDescription>
      </Alert>
      <div className="mt-4 flex justify-end">
        <Button onClick={handleGenerate} disabled={isPending}>
          {isPending ? (
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
          ) : (
            <Sparkles className="mr-2 h-4 w-4 text-accent" />
          )}
          {isPending ? 'Generating...' : 'Generate Another'}
        </Button>
      </div>
    </div>
  );
}
