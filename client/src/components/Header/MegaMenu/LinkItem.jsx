import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

const LinkItem = ({ url, label }) => {
  return (
    <li>
      <Link
        to={url}
        className='text-sm text-slate-700 transition-all hover:text-slate-900 hover:underline'>
        {label}
      </Link>
    </li>
  );
};

LinkItem.propTypes = {
  url: PropTypes.string,
  label: PropTypes.string,
};

export default LinkItem;
