import PropTypes from 'prop-types';

import Rating from './Rating';
import CardImage from './CardImage';
import { Link } from 'react-router-dom';

const ProductCard = ({ product }) => {
  return (
    <Link to={`/product/${product._id}`}>
      <CardImage image={product.image} name={product.name} />
      <div className='mt-2 flex justify-between gap-4'>
        <h4 className='text-sm font-semibold uppercase tracking-wide text-slate-900'>
          {product.name}
        </h4>
        <p className='text-sm font-semibold text-slate-900'>₹{product.price.toLocaleString('en-IN')}</p>
      </div>

      <Rating value={product.rating} />
    </Link>
  );
};

ProductCard.propTypes = {
  product: PropTypes.object,
};

export default ProductCard;
