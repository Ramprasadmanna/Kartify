import PropTypes from 'prop-types';
import { EyeIcon } from '@heroicons/react/24/outline';

const CardImage = ({ image, name }) => {
  return (
    <div className='relative w-full overflow-hidden rounded-lg sm:h-96'>
      <img
        src={image}
        alt={name}
        className='h-full w-full object-cover object-top'
      />
      <div className='absolute inset-0 flex items-center justify-center opacity-0 transition-opacity duration-500 hover:opacity-100'>
        <div className='rounded-full bg-white p-3 transition-all hover:bg-slate-200'>
          <EyeIcon className='h-6 w-6 text-slate-900' strokeWidth={2} />
        </div>
      </div>
    </div>
  );
};

CardImage.propTypes = {
  image: PropTypes.string,
  name: PropTypes.string,
};

export default CardImage;
