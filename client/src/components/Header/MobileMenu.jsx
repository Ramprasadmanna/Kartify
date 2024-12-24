import { useDispatch, useSelector } from 'react-redux';
import MobileMenuItem from './MobileMenuItems';
import MobileSearchBar from './MobileSearchBar';

import {
  Cog8ToothIcon,
  ShoppingBagIcon,
  TagIcon,
  UserIcon,
} from '@heroicons/react/24/outline';
import { useEffect, useRef, useState } from 'react';
import { useLogoutMutation } from '@slices/userApiSlice';
import { toast } from 'react-toastify';
import { logout } from '@slices/authSlice';
import { Link, useNavigate } from 'react-router-dom';

const MobileMenu = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { cartItems } = useSelector((state) => state.cart);
  const { userInfo } = useSelector((state) => state.auth);

  const menuRef = useRef();
  const adminMenuRef = useRef();
  const [isOpen, setIsOpen] = useState(false);
  const [adminIsOpen, setAdminIsOpen] = useState(false);

  const [logoutApiCall, { isLoading: logoutLoading }] = useLogoutMutation();

  useEffect(() => {
    const handleClickOutSide = (e) => {
      if (menuRef.current && !menuRef.current.contains(e.target)) {
        setIsOpen(false);
      }

      if (adminMenuRef.current && !adminMenuRef.current.contains(e.target)) {
        setAdminIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutSide);

    return () => {
      document.removeEventListener('mousedown', handleClickOutSide);
    };
  }, []);

  const handleLogout = async () => {
    try {
      const response = await logoutApiCall().unwrap();
      console.log('Logout Response :', response);
      toast.success(response.message);
      dispatch(logout());
      navigate('/login');
    } catch (error) {
      if (error.status === 401) {
        toast.error(error?.data?.message);
        dispatch(logout());
        navigate('/login');
      } else {
        console.error(error);
        toast.error(error?.data?.message);
      }
    }
  };
  return (
    <nav className='flex gap-6 sm:hidden'>
      {/* <MobileMenuItem url='/categories' label='' icon={TagIcon} /> */}

      <div className='relative flex items-center gap-2'>
        <MobileMenuItem url='/cart' label='' icon={ShoppingBagIcon} />
        {cartItems.length > 0 && (
          <span className='absolute right-0 top-0 min-h-4 min-w-4 -translate-y-1/2 translate-x-1/2 rounded-full bg-indigo-700 text-center text-xs font-semibold text-white'>
            {cartItems.length}
          </span>
        )}
      </div>

      {userInfo ? (
        <div className='relative' ref={menuRef}>
          <button
            className='flex items-center gap-1 rounded-full bg-slate-300 p-1 text-sm font-semibold text-slate-900 transition-opacity hover:opacity-50'
            onClick={() => setIsOpen(!isOpen)}>
            <UserIcon className='h-5 w-5' />
          </button>

          {isOpen && (
            <nav className='absolute right-0 top-10 min-w-48 overflow-hidden rounded-lg border-2 border-slate-200 bg-white shadow-md'>
              <div className='border-b p-4 pb-3 text-sm leading-normal'>
                <p className='font-semibold text-gray-900'>{userInfo.name}</p>
                <p className='text-gray-900'>{userInfo.email}</p>
              </div>
              <Link
                to='/profile'
                className='block px-4 py-2 text-sm text-gray-700 transition-colors hover:bg-gray-200 focus:bg-gray-300'>
                Profile
              </Link>
              <button
                onClick={handleLogout}
                disabled={logoutLoading}
                className='w-full px-4 py-2 text-left text-sm text-gray-700 transition-colors hover:bg-red-200 hover:text-red-700 focus:bg-red-300'>
                {logoutLoading ? 'Logging You Out...' : 'LogOut'}
              </button>
            </nav>
          )}
        </div>
      ) : (
        <MobileMenuItem url='/login' label='' icon={UserIcon} />
      )}

      {userInfo && userInfo.isAdmin && (
        <div className='relative' ref={adminMenuRef}>
          <button
            className='flex items-center gap-1 rounded-full bg-slate-300 p-1 text-sm font-semibold text-slate-900 transition-opacity hover:opacity-50'
            onClick={() => setAdminIsOpen(!adminIsOpen)}>
            <Cog8ToothIcon className='h-5 w-5' />
          </button>

          {adminIsOpen && (
            <nav className='absolute right-0 top-10 min-w-48 overflow-hidden rounded-lg bg-white shadow-md'>
              <Link
                to='/admin/orderlist'
                className='block px-4 py-2 text-sm text-gray-700 transition-all hover:bg-gray-200 focus:bg-gray-300'>
                All Orders
              </Link>
              <Link
                to='/admin/userlist'
                className='block px-4 py-2 text-sm text-gray-700 transition-all hover:bg-gray-200 focus:bg-gray-300'>
                All Users
              </Link>
              <Link
                to='/admin/productlist'
                className='block px-4 py-2 text-sm text-gray-700 transition-all hover:bg-gray-200 focus:bg-gray-300'>
                All Products
              </Link>
            </nav>
          )}
        </div>
      )}
    </nav>
  );
};

export default MobileMenu;
