import Link from 'next/link';
import { FaSpotify } from 'react-icons/fa';
import { Pirata_One } from 'next/font/google';
import { Unbounded } from 'next/font/google';
import { useState } from 'react';

const pirata = Pirata_One({
  weight: '400',
  subsets: ['latin'],
});

const unbounded = Unbounded({
  weight: '300',
  subsets: ['latin'],
});

const Header = () => {
  const [loggedIn, setLoggedIn] = useState(false);

  const renderButton = () => {
    if (!loggedIn) {
      return (
        <button className='bg-babyPink flex items-center hover:bg-altBabyPink text-black text-xs py-1 px-2 mx-2 rounded-full md:py-5 md:px-10 md:text-base'>
          <div className='hidden md:block md:mr-1'>{<FaSpotify />}</div>
          <div className={`${unbounded.className}`}>Log in with Spotify</div>
        </button>
      );
    } else {
      return <div>User Name Logged In</div>;
    }
  };

  return (
    <div className='p-2 bg-navBarPurple flex justify-between items-center md:p-6'>
      <h2
        className={`${pirata.className} text-black text-4xl md:mx-8 md:text-6xl`}
      >
        Hephaestus
      </h2>
      {renderButton()}
      <Link
        className={`${unbounded.className} hover:underline text-xs md:mr-20 md:text-base`}
        href={'/about'}
      >
        About
      </Link>
    </div>
  );
};
export default Header;
