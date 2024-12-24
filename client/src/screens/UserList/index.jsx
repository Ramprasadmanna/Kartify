import {
  ShieldCheckIcon,
  PencilSquareIcon,
  TrashIcon,
  MagnifyingGlassIcon,
} from '@heroicons/react/24/outline';
import { Link, useNavigate, useParams } from 'react-router-dom';

import Alert from '@components/Alert';
import Loader from '@components/Loader';
import {
  useDeleteMutation,
  useDisableUserMutation,
  useEnableUserMutation,
  useGetUsersQuery,
} from '@slices/userApiSlice';
import { BeatLoader } from 'react-spinners';
import { toast } from 'react-toastify';
import Paginate from '@components/Paginate';
import { useState } from 'react';

const UserListScreen = () => {
  const navigate = useNavigate();
  const [search, setSearch] = useState('');
  const [keyword, setKeyword] = useState('');

  const { pageSize, pageNumber } = useParams();

  const { data, error, isLoading, refetch } = useGetUsersQuery({
    pageSize,
    pageNumber,
    keyword,
  });

  const [deleteUser, { isLoading: deleteUserLoading }] = useDeleteMutation();

  const [activateUser, { isLoading: activateUserLoading }] =
    useEnableUserMutation();

  const [deactivateUser, { isLoading: deactivateUserLoading }] =
    useDisableUserMutation();

  const handleDelete = async (user) => {
    if (
      window.confirm(
        `Are you sure You Want To Delete ${user.name} with Id ${user._id}?`
      )
    ) {
      try {
        const res = await deleteUser(user._id).unwrap();
        refetch();
        toast.success(res);
        console.log('DELETE USER', user._id);
      } catch (error) {
        toast.error(error?.data?.message || error?.message);
      }
    }
  };

  const handleDisable = async (user) => {
    if (
      window.confirm(
        `Are you sure You Want To Disable ${user.name} with Id ${user._id}?`
      )
    ) {
      try {
        await deactivateUser(user._id).unwrap();
        refetch();
        toast.warning(`${user.name}'s Account Disabled SucessFully`);
        console.log('DELETE USER', user._id);
      } catch (error) {
        toast.error(error?.data?.message || error?.message);
      }
    }
  };

  const handleEnable = async (user) => {
    if (
      window.confirm(
        `Are you sure You Want To Enable ${user.name} with Id ${user._id}?`
      )
    ) {
      try {
        await activateUser(user._id).unwrap();
        refetch();
        toast.warning(`${user.name}'s Account Activated SucessFully`);
        console.log('ACTIVATE USER', user._id);
      } catch (error) {
        toast.error(error?.data?.message || error?.message);
      }
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('submitted');

    navigate('/admin/userlist');
    setKeyword(search.trim());
  };

  return (
    <div className='bg-white'>
      <div className='mx-auto max-w-2xl px-4 pb-24 pt-16 sm:px-6 lg:max-w-7xl lg:px-8'>
        <div className='flex flex-col gap-4 md:justify-between lg:flex-row'>
          <h1 className='text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl'>
            {keyword ? `Search Result for '${keyword}'` : 'All Users'}
          </h1>

          <div className='flex flex-col gap-4 sm:flex-row lg:w-2/5'>
            <form
              onSubmit={handleSubmit}
              className='flex flex-grow items-center gap-3 rounded-lg bg-slate-200 px-4 py-1.5'>
              <MagnifyingGlassIcon className='h-4 w-4 text-slate-400' />
              <input
                type='search'
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder='Search By Id / Name / Email'
                className='w-full border-none bg-transparent p-1 text-sm placeholder:text-slate-500 focus:ring-0'
              />
            </form>
          </div>
        </div>

        {isLoading ? (
          <Loader />
        ) : error ? (
          <Alert type='error'>{error?.data?.message || error?.message}</Alert>
        ) : data?.users?.length ? (
          <>
            <div className='mt-8 flow-root'>
              <div className='-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8'>
                <div className='inline-block min-w-full py-2 align-middle sm:px-6 lg:px-8'>
                  <table className='min-w-full divide-y divide-gray-300'>
                    <thead>
                      <tr>
                        <th
                          scope='col'
                          className='py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-400 sm:pl-0'>
                          #
                        </th>
                        <th
                          scope='col'
                          className='py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-0'>
                          ID
                        </th>
                        <th
                          scope='col'
                          className='px-3 py-3.5 text-left text-sm font-semibold text-gray-900'>
                          Name
                        </th>
                        <th
                          scope='col'
                          className='px-3 py-3.5 text-left text-sm font-semibold text-gray-900'>
                          Email
                        </th>
                        <th
                          scope='col'
                          className='px-3 py-3.5 text-left text-sm font-semibold text-gray-900'>
                          Admin
                        </th>
                        <th
                          scope='col'
                          className='px-3 py-3.5 text-left text-sm font-semibold text-gray-900'>
                          Actions
                        </th>
                      </tr>
                    </thead>
                    <tbody className='divide-y divide-gray-200'>
                      {data.users.map((user, index) => (
                        <tr key={user._id}>
                          <td className='whitespace-nowrap py-4 pl-4 pr-6 text-sm font-medium text-gray-900 sm:pl-0'>
                            {data.pageSize * (data.page - 1) + index + 1}
                          </td>
                          <td className='whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-0'>
                            {user._id}
                          </td>
                          <td className='whitespace-nowrap px-3 py-4 text-sm text-gray-500'>
                            {user.name}
                          </td>
                          <td className='whitespace-nowrap px-3 py-4 text-sm text-gray-500'>
                            <span className='font-bold'>{user.email}</span>
                          </td>
                          <td className='whitespace-nowrap px-3 py-4 text-sm text-gray-500'>
                            {user.isAdmin ? (
                              <ShieldCheckIcon className='h-5 w-5 text-green-600' />
                            ) : (
                              ''
                            )}
                          </td>
                          <td className='flex gap-3 whitespace-nowrap px-3 py-4 text-sm font-medium text-gray-500'>
                            <Link
                              to={`/admin/user/${user._id}/edit`}
                              className='flex items-center justify-center gap-1 rounded bg-red-50 px-2 py-1 text-sm font-semibold text-indigo-700 shadow-sm ring-1 ring-inset ring-indigo-300 hover:bg-indigo-50'>
                              <PencilSquareIcon className='h-3 w-3' />
                              Edit
                            </Link>
                            {user.isActive ? (
                              <button
                                onClick={() => handleDisable(user)}
                                type='button'
                                disabled={deactivateUserLoading}
                                className='w-24 rounded bg-red-50 px-2 py-1 text-sm font-semibold text-red-700 shadow-sm ring-1 ring-inset ring-red-300 hover:bg-red-50'>
                                {deactivateUserLoading ? (
                                  <BeatLoader size={5} color='#b91c1c' />
                                ) : (
                                  'Deactivate'
                                )}
                              </button>
                            ) : (
                              <button
                                onClick={() => handleEnable(user)}
                                type='button'
                                disabled={activateUserLoading}
                                className='w-24 rounded bg-green-50 px-2 py-1 text-sm font-semibold text-green-700 shadow-sm ring-1 ring-inset ring-green-300 hover:bg-green-50'>
                                {activateUserLoading ? (
                                  <BeatLoader size={5} color='#15803d' />
                                ) : (
                                  'Activate'
                                )}
                              </button>
                            )}
                            <button
                              onClick={() => handleDelete(user)}
                              type='button'
                              disabled={deleteUserLoading}
                              className='flex items-center justify-center gap-1 rounded bg-red-50 px-2 py-1 text-sm font-semibold text-red-700 shadow-sm ring-1 ring-inset ring-red-300 hover:bg-red-50'>
                              <TrashIcon className='h-3 w-3' />
                              {deleteUserLoading ? 'Loading...' : 'Delete'}
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>

            <Paginate
              pages={data?.pages}
              pageSize={data?.pageSize}
              page={data?.page}
              path='/admin/userlist'
            />
          </>
        ) : (
          <Alert type='info'>
            {keyword ? 'No Result Found...' : 'No Users Available...'}
          </Alert>
        )}
      </div>
    </div>
  );
};

export default UserListScreen;
