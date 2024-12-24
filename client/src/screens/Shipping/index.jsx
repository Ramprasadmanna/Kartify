import { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import CheckoutSteps from '@components/CheckoutSteps';
import SelectInput from '@components/SelectInput';
import TextInput from '@components/TextInput';
import countries from '@data/countries';

import { saveShippingAddress } from '@slices/cartSlice';
import { useNavigate } from 'react-router-dom';

const ShippingScreen = () => {
  const cart = useSelector((state) => state.cart);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { shippingAddress } = cart;
  const [address, setAddress] = useState(shippingAddress?.address || '');
  const [city, setCity] = useState(shippingAddress?.city || '');
  const [postalCode, setPostalCode] = useState(
    shippingAddress?.postalCode || ''
  );
  const [country, setCountry] = useState(shippingAddress?.country || 'India');

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(saveShippingAddress({ address, city, postalCode, country }));
    navigate('/payment');
  };

  return (
    <>
      <div className='mt-5 flex justify-center px-6 py-5'>
        <CheckoutSteps step1 step2 />
      </div>

      <div className='flex min-h-full flex-1 flex-col justify-center px-6 py-6 lg:px-8'>
        <div className='sm:mx-auto sm:w-full sm:max-w-sm'>
          <h2 className='tracking-light text-center text-2xl font-bold leading-9 text-slate-900'>
            Shipping
          </h2>
        </div>

        <div className='mt-10 sm:mx-auto sm:w-full sm:max-w-sm'>
          <form onSubmit={handleSubmit} className='flex flex-col gap-6'>
            <TextInput
              label='Address'
              id='Address'
              onChange={(e) => setAddress(e.target.value)}
              value={address}
            />

            <TextInput
              label='City'
              id='City'
              onChange={(e) => setCity(e.target.value)}
              value={city}
            />

            <TextInput
              label='Postal Code'
              id='postalCode'
              onChange={(e) => setPostalCode(e.target.value)}
              value={postalCode}
            />

            <SelectInput
              label='Country'
              id='Country'
              options={countries}
              value={country}
              onChange={(e) => setCountry(e.target.value)}
            />

            <div>
              <button
                type='submit'
                className='flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600'>
                Continue
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default ShippingScreen;
