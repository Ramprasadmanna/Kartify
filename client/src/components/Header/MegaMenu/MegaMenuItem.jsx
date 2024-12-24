import PropTypes from 'prop-types';
const MegaMenuItem = ({ label, action, currentItem }) => {
  return (
    <button
      onClick={() => {
        if (currentItem !== label) {
          action(label);
        } else {
          action(null);
        }
      }}
      className={`nav-item text-sm font-medium ${currentItem === label ? 'font-bold text-indigo-700 underline underline-offset-4' : 'text-slate-700 hover:text-slate-900'}`}>
      {label}
    </button>
  );
};

MegaMenuItem.propTypes = {
  label: PropTypes.string,
  action: PropTypes.func,
  currentItem: PropTypes.string,
};

export default MegaMenuItem;
