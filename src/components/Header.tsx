import { Pirata_One } from 'next/font/google';

const pirata = Pirata_One({
  weight: '400',
  subsets: ['latin'],
});

const Header = () => {
  return (
    <div className='mx-auto p-6 bg-navBarPurple'>
      <h2 className={`${pirata.className} text-black text-[3.5vw] mx-8`}>
        Hephaestus
      </h2>
    </div>
  );
};
export default Header;
