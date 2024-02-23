import { Sirin_Stencil } from 'next/font/google';

const sirin = Sirin_Stencil({
  weight: '400',
  subsets: ['latin'],
});

export default function Home() {
  return (
    <>
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
