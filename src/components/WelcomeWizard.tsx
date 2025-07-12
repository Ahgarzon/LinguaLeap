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

export function WelcomeWizard({ triggerButton = false }: { triggerButton?: boolean }) {
  const { users, setCurrentUser, addUser } = useUser();
  const [isOpen, setIsOpen] = useState(false);
  const [view, setView] = useState<'list' | 'new'>('list');
  const [newUserName, setNewUserName] = useState('');

  const handleSelectUser = (user: UserProfile) => {
    setCurrentUser(user);
    setIsOpen(false);
  };

  const handleCreateUser = () => {
    if (newUserName.trim()) {
      addUser(newUserName.trim());
      setNewUserName('');
      setView('list');
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

  const dialogContent = (
    <DialogContent className="sm:max-w-[425px]">
      <DialogHeader>
        <DialogTitle>{view === 'list' ? 'Select Profile' : 'Create New Profile'}</DialogTitle>
        <DialogDescription>
          {view === 'list' ? 'Choose your profile to continue.' : 'Enter your name to create a new profile.'}
        </DialogDescription>
      </DialogHeader>
      
      {view === 'list' ? (
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
            Create New Profile
          </Button>
        </div>
      ) : (
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="name" className="text-right">
              Name
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
          <DialogFooter>
            {users.length > 0 && <Button variant="ghost" onClick={() => setView('list')}>Back to Profiles</Button>}
            <Button onClick={handleCreateUser}>Create Profile</Button>
          </DialogFooter>
        </div>
      )}
    </DialogContent>
  );

  if(triggerButton) {
    return (
        <Dialog open={isOpen} onOpenChange={setIsOpen}>
            <Button onClick={openDialog}>
                <UserPlus className="mr-2" />
                Get Started
            </Button>
            {dialogContent}
        </Dialog>
    )
  }

  return (
    <div className="flex items-center justify-center min-h-[calc(100vh-10rem)]">
      <Card className="w-full max-w-md text-center p-8">
        <CardHeader>
          <CardTitle className="text-3xl font-bold font-headline">Welcome to LinguaLeap!</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground mb-6">Create a profile to start your language learning journey.</p>
          <Dialog open={isOpen} onOpenChange={setIsOpen}>
            <Button onClick={openDialog} size="lg">
                <UserPlus className="mr-2" />
                Create or Select Profile
            </Button>
            {dialogContent}
          </Dialog>
        </CardContent>
      </Card>
    </div>
  );
}
