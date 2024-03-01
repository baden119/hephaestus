import { Pirata_One } from 'next/font/google';
import { useState } from 'react';

const pirata = Pirata_One({
  weight: '400',
  subsets: ['latin'],
});

const Header = () => {
  const [loggedIn, setLoggedIn] = useState(false);

  const renderButton = () => {
    if (!loggedIn) {
      return (
        <button className='bg-babyPink hover:bg-altBabyPink text-black font-bold py-2 px-4 rounded-full md:py-5 md:px-10'>
          Login
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
      <div className='md:mr-20'>About</div>
    </div>
  );
};
export default Header;
