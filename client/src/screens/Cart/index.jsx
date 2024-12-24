import Alert from '@components/Alert';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import CartItem from './CartItem';
import { addToCart, refreshCart, removeFromCart } from '@slices/cartSlice';
import Summary from './Summary';
import { useGetCartProductMutation } from '@slices/productApiSlice';
import Loader from '@components/Loader';
import { toast } from 'react-toastify';
import { useEffect } from 'react';
import store from '../../store';

const CartScreen = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const cart = useSelector((state) => state.cart);
  const { cartItems } = cart;

  const [getCartProduct, { isLoading: getCartLoading, isError, error }] =
    useGetCartProductMutation();

  const fetchData = async () => {
    try {
      const latestData = store.getState().cart.cartItems;
      const itemIds = latestData.map((product) => product._id);

      const cartData = await getCartProduct(itemIds).unwrap();
      if (cartData) {
        dispatch(refreshCart(cartData));
      }
    } catch (error) {
      toast.error(error?.data?.message || error?.message);
    }
  };

  const handleAddToCart = (prodouct, quantity) => {
    dispatch(addToCart({ ...prodouct, quantity }));
    fetchData();
  };

  const handleRemoveFromCart = (productId) => {
    dispatch(removeFromCart(productId));
    fetchData();
  };

  const handleCheckout = () => {
    fetchData();
    navigate('/login?redirect=/shipping');
  };

  useEffect(() => {
    if (cartItems.length) {
      fetchData();
    }
  }, []);

  return (
    <div className='bg-white'>
      <div className='mx-auto px-4 py-10 pb-24 sm:px-6 lg:max-w-7xl lg:px-8'>
        <h1 className='text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl'>
          Shopping Cart
        </h1>

        {cartItems.length ? (
          getCartLoading ? (
            <Loader />
          ) : isError ? (
            <Alert type='warning'>
              {error?.data?.message || error?.message}
            </Alert>
          ) : (
            <div className='mt-10 lg:grid lg:grid-cols-12 lg:items-start lg:gap-x-12 xl:gap-x-16'>
              <section className='lg:col-span-7'>
                <ul className='divide-y divide-slate-200 border-b border-t border-slate-200'>
                  {cartItems.map((product) => (
                    <CartItem
                      product={product}
                      key={product._id}
                      handleAddToCart={handleAddToCart}
                      handleRemoveFromCart={handleRemoveFromCart}
                    />
                  ))}
                </ul>
              </section>

              {/* Summary Details */}
              <Summary
                cartItems={cartItems}
                itemsPrice={cart.itemsPrice}
                shippingPrice={cart.shippingPrice}
                taxPrice={cart.taxPrice}
                totalPrice={cart.totalPrice}
                handleCheckout={handleCheckout}
              />
            </div>
          )
        ) : (
          <Alert>Your Cart Is Empty</Alert>
        )}
      </div>
    </div>
  );
};

export default CartScreen;
