import OTPInput from '@components/OTP';
import React from 'react';
import { Link } from 'react-router-dom';

const WelcomeScreen = ({ name }) => {
  const order = {
    shippingAddress: {
      address: 'Hubtown Vedant',
      city: 'Mumbai',
      postalCode: '400022',
      country: 'India',
    },
    paymentResult: {
      razorpay: {
        status: 'success',
        paymentMode: 'upi',
        paymentId: 'pay_PXTubvUplRfIRg',
        email: 'admin@example.com',
        paymentDate: '1734272129',
        upiId: 'ashishmanna73@okicici',
        upiTransationId: 'EAB5184D3A22FE25880774A5F143F8C8',
      },
    },
    _id: '675ee4735a93256fbb792886',
    user: {
      _id: '675ee417d1d63921262d1d46',
      name: 'Ramprasad Admin',
      email: 'admin@example.com',
    },
    orderItems: [
      {
        name: "Women's Summer Dress",
        quantity: 1,
        image: '/images/product-1.jpg',
        price: 3999,
        product: '675ee417d1d63921262d1d4a',
        _id: '675ee417d1d63921262d1d4a',
      },
      {
        name: "Women's Casual Blouse",
        quantity: 1,
        image: '/images/product-3.jpg',
        price: 2999,
        product: '675ee417d1d63921262d1d4c',
        _id: '675ee417d1d63921262d1d4c',
      },
    ],
    paymentMethod: 'RazorPay',
    itemsPrice: 6998,
    taxPrice: 1259.64,
    shippingPrice: 0,
    totalPrice: 8257.64,
    isPaid: true,
    isDelivered: true,
    createdAt: '2024-12-15T14:15:15.408Z',
    updatedAt: '2024-12-15T14:15:59.988Z',
    __v: 0,
    deliveredAt: '2024-12-15T14:15:59.986Z',
  };

  const account = {
    _id: '675ee417d1d63921262d1d46',
    name: 'Ramprasad Admin',
    email: 'admin@example.com',
    password: '$2a$10$iqPjoZeRPF0g8ryNgJPQce1CzqCY1ze7ymNtKqVhN8RH.0WA5sRY2',
    isAdmin: true,
    isActive: true,
    __v: 0,
    createdAt: '2024-12-15T14:13:43.907Z',
    updatedAt: '2024-12-17T08:15:53.336Z',
  };
  return (
    <>
      <div className='mx-auto max-w-7xl p-16'>
        <OTPInput tabIndex={3} />
      </div>
      
      {/* OTP Component */}
      <div className='mx-auto max-w-7xl border border-red-300 px-6 py-24 sm:px-12'>
        <h1 className='text-center text-4xl font-bold text-indigo-700 sm:text-5xl md:text-6xl'>
          KARTIFY
        </h1>
        <p className='mx-auto mt-12 text-center capitalize lg:max-w-3xl'>
          Here is your one time password to validate your email address
          <br />
        </p>
        <p className='mx-auto mt-6 text-center text-4xl font-semibold capitalize tracking-widest lg:max-w-3xl'>
          123456
        </p>
        <p className='mx-auto mt-6 text-center text-sm font-medium capitalize text-red-400 lg:max-w-3xl'>
          Valid for 10 minutes only
        </p>
      </div>

      {/* Welcome */}
      <div className='mx-auto max-w-7xl border border-red-300 px-6 py-24 sm:px-12'>
        <h1 className='text-center text-4xl font-bold text-indigo-700 sm:text-5xl md:text-6xl'>
          Welcome To KARTIFY !
        </h1>
        <p className='mx-auto mt-12 text-center lg:max-w-3xl'>
          Dear {name}, Your account is ready to go. Explore a wide range of
          products, enjoy exclusive deals, and shop with ease. 🛒 Start your
          shopping journey now at KARTIFY Need help? We're here for you! Happy
          Shopping! 😊"
        </p>
        <div>
          <Link
            to='/'
            className='mx-auto mt-10 block w-fit rounded-md bg-indigo-700 px-4 py-2 text-white'>
            Shop Now
          </Link>
        </div>
      </div>

      {/* Order */}
      <div className='mx-auto max-w-7xl border border-red-300 px-6 py-24 sm:px-12'>
        <h1 className='text-center text-4xl font-bold text-indigo-700 sm:text-5xl md:text-6xl'>
          KARTIFY
        </h1>
        <h2 className='mt-8 text-center text-2xl font-semibold uppercase text-indigo-700 underline underline-offset-4'>
          Order Confirmation
        </h2>
        <p className='mx-auto mt-6 text-center lg:max-w-3xl'>
          <span className='capitalize'>{order.user.name}</span>, thank you for
          your order!
          <br />
          We've received your order and will contact you as soon as your package
          is shipped. You can find your purchase information below.
        </p>

        <h2 className='mt-8 text-center text-2xl font-semibold capitalize text-indigo-700'>
          Order & Billing summary
        </h2>

        <div className='mx-auto mt-6 overflow-hidden rounded-lg border border-slate-200 bg-white shadow-sm lg:max-w-3xl'>
          <dl className='space-y-6 border-gray-200 pt-6'>
            <div className='flex items-center justify-between px-4 sm:px-6'>
              <dt className='text-sm'>Order Date</dt>
              <dd className='text-sm font-medium text-gray-900'>
                {new Date(order.createdAt).toLocaleDateString('en-us', {
                  year: 'numeric',
                  month: 'short',
                  day: 'numeric',
                })}
              </dd>
            </div>

            <div className='flex items-center justify-between px-4 sm:px-6'>
              <dt className='text-sm'>Order ID</dt>
              <dd className='text-sm font-medium text-gray-900'>{order._id}</dd>
            </div>

            <div className='flex items-center justify-between px-4 sm:px-6'>
              <dt className='text-sm'>Payment Method</dt>
              <dd className='text-sm font-medium text-gray-900'>
                {order.paymentMethod}
              </dd>
            </div>

            <div className='flex items-center justify-between px-4 sm:px-6'>
              <dt className='text-sm'>Payment Status</dt>
              <dd className='text-sm font-medium text-green-500'>Success</dd>
            </div>

            <div className='flex items-center justify-between px-4 sm:px-6'>
              <dt className='text-sm'>Items Price</dt>
              <dd className='text-sm font-medium text-gray-900'>
                ₹{order.itemsPrice.toLocaleString()}/-
              </dd>
            </div>

            <div className='flex items-center justify-between px-4 sm:px-6'>
              <dt className='text-sm'>Shipping</dt>
              <dd className='text-sm font-medium text-gray-900'>
                ₹{order.shippingPrice.toLocaleString()}/-
              </dd>
            </div>

            <div className='flex items-center justify-between px-4 sm:px-6'>
              <dt className='text-sm'>Taxes</dt>
              <dd className='text-sm font-medium text-gray-900'>
                ₹{order.taxPrice.toLocaleString()}/-
              </dd>
            </div>

            <div className='flex items-center justify-between bg-indigo-700 px-4 py-3 text-white sm:px-6'>
              <dt className='text-md font-semibold'>Total</dt>
              <dd className='text-md font-semibold'>
                ₹{order.totalPrice.toLocaleString()}/-
              </dd>
            </div>
          </dl>
        </div>
      </div>

      {/* Deactivate */}
      <div className='mx-auto max-w-7xl border border-red-300 px-6 py-24 sm:px-12'>
        <h1 className='text-center text-4xl font-bold text-indigo-700 sm:text-5xl md:text-6xl'>
          KARTIFY
        </h1>
        <p className='mx-auto mt-12 text-center lg:max-w-3xl'>
          Dear {name},Sorry Your account is{' '}
          <span className='font-semibold text-red-500'>DEACTIVATED 🥹</span>
        </p>
      </div>

      {/* Reactivate */}
      <div className='mx-auto max-w-7xl border border-red-300 px-6 py-24 sm:px-12'>
        <h1 className='text-center text-4xl font-bold text-indigo-700 sm:text-5xl md:text-6xl'>
          KARTIFY
        </h1>
        <p className='mx-auto mt-12 text-center lg:max-w-3xl'>
          Dear {name},Congratulations Your account is
          <span className='font-semibold text-green-500'> REACTIVATED 😀</span>
        </p>
      </div>

      {/* Update */}
      <div className='mx-auto max-w-7xl border border-red-300 px-6 py-24 sm:px-12'>
        <h1 className='text-center text-4xl font-bold text-indigo-700 sm:text-5xl md:text-6xl'>
          KARTIFY
        </h1>
        <p className='mx-auto mt-12 text-center lg:max-w-3xl'>
          Dear {name},Congratulations Your account Details Are Updated
        </p>

        <h2 className='mt-8 text-center text-2xl font-semibold capitalize text-indigo-700'>
          Account Details
        </h2>

        <div className='mx-auto mt-6 overflow-hidden rounded-lg border border-slate-200 bg-white shadow-sm lg:max-w-3xl'>
          <dl className='space-y-6 border-gray-200 py-6'>
            <div className='flex flex-col gap-1 px-4 sm:flex-row sm:items-center sm:justify-between sm:px-6'>
              <dt className='text-sm text-slate-500 sm:text-black'>
                Account ID
              </dt>
              <dd className='text-sm font-medium text-gray-900'>
                {account._id}
              </dd>
            </div>

            <div className='flex flex-col gap-1 px-4 sm:flex-row sm:items-center sm:justify-between sm:px-6'>
              <dt className='text-sm text-slate-500 sm:text-black'>Name</dt>
              <dd className='text-sm font-medium text-gray-900'>
                {account.name}
              </dd>
            </div>

            <div className='flex flex-col gap-1 px-4 sm:flex-row sm:items-center sm:justify-between sm:px-6'>
              <dt className='text-sm text-slate-500 sm:text-black'>Email</dt>
              <dd className='text-sm font-medium text-gray-900'>
                {account.email}
              </dd>
            </div>

            <div className='flex flex-col gap-1 px-4 sm:flex-row sm:items-center sm:justify-between sm:px-6'>
              <dt className='text-sm text-slate-500 sm:text-black'>
                Account Created
              </dt>
              <dd className='text-sm font-medium text-gray-900'>
                {new Date(account.createdAt).toLocaleDateString('en-us', {
                  year: 'numeric',
                  month: 'short',
                  day: 'numeric',
                })}
              </dd>
            </div>

            <div className='flex flex-col gap-1 px-4 sm:flex-row sm:items-center sm:justify-between sm:px-6'>
              <dt className='text-sm text-slate-500 sm:text-black'>
                Last Updated
              </dt>
              <dd className='text-sm font-medium text-gray-900'>
                {new Date(account.updatedAt).toLocaleTimeString('en-us', {
                  year: 'numeric',
                  month: 'short',
                  day: 'numeric',
                  hour: '2-digit',
                  minute: '2-digit',
                  hour12: true,
                })}
              </dd>
            </div>
          </dl>
        </div>
      </div>
    </>
  );
};

export default WelcomeScreen;
