'use client';
import Link from 'next/link';
import { BookOpen, Dumbbell, Feather, User, Users, MessageCircle, Menu, X } from 'lucide-react';
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
import {
  Sheet,
  SheetContent,
  SheetTrigger,
  SheetClose
} from "@/components/ui/sheet"
  

export function Header() {
    const { currentUser, clearCurrentUser } = useUser();
    const pathname = usePathname();

    const desktopNavLinks = (
        <>
            <Button variant="ghost" asChild>
                <Link
                href="/"
                className={cn("transition-colors hover:text-foreground/80", pathname === '/' ? 'text-foreground' : 'text-foreground/60')}
                >
                <BookOpen className="inline-block h-4 w-4 mr-2" />
                Aprende
                </Link>
            </Button>
            <Button variant="ghost" asChild>
                <Link
                href="/assistant"
                className={cn("transition-colors hover:text-foreground/80", pathname === '/assistant' ? 'text-foreground' : 'text-foreground/60')}
                >
                <MessageCircle className="inline-block h-4 w-4 mr-2" />
                Asistente
                </Link>
            </Button>
            <Button variant="ghost" asChild>
                <Link
                href="/practice"
                className={cn("transition-colors hover:text-foreground/80", pathname === '/practice' ? 'text-foreground' : 'text-foreground/60')}
                >
                <Dumbbell className="inline-block h-4 w-4 mr-2" />
                Practicar
                </Link>
            </Button>
        </>
    );

    const mobileNavLinks = (
        <>
            <Button variant="ghost" asChild>
                <SheetClose asChild>
                    <Link
                    href="/"
                    className={cn("transition-colors hover:text-foreground/80 w-full justify-start", pathname === '/' ? 'text-foreground' : 'text-foreground/60')}
                    >
                    <BookOpen className="inline-block h-4 w-4 mr-2" />
                    Aprende
                    </Link>
                </SheetClose>
            </Button>
            <Button variant="ghost" asChild>
                <SheetClose asChild>
                    <Link
                    href="/assistant"
                    className={cn("transition-colors hover:text-foreground/80 w-full justify-start", pathname === '/assistant' ? 'text-foreground' : 'text-foreground/60')}
                    >
                    <MessageCircle className="inline-block h-4 w-4 mr-2" />
                    Asistente
                    </Link>
                </SheetClose>
            </Button>
            <Button variant="ghost" asChild>
                <SheetClose asChild>
                    <Link
                    href="/practice"
                    className={cn("transition-colors hover:text-foreground/80 w-full justify-start", pathname === '/practice' ? 'text-foreground' : 'text-foreground/60')}
                    >
                    <Dumbbell className="inline-block h-4 w-4 mr-2" />
                    Practicar
                    </Link>
                </SheetClose>
            </Button>
        </>
    )

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-14 max-w-screen-2xl items-center justify-between">
        
        <Link href="/" className="flex items-center space-x-2">
            <Feather className="h-6 w-6 text-primary" />
            <span className="font-bold sm:inline-block font-headline">
            LinguaLeap
            </span>
        </Link>
        
        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-2 text-sm lg:gap-4">
            {desktopNavLinks}
        </nav>

        <div className="flex items-center gap-2">
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

           {/* Mobile Navigation */}
            <div className="md:hidden">
                <Sheet>
                <SheetTrigger asChild>
                    <Button variant="outline" size="icon">
                    <Menu className="h-6 w-6" />
                    <span className="sr-only">Open navigation menu</span>
                    </Button>
                </SheetTrigger>
                <SheetContent side="right">
                    <div className="flex items-center justify-between mb-8">
                        <Link href="/" className="flex items-center space-x-2">
                            <Feather className="h-6 w-6 text-primary" />
                            <span className="font-bold font-headline">LinguaLeap</span>
                        </Link>
                         <SheetClose asChild>
                            <Button variant="ghost" size="icon">
                                <X className="h-6 w-6" />
                                <span className="sr-only">Close menu</span>
                            </Button>
                         </SheetClose>
                    </div>
                    <nav className="flex flex-col gap-4 text-lg">
                        {mobileNavLinks}
                    </nav>
                </SheetContent>
                </Sheet>
            </div>
        </div>
      </div>
    </header>
  );
}
