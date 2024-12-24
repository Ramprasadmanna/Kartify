import PropTypes from 'prop-types';

const SelectInput = ({
  label,
  id,
  value,
  onChange,
  required = true,
  options,
}) => {
  return (
    <div>
      <label
        htmlFor={id}
        className='block text-sm font-medium leading-6 text-slate-900'>
        {label}
      </label>
      <div className='mt-2'>
        <select
          id={id}
          value={value}
          required={required}
          onChange={onChange}
          className='mt-2 block w-full rounded-md border-0 py-1.5 pl-3 pr-10 text-slate-900 ring-1 ring-inset ring-slate-300 focus:ring-2 focus:ring-indigo-600 sm:text-sm sm:leading-6'>
          {options.map((option) => (
            <option value={option} key={option}>
              {option}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
};

SelectInput.propTypes = {
  label: PropTypes.string,
  id: PropTypes.string,
  value: PropTypes.string,
  onChange: PropTypes.func,
  required: PropTypes.bool,
  options: PropTypes.array,
};

export default SelectInput;
