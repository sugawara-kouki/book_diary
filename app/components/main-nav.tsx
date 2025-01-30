import { Button } from './ui/button';
import { cn } from '~/lib/utils';
import { BookOpen, Home, Library, LineChart } from 'lucide-react';
import { Link, useLocation } from '@remix-run/react';

export function MainNav() {
  const location = useLocation();
  const pathname = location.pathname;

  const routes = [
    {
      href: '/',
      label: 'ホーム',
      icon: Home,
      active: pathname === '/'
    },
    {
      href: '/bookshelf',
      label: '本棚',
      icon: Library,
      active: pathname === '/bookshelf'
    },
    {
      href: '/reading-log',
      label: '読書記録',
      icon: BookOpen,
      active: pathname === '/reading-log'
    },
    {
      href: '/statistics',
      label: '統計',
      icon: LineChart,
      active: pathname === '/statistics'
    }
  ];

  return (
    <nav className="flex flex-col space-y-2">
      {routes.map((route) => (
        <Button
          key={route.href}
          variant={route.active ? 'secondary' : 'ghost'}
          className={cn(
            'w-full justify-start gap-2',
            route.active && 'bg-accent'
          )}
          asChild>
          <Link to={route.href}>
            <route.icon className="h-4 w-4" />
            {route.label}
          </Link>
        </Button>
      ))}
    </nav>
  );
}
