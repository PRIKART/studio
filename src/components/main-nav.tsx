import Link from 'next/link';
import { Icons } from '@/components/icons';
import { cn } from '@/lib/utils';

export function MainNav() {
  return (
    <div className="flex gap-6 md:gap-10">
      <Link href="/" className="flex items-center space-x-2">
        <Icons.logo className="h-6 w-6" />
        <span className="inline-block font-headline font-bold">
          Smart Learn
        </span>
      </Link>
      <nav className="hidden gap-6 md:flex">
        <Link
          href="/"
          className="flex items-center text-lg font-medium text-muted-foreground transition-colors hover:text-foreground/80 sm:text-sm"
        >
          Dashboard
        </Link>
        <Link
          href="/recommendations"
          className="flex items-center text-lg font-medium text-muted-foreground transition-colors hover:text-foreground/80 sm:text-sm"
        >
          Recommendations
        </Link>
      </nav>
    </div>
  );
}
