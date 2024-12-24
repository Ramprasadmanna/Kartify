import { ChevronRightIcon } from '@heroicons/react/24/outline';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
const CheckoutSteps = ({ step1, step2, step3, step4 }) => {
  return (
    <nav className='flex items-center gap-2 flex-wrap'>
      {step1 ? (
        <Link
          to='/login?redirect=/shipping'
          className='text-slate-900 hover:text-indigo-900'>
          Sign In
        </Link>
      ) : (
        <span className='cursor-not-allowed opacity-50'>Sign In</span>
      )}

      <ChevronRightIcon className='h-5 w-5 text-gray-400' />

      {step2 ? (
        <Link to='/shipping' className='text-slate-900 hover:text-indigo-900'>
          Shipping
        </Link>
      ) : (
        <span className='cursor-not-allowed opacity-50'>Shipping</span>
      )}

      <ChevronRightIcon className='h-5 w-5 text-gray-400' />

      {step3 ? (
        <Link to='/payment' className='text-slate-900 hover:text-indigo-900'>
          Payment Method
        </Link>
      ) : (
        <span className='cursor-not-allowed opacity-50'>Payment Method</span>
      )}

      <ChevronRightIcon className='h-5 w-5 text-gray-400' />

      {step4 ? (
        <Link to='/placeorder' className='text-slate-900 hover:text-indigo-900'>
          Place Order
        </Link>
      ) : (
        <span className='cursor-not-allowed opacity-50'>Place Order</span>
      )}

      <ChevronRightIcon className='h-5 w-5 text-gray-400' />
    </nav>
  );
};

CheckoutSteps.propTypes = {
  step1: PropTypes.bool,
  step2: PropTypes.bool,
  step3: PropTypes.bool,
  step4: PropTypes.bool,
};

export default CheckoutSteps;
