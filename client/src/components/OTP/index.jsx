import React, { useState, useRef } from 'react';
import PropTypes from 'prop-types';

const OTPInput = ({ length = 6, onComplete, tabIndex, isValidOtp }) => {
  const [otp, setOtp] = useState(new Array(length).fill(''));
  const inputRefs = useRef([]);

  // Handle input change
  const handleChange = (value, index) => {
    if (!isNaN(value)) {
      const newValue = value.trim().substring(value.length - 1, value.length);

      const newOtp = [...otp];
      newOtp[index] = newValue;

      setOtp(newOtp);

      // Move to the next input field
      if (value && index < length - 1) {
        inputRefs.current[index + 1]?.focus();
      }

      // Call the onComplete callback when all fields are filled
      if (newOtp.every((digit) => digit !== '')) {
        onComplete(newOtp.join(''));
      }
    }
  };

  const handleClick = (index) => {
    inputRefs.current[index].setSelectionRange(1, 1);
  };

  // Handle backspace and navigation
  const handleKeyDown = (e, index) => {
    if (e.key === 'Backspace' && !otp[index] && index > 0) {
      e.preventDefault();
      inputRefs.current[index - 1]?.focus();
    }
  };

  return (
    <div className='flex gap-2'>
      {otp.map((digit, index) => (
        <input
          key={index}
          tabIndex={index + tabIndex}
          ref={(ref) => (inputRefs.current[index] = ref)}
          type='text'
          value={digit}
          disabled={isValidOtp}
          onChange={(e) => handleChange(e.target.value, index)}
          onKeyDown={(e) => handleKeyDown(e, index)}
          onClick={() => handleClick(index)}
          className='block w-10 disabled:cursor-not-allowed rounded-md border-0 py-1.5 text-center text-xl text-slate-900 shadow-sm ring-1 ring-inset ring-slate-300 placeholder:text-slate-500 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6'
        />
      ))}
    </div>
  );
};

OTPInput.propTypes = {
  length: PropTypes.number,
  onComplete: PropTypes.func,
  tabIndex: PropTypes.number,
  isValidOtp: PropTypes.bool,
};

export default OTPInput;
