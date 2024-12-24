import Footer from '@components/Footer';
import Header from '@components/Header';

import { Outlet } from 'react-router-dom';

const Layout = () => {
  return (
    <>
      <div className='flex min-h-screen flex-col bg-white'>
        <Header />

        <div className='h-[90px] md:h-[64px] lg:h-[106px]' />

        <div className='flex-grow'>
          <Outlet />
        </div>

        <Footer />
      </div>
    </>
  );
};

export default Layout;
