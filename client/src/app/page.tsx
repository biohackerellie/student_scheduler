import { env } from '@/env.mjs';
import { auth } from '@/lib/auth';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

export default async function Home() {
  return (
    <main className="flex min-h-screen flex-col  items-center  p-12">
      <h1 className="font-bold text-8xl">Welcome to STEAM</h1>
      <h2>LPS Is a steaming pile of shit</h2>
      <div>
        <Button asChild>
          <Link href="/student">Open Dashboard</Link>
        </Button>
      </div>
    </main>
  );
}
