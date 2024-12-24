import PropTypes from 'prop-types';

const Summary = ({
  cartItems,
  itemsPrice,
  shippingPrice,
  taxPrice,
  totalPrice,
  handleCheckout,
}) => {
  return (
    <section className='mt-16 rounded-lg bg-slate-50 px-4 py-6 sm:p-6 lg:col-span-5 lg:mt-0 lg:p-8'>
      <h2 className='text-lg font-medium text-slate-900'>
        Order Summary{' '}
        <span>
          ({cartItems.reduce((acc, currVal) => acc + currVal.quantity, 0)}{' '}
          items)
        </span>
      </h2>

      <dl className='mt-6 space-y-4'>
        <div className='flex items-center justify-between'>
          <dt className='text-sm text-slate-600'>Subtotal</dt>
          <dd className='text-sm font-medium text-slate-900'>₹{itemsPrice}</dd>
        </div>
        <div className='flex items-center justify-between border-t border-slate-200 pt-4'>
          <dt className='text-sm text-slate-600'>Shipping</dt>
          <dd className='text-sm font-medium text-slate-900'>
            ₹{shippingPrice}
          </dd>
        </div>
        <div className='flex items-center justify-between border-t border-slate-200 pt-4'>
          <dt className='text-sm text-slate-600'>Tax (18%)</dt>
          <dd className='text-sm font-medium text-slate-900'>₹{taxPrice}</dd>
        </div>
        <div className='flex items-center justify-between border-t border-slate-200 pt-4'>
          <dt className='text-sm text-slate-600'>Order Total</dt>
          <dd className='text-sm font-medium text-slate-900'>₹{totalPrice}</dd>
        </div>
      </dl>

      <div className='mt-10'>
        <button
          onClick={handleCheckout}
          className='w-full rounded-md border border-transparent bg-indigo-600 px-4 py-3 text-base font-medium text-white shadow-sm transition-all hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 focus:ring-offset-gray-50'>
          Checkout
        </button>
      </div>
    </section>
  );
};

Summary.propTypes = {
  cartItems: PropTypes.array,
  itemsPrice: PropTypes.string,
  shippingPrice: PropTypes.string,
  taxPrice: PropTypes.string,
  totalPrice: PropTypes.string,
  handleCheckout: PropTypes.func,
};

export default Summary;
