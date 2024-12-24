import CheckoutSteps from '@components/CheckoutSteps';
import { savePaymentMethod } from '@slices/cartSlice';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

const PaymentScreen = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const cart = useSelector((state) => state.cart);
  const { shippingAddress } = cart;

  const [paymentMethod, setPaymentMethod] = useState(cart?.paymentMethod || '');

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(savePaymentMethod(paymentMethod));
    navigate('/placeorder');
  };

  useEffect(() => {
    if (!shippingAddress) {
      navigate('/shipping');
    }
  }, [shippingAddress, navigate]);

  return (
    <>
      <div className='mt-5 flex justify-center px-6 py-5'>
        <CheckoutSteps step1 step2 step3 />
      </div>
      <div>
        <div className='flex min-h-full flex-1 flex-col justify-center px-6 py-6 lg:px-8'>
          <div className='sm:mx-auto sm:w-full sm:max-w-sm'>
            <h2 className='tracking-light text-center text-2xl font-bold leading-9 text-slate-900'>
              Payment Method
            </h2>
          </div>

          <div className='mt-10 sm:mx-auto sm:w-full sm:max-w-sm'>
            <form onSubmit={handleSubmit} className='space-y-6'>
              <div>
                <div className='mt-6 space-y-6'>
                  <div className='flex items-center gap-x-3'>
                    <input
                      type='radio'
                      id='paypal'
                      name='paymentMethod'
                      required
                      value='Paypal'
                      onChange={(e) => setPaymentMethod(e.target.value)}
                      checked={paymentMethod === 'Paypal'}
                      className='h-4 w-4 font-medium leading-6 text-slate-900'
                    />
                    <label
                      htmlFor='paypal'
                      className='block text-sm font-medium leading-6 text-slate-900'>
                      PayPal or Debit / Credit Card
                    </label>
                  </div>

                  <div className='flex items-center gap-x-3'>
                    <input
                      type='radio'
                      id='razorpay'
                      name='paymentMethod'
                      required
                      value='RazorPay'
                      checked={paymentMethod === 'RazorPay'}
                      onChange={(e) => setPaymentMethod(e.target.value)}
                      className='h-4 w-4 font-medium leading-6 text-slate-900'
                    />
                    <label
                      htmlFor='razorpay'
                      className='block text-sm font-medium leading-6 text-slate-900'>
                      RazorPay or Debit / Credit Card
                    </label>
                  </div>

                  <div>
                    <button
                      type='submit'
                      className='flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600'>
                      Continue
                    </button>
                  </div>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default PaymentScreen;
