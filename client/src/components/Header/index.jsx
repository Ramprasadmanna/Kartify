import DesktopMenu from './DesktopMenu';
import Logo from './logo';
import SerchBar from './SerchBar';
import { useState } from 'react';
import MobileMenuIcon from './MobileMenuIcon';
import MobileMenu from './MobileMenu';
import MegaMenu from './MegaMenu';
import MobileSearchBar from './MobileSearchBar';

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <header className='fixed z-50 w-full border-b bg-white'>
      <div className='mx-auto flex max-w-7xl items-center justify-between gap-10 px-3 py-3 sm:px-6 lg:px-8'>
        <Logo />
        <SerchBar />
        <DesktopMenu />

        {/* Mobile Menu  */}
        {/* <MobileMenuIcon isOpen={isOpen} setIsOpen={setIsOpen} /> */}

        <MobileMenu />
      </div>

      {/* Mobile Search Bar */}
      <MobileSearchBar />

      {/* {isOpen && <MobileMenu />} */}

      <MegaMenu />
    </header>
  );
};

export default Header;
