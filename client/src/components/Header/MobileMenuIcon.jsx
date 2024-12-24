import { Bars3Icon, ShoppingBagIcon } from '@heroicons/react/24/outline';
import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

const MobileMenuIcon = ({ isOpen, setIsOpen }) => {
  const { cartItems } = useSelector((state) => state.cart);

  return (
    <div className='flex gap-4 sm:hidden'>
      <div className='relative flex items-center gap-2'>
        <Link
          to='/cart'
          className='flex items-center gap-1 text-sm font-semibold text-slate-900 transition-opacity hover:opacity-50'>
          <ShoppingBagIcon className='h-6 w-6' strokeWidth={2} />
        </Link>
        {cartItems.length > 0 && (
          <span className='absolute right-0 top-0 min-h-4 min-w-4 -translate-y-1/2 translate-x-1/2 rounded-full bg-indigo-700 text-center text-xs font-semibold text-white'>
            {cartItems.length}
          </span>
        )}
      </div>
      <button onClick={() => setIsOpen(!isOpen)}>
        <Bars3Icon className='h-6 w-6 text-slate-900' />
      </button>
    </div>
  );
};

MobileMenuIcon.propTypes = {
  isOpen: PropTypes.bool,
  setIsOpen: PropTypes.func,
};

export default MobileMenuIcon;
