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
      return <div>Login Button</div>;
    } else {
      return <div>User Name Logged In</div>;
    }
  };

  return (
    <div className='mx-auto p-6 bg-navBarPurple flex justify-between items-center'>
      <h2 className={`${pirata.className} text-black text-[3.5vw] mx-8`}>
        Hephaestus
      </h2>
      {renderButton()}
      <div className='mr-20'>About</div>
    </div>
  );
};
export default Header;
