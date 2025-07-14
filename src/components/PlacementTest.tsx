'use client';
import { useUser, type UserLevel } from '@/hooks/use-user';
import { Button } from '@/components/ui/button';
import { DialogHeader, DialogTitle, DialogDescription, DialogFooter } from '@/components/ui/dialog';
import { Card, CardContent } from '@/components/ui/card';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { useState } from 'react';

const levels: { value: UserLevel, label: string, description: string }[] = [
    { value: 'beginner', label: 'Principiante', description: 'Estoy empezando o sé muy pocas palabras.' },
    { value: 'lower-intermediate', label: 'Intermedio-Bajo', description: 'Puedo mantener conversaciones simples y entiendo lo básico.' },
    { value: 'upper-intermediate', label: 'Intermedio-Alto', description: 'Entiendo conversaciones complejas y puedo comunicarme con cierta fluidez.' },
    { value: 'advanced', label: 'Avanzado', description: 'Tengo fluidez y quiero perfeccionar mi vocabulario especializado.' },
];

export function PlacementTest({ onComplete }: { onComplete: () => void }) {
    const { currentUser, updateCurrentUser } = useUser();
    const [selectedLevel, setSelectedLevel] = useState<UserLevel | null>(currentUser?.level || null);

    const handleSelectLevel = () => {
        if (selectedLevel) {
            updateCurrentUser({ level: selectedLevel });
            onComplete();
        }
    };

    return (
        <>
            <DialogHeader>
                <DialogTitle>Prueba de Nivel</DialogTitle>
                <DialogDescription>
                    Selecciona tu nivel actual para personalizar tu experiencia de aprendizaje.
                </DialogDescription>
            </DialogHeader>
            <div className="py-4">
                <RadioGroup onValueChange={(value: UserLevel) => setSelectedLevel(value)} value={selectedLevel || undefined}>
                    <div className="space-y-4">
                    {levels.map((level) => (
                        <Label key={level.value} htmlFor={level.value}>
                            <Card className="hover:bg-muted has-[input:checked]:border-primary has-[input:checked]:bg-primary/10">
                                <CardContent className="p-4 flex items-center gap-4">
                                    <RadioGroupItem value={level.value} id={level.value} />
                                    <div className="grid gap-1.5">
                                        <div className="font-semibold">{level.label}</div>
                                        <p className="text-sm text-muted-foreground">{level.description}</p>
                                    </div>
                                </CardContent>
                            </Card>
                        </Label>
                    ))}
                    </div>
                </RadioGroup>
            </div>
            <DialogFooter>
                <Button onClick={handleSelectLevel} disabled={!selectedLevel}>
                    Guardar y Empezar a Aprender
                </Button>
            </DialogFooter>
        </>
    )
}
