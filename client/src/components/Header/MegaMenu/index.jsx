import { useEffect, useRef, useState } from 'react';
import MegaMenuItem from './MegaMenuItem';
import AllCategoryMenuDisplay from './AllCategoryMenuDisplay';
import MenMegaMenuDisplay from './MenMegaMenu';

const menus = {
  'All Categories': AllCategoryMenuDisplay,
  Men: MenMegaMenuDisplay,
};

const MegaMenu = () => {
  const [currentMenu, setCurrentMenu] = useState(null);
  const menuRef = useRef();
  const navRef = useRef([]);
  const CurrentMenuComponent = currentMenu ? menus[currentMenu] : null;

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (
        menuRef.current &&
        !menuRef.current.contains(e.target) &&
        e.target.classList[0] !== 'nav-item'
      ) {
        setCurrentMenu(null);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <div className='hidden w-full border-t bg-white lg:block'>
      <nav
        ref={navRef}
        className='mx-auto flex max-w-7xl gap-10 bg-white px-3 py-2.5 sm:px-6 lg:px-8'>
        <MegaMenuItem
          label='All Categories'
          action={setCurrentMenu}
          currentItem={currentMenu}
        />
        <MegaMenuItem
          label='Men'
          action={setCurrentMenu}
          currentItem={currentMenu}
        />
        <MegaMenuItem
          label='Women'
          action={setCurrentMenu}
          currentItem={currentMenu}
        />
        <MegaMenuItem
          label='Kids'
          action={setCurrentMenu}
          currentItem={currentMenu}
        />
        <MegaMenuItem
          label='Collections'
          action={setCurrentMenu}
          currentItem={currentMenu}
        />
        <MegaMenuItem
          label='Watches'
          action={setCurrentMenu}
          currentItem={currentMenu}
        />
        <MegaMenuItem
          label='Shoes'
          action={setCurrentMenu}
          currentItem={currentMenu}
        />
        <MegaMenuItem
          label='Accessories'
          action={setCurrentMenu}
          currentItem={currentMenu}
        />
        <MegaMenuItem
          label='Sale'
          action={setCurrentMenu}
          currentItem={currentMenu}
        />
      </nav>

      <div
        ref={menuRef}
        className={`transform transition-all duration-500 ease-in-out ${currentMenu ? 'max-h-screen opacity-100' : 'max-h-0 opacity-0'} overflow-hidden`}>
        {CurrentMenuComponent && <CurrentMenuComponent />}
      </div>
    </div>
  );
};

export default MegaMenu;
