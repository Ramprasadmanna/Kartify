import PropTypes from 'prop-types';

const TextInput = ({
  label,
  type = 'text',
  id,
  value,
  onChange,
  required = true,
}) => {
  return (
    <div>
      <label
        htmlFor={id}
        className='block text-sm font-medium leading-6 text-slate-900'>
        {label}
      </label>
      <div className='mt-2'>
        <input
          type={type}
          id={id}
          required={required}
          value={value}
          onChange={onChange}
          className='block w-full rounded-md border-0 py-1.5 text-slate-900 shadow-sm ring-1 ring-inset ring-slate-300 placeholder:text-slate-500 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6'
        />
      </div>
    </div>
  );
};

TextInput.propTypes = {
  label: PropTypes.string,
  type: PropTypes.string,
  id: PropTypes.string,
  value: PropTypes.string,
  onChange: PropTypes.func,
  required: PropTypes.bool,
};

export default TextInput;
