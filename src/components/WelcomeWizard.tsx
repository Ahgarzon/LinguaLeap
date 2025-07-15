
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
import { UserPlus, Users, ArrowRight, Trash2, ShieldQuestion } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Avatar, AvatarFallback } from './ui/avatar';
import { PlacementTest } from './PlacementTest';
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "@/components/ui/input-otp"
import { useToast } from '@/hooks/use-toast';
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
  } from "@/components/ui/alert-dialog"

type View = 'list' | 'new' | 'pin' | 'language' | 'test' | 'delete' | 'setPinForOldUser';

export function WelcomeWizard({ triggerButton = false }: { triggerButton?: boolean }) {
  const { users, setCurrentUser, addUser, currentUser, updateCurrentUser, deleteUser } = useUser();
  const [isOpen, setIsOpen] = useState(false);
  const [view, setView] = useState<View>('list');
  const [newUserName, setNewUserName] = useState('');
  const [newUserPin, setNewUserPin] = useState('');
  const [nativeLanguage, setNativeLanguage] = useState('');
  const [userToDelete, setUserToDelete] = useState<UserProfile | null>(null);
  const [deletePin, setDeletePin] = useState('');
  const [userToSetPin, setUserToSetPin] = useState<UserProfile | null>(null);

  const { toast } = useToast();

  const handleSelectUser = (user: UserProfile) => {
    setCurrentUser(user);
    if (!user.pin) {
      setUserToSetPin(user);
      setView('setPinForOldUser');
    } else if (!user.nativeLanguage) {
      setView('language');
    } else if (!user.level) {
      setView('test');
    } else {
      setIsOpen(false);
    }
  };

  const handleCreateUser = () => {
    if (newUserName.trim() && newUserPin.length === 4) {
      addUser(newUserName.trim(), newUserPin);
      setNewUserName('');
      setNewUserPin('');
      setView('language');
    } else {
        toast({
            variant: 'destructive',
            title: 'Error',
            description: 'Por favor, ingresa un nombre y un PIN de 4 dígitos.',
        })
    }
  };

  const handleSetPinForOldUser = () => {
    if (userToSetPin && newUserPin.length === 4) {
        updateCurrentUser({ ...userToSetPin, pin: newUserPin });
        setNewUserPin('');
        setUserToSetPin(null);
        if (!currentUser?.nativeLanguage) {
            setView('language');
        } else if (!currentUser?.level) {
            setView('test');
        } else {
            setIsOpen(false);
        }
    } else {
        toast({
            variant: 'destructive',
            title: 'Error',
            description: 'Por favor, ingresa un PIN de 4 dígitos.',
        })
    }
  };

  const handleSetLanguage = () => {
    if (nativeLanguage.trim() && currentUser) {
      updateCurrentUser({ nativeLanguage: nativeLanguage.trim() });
      setNativeLanguage('');
      setView('test');
    }
  };

  const handleDeleteUser = () => {
    if (!userToDelete || deletePin.length !== 4) return;
    
    const success = deleteUser(userToDelete.id, deletePin);
    if (success) {
        toast({
            title: 'Perfil Eliminado',
            description: `El perfil de ${userToDelete.name} ha sido eliminado.`,
        });
        setUserToDelete(null);
        setDeletePin('');
        setView('list'); // Go back to the list
    } else {
        toast({
            variant: 'destructive',
            title: 'PIN Incorrecto',
            description: 'El PIN introducido no es correcto.',
        });
        setDeletePin('');
    }
  }

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

  const openDeleteDialog = (e: React.MouseEvent, user: UserProfile) => {
    e.stopPropagation();
    setUserToDelete(user);
  }

  const renderContent = () => {
    switch (view) {
      case 'setPinForOldUser':
        return (
            <>
              <DialogHeader>
                <DialogTitle>Crear PIN para {userToSetPin?.name}</DialogTitle>
                <DialogDescription>
                  Este perfil necesita un PIN de 4 dígitos para continuar y para protegerlo.
                </DialogDescription>
              </DialogHeader>
              <div className="flex flex-col items-center gap-4 py-4">
                <InputOTP maxLength={4} value={newUserPin} onChange={setNewUserPin}>
                  <InputOTPGroup>
                    <InputOTPSlot index={0} />
                    <InputOTPSlot index={1} />
                    <InputOTPSlot index={2} />
                    <InputOTPSlot index={3} />
                  </InputOTPGroup>
                </InputOTP>
              </div>
              <DialogFooter>
                <Button onClick={handleSetPinForOldUser} disabled={newUserPin.length < 4}>Guardar PIN y Continuar</Button>
              </DialogFooter>
            </>
        );
      case 'test':
        return <PlacementTest onComplete={handleTestComplete} />;
      case 'language':
        return (
          <>
            <DialogHeader>
              <DialogTitle>Idioma Nativo</DialogTitle>
              <DialogDescription>
                ¿Cuál es tu idioma nativo? Esto nos ayudará a crear mejores mnemotecnias para ti.
              </DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="language" className="text-right">
                  Idioma
                </Label>
                <Input
                  id="language"
                  value={nativeLanguage}
                  onChange={(e) => setNativeLanguage(e.target.value)}
                  className="col-span-3"
                  placeholder="E.g. Español"
                  onKeyDown={(e) => e.key === 'Enter' && handleSetLanguage()}
                />
              </div>
            </div>
            <DialogFooter>
              <Button onClick={handleSetLanguage}>Guardar y Continuar</Button>
            </DialogFooter>
          </>
        );
      case 'pin':
        return (
            <>
              <DialogHeader>
                <DialogTitle>Crear PIN de Seguridad</DialogTitle>
                <DialogDescription>
                  Crea un PIN de 4 dígitos para tu perfil. Lo necesitarás para eliminarlo más tarde.
                </DialogDescription>
              </DialogHeader>
              <div className="flex flex-col items-center gap-4 py-4">
                <InputOTP maxLength={4} value={newUserPin} onChange={setNewUserPin}>
                  <InputOTPGroup>
                    <InputOTPSlot index={0} />
                    <InputOTPSlot index={1} />
                    <InputOTPSlot index={2} />
                    <InputOTPSlot index={3} />
                  </InputOTPGroup>
                </InputOTP>
              </div>
              <DialogFooter>
                <Button variant="ghost" onClick={() => setView('new')}>Volver</Button>
                <Button onClick={handleCreateUser} disabled={newUserPin.length < 4}>Crear y Continuar</Button>
              </DialogFooter>
            </>
          );
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
                  onKeyDown={(e) => e.key === 'Enter' && setView('pin')}
                />
              </div>
            </div>
            <DialogFooter>
              {users.length > 0 && <Button variant="ghost" onClick={() => setView('list')}>Volver a Perfiles</Button>}
              <Button onClick={() => setView('pin')} disabled={!newUserName.trim()}>Siguiente: Crear PIN</Button>
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
                  className="flex items-center justify-between p-2 rounded-md hover:bg-muted cursor-pointer group"
                  onClick={() => handleSelectUser(user)}
                >
                  <div className='flex items-center gap-3'>
                    <Avatar>
                      <AvatarFallback>{user.name.charAt(0).toUpperCase()}</AvatarFallback>
                    </Avatar>
                    <span className="font-medium">{user.name}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Button variant="ghost" size="icon" className="h-8 w-8 text-muted-foreground hover:text-destructive" onClick={(e) => openDeleteDialog(e, user)}>
                        <Trash2 className="h-4 w-4" />
                    </Button>
                    <ArrowRight className="h-5 w-5 text-muted-foreground group-hover:translate-x-1 transition-transform" />
                  </div>
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

  const deleteDialog = (
    <AlertDialog open={!!userToDelete} onOpenChange={(isOpen) => !isOpen && setUserToDelete(null)}>
        <AlertDialogContent>
        <AlertDialogHeader>
            <AlertDialogTitle>¿Eliminar el perfil de "{userToDelete?.name}"?</AlertDialogTitle>
            <AlertDialogDescription>
            Esta acción no se puede deshacer. Para confirmar, por favor introduce el PIN de 4 dígitos de este perfil. Si es un perfil antiguo sin PIN, no podrás eliminarlo hasta que inicies sesión y le asignes uno.
            </AlertDialogDescription>
        </AlertDialogHeader>
        <div className="flex flex-col items-center gap-4 py-4">
            <InputOTP maxLength={4} value={deletePin} onChange={setDeletePin}>
                <InputOTPGroup>
                <InputOTPSlot index={0} />
                <InputOTPSlot index={1} />
                <InputOTPSlot index={2} />
                <InputOTPSlot index={3} />
                </InputOTPGroup>
            </InputOTP>
        </div>
        <AlertDialogFooter>
            <AlertDialogCancel onClick={() => setDeletePin('')}>Cancelar</AlertDialogCancel>
            <AlertDialogAction onClick={handleDeleteUser} disabled={deletePin.length < 4 || !userToDelete?.pin} className="bg-destructive hover:bg-destructive/90">
                Eliminar Perfil
            </AlertDialogAction>
        </AlertDialogFooter>
        </AlertDialogContent>
  </AlertDialog>
  )

  // If user exists but something is missing, force the dialog open
  if (currentUser && (!currentUser.pin || !currentUser.nativeLanguage || !currentUser.level) && !isOpen && !triggerButton) {
      if (!currentUser.pin) {
          setUserToSetPin(currentUser);
          setView('setPinForOldUser');
      } else if (!currentUser.nativeLanguage) {
          setView('language');
      } else {
          setView('test');
      }
      setIsOpen(true);
  }


  if(triggerButton) {
    return (
        <Dialog open={isOpen} onOpenChange={setIsOpen}>
            <Button onClick={openDialog}>
                <UserPlus className="mr-2" />
                Empezar
            </Button>
            {dialogContent}
            {deleteDialog}
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
            {deleteDialog}
          </Dialog>
        </CardContent>
      </Card>
    </div>
  );
}
