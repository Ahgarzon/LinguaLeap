'use client';
import { useState } from 'react';
import { useUser, type UserProfile } from '@/hooks/use-user';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { UserPlus, Users, ArrowRight } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Avatar, AvatarFallback } from './ui/avatar';
import { PlacementTest } from './PlacementTest';

export function WelcomeWizard({ triggerButton = false }: { triggerButton?: boolean }) {
  const { users, setCurrentUser, addUser, currentUser } = useUser();
  const [isOpen, setIsOpen] = useState(false);
  const [view, setView] = useState<'list' | 'new' | 'test'>('list');
  const [newUserName, setNewUserName] = useState('');

  const handleSelectUser = (user: UserProfile) => {
    setCurrentUser(user);
    if (!user.level) {
      setView('test');
    } else {
      setIsOpen(false);
    }
  };

  const handleCreateUser = () => {
    if (newUserName.trim()) {
      addUser(newUserName.trim());
      setNewUserName('');
      setView('test'); // Go to placement test after creating user
    }
  };
  
  const openDialog = () => {
    if (users.length > 0) {
      setView('list');
    } else {
      setView('new');
    }
    setIsOpen(true);
  }

  const handleTestComplete = () => {
    setIsOpen(false);
    setView('list');
  }

  const renderContent = () => {
    switch (view) {
      case 'test':
        return <PlacementTest onComplete={handleTestComplete} />;
      case 'new':
        return (
          <>
            <DialogHeader>
              <DialogTitle>Crear Nuevo Perfil</DialogTitle>
              <DialogDescription>
                Ingresa tu nombre para crear un nuevo perfil.
              </DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="name" className="text-right">
                  Nombre
                </Label>
                <Input
                  id="name"
                  value={newUserName}
                  onChange={(e) => setNewUserName(e.target.value)}
                  className="col-span-3"
                  placeholder="E.g. Alex"
                  onKeyDown={(e) => e.key === 'Enter' && handleCreateUser()}
                />
              </div>
            </div>
            <DialogFooter>
              {users.length > 0 && <Button variant="ghost" onClick={() => setView('list')}>Volver a Perfiles</Button>}
              <Button onClick={handleCreateUser}>Crear y Continuar</Button>
            </DialogFooter>
          </>
        );
      case 'list':
      default:
        return (
          <>
            <DialogHeader>
              <DialogTitle>Seleccionar Perfil</DialogTitle>
              <DialogDescription>
                Elige tu perfil para continuar o crea uno nuevo.
              </DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              {users.map(user => (
                <div key={user.id} 
                  className="flex items-center justify-between p-2 rounded-md hover:bg-muted cursor-pointer"
                  onClick={() => handleSelectUser(user)}
                >
                  <div className='flex items-center gap-3'>
                    <Avatar>
                      <AvatarFallback>{user.name.charAt(0).toUpperCase()}</AvatarFallback>
                    </Avatar>
                    <span className="font-medium">{user.name}</span>
                  </div>
                  <ArrowRight className="h-5 w-5 text-muted-foreground" />
                </div>
              ))}
               <Button variant="outline" onClick={() => setView('new')}>
                <UserPlus className="mr-2 h-4 w-4" />
                Crear Nuevo Perfil
              </Button>
            </div>
          </>
        )
    }
  }

  const dialogContent = (
    <DialogContent className="sm:max-w-[425px]">
      {renderContent()}
    </DialogContent>
  );

  // If user exists but level is not set, force the dialog open to the test
  if (currentUser && !currentUser.level && !isOpen && !triggerButton) {
    setIsOpen(true);
    setView('test');
  }


  if(triggerButton) {
    return (
        <Dialog open={isOpen} onOpenChange={setIsOpen}>
            <Button onClick={openDialog}>
                <UserPlus className="mr-2" />
                Empezar
            </Button>
            {dialogContent}
        </Dialog>
    )
  }

  return (
    <div className="flex items-center justify-center min-h-[calc(100vh-10rem)]">
      <Card className="w-full max-w-md text-center p-8">
        <CardHeader>
          <CardTitle className="text-3xl font-bold font-headline">¡Bienvenido a LinguaLeap!</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground mb-6">Crea un perfil para comenzar tu viaje de aprendizaje de idiomas.</p>
          <Dialog open={isOpen} onOpenChange={setIsOpen}>
            <Button onClick={openDialog} size="lg">
                <UserPlus className="mr-2" />
                Crear o Seleccionar Perfil
            </Button>
            {dialogContent}
          </Dialog>
        </CardContent>
      </Card>
    </div>
  );
}
