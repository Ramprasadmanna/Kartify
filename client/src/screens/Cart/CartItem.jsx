import { CheckIcon, ClockIcon, XMarkIcon } from '@heroicons/react/24/outline';
import QuantityDropDown from './QuantityDropDown';
import PropTypes from 'prop-types';

const CartItem = ({ product, handleAddToCart, handleRemoveFromCart }) => {
  return (
    <li className='flex gap-4 py-6 sm:gap-6 sm:py-10'>
      <img
        src={product.image}
        alt={product.alt}
        className='h-48 w-28 flex-shrink-0 rounded-md object-cover sm:h-48 sm:w-48'
      />

      <div className='flex flex-col justify-between'>
        <div className='relative sm:grid sm:grid-cols-2 sm:gap-x-10'>
          <div>
            <p className='text-sm'>{product.name}</p>
            <p className='mt-1 text-sm text-slate-500'>{product.brand}</p>
            <p className='mt-1 text-sm font-medium text-slate-900'>
              ₹{product.price}
            </p>
          </div>

          <div className='mt-4 sm:mt-0'>
            <QuantityDropDown
              product={product}
              handleAddToCart={handleAddToCart}
            />
          </div>

          <div className='absolute right-0 top-0'>
            <button
              className='-m-2 inline-flex p-2 text-slate-400 hover:scale-110 hover:text-red-500'
              onClick={() => handleRemoveFromCart(product._id)}>
              <span className='sr-only'>Remove</span>
              <XMarkIcon className='h-5 w-5' />
            </button>
          </div>
        </div>

        <p className='mt-4 text-sm text-slate-500 sm:mt-0'>
          {product.description}
        </p>

        <p className='mt-4 flex gap-2 text-sm text-slate-700'>
          {product.countInStock > 0 ? (
            <CheckIcon className='h-5 w-5 text-green-500' />
          ) : (
            <ClockIcon className='h-5 w-5 text-red-500' />
          )}

          <span>{product.countInStock > 0 ? 'In Stock' : 'Out Of Stock'}</span>
        </p>
      </div>
    </li>
  );
};

CartItem.propTypes = {
  product: PropTypes.object,
  index: PropTypes.number,
  handleAddToCart: PropTypes.func,
  handleRemoveFromCart: PropTypes.func,
};

export default CartItem;
