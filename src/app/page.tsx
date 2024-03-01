'use client';
import { Sirin_Stencil } from 'next/font/google';
import Header from '@/components/Header';
import ShowSelect from '@/components/ShowSelect';

const sirin = Sirin_Stencil({
  weight: '400',
  subsets: ['latin'],
});

export default function Home() {
  return (
    <>
      <Header />
      <ShowSelect />
      <div className=' bg-gradient-to-b from-teal-300 to-teal-800 min-h-screen'>
        <h1
          className={`${sirin.className} text-[5vw] text-pink-700 text-center `}
        >
          Standing up cause they crossed my line
        </h1>
      </div>
    </>
  );
}
