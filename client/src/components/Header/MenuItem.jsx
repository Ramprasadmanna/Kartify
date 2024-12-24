import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

const MenuItem = ({ url, label, icon: Icon }) => {
  return (
    <Link
      to={url}
      className='flex items-center gap-1 text-sm font-semibold text-slate-900 transition-opacity hover:opacity-50'>
      <Icon className='h-4 w-4' strokeWidth={2} />
      {label}
    </Link>
  );
};

MenuItem.propTypes = {
  url: PropTypes.string,
  label: PropTypes.string,
  icon: PropTypes.elementType,
};

export default MenuItem;
