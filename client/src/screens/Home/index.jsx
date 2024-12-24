import Alert from '@components/Alert';
import Loader from '@components/Loader';
import Paginate from '@components/Paginate';
import ProductCard from '@components/ProductCard';
import { ArrowLeftIcon } from '@heroicons/react/24/outline';
import { useGetPublishProductsQuery } from '@slices/productApiSlice';
import { useNavigate, useParams } from 'react-router-dom';

const HomeScreen = () => {
  const navigate = useNavigate();
  const { keyword, pageSize, pageNumber } = useParams();

  const { data, isLoading, isError, error } = useGetPublishProductsQuery({
    keyword,
    pageSize,
    pageNumber,
  });

  return (
    <>
      <section className='bg-white'>
        <div className='mx-auto max-w-7xl px-3 py-10 sm:px-6 lg:px-8'>
          <div className='flex items-center gap-2'>
            {keyword && (
              <button onClick={() => navigate('/')} type='button'>
                <span className='sr-only'>Go back</span>
                <ArrowLeftIcon className='mr-1 h-5 w-5 text-slate-900' />
              </button>
            )}
            <h1 className='text-2xl font-bold text-slate-900'>
              {keyword ? `Search Results for '${keyword.trim()}'` : 'Latest Products'}
            </h1>
          </div>

          {isLoading ? (
            <Loader />
          ) : isError ? (
            <Alert type='error'>
              {error.data.message ||
                error.message ||
                'Oops! Something Went Wrong'}
            </Alert>
          ) : data.products.length ? (
            <>
              <div className='mt-6 grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4'>
                {data.products.map((prod) => (
                  <ProductCard key={prod._id} product={prod} />
                ))}
              </div>
            </>
          ) : (
            <Alert>No Result Found</Alert>
          )}

          <Paginate
            pages={data?.pages}
            pageSize={data?.pageSize}
            page={data?.page}
            keyword={keyword}
          />
        </div>
      </section>
    </>
  );
};

export default HomeScreen;
