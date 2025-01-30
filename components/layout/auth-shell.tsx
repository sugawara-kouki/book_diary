'use client';

import { BookOpen } from 'lucide-react';

interface AuthShellProps {
  children: React.ReactNode;
}

export function AuthShell({ children }: AuthShellProps) {
  return (
    <div className="min-h-screen bg-background">
      <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-16 items-center justify-center">
          <div className="flex items-center gap-2 bg-gradient-to-r from-primary-foreground/80 to-primary-foreground bg-clip-text">
            <BookOpen className="h-8 w-8 text-primary-foreground" />
            <span className="font-heading text-2xl font-bold bg-gradient-to-r from-primary-foreground/80 to-primary-foreground bg-clip-text text-transparent">
              読書ログ
            </span>
          </div>
        </div>
        <div className="absolute inset-x-0 -bottom-px h-px bg-gradient-to-r from-transparent via-primary/30 to-transparent" />
      </header>

      <main className="container py-8">{children}</main>
    </div>
  );
}
