import { MainNav } from '../main-nav';
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar';
import { Input } from '../ui/input';
import { BookOpen, Search } from 'lucide-react';

interface ShellProps {
  children: React.ReactNode;
}

export function Shell({ children }: ShellProps) {
  return (
    <div className="min-h-screen bg-background">
      <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-16 items-center">
          <BookOpen className="mr-2 h-6 w-6" />
          <span className="font-heading text-xl font-semibold">読書ログ</span>
          <div className="flex items-center space-x-4 ml-auto">
            <div className="relative w-64">
              <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="本を検索..."
                className="pl-8"
              />
            </div>
            <Avatar>
              <AvatarImage
                src="https://github.com/shadcn.png"
                alt="ユーザー"
              />
              <AvatarFallback>ユ</AvatarFallback>
            </Avatar>
          </div>
        </div>
      </header>

      <div className="container grid lg:grid-cols-[240px_1fr] gap-8 py-8">
        <aside className="hidden lg:block">
          <MainNav />
        </aside>
        <main>{children}</main>
      </div>
    </div>
  );
}
