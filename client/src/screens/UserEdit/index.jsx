import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';

import Alert from '@components/Alert';
import Loader from '@components/Loader';
import {
  useGetUserDetailsQuery,
  useUpdateUserMutation,
} from '@slices/userApiSlice';
import { useDispatch } from 'react-redux';
import { setCredentials } from '@slices/authSlice';

const UserEditScreen = () => {
  const { id: userId } = useParams();
  const dispatch = useDispatch();

  const navigate = useNavigate();

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [isAdmin, setIsAdmin] = useState(false);


  const {
    data: user,
    error,
    isLoading,
    refetch,
  } = useGetUserDetailsQuery(userId);

  const [updateUser, { isLoading: loadingUpdate }] = useUpdateUserMutation();

  useEffect(() => {
    if (user) {
      setName(user.name);
      setEmail(user.email);
      setIsAdmin(user.isAdmin);
    }
  }, [user]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await updateUser({ userId, name, email, isAdmin });
      toast.success('User updated successfully');
      refetch();
      // navigate('/admin/userlist');
    } catch (error) {
      toast.error(error?.data?.message || error?.message);
    }
  };

  return (
    <div className='bg-white'>
      <div className='mx-auto max-w-2xl px-4 pb-24 pt-10 sm:px-6 lg:max-w-7xl lg:px-8'>
        <h1 className='text-3xl font-bold capitalize tracking-tight text-slate-900 sm:text-4xl'>
          Edit User - {user?.name}
        </h1>

        {isLoading ? (
          <Loader />
        ) : error ? (
          <Alert type='error'>{error?.data?.message || error?.message}</Alert>
        ) : (
          <form className='mx-auto mt-20 max-w-3xl' onSubmit={handleSubmit}>
            <div className='space-y-12'>
              <div className='border-b border-gray-900/10 pb-12'>
                <div className='mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6'>
                  <div className='sm:col-span-full'>
                    <label
                      htmlFor='name'
                      className='block text-sm font-medium leading-6 text-gray-900'>
                      Name
                    </label>
                    <div className='mt-2'>
                      <input
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        id='name'
                        type='text'
                        className='block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6'
                      />
                    </div>
                  </div>

                  <div className='sm:col-span-full'>
                    <label
                      htmlFor='email'
                      className='block text-sm font-medium leading-6 text-gray-900'>
                      Email
                    </label>
                    <div className='mt-2'>
                      <input
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        id='email'
                        type='email'
                        disabled
                        className='block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 disabled:cursor-not-allowed disabled:bg-slate-100 sm:text-sm sm:leading-6'
                      />
                    </div>
                  </div>

                  <div className='sm:col-span-full'>
                    <div className='relative flex gap-x-3'>
                      <div className='flex h-6 items-center'>
                        <input
                          checked={isAdmin}
                          onChange={(e) => setIsAdmin(e.target.checked)}
                          id='isAdmin'
                          name='isAdmin'
                          type='checkbox'
                          disabled={user.isAdmin}
                          className='h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-600'
                        />
                      </div>
                      <div className='text-sm leading-6'>
                        <label
                          htmlFor='isAdmin'
                          className='font-medium text-gray-900'>
                          Is Administrator
                        </label>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className='mt-6 flex items-center justify-end gap-x-6'>
              <button
                type='submit'
                className='rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600'>
                {loadingUpdate ? 'Updating...' : 'Update'}
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};

export default UserEditScreen;
