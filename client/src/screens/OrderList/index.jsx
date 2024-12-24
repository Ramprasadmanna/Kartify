import Alert from '@components/Alert';
import Loader from '@components/Loader';
import { useGetOrdersQuery } from '@slices/orderApiSlice';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { dateTimeFormatter } from '@utils/dateTimeFormatter';
import Paginate from '@components/Paginate';
import { MagnifyingGlassIcon } from '@heroicons/react/24/outline';
import { useState } from 'react';

const OrderListScreen = () => {
  const navigate = useNavigate();
  const [search, setSearch] = useState('');
  const [keyword, setKeyword] = useState('');

  const { pageSize, pageNumber } = useParams();

  const { data, isLoading, error } = useGetOrdersQuery({
    pageSize,
    pageNumber,
    keyword,
  });

  console.log(data);

  const handleSubmit = (e) => {
    e.preventDefault();
    navigate('/admin/orderlist');
    setKeyword(search.trim());
  };

  return (
    <div className='bg-white'>
      <div className='mx-auto max-w-2xl px-4 pb-24 pt-16 sm:px-6 lg:max-w-7xl lg:px-8'>
        <div className='flex flex-col gap-4 md:justify-between lg:flex-row'>
          <h1 className='text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl'>
            {keyword ? `Search Result for '${keyword}'` : 'All Orders'}
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
                placeholder='Search By Order Id / User Id'
                className='w-full border-none bg-transparent p-1 text-sm placeholder:text-slate-500 focus:ring-0'
              />
            </form>
          </div>
        </div>

        {isLoading ? (
          <Loader />
        ) : error ? (
          <Alert type='error'>{error?.data?.message || error?.message}</Alert>
        ) : data?.orders.length ? (
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
                          User Id
                        </th>
                        <th
                          scope='col'
                          className='px-3 py-3.5 text-left text-sm font-semibold text-gray-900'>
                          User Name
                        </th>
                        <th
                          scope='col'
                          className='px-3 py-3.5 text-left text-sm font-semibold text-gray-900'>
                          Date
                        </th>
                        <th
                          scope='col'
                          className='px-3 py-3.5 text-left text-sm font-semibold text-gray-900'>
                          Payment
                        </th>
                        <th
                          scope='col'
                          className='px-3 py-3.5 text-left text-sm font-semibold text-gray-900'>
                          Total
                        </th>
                        <th
                          scope='col'
                          className='px-3 py-3.5 text-left text-sm font-semibold text-gray-900'>
                          Paid
                        </th>
                        <th
                          scope='col'
                          className='px-3 py-3.5 text-left text-sm font-semibold text-gray-900'>
                          Delivered
                        </th>
                        <th
                          scope='col'
                          className='px-3 py-3.5 text-left text-sm font-semibold text-gray-900'>
                          Details
                        </th>
                      </tr>
                    </thead>
                    <tbody className='divide-y divide-gray-200'>
                      {data.orders.map((order, index) => (
                        <tr key={order._id}>
                          <td className='whitespace-nowrap py-4 pl-4 pr-6 text-sm font-medium text-gray-900 sm:pl-0'>
                            {data.pageSize * (data.page - 1) + index + 1}
                          </td>
                          <td className='whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-0'>
                            {order._id}
                          </td>
                          <td className='whitespace-nowrap px-3 py-4 text-sm capitalize text-gray-500'>
                            {order?.user?._id}
                          </td>
                          <td className='whitespace-nowrap px-3 py-4 text-sm capitalize text-gray-500'>
                            {order?.user?.name}
                          </td>
                          <td className='whitespace-nowrap px-3 py-4 text-sm text-gray-500'>
                            {dateTimeFormatter(order.createdAt)}
                          </td>
                          <td className='whitespace-nowrap px-3 py-4 text-sm text-gray-500'>
                            {order.paymentMethod}
                          </td>
                          <td className='whitespace-nowrap px-3 py-4 text-sm text-gray-500'>
                            <span className='font-bold'>
                              ₹{order.totalPrice.toLocaleString('en-IN')}
                            </span>
                          </td>
                          <td className='whitespace-nowrap px-3 py-4 text-sm text-gray-500'>
                            {order.isPaid ? (
                              <span className='font-semibold text-green-500'>
                                Paid
                              </span>
                            ) : (
                              <span className='font-semibold text-red-500'>
                                Not Paid
                              </span>
                            )}
                          </td>
                          <td className='whitespace-nowrap px-3 py-4 text-sm text-gray-500'>
                            {order.isDelivered ? (
                              <span className='font-semibold text-green-500'>
                                Delivered
                              </span>
                            ) : (
                              <span className='font-semibold text-red-500'>
                                Not Delivered
                              </span>
                            )}
                          </td>
                          <td className='whitespace-nowrap px-3 py-4 text-sm font-medium'>
                            <Link
                              to={`/order/${order._id}/${order.paymentMethod}`}
                              className='text-indigo-600 hover:text-indigo-900'>
                              Details
                            </Link>
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
              path='/admin/orderlist'
            />
          </>
        ) : (
          <Alert type='info'>
            {keyword ? 'No Result Found...' : 'No Orders Available...'}
          </Alert>
        )}
      </div>
    </div>
  );
};

export default OrderListScreen;
