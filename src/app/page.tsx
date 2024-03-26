'use client';
import { Sirin_Stencil } from 'next/font/google';
import Header from '@/components/Header';
import ShowSelect from '@/components/ShowSelect';
import TableDisplay from '@/components/TableDisplay';

const sirin = Sirin_Stencil({
  weight: '400',
  subsets: ['latin'],
});

export default function Home() {
  return (
    <div className='bg-babyPink min-h-screen'>
      <Header />
      <ShowSelect />
      <TableDisplay />
    </div>
  );
}
