'use client';

import { useState, useEffect, useRef, useCallback } from 'react';
import { useUser } from '@/hooks/use-user';
import { getAllConnections, Connection } from '@/lib/data';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { WelcomeWizard } from '@/components/WelcomeWizard';
import { RefreshCw, Video, VideoOff, Volume2 } from 'lucide-react';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { useToast } from '@/hooks/use-toast';
import { PronunciationPlayer } from '@/components/PronunciationPlayer';

const shuffleArray = (array: any[]) => {
  const newArray = [...array];
  for (let i = newArray.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [newArray[i], newArray[j]] = [newArray[j], newArray[i]];
  }
  return newArray;
};

export default function OralPracticePage() {
  const { currentUser } = useUser();
  const [connections, setConnections] = useState<Connection[]>([]);
  const [currentConnection, setCurrentConnection] = useState<Connection | null>(null);
  const [hasCameraPermission, setHasCameraPermission] = useState<boolean | null>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const { toast } = useToast();

  useEffect(() => {
    if (currentUser?.topics) {
      const allConns = getAllConnections(currentUser.topics);
      setConnections(shuffleArray(allConns));
    }
  }, [currentUser]);

  useEffect(() => {
    if (connections.length > 0) {
      setCurrentConnection(connections[0]);
    }
  }, [connections]);

  const getCameraPermission = useCallback(async () => {
    if (typeof window === 'undefined' || !navigator.mediaDevices) {
      setHasCameraPermission(false);
      return;
    }
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: true });
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
      }
      setHasCameraPermission(true);
    } catch (error) {
      console.error('Error accessing camera:', error);
      setHasCameraPermission(false);
      toast({
        variant: 'destructive',
        title: 'Acceso a la cámara denegado',
        description: 'Por favor, habilita los permisos de la cámara en tu navegador para usar esta función.',
      });
    }
  }, [toast]);
  
  useEffect(() => {
    getCameraPermission();
    return () => {
        // Stop camera stream when component unmounts
        if (videoRef.current && videoRef.current.srcObject) {
            const stream = videoRef.current.srcObject as MediaStream;
            stream.getTracks().forEach(track => track.stop());
        }
    }
  }, [getCameraPermission]);

  const handleNext = () => {
    if (connections.length > 0) {
        const currentIndex = connections.findIndex(c => c.id === currentConnection?.id);
        const nextIndex = (currentIndex + 1) % connections.length;
        setCurrentConnection(connections[nextIndex]);
    }
  };

  if (!currentUser) {
    return <WelcomeWizard />;
  }

  if (connections.length === 0) {
    return (
      <div className="container mx-auto max-w-2xl py-8 px-4 md:px-6 text-center">
        <h1 className="text-4xl font-bold font-headline mb-4">Práctica Oral</h1>
        <Card>
          <CardContent className="p-6">
            <p className="text-muted-foreground">Necesitas al menos una conexión en tus temas para practicar. ¡Prueba a añadir más con el asistente!</p>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="container mx-auto max-w-4xl py-8 px-4 md:px-6">
      <div className="text-center mb-8">
        <h1 className="text-4xl font-bold font-headline">Práctica Oral</h1>
        <p className="text-lg text-muted-foreground">Grábate diciendo la conexión mnemotécnica para reforzar tu memoria.</p>
      </div>

      <div className="grid md:grid-cols-2 gap-8">
        <div className="space-y-4">
            <Card>
                <CardHeader>
                    <CardTitle className="flex justify-between items-start">
                        <div>
                            <p className="text-sm text-muted-foreground">{currentConnection?.spanish}</p>
                            <h2 className="text-4xl font-headline text-primary">{currentConnection?.english}</h2>
                        </div>
                        {currentConnection && (
                            <PronunciationPlayer 
                                englishWord={currentConnection.english}
                                spanishWord={currentConnection.spanish}
                                mnemonic={currentConnection.mnemonic}
                            />
                        )}
                    </CardTitle>
                </CardHeader>
                <CardContent>
                     <CardDescription className="text-xl text-foreground/90 italic text-center p-4 bg-muted rounded-lg">
                        "{currentConnection?.mnemonic}"
                    </CardDescription>
                </CardContent>
            </Card>
            <Button onClick={handleNext} className="w-full">
                <RefreshCw className="mr-2 h-4 w-4" />
                Siguiente Conexión
            </Button>
        </div>
        
        <div>
           <div className="relative aspect-video bg-muted rounded-lg overflow-hidden border">
                <video ref={videoRef} className="w-full h-full object-cover" autoPlay muted playsInline />
                {hasCameraPermission === false && (
                    <div className="absolute inset-0 flex flex-col items-center justify-center bg-black/50 text-white p-4">
                        <VideoOff className="h-12 w-12 mb-4" />
                        <h3 className="text-lg font-semibold">Cámara no disponible</h3>
                        <p className="text-center text-sm">Por favor, permite el acceso a la cámara para continuar.</p>
                        <Button onClick={getCameraPermission} variant="secondary" className="mt-4">
                            Intentar de nuevo
                        </Button>
                    </div>
                )}
           </div>
        </div>
      </div>
    </div>
  );
}
