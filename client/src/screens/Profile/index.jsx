import Alert from '@components/Alert';
import Loader from '@components/Loader';
import {
  ArchiveBoxIcon,
  ArchiveBoxXMarkIcon,
  CheckBadgeIcon,
  ExclamationTriangleIcon,
  EyeIcon,
  EyeSlashIcon,
} from '@heroicons/react/24/outline';
import { setCredentials } from '@slices/authSlice';
import { useGetMyOrdersQuery } from '@slices/orderApiSlice';
import { useProfileMutation } from '@slices/userApiSlice';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import { dateTimeFormatter } from '@utils/dateTimeFormatter';

const ProfileScreen = () => {
  const dispatch = useDispatch();

  const { userInfo } = useSelector((state) => state.auth);

  const [name, setName] = useState(userInfo.name);
  const [email, setEmail] = useState(userInfo.email);
  const [passwordEye, setPasswordEye] = useState(false);
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [confirmPasswordEye, setConfirmPasswordEye] = useState(false);

  const [updateProfile, { isLoading: loadingUpdateProfile }] =
    useProfileMutation();

  const {
    data: orders,
    isLoading: loadingOrders,
    error: errorOrders,
  } = useGetMyOrdersQuery();

  const submitHandler = async (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      toast.error('Passwords do not match');
    } else {
      try {
        const response = await updateProfile({
          name,
          email,
          password,
        }).unwrap();
        console.log(response);
        dispatch(setCredentials(response));
        setName(response.name);
        setEmail(response.email);
        toast.success('Profile updated');
      } catch (error) {
        toast.error(error?.data?.message || error?.message);
      }
    }
  };

  return (
    <div className='bg-white'>
      <div className='mx-auto px-4 pb-24 pt-10 sm:px-6 lg:max-w-7xl lg:px-8'>
        <h1 className='text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl'>
          Your Profile
        </h1>

        <form onSubmit={submitHandler}>
          <div className='mt-16 grid grid-cols-1 gap-x-8 gap-y-10 border-b border-gray-900/10 pb-12 md:grid-cols-3'>
            <div>
              <h2 className='text-base font-semibold leading-7 text-gray-900'>
                Personal Information
              </h2>
              <p className='mt-1 text-sm leading-6 text-gray-600'>
                Update your personal information.
              </p>
            </div>

            <div className='grid max-w-2xl grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6 md:col-span-2'>
              <div className='sm:col-span-full'>
                <label
                  htmlFor='full-name'
                  className='block text-sm font-medium leading-6 text-gray-900'>
                  Full Name
                </label>
                <div className='mt-2'>
                  <input
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    id='full-name'
                    type='text'
                    className='block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 transition-all placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6'
                  />
                </div>
              </div>

              <div className='sm:col-span-full'>
                <label
                  htmlFor='email'
                  className='block text-sm font-medium leading-6 text-gray-900'>
                  Email address
                </label>
                <div className='mt-2'>
                  <input
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    id='email'
                    type='email'
                    disabled
                    className='block w-full cursor-not-allowed rounded-md border-0 bg-slate-100 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 transition-all placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6'
                  />
                </div>
              </div>

              <div className='sm:col-span-3'>
                <label
                  htmlFor='password'
                  className='block text-sm font-medium leading-6 text-gray-900'>
                  Password
                </label>
                <div className='mt-2 flex items-center'>
                  <input
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    id='password'
                    type={passwordEye ? 'text' : 'password'}
                    className='block w-full rounded-l-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 transition-all placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6'
                  />
                  <div className='flex items-center self-stretch rounded-r-md bg-slate-200 p-1'>
                    {passwordEye ? (
                      <EyeIcon
                        className='h-5 w-5 cursor-pointer'
                        onClick={() => setPasswordEye(false)}
                      />
                    ) : (
                      <EyeSlashIcon
                        className='h-5 w-5 cursor-pointer'
                        onClick={() => setPasswordEye(true)}
                      />
                    )}
                  </div>
                </div>
              </div>
              <div className='sm:col-span-3'>
                <label
                  htmlFor='confirmPassword'
                  className='block text-sm font-medium leading-6 text-gray-900'>
                  Confirm Password
                </label>
                <div className='mt-2 flex items-center'>
                  <input
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    id='confirmPassword'
                    type={confirmPasswordEye ? 'text' : 'password'}
                    className='block w-full rounded-l-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 transition-all placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6'
                  />
                  <div className='flex items-center self-stretch rounded-r-md bg-slate-200 p-1'>
                    {confirmPasswordEye ? (
                      <EyeIcon
                        className='h-5 w-5 cursor-pointer'
                        onClick={() => setConfirmPasswordEye(false)}
                      />
                    ) : (
                      <EyeSlashIcon
                        className='h-5 w-5 cursor-pointer'
                        onClick={() => setConfirmPasswordEye(true)}
                      />
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className='mt-6 flex items-center justify-end gap-x-6'>
            <button
              type='submit'
              className='rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm transition-all hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600'>
              {loadingUpdateProfile ? 'Loading...' : 'Update'}
            </button>
          </div>
        </form>

        {loadingOrders ? (
          <Loader />
        ) : errorOrders ? (
          <Alert type='error'>
            {errorOrders?.data?.message || errorOrders?.message}
          </Alert>
        ) : (
          <div className='mt-16'>
            <h2 className='text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl'>
              Recent Orders
            </h2>

            {orders.length ? (
              <div className='space-y-20'>
                {[...orders]?.reverse().map((order, i) => (
                  <div key={order._id}>
                    {/* Order Desc */}
                    <div className='mt-16 rounded-lg bg-slate-100 px-4 py-6 sm:px-6'>
                      <dl className='grid grid-cols-2 gap-6 text-sm text-slate-600 sm:gap-6 md:grid-cols-3 lg:flex lg:items-center lg:justify-between lg:gap-8'>
                        <div className='col-span-2 flex gap-4 sm:col-auto lg:flex-shrink-0'>
                          <dt className='hidden opacity-50 lg:block'>
                            #{i + 1}
                          </dt>
                          <div>
                            <dt className='font-medium text-slate-900'>
                              Order ID
                            </dt>
                            <dd className='mt-1'>{order._id}</dd>
                          </div>
                        </div>

                        <div className='lg:flex-shrink-0'>
                          <dt className='font-medium text-slate-900'>
                            Date Placed
                          </dt>
                          <dd className='mt-1'>
                            <time dateTime={order.createdAt}>
                              {dateTimeFormatter(order.createdAt)}
                            </time>
                          </dd>
                        </div>

                        <div className='lg:flex-shrink-0'>
                          <dt className='font-medium text-slate-900'>
                            Order Payment
                          </dt>
                          {order.isPaid ? (
                            <dd className='mt-1 flex items-center gap-2 text-green-400 sm:mt-1'>
                              <CheckBadgeIcon className='h-4 w-4 text-green-500' />
                              <p>Completed</p>
                            </dd>
                          ) : (
                            <dd className='mt-1 flex items-center gap-2 text-red-400 sm:mt-1'>
                              <ExclamationTriangleIcon className='h-4 w-4 text-red-500' />
                              <p>Pending</p>
                            </dd>
                          )}
                        </div>

                        <div className='lg:flex-shrink-0'>
                          <dt className='font-medium text-slate-900'>
                            Delivered At
                          </dt>
                          {order.isDelivered ? (
                            <dd className='mt-1 flex items-center gap-2 text-green-400 sm:mt-1'>
                              <ArchiveBoxIcon className='h-4 w-4 text-green-500' />
                              <p>{dateTimeFormatter(order.deliveredAt)}</p>
                            </dd>
                          ) : (
                            <dd className='mt-1 flex items-center gap-2 text-orange-400 sm:mt-1'>
                              <ArchiveBoxXMarkIcon className='h-4 w-4' />
                              <p>Pending Delivery</p>
                            </dd>
                          )}
                        </div>

                        <div className='lg:flex-shrink-0'>
                          <dt className='font-medium text-slate-900'>
                            Total amount
                          </dt>
                          <dd className='mt-1'>₹{order.totalPrice}</dd>
                        </div>

                        <Link
                          to={`/order/${order._id}/${order.paymentMethod}`}
                          className='col-span-2 rounded-md border border-gray-300 bg-indigo-600 px-4 py-2 text-center text-sm font-medium text-white shadow-sm hover:bg-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 sm:col-auto lg:flex-shrink-0'>
                          View Order Details
                        </Link>
                      </dl>
                    </div>

                    {/* Order Table */}
                    <table className='mt-4 w-full text-slate-900 sm:mt-6'>
                      <caption className='sr-only'>Products</caption>

                      <thead className='border-y text-left text-sm text-slate-500'>
                        <tr>
                          <th
                            scope='col'
                            className='py-2 pl-4 pr-8 font-normal sm:w-2/5 sm:pl-6'>
                            Product
                          </th>
                          <th
                            scope='col'
                            className='hidden w-1/5 py-2 pr-8 font-normal sm:table-cell'>
                            Price
                          </th>
                          <th
                            scope='col'
                            className='hidden w-1/5 py-2 pr-8 font-normal sm:table-cell'>
                            Quantity
                          </th>
                          <th
                            scope='col'
                            className='w-1/5 whitespace-nowrap py-2 pr-4 font-normal sm:pr-6'>
                            Total Price
                          </th>
                        </tr>
                      </thead>

                      <tbody className='divide-y divide-slate-200 border-slate-200 text-sm'>
                        {order?.orderItems?.map((item) => (
                          <tr key={item.product}>
                            <td className='py-3 pl-4 pr-8 sm:pl-6'>
                              <Link to={`/product/${item.product}`}>
                                <div className='flex items-center'>
                                  <img
                                    alt={item.src}
                                    src={item.image}
                                    className='mr-6 h-16 w-16 flex-shrink-0 rounded object-cover object-top'
                                  />
                                  <div>
                                    <div className='font-medium text-slate-900'>
                                      {item.name}
                                    </div>
                                    <div className='mt-1 sm:hidden'>
                                      {item.quantity} x ₹{item.price}
                                    </div>
                                  </div>
                                </div>
                              </Link>
                            </td>
                            <td className='hidden py-3 pr-8 sm:table-cell'>
                              ₹{item.price}
                            </td>
                            <td className='hidden py-3 pr-8 sm:table-cell'>
                              {item.quantity}
                            </td>
                            <td className='py-3 pr-8 sm:table-cell'>
                              ₹{item.quantity * item.price}
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                ))}
              </div>
            ) : (
              <Alert type='info'>
                No Orders Found.{' '}
                <Link to='/cart' className='underline'>
                  Place Order
                </Link>
              </Alert>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default ProfileScreen;
