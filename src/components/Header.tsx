'use client';
import Link from 'next/link';
import { BookOpen, Dumbbell, Feather, User, Users, LogOut, MessageCircle } from 'lucide-react';
import { Button } from './ui/button';
import { useUser } from '@/hooks/use-user';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
  } from "@/components/ui/dropdown-menu"
import { WelcomeWizard } from './WelcomeWizard';
import { Badge } from './ui/badge';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';
  

export function Header() {
    const { currentUser, clearCurrentUser } = useUser();
    const pathname = usePathname();

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-14 max-w-screen-2xl items-center justify-between">
        <div className="flex items-center">
            <div className="mr-4 hidden md:flex">
                <Link href="/" className="mr-6 flex items-center space-x-2">
                    <Feather className="h-6 w-6 text-primary" />
                    <span className="hidden font-bold sm:inline-block font-headline">
                    LinguaLeap
                    </span>
                </Link>
                <nav className="flex items-center gap-4 text-sm lg:gap-6">
                    <Button variant="ghost" asChild>
                        <Link
                        href="/"
                        className={cn("transition-colors hover:text-foreground/80", pathname === '/' ? 'text-foreground' : 'text-foreground/60')}
                        >
                        <BookOpen className="inline-block h-4 w-4 mr-1" />
                        Aprende
                        </Link>
                    </Button>
                    <Button variant="ghost" asChild>
                        <Link
                        href="/assistant"
                        className={cn("transition-colors hover:text-foreground/80", pathname === '/assistant' ? 'text-foreground' : 'text-foreground/60')}
                        >
                        <MessageCircle className="inline-block h-4 w-4 mr-1" />
                        Asistente
                        </Link>
                    </Button>
                    <Button variant="ghost" asChild>
                        <Link
                        href="/practice"
                        className={cn("transition-colors hover:text-foreground/80", pathname === '/practice' ? 'text-foreground' : 'text-foreground/60')}
                        >
                        <Dumbbell className="inline-block h-4 w-4 mr-1" />
                        Practicar
                        </Link>
                    </Button>
                </nav>
            </div>
        </div>

        <div className="flex items-center">
        {currentUser ? (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="flex items-center gap-2">
                  <User className="h-5 w-5" />
                  <span className="hidden sm:inline">{currentUser.name}</span>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-56">
                <DropdownMenuLabel className='flex flex-col space-y-1'>
                    <span>Hola, {currentUser.name}</span>
                    {currentUser.level && <Badge variant="secondary" className="w-fit">{currentUser.level}</Badge>}
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={clearCurrentUser}>
                    <Users className="mr-2 h-4 w-4" />
                    <span>Cambiar Perfil</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <WelcomeWizard triggerButton />
          )}
        </div>
      </div>
    </header>
  );
}
