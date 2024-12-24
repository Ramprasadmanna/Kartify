import { Link, useNavigate, useParams } from 'react-router-dom';

import Alert from '@components/Alert';
import Loader from '@components/Loader';
import {
  useCreateProductMutation,
  useDeleteProductMutation,
  useGetAllProductsQuery,
  usePublishProductMutation,
  useUnPublishProductMutation,
} from '@slices/productApiSlice';
import { toast } from 'react-toastify';
import {
  MagnifyingGlassIcon,
  PencilSquareIcon,
  TrashIcon,
} from '@heroicons/react/24/outline';
import { BeatLoader } from 'react-spinners';
import Paginate from '@components/Paginate';
import { useState } from 'react';

const ProductListScreen = () => {
  const navigate = useNavigate();
  const [search, setSearch] = useState('');
  const [keyword, setKeyword] = useState('');

  const { pageSize, pageNumber } = useParams();

  const { data, error, isLoading, refetch } = useGetAllProductsQuery({
    pageSize,
    pageNumber,
    keyword,
  });

  const [createProduct, { isLoading: loadingCreate }] =
    useCreateProductMutation();

  const [publishProduct, { isLoading: publishLoading }] =
    usePublishProductMutation();

  const [unPublishProduct, { isLoading: unPublishLoading }] =
    useUnPublishProductMutation();

  const [deleteProduct, { isLoading: deleteLoading }] =
    useDeleteProductMutation();

  const handleCreateProduct = async () => {
    if (window.confirm('Are You Sure Want To Create A New Product..?')) {
      try {
        const response = await createProduct().unwrap();
        refetch();
        toast.success(`Product Created SucessFully With Id :${response._id}`);
      } catch (error) {
        toast.error(error?.data?.message || error?.message);
      }
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this product?')) {
      try {
        await deleteProduct(id).unwrap();
        toast.success('Product Deleted SucessFully');
        refetch();
      } catch (error) {
        toast.error(error?.data?.message || error?.message);
      }
    }
  };

  const handlePublish = async (id) => {
    try {
      const response = await publishProduct(id).unwrap();
      toast.success(`Product : ${response._id} is Published`);
      refetch();
    } catch (error) {
      toast.error(error?.data?.message || error?.message);
    }
  };

  const handleUnPublish = async (id) => {
    try {
      const response = await unPublishProduct(id).unwrap();
      toast.warning(`Product : ${response._id} is UnPublished`);
      refetch();
    } catch (error) {
      toast.error(error?.data?.message || error?.message);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    navigate('/admin/productlist');
    setKeyword(search.trim());
  };

  return (
    <div className='bg-white'>
      <div className='mx-auto max-w-2xl px-4 pb-24 pt-16 sm:px-6 lg:max-w-7xl lg:px-8'>
        <div className='flex flex-col gap-4 md:justify-between lg:flex-row'>
          <h1 className='text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl'>
            {keyword ? `Search Result for '${keyword}'` : 'All Products'}
          </h1>

          <div className='flex flex-col gap-4 sm:flex-row'>
            <button
              onClick={handleCreateProduct}
              type='submit'
              className='rounded-md border border-transparent bg-indigo-600 px-4 py-2 text-base font-medium text-white shadow-sm transition-all hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 focus:ring-offset-gray-50'>
              {loadingCreate ? 'Loading...' : 'Create Product'}
            </button>

            <form
              onSubmit={handleSubmit}
              className='flex flex-grow items-center gap-3 rounded-lg bg-slate-200 px-4 py-1.5'>
              <MagnifyingGlassIcon className='h-4 w-4 text-slate-400' />
              <input
                type='search'
                placeholder='Search By Id / Name / Brand'
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className='w-full border-none bg-transparent p-1 text-sm placeholder:text-slate-500 focus:ring-0'
              />
            </form>
          </div>
        </div>

        {isLoading ? (
          <Loader />
        ) : error ? (
          <Alert type='error'>{error?.data?.message || error?.message}</Alert>
        ) : data?.products?.length ? (
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
                          Price
                        </th>
                        <th
                          scope='col'
                          className='px-3 py-3.5 text-left text-sm font-semibold text-gray-900'>
                          Category
                        </th>
                        <th
                          scope='col'
                          className='px-3 py-3.5 text-left text-sm font-semibold text-gray-900'>
                          Brand
                        </th>
                        <th
                          scope='col'
                          className='whitespace-nowrap px-3 py-3.5 text-left text-sm font-semibold text-gray-900'>
                          In Stock
                        </th>
                        <th
                          scope='col'
                          className='px-3 py-3.5 text-left text-sm font-semibold text-gray-900'>
                          Action
                        </th>
                      </tr>
                    </thead>
                    <tbody className='divide-y divide-gray-200'>
                      {data.products.map((product, index) => (
                        <tr key={product._id}>
                          <td className='whitespace-nowrap py-4 pl-4 pr-6 text-sm font-medium text-gray-900 sm:pl-0'>
                            {data.pageSize * (data.page - 1) + index + 1}
                          </td>
                          <td className='whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-0'>
                            {product._id}
                          </td>
                          <td className='whitespace-nowrap px-3 py-4 text-sm text-gray-500'>
                            {product.name}
                          </td>
                          <td className='whitespace-nowrap px-3 py-4 text-sm text-gray-500'>
                            <span className='font-bold'>
                              ₹{product.price.toLocaleString('en-IN')}
                            </span>
                          </td>
                          <td className='whitespace-nowrap px-3 py-4 text-sm text-gray-500'>
                            {product.category}
                          </td>
                          <td className='whitespace-nowrap px-3 py-4 text-sm text-gray-500'>
                            {product.brand}
                          </td>
                          <td
                            className={`whitespace-nowrap px-3 py-4 text-sm font-medium text-white ${product.countInStock === 0 ? 'bg-red-700' : product.countInStock <= 10 ? 'bg-red-500' : product.countInStock <= 20 ? 'bg-orange-500' : 'bg-green-500'}`}>
                            {product.countInStock}
                          </td>
                          <td className='flex gap-3 whitespace-nowrap px-3 py-4 text-sm font-medium text-gray-500'>
                            <Link
                              to={`/admin/product/${product._id}/edit`}
                              className='flex items-center gap-1 rounded bg-red-50 px-2 py-1 text-sm font-semibold text-indigo-700 shadow-sm ring-1 ring-inset ring-indigo-300 hover:bg-indigo-50'>
                              <PencilSquareIcon className='h-3 w-3' />
                              Edit
                            </Link>

                            {product.publish ? (
                              <button
                                onClick={() => handleUnPublish(product._id)}
                                type='button'
                                disabled={unPublishLoading}
                                className='flex-grow rounded bg-red-50 px-2 py-1 text-sm font-semibold text-red-700 shadow-sm ring-1 ring-inset ring-red-300 hover:bg-red-50'>
                                {unPublishLoading ? (
                                  <BeatLoader size={5} color='##b91c1c' />
                                ) : (
                                  'UnPublish'
                                )}
                              </button>
                            ) : (
                              <button
                                onClick={() => handlePublish(product._id)}
                                type='button'
                                disabled={publishLoading}
                                className='flex-grow rounded bg-green-50 px-2 py-1 text-sm font-semibold text-green-700 shadow-sm ring-1 ring-inset ring-green-300 hover:bg-green-50'>
                                {publishLoading ? (
                                  <BeatLoader size={5} color='#15803d' />
                                ) : (
                                  'Publish'
                                )}
                              </button>
                            )}

                            <button
                              onClick={() => handleDelete(product._id)}
                              type='button'
                              disabled={deleteLoading}
                              className='flex items-center gap-1 rounded bg-red-50 px-2 py-1 text-sm font-semibold text-red-700 shadow-sm ring-1 ring-inset ring-red-300 hover:bg-red-50'>
                              <TrashIcon className='h-3 w-3' />
                              {deleteLoading ? 'Deleting...' : 'Delete'}
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
              path='/admin/productlist'
            />
          </>
        ) : (
          <Alert type='info'>
            {keyword ? 'No Result Found...' : 'No Products Available...'}
          </Alert>
        )}
      </div>
    </div>
  );
};

export default ProductListScreen;
