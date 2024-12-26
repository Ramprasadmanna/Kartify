import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useLocation, useNavigate } from 'react-router-dom';

import { setCredentials } from '@slices/authSlice';
import {
  useRegisterMutation,
  useGetOtpMutation,
  useVerifyOtpMutation,
} from '@slices/userApiSlice';
import { toast } from 'react-toastify';
import OTPInput from '@components/OTP';
import { CheckBadgeIcon, XCircleIcon } from '@heroicons/react/24/outline';
import { ClipLoader } from 'react-spinners';

const RegisterScreen = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [name, setName] = useState('');

  const [email, setEmail] = useState('');
  const [validEmail, setValidEmail] = useState(false);

  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const [showOtp, setShowOtp] = useState(false);
  const [isValidOtp, setisValidOtp] = useState(false);

  const [register, { isLoading }] = useRegisterMutation();
  const { userInfo } = useSelector((state) => state.auth);

  const { search } = useLocation();
  const sp = new URLSearchParams(search);
  const redirect = sp.get('redirect') || '/';

  const [getOtp, { isLoading: otpGettingLoading }] = useGetOtpMutation();
  const [verifyOtpServer, { isLoading: otpVerifyLoading, isError }] =
    useVerifyOtpMutation();

  useEffect(() => {
    if (userInfo) {
      navigate(redirect);
    }
  }, [userInfo, redirect, navigate]);

  const verifyEmail = (email) => {
    setEmail(email);
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    setValidEmail(emailRegex.test(email));
  };

  const sendOtp = async () => {
    try {
      const res = await getOtp({ email }).unwrap();
      setShowOtp(true);
      toast.success(`OTP is Send To ${res.email}`);
    } catch (error) {
      console.error(error);
      toast.error(error?.data?.message);
    }
  };

  const verifyOtp = async (otp) => {
    try {
      await verifyOtpServer({ email, otp }).unwrap();
      setisValidOtp(true);
    } catch (error) {
      console.error(error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      toast.error('Passwords do not match');
      return;
    } else {
      try {
        const response = await register({
          name,
          email,
          password,
          isValidOtp,
        }).unwrap();
        dispatch(setCredentials({ ...response }));
        toast.success(`Registration SucessFull`);
        toast.success(`Welcome ${response.name}`);
        // navigate(redirect);
      } catch (error) {
        console.error(error);
        toast.error(error?.data?.message);
      }
    }
  };

  return (
    <div className='mt-10'>
      <div className='flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8'>
        <div className='sm:mx-auto sm:w-full sm:max-w-sm'>
          <h2 className='tracking-light mt-10 text-center text-2xl font-bold leading-9 text-slate-900'>
            Register for an account
          </h2>
        </div>

        <div className='mt-10 overflow-hidden sm:mx-auto sm:w-full sm:max-w-sm'>
          <form onSubmit={handleSubmit} className='space-y-6'>
            <div>
              <label
                htmlFor='name'
                className='block text-sm font-medium leading-6 text-slate-900'>
                Full Name
              </label>
              <div className='mt-2'>
                <input
                  tabIndex={1}
                  type='text'
                  id='name'
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className='block w-full rounded-md border-0 py-1.5 text-slate-900 shadow-sm ring-1 ring-inset ring-slate-300 placeholder:text-slate-500 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6'
                />
              </div>
            </div>

            <div>
              <label
                htmlFor='email'
                className='block text-sm font-medium leading-6 text-slate-900'>
                Email address
              </label>
              <div className='mt-2 flex gap-2'>
                <input
                  tabIndex={2}
                  type='email'
                  id='email'
                  required
                  value={email}
                  onChange={(e) => verifyEmail(e.target.value.toLowerCase())}
                  disabled={isValidOtp}
                  className='block w-full rounded-md border-0 py-1.5 text-slate-900 shadow-sm ring-1 ring-inset ring-slate-300 placeholder:text-slate-500 focus:ring-2 focus:ring-inset focus:ring-indigo-600 disabled:cursor-not-allowed sm:text-sm sm:leading-6'
                />
                <button
                  disabled={otpGettingLoading || isValidOtp}
                  onClick={sendOtp}
                  className={`flex w-0 shrink-0 items-center justify-center overflow-hidden rounded-md bg-indigo-600 py-1.5 text-sm font-semibold transition-all ease-in-out ${validEmail && 'w-fit px-3'} leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 disabled:cursor-not-allowed ${isLoading && 'cursor-not-allowed'}`}>
                  {otpGettingLoading ? (
                    <ClipLoader size={20} speedMultiplier={1} color='#ffff' />
                  ) : (
                    'Verify'
                  )}
                </button>
              </div>
            </div>

            {showOtp && (
              <div>
                <label
                  htmlFor='email'
                  className='block text-sm font-medium leading-6 text-slate-900'>
                  OTP{' '}
                </label>
                <div className='mt-2 flex gap-2'>
                  <OTPInput
                    length={6}
                    onComplete={verifyOtp}
                    tabIndex={3}
                    isValidOtp={isValidOtp}
                  />
                </div>

                {otpVerifyLoading && (
                  <small className='mt-2 flex gap-2 text-xs font-medium text-orange-400'>
                    <ClipLoader size={15} speedMultiplier={1} color='#fb923c' />{' '}
                    Verifying OTP
                  </small>
                )}

                {isValidOtp && (
                  <small className='mt-2 flex gap-1 text-xs font-medium text-green-400'>
                    <CheckBadgeIcon className='h-4 w-4' /> OTP Verified
                  </small>
                )}

                {isError && (
                  <small className='mt-2 flex gap-1 text-xs font-medium text-red-500'>
                    <XCircleIcon className='h-4 w-4' />
                    Wrong OTP
                  </small>
                )}
              </div>
            )}

            <div>
              <label
                htmlFor='password'
                className='block text-sm font-medium leading-6 text-slate-900'>
                Password
              </label>
              <div className='mt-2'>
                <input
                  tabIndex={9}
                  type='password'
                  id='password'
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className='block w-full rounded-md border-0 py-1.5 text-slate-900 shadow-sm ring-1 ring-inset ring-slate-300 placeholder:text-slate-500 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6'
                />
              </div>
            </div>

            <div>
              <label
                htmlFor='confirmPassword'
                className='block text-sm font-medium leading-6 text-slate-900'>
                Confirm Password
              </label>
              <div className='mt-2'>
                <input
                  tabIndex={10}
                  type='password'
                  id='confirmPassword'
                  required
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  className='block w-full rounded-md border-0 py-1.5 text-slate-900 shadow-sm ring-1 ring-inset ring-slate-300 placeholder:text-slate-500 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6'
                />
              </div>
            </div>

            <div>
              <button
                disabled={isLoading}
                type='submit'
                className={`flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 ${isLoading && 'cursor-not-allowed'}`}>
                {isLoading ? 'Loading...' : 'Register'}
              </button>
            </div>
          </form>

          <p className='mt-10 text-center text-sm text-gray-500'>
            Already a customer?{' '}
            <Link
              to='/login'
              className='font-semibold leading-6 text-indigo-600 hover:text-indigo-500'>
              Click here to login
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default RegisterScreen;
