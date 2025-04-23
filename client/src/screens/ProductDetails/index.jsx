import { ArrowUturnLeftIcon, StarIcon } from '@heroicons/react/24/outline';
import ReactMarkdown from 'react-markdown';
import { Link, useParams, useNavigate } from 'react-router-dom';
import { useState } from 'react';

import Rating from '@components/ProductCard/Rating';
import QuantitySelector from '@components/QuantitySelector';
import Alert from '@components/Alert';
import Loader from '@components/Loader';
import {
  useGetPublishProductDetailsQuery,
  useReviewProductMutation,
} from '@slices/productApiSlice';
import { useDispatch, useSelector } from 'react-redux';
import { addToCart } from '@slices/cartSlice';
import { toast } from 'react-toastify';

const ProductDetailsScreen = () => {
  // console.log(addToCart);

  const { id: productId } = useParams();
  const { userInfo } = useSelector((state) => state.auth);

  const [quantity, setQuantity] = useState(1);
  const [rating, setRating] = useState(1);
  const [comment, setComment] = useState('');

  const dispatch = useDispatch();
  const navigate = useNavigate();

  dispatch(addToCart({ name: 'shirt', price: 100 }));

  const {
    data: product,
    isLoading,
    isError,
    error,
    refetch,
  } = useGetPublishProductDetailsQuery(productId);

  const [createProductReview, { isLoading: loadingProductReview }] =
    useReviewProductMutation();

  const handelAddToCart = () => {
    dispatch(addToCart({ ...product, quantity }));
    navigate('/cart');
  };

  const handleReviewSubmit = async (e) => {
    e.preventDefault();

    try {
      await createProductReview({
        productId,
        rating,
        comment,
        // user: userInfo._id,
        // name: userInfo.name,
      }).unwrap();
      toast.success('Review submitted successfully');
      setRating(1);
      setComment('');
      refetch();
    } catch (error) {
      toast.error(error?.data?.message || error?.message);
      setRating(1);
      setComment('');
    }
  };

  return (
    <div className='bg-white py-6 pb-16 sm:pb-24'>
      <div className='mx-auto h-full max-w-2xl px-4 sm:px-6 lg:max-w-7xl lg:px-8'>
        <Link
          to='/'
          className='mb-5 flex items-center gap-1.5 text-sm font-medium text-slate-500 transition-colors hover:text-slate-700'>
          <ArrowUturnLeftIcon className='h-3.5 w-3.5' /> Back
        </Link>

        {isLoading ? (
          <Loader />
        ) : isError ? (
          <Alert type='error'>{error.data.message || error.message}</Alert>
        ) : (
          <>
            <div className='mt-8 lg:mt-0 lg:grid lg:grid-cols-12 lg:gap-8'>
              {/* Image Section */}
              <div className='lg:col-span-7'>
                <h2 className='sr-only'>Product Image</h2>
                <img
                  className='rounded-lg'
                  src={product.image}
                  alt={product.name}
                />
              </div>

              {/* Product Details */}
              <div className='mt-5 lg:col-span-5 lg:mt-0'>
                {/* Category,Brand ,Name ,Price */}
                <h6 className='w-fit rounded-full border border-slate-300 px-3 py-0.5 text-xs font-medium text-slate-500'>
                  {product.category}
                </h6>

                <h6 className='mt-8 text-sm font-semibold text-indigo-600'>
                  {product.brand}
                </h6>

                <div className='mt-1 flex justify-between'>
                  <h1 className='text-2xl font-medium text-slate-900'>
                    {product.name}
                  </h1>

                  <p className='text-2xl font-medium text-slate-900'>
                    ₹{product.price}
                  </p>
                </div>

                {/* Ratings */}

                <div className='my-1 flex items-center'>
                  <Rating value={product.rating} />
                  <span className='ml-8 text-sm font-semibold text-slate-700'>
                    {product.numReviews} reviews
                  </span>
                </div>

                {/* Descriptions */}
                <div className='mt-14'>
                  <p className='text-slate-500'>{product.description}</p>
                </div>

                {/* Quantity Selector */}
                <QuantitySelector
                  countInStock={product.countInStock}
                  quantity={quantity}
                  setQuantity={setQuantity}
                />

                {/* Add To Cart */}
                <button
                  onClick={handelAddToCart}
                  className={`mt-8 flex w-full items-center justify-center rounded-md bg-indigo-600 px-3 py-3 text-base font-medium text-white transition-colors hover:bg-indigo-700 ${product.countInStock === 0 && 'cursor-not-allowed opacity-50'}`}
                  disabled={!product.countInStock}>
                  {product.countInStock === 0 ? 'Out Of Stock' : 'Add To Cart'}
                </button>

                {/* Line */}

                <div className='mt-10 border-t' />

                {/* Content */}
                <div className='mt-10'>
                  <h2 className='text-sm font-medium text-slate-500'>
                    Description
                  </h2>

                  <div className='prose prose-sm mt-4 text-slate-500'>
                    <ReactMarkdown>{product.content}</ReactMarkdown>
                  </div>
                </div>
              </div>
            </div>

            {/* Reviews */}

            <div className='mt-16'>
              <h2 className='text-lg font-medium text-gray-900'>
                Recent reviews
              </h2>
              {product?.reviews?.length === 0 ? (
                <p className='mt-5 text-base font-medium text-gray-500'>
                  No reviews yet
                </p>
              ) : (
                <div className='mt-6 space-y-10 divide-y divide-gray-200 border-b border-t border-gray-200 pb-10'>
                  {product.reviews.map((review) => (
                    <div
                      key={review.id}
                      className='pt-10 lg:grid lg:grid-cols-12 lg:gap-x-8'>
                      <div className='lg:col-span-8 lg:col-start-5 xl:col-span-9 xl:col-start-4 xl:grid xl:grid-cols-3 xl:items-start xl:gap-x-8'>
                        <div className='flex items-center xl:col-span-1'>
                          <div className='flex items-center'>
                            {[0, 1, 2, 3, 4].map((rating) => (
                              <StarIcon
                                key={rating}
                                className={`${
                                  review.rating > rating
                                    ? 'text-yellow-400'
                                    : 'text-gray-200'
                                } h-5 w-5 flex-shrink-0`}
                              />
                            ))}
                          </div>
                          <p className='ml-3 text-sm text-gray-700'>
                            {review.rating}
                            <span className='sr-only'> out of 5 stars</span>
                          </p>
                        </div>

                        <div className='mt-4 lg:mt-6 xl:col-span-2 xl:mt-0'>
                          <div className='space-y-6 text-sm text-gray-500'>
                            {review.comment}
                          </div>
                        </div>
                      </div>

                      <div className='mt-6 flex items-center text-sm lg:col-span-4 lg:col-start-1 lg:row-start-1 lg:mt-0 lg:flex-col lg:items-start xl:col-span-3'>
                        <p className='font-medium capitalize text-gray-900'>
                          {review.name}
                        </p>
                        <time
                          dateTime={review.createdAt}
                          className='ml-4 border-l border-gray-200 pl-4 text-gray-500 lg:ml-0 lg:mt-2 lg:border-0 lg:pl-0'>
                          {new Date(review.createdAt).toDateString()}
                        </time>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Review Form */}
            {userInfo ? (
              <form onSubmit={handleReviewSubmit} className='mt-16 max-w-3xl'>
                <h2 className='text-lg font-medium text-slate-900'>
                  Write a review
                </h2>
                <div className='mt-6 space-y-6'>
                  <div className='flex items-center'>
                    <label
                      htmlFor='rating'
                      className='block text-sm font-medium text-slate-700'>
                      Rating
                    </label>
                    <div className='ml-4 flex items-center gap-1'>
                      {[1, 2, 3, 4, 5].map((value) => (
                        <button
                          key={value}
                          type='button'
                          onClick={() => setRating(value)}
                          className={`${
                            rating >= value
                              ? 'text-yellow-400'
                              : 'text-gray-200'
                          } h-6 w-6 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2`}>
                          <StarIcon className='h-6 w-6' />
                        </button>
                      ))}
                    </div>
                  </div>

                  <div>
                    <label
                      htmlFor='comment'
                      className='block text-sm font-medium text-slate-700'>
                      Comment
                    </label>
                    <textarea
                      id='comment'
                      rows={4}
                      required
                      value={comment}
                      onChange={(e) => setComment(e.target.value)}
                      className='mt-1 block w-full rounded-md border border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm'
                    />
                  </div>

                  <button
                    type='submit'
                    className={`${
                      loadingProductReview
                        ? 'cursor-not-allowed opacity-30'
                        : 'hover:bg-indigo-700'
                    } flex items-center justify-center rounded-md border border-transparent bg-indigo-600 px-8 py-2 text-base font-medium text-white focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2`}>
                    Submit
                  </button>
                </div>
              </form>
            ) : (
              <div className='mt-16'>
                <h2 className='text-lg font-medium text-slate-900'>
                  Write a review
                </h2>
                <div className='mt-6'>
                  <p className='text-sm text-slate-500'>
                    Please{' '}
                    <Link
                      to='/login'
                      className='text-indigo-600 hover:underline'>
                      sign in
                    </Link>{' '}
                    to write a review.
                  </p>
                </div>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default ProductDetailsScreen;
