import { MinusIcon, PlusIcon } from '@heroicons/react/24/outline';
import PropTypes from 'prop-types';

const QuantitySelector = ({ countInStock, quantity, setQuantity }) => {
  const handleIncrement = () => {
    setQuantity((prevQuantity) => Math.min(prevQuantity + 1, countInStock));
  };

  const handleDecrement = () => {
    setQuantity((prevQuantity) => Math.max(prevQuantity - 1, 1));
  };

  return (
    <div className='mt-10'>
      <h6 className='mb-1 text-sm font-semibold text-slate-600'>
        Select Quantity
      </h6>
      <div className='inline-flex items-center gap-2 rounded-lg border p-1'>
        <button
          className={`hover:bg-slate-300' flex h-8 w-8 items-center justify-center rounded bg-slate-200 text-slate-600 ${quantity <= 1 && 'cursor-not-allowed opacity-50'}`}
          disabled={!countInStock}>
          <MinusIcon
            onClick={handleDecrement}
            className='h-4 w-4 text-slate-900'
          />
        </button>
        <span className='w-8 text-center font-bold text-slate-900'>
          {quantity}
        </span>
        <button
          className={`flex h-8 w-8 items-center justify-center rounded bg-slate-200 text-slate-600 hover:bg-slate-300 ${quantity >= countInStock && 'cursor-not-allowed opacity-50'}`}
          disabled={!countInStock}>
          <PlusIcon
            onClick={handleIncrement}
            className='h-4 w-4 text-slate-900'
          />
        </button>
      </div>
    </div>
  );
};

QuantitySelector.propTypes = {
  countInStock: PropTypes.number,
  quantity: PropTypes.number,
  setQuantity: PropTypes.func,
};
export default QuantitySelector;
