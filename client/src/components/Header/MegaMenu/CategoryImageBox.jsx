import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

const CategoryImageBox = ({ url, imageUrl, label, height = 'h-64' }) => {
  return (
    <Link to={url} className='relative block overflow-hidden rounded-xl'>
      <img
        src={imageUrl}
        alt=''
        className={`${height} w-full transform rounded-xl object-cover object-top transition-transform duration-500 hover:scale-110`}
      />
      <p className='absolute bottom-5 left-1/2 -translate-x-1/2 rounded-lg bg-white px-3 py-2 text-center text-sm font-semibold uppercase tracking-tight'>
        {label}
      </p>
    </Link>
  );
};

CategoryImageBox.propTypes = {
  url: PropTypes.string,
  imageUrl: PropTypes.string,
  label: PropTypes.string,
  height: PropTypes.string,
};

export default CategoryImageBox;
