import Link from 'next/link';
import { BookOpen, Dumbbell, Feather } from 'lucide-react';
import { Button } from './ui/button';

export function Header() {
  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-14 max-w-screen-2xl items-center">
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
                className="transition-colors hover:text-foreground/80 text-foreground/60"
                >
                <BookOpen className="inline-block h-4 w-4 mr-1" />
                Browse
                </Link>
            </Button>
            <Button variant="ghost" asChild>
                <Link
                href="/practice"
                className="transition-colors hover:text-foreground/80 text-foreground/60"
                >
                <Dumbbell className="inline-block h-4 w-4 mr-1" />
                Practice
                </Link>
            </Button>
          </nav>
        </div>
      </div>
    </header>
  );
}
