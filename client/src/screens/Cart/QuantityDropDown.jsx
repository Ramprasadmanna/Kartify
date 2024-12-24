import PropTypes from 'prop-types';

const QuantityDropDown = ({ product, handleAddToCart }) => {
  return (
    <>
      <label htmlFor={product._id} className='sr-only'>
        Quantity , {product.name}
      </label>

      <select
        className={`min-w-12 rounded-md border border-gray-300 px-1.5 py-1.5 text-base font-medium text-slate-700 shadow-sm outline-none ${product.countInStock ? 'block' : 'hidden'}`}
        id={product._id}
        value={product.quantity}
        onChange={(e) => handleAddToCart(product, +e.target.value)}>
        {[...Array(product.countInStock).keys()].map((x) => (
          <option key={x + 1} value={x + 1}>
            {x + 1}
          </option>
        ))}
      </select>
    </>
  );
};

QuantityDropDown.propTypes = {
  product: PropTypes.object,
  handleAddToCart: PropTypes.func,
};

export default QuantityDropDown;
