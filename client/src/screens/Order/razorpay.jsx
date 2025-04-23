import Alert from '@components/Alert';
import Loader from '@components/Loader';
import {
  CheckBadgeIcon,
  ExclamationTriangleIcon,
} from '@heroicons/react/24/outline';
import { logout } from '@slices/authSlice';
import {
  useCreateRazorPayOrderMutation,
  useDeliverOrderMutation,
  useGetOrderDetailsQuery,
  useGetRazorPayKeyQuery,
  usePayOrderMutation,
  useVerifyRazorPaySignatureMutation,
} from '@slices/orderApiSlice';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';

const RazorPayScreen = () => {
  const dispatch = useDispatch();

  // Order Id Through Params
  const { id: orderId } = useParams();

  const { userInfo } = useSelector((state) => state.auth);

  // Fetching Order Details
  const {
    data: order,
    isLoading,
    error: orderFetchError,
    refetch,
  } = useGetOrderDetailsQuery(orderId);


  // Pay Order Backend Endpoint
  const [payOrder, { isLoading: loadingPay }] = usePayOrderMutation();

  // Backend Endpoint for Razorpay Key
  const {
    data: razorpay,
    isLoading: loadingRazorPay,
    error: errorRazorPay,
  } = useGetRazorPayKeyQuery();

  // Pay Order Backend Endpoint
  const [createRazorPayOrder, { isLoading: loadingRazorPayCreateOrder }] =
    useCreateRazorPayOrderMutation();

  const [verifySignature, { isLoading: verificationLoading }] =
    useVerifyRazorPaySignatureMutation();

  const [deliverOrder, { isLoading: loadingDeliver }] =
    useDeliverOrderMutation();

  const loadScript = (src) => {
    if (!errorRazorPay && !loadingRazorPay && razorpay.key) {
      if (order && !order.isPaid) {
        return new Promise((resolve, reject) => {
          if (!window.Razorpay) {
            const script = document.createElement('script');
            script.src = src;
            script.onload = () => {
              resolve(true);
            };
            script.onerror = () => {
              reject({
                message: 'Razorpay Load Error Please Refresh The Page',
              });
            };
            document.head.appendChild(script);
          } else {
            resolve(true);
          }
        });
      }
    }
  };

  const handleOrderPayment = async () => {
    try {
      const orderResponse = await createRazorPayOrder({
        amount: +order.totalPrice,
        orderId,
      }).unwrap();

      const loadScriptStatus = await loadScript(
        'https://checkout.razorpay.com/v1/checkout.js'
      );

      if (loadScriptStatus) {
        const options = {
          key: razorpay.key,
          currency: orderResponse.currency,
          amount: `${orderResponse.amount}`,
          order_id: orderResponse.id,
          name: 'Kartify',
          // description: 'Thank you for Purchasing the Food.',
          prefill: {
            name: order.user.name,
            email: order.user.email,
          },
          handler: async function (response) {
            try {
              const details = await verifySignature({
                orderId: response.razorpay_order_id,
                paymentId: response.razorpay_payment_id,
                signature: response.razorpay_signature,
              }).unwrap();
              await payOrder({
                id: orderId,
                details,
                paymentMethod: 'razorpay',
              }).unwrap();
              refetch();
              toast.success('Order paid successfully');
            } catch (err) {
              console.error('Razorpay Verification Failed.....');
              toast.error('Razorpay Payment Failed... Try Again');
            }
          },
        };

        const razorPayObject = new window.Razorpay(options);
        razorPayObject.open();
      } else {
        console.log('load failed');
      }
    } catch (err) {
      console.error(err);
      toast.error(err?.data?.message || err?.message);
    }
  };

  const handleDeliver = async () => {
    try {
      await deliverOrder(orderId);
      refetch();
      toast.success('Order marked as delivered');
    } catch (error) {
      toast.error(error?.data?.message || error?.message);
    }
  };

  useEffect(() => {
    if (orderFetchError && orderFetchError.status === 401) {
      toast.error(orderFetchError?.data?.message);
      dispatch(logout());
    }
  }, [orderFetchError]);

  return isLoading ? (
    <Loader />
  ) : orderFetchError ? (
    <div className='mx-auto max-w-7xl px-4 sm:px-6 lg:px-8'>
      <Alert type='error'>{orderFetchError?.data?.message}</Alert>
    </div>
  ) : (
    <div className='bg-white'>
      <div className='mx-auto max-w-2xl px-4 py-16 pb-24 pt-12 sm:px-6 lg:max-w-7xl lg:px-8'>
        <h1 className='text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl'>
          {userInfo.isAdmin ? (
            <>
              {`${order.user.name}'s Order`}{' '}
              <span className='text-xl font-medium'>({orderId})</span>
            </>
          ) : (
            <>
              Your Order{' '}
              <span className='text-xl font-medium'>({orderId})</span>
            </>
          )}
        </h1>

        <div className='mx-auto max-w-2xl lg:grid lg:max-w-7xl lg:grid-cols-2 lg:gap-x-8 xl:gap-x-24'>
          <div>
            <dl className='mt-14 grid grid-cols-2 gap-x-6 text-sm text-slate-600'>
              <div>
                <dt className='font-medium text-slate-900'>Shipping</dt>
                <dd className='mt-2'>
                  <address className='not-italic'>
                    <span className='block'>
                      {order.shippingAddress.address}
                    </span>
                    <span className='block'>
                      {order.shippingAddress.city},{' '}
                      {order.shippingAddress.postalCode}
                    </span>
                    <span className='block'>
                      {order.shippingAddress.country}
                    </span>
                  </address>

                  <div className='mt-4'>
                    {order?.isDelivered ? (
                      <span className='flex items-center gap-1.5 text-green-600'>
                        <CheckBadgeIcon className='h-4 w-4 text-green-500' />
                        <span>Delivered</span>
                      </span>
                    ) : (
                      <span className='flex items-center gap-1.5 text-red-600'>
                        <ExclamationTriangleIcon className='h-4 w-4 text-red-500' />
                        <span>Not Delivered</span>
                      </span>
                    )}
                  </div>
                </dd>
              </div>
              <div>
                <dt className='font-medium text-slate-900'>Payment</dt>
                <dd className='mt-2'>
                  <span className='capitalize text-slate-900'>
                    {order.paymentMethod}
                  </span>

                  <div className='mt-4'>
                    {order?.isPaid ? (
                      <span className='flex items-center gap-1.5 text-green-600'>
                        <CheckBadgeIcon className='h-4 w-4 text-green-500' />
                        <span>Paid</span>
                      </span>
                    ) : (
                      <span className='flex items-center gap-1.5 text-red-600'>
                        <ExclamationTriangleIcon className='h-4 w-4 text-red-500' />
                        <span>Not Paid</span>
                      </span>
                    )}
                  </div>
                </dd>
              </div>
            </dl>

            <div className='mt-14'>
              <h2 className='text-lg font-medium text-slate-900'>
                Order Items
              </h2>

              <ul className='mt-6 divide-y divide-slate-200 border-t border-slate-200 text-sm font-medium text-slate-500'>
                {order?.orderItems?.map((product) => (
                  <li key={product._id} className='flex space-x-6 py-6'>
                    <img
                      src={product.image}
                      alt={product.name}
                      className='h-24 w-24 flex-none rounded-md bg-slate-100 object-cover object-top'
                    />
                    <div className='flex-auto space-y-1'>
                      <h3 className='text-slate-900'>
                        <Link to={`/product/${product._id}`}>
                          {product.name}
                        </Link>
                      </h3>
                      <p>Quantity: {product.quantity}</p>
                    </div>
                    <p className='flex-none text-right font-medium text-slate-900'>
                      <span className='font-normal text-slate-900'>
                        {product.quantity} x ₹{product.price}{' '}
                      </span>
                      = ₹{product.price * product.quantity}
                    </p>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div>
            <div className='mt-14'>
              <h2 className='text-lg font-medium text-slate-900'>
                Order summary
              </h2>

              <div className='mt-4 rounded-lg border border-slate-200 bg-white shadow-sm'>
                <dl className='space-y-6 border-t border-gray-200 px-4 py-6 sm:px-6'>
                  <div className='flex items-center justify-between'>
                    <dt className='text-sm'>Items</dt>
                    <dd className='text-sm font-medium text-gray-900'>
                      ₹{order.itemsPrice}
                    </dd>
                  </div>

                  <div className='flex items-center justify-between'>
                    <dt className='text-sm'>Shipping</dt>
                    <dd className='text-sm font-medium text-gray-900'>
                      ₹{order.shippingPrice}
                    </dd>
                  </div>

                  <div className='flex items-center justify-between'>
                    <dt className='text-sm'>Taxes</dt>
                    <dd className='text-sm font-medium text-gray-900'>
                      ₹{order.taxPrice}
                    </dd>
                  </div>

                  <div className='flex items-center justify-between'>
                    <dt className='text-sm'>Total</dt>
                    <dd className='text-sm font-medium text-gray-900'>
                      ₹{order.totalPrice}
                    </dd>
                  </div>
                </dl>

                {!order.isPaid && (
                  <div className='space-y-6 border-t border-slate-200 px-4 py-6 sm:px-6'>
                    {loadingPay && <Loader />}

                    <div>
                      <button
                        onClick={handleOrderPayment}
                        className='w-full rounded-md bg-indigo-700 p-4 text-center text-white'>
                        {loadingRazorPayCreateOrder
                          ? 'Loading'
                          : 'RazorPay Checkout'}
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Render Only If Order Is Paid */}
            {order.isPaid && (
              <div className='mt-14'>
                <h2 className='text-lg font-medium text-slate-900'>
                  Payment summary
                </h2>

                {order.paymentResult.razorpay.paymentMode === 'card' ? (
                  <div className='mt-4 rounded-lg border border-slate-200 bg-white shadow-sm'>
                    <dl className='space-y-6 border-gray-200 px-4 py-6 sm:px-6'>
                      <div className='flex items-center justify-between'>
                        <dt className='text-sm'>Payment Method</dt>
                        <dd className='text-sm font-medium text-gray-900'>
                          {order.paymentMethod}
                        </dd>
                      </div>

                      <div className='flex items-center justify-between'>
                        <dt className='text-sm'>Payment Mode</dt>
                        <dd className='text-sm font-medium text-gray-900'>
                          {order.paymentResult.razorpay.paymentMode.toUpperCase()}
                        </dd>
                      </div>

                      <div className='flex items-center justify-between'>
                        <dt className='text-sm'>Card Type</dt>
                        <dd className='text-sm font-medium text-gray-900'>
                          {order.paymentResult.razorpay.cardType.toUpperCase()}
                        </dd>
                      </div>

                      <div className='flex items-center justify-between'>
                        <dt className='text-sm'>Card Details</dt>
                        <dd className='text-sm font-medium text-gray-900'>
                          {`${order.paymentResult.razorpay.cardNetwork} Ending With ${order.paymentResult.razorpay.cardEndingWith}`}
                        </dd>
                      </div>

                      <div className='flex items-center justify-between'>
                        <dt className='text-sm'>Payment Id</dt>
                        <dd className='text-sm font-medium text-gray-900'>
                          {order.paymentResult.razorpay.paymentId}
                        </dd>
                      </div>

                      <div className='flex items-center justify-between'>
                        <dt className='text-sm'>Payment Status</dt>
                        <dd className='text-sm font-medium text-green-400'>
                          {order.paymentResult.razorpay.status.toUpperCase()}
                        </dd>
                      </div>

                      <div className='flex items-center justify-between'>
                        <dt className='text-sm'>Payer Email</dt>
                        <dd className='text-sm font-medium text-gray-900'>
                          {order.paymentResult.razorpay.email}
                        </dd>
                      </div>

                      <div className='flex items-center justify-between'>
                        <dt className='text-sm'>Payment Date</dt>
                        <dd className='text-sm font-medium text-gray-900'>
                          {new Date(
                            order.paymentResult.razorpay.paymentDate * 1000
                          ).toLocaleString()}
                        </dd>
                      </div>
                    </dl>
                  </div>
                ) : order.paymentResult.razorpay.paymentMode ===
                  'netbanking' ? (
                  <div className='mt-4 rounded-lg border border-slate-200 bg-white shadow-sm'>
                    <dl className='space-y-6 border-gray-200 px-4 py-6 sm:px-6'>
                      <div className='flex items-center justify-between'>
                        <dt className='text-sm'>Payment Method</dt>
                        <dd className='text-sm font-medium text-gray-900'>
                          {order.paymentMethod}
                        </dd>
                      </div>

                      <div className='flex items-center justify-between'>
                        <dt className='text-sm'>Payment Mode</dt>
                        <dd className='text-sm font-medium text-gray-900'>
                          {order.paymentResult.razorpay.paymentMode.toUpperCase()}
                        </dd>
                      </div>

                      <div className='flex items-center justify-between'>
                        <dt className='text-sm'>Payment Id</dt>
                        <dd className='text-sm font-medium text-gray-900'>
                          {order.paymentResult.razorpay.paymentId}
                        </dd>
                      </div>

                      <div className='flex items-center justify-between'>
                        <dt className='text-sm'>Bank Name</dt>
                        <dd className='text-sm font-medium text-gray-900'>
                          {order.paymentResult.razorpay.bankName.toUpperCase()}
                        </dd>
                      </div>

                      <div className='flex items-center justify-between'>
                        <dt className='text-sm'>Bank Transation Id</dt>
                        <dd className='text-sm font-medium text-gray-900'>
                          {order.paymentResult.razorpay.bankTransationId.toUpperCase()}
                        </dd>
                      </div>

                      <div className='flex items-center justify-between'>
                        <dt className='text-sm'>Payment Status</dt>
                        <dd className='text-sm font-medium text-green-400'>
                          {order.paymentResult.razorpay.status.toUpperCase()}
                        </dd>
                      </div>

                      <div className='flex items-center justify-between'>
                        <dt className='text-sm'>Payer Email</dt>
                        <dd className='text-sm font-medium text-gray-900'>
                          {order.paymentResult.razorpay.email}
                        </dd>
                      </div>

                      <div className='flex items-center justify-between'>
                        <dt className='text-sm'>Payment Date</dt>
                        <dd className='text-sm font-medium text-gray-900'>
                          {new Date(
                            order.paymentResult.razorpay.paymentDate * 1000
                          ).toLocaleString()}
                        </dd>
                      </div>
                    </dl>
                  </div>
                ) : order.paymentResult.razorpay.paymentMode === 'wallet' ? (
                  <div className='mt-4 rounded-lg border border-slate-200 bg-white shadow-sm'>
                    <dl className='space-y-6 border-gray-200 px-4 py-6 sm:px-6'>
                      <div className='flex items-center justify-between'>
                        <dt className='text-sm'>Payment Method</dt>
                        <dd className='text-sm font-medium text-gray-900'>
                          {order.paymentMethod}
                        </dd>
                      </div>

                      <div className='flex items-center justify-between'>
                        <dt className='text-sm'>Payment Mode</dt>
                        <dd className='text-sm font-medium text-gray-900'>
                          {order.paymentResult.razorpay.paymentMode.toUpperCase()}
                        </dd>
                      </div>

                      <div className='flex items-center justify-between'>
                        <dt className='text-sm'>Wallet Name</dt>
                        <dd className='text-sm font-medium text-gray-900'>
                          {order.paymentResult.razorpay.wallet.toUpperCase()}
                        </dd>
                      </div>

                      <div className='flex items-center justify-between'>
                        <dt className='text-sm'>Payment Id</dt>
                        <dd className='text-sm font-medium text-gray-900'>
                          {order.paymentResult.razorpay.paymentId}
                        </dd>
                      </div>

                      <div className='flex items-center justify-between'>
                        <dt className='text-sm'>Payment Status</dt>
                        <dd className='text-sm font-medium text-green-400'>
                          {order.paymentResult.razorpay.status.toUpperCase()}
                        </dd>
                      </div>

                      <div className='flex items-center justify-between'>
                        <dt className='text-sm'>Payer Email</dt>
                        <dd className='text-sm font-medium text-gray-900'>
                          {order.paymentResult.razorpay.email}
                        </dd>
                      </div>

                      <div className='flex items-center justify-between'>
                        <dt className='text-sm'>Payment Date</dt>
                        <dd className='text-sm font-medium text-gray-900'>
                          {new Date(
                            order.paymentResult.razorpay.paymentDate * 1000
                          ).toLocaleString()}
                        </dd>
                      </div>
                    </dl>
                  </div>
                ) : (
                  <div className='mt-4 rounded-lg border border-slate-200 bg-white shadow-sm'>
                    <dl className='space-y-6 border-gray-200 px-4 py-6 sm:px-6'>
                      <div className='flex items-center justify-between'>
                        <dt className='text-sm'>Payment Method</dt>
                        <dd className='text-sm font-medium text-gray-900'>
                          {order.paymentMethod}
                        </dd>
                      </div>

                      <div className='flex items-center justify-between'>
                        <dt className='text-sm'>Payment Mode</dt>
                        <dd className='text-sm font-medium text-gray-900'>
                          {order.paymentResult.razorpay.paymentMode.toUpperCase()}
                        </dd>
                      </div>

                      <div className='flex items-center justify-between'>
                        <dt className='text-sm'>UPI Id</dt>
                        <dd className='text-sm font-medium text-gray-900'>
                          {order.paymentResult.razorpay.upiId}
                        </dd>
                      </div>

                      <div className='flex items-center justify-between'>
                        <dt className='text-sm'>UPI Transation Id</dt>
                        <dd className='text-sm font-medium text-gray-900'>
                          {order.paymentResult.razorpay.upiTransationId}
                        </dd>
                      </div>

                      <div className='flex items-center justify-between'>
                        <dt className='text-sm'>Payment Id</dt>
                        <dd className='text-sm font-medium text-gray-900'>
                          {order.paymentResult.razorpay.paymentId}
                        </dd>
                      </div>

                      <div className='flex items-center justify-between'>
                        <dt className='text-sm'>Payment Status</dt>
                        <dd className='text-sm font-medium text-green-400'>
                          {order.paymentResult.razorpay.status.toUpperCase()}
                        </dd>
                      </div>

                      <div className='flex items-center justify-between'>
                        <dt className='text-sm'>Payer Email</dt>
                        <dd className='text-sm font-medium text-gray-900'>
                          {order.paymentResult.razorpay.email}
                        </dd>
                      </div>

                      <div className='flex items-center justify-between'>
                        <dt className='text-sm'>Payment Date</dt>
                        <dd className='text-sm font-medium text-gray-900'>
                          {new Date(
                            order.paymentResult.razorpay.paymentDate * 1000
                          ).toLocaleString()}
                        </dd>
                      </div>
                    </dl>
                  </div>
                )}
              </div>
            )}

            {/* For Admin To Mark Order as Delivered */}
            <div className='mt-6'>
              {loadingDeliver && <Loader />}

              {userInfo &&
                userInfo.isAdmin &&
                order.isPaid &&
                !order.isDelivered && (
                  <button
                    onClick={handleDeliver}
                    className='w-full rounded-md border border-transparent bg-indigo-600 px-4 py-3 text-base font-medium text-white shadow-sm transition-all hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 focus:ring-offset-gray-50'>
                    Mark as delivered
                  </button>
                )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RazorPayScreen;
