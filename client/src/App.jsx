import { PayPalScriptProvider } from '@paypal/react-paypal-js';
import { Provider } from 'react-redux';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import Layout from '@components/Layout';
import PrivateRoute from '@components/PrivateRoute';
import AdminRoute from '@components/AdminRoute';
import {
  HomeScreen,
  ErrorScreen,
  ProductDetailsScreen,
  CartScreen,
  LoginScreen,
  RegisterScreen,
  ShippingScreen,
  PaymentScreen,
  PlaceOrderScreen,
  OrderScreen,
  ProfileScreen,
  OrderListScreen,
  ProductListScreen,
  ProductUpdateScreen,
  UserListScreen,
  UserEditScreen,
} from '@screens';

import store from './store';
import { WelcomeScreen } from './screens';



const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout />,
    errorElement: <ErrorScreen />,
    children: [
      {
        index: true,
        element: <HomeScreen />,
      },
      {
        path: '/page/:pageSize/:pageNumber',
        element: <HomeScreen />,
      },
      {
        path: '/search/:keyword',
        element: <HomeScreen />,
      },
      {
        path: '/search/:keyword/:page/:pageSize/:pageNumber',
        element: <HomeScreen />,
      },
      {
        path: 'product/:id',
        element: <ProductDetailsScreen />,
      },
      {
        path: 'cart',
        element: <CartScreen />,
      },
      {
        path: 'login',
        element: <LoginScreen />,
      },
      {
        path: '/register',
        element: <RegisterScreen />,
      },
      {
        path: '/welcome',
        element: <WelcomeScreen />,
      },
      {
        path: '',
        element: <PrivateRoute />,
        children: [
          {
            path: '/shipping',
            element: <ShippingScreen />,
          },
          {
            path: '/payment',
            element: <PaymentScreen />,
          },
          {
            path: '/placeorder',
            element: <PlaceOrderScreen />,
          },
          {
            path: '/order/:id/:paymentGateway',
            element: <OrderScreen />,
          },
          {
            path: '/profile',
            element: <ProfileScreen />,
          },
        ],
      },
      {
        path: '',
        element: <AdminRoute />,
        children: [
          {
            path: '/admin/orderlist',
            element: <OrderListScreen />,
          },
          {
            path: '/admin/orderlist/page/:pageSize/:pageNumber',
            element: <OrderListScreen />,
          },
          {
            path: '/admin/productlist',
            element: <ProductListScreen />,
          },
          {
            path: '/admin/productlist/page/:pageSize/:pageNumber',
            element: <ProductListScreen />,
          },
          {
            path: '/admin/product/:id/edit',
            element: <ProductUpdateScreen />,
          },
          {
            path: '/admin/userList',
            element: <UserListScreen />,
          },
          {
            path: '/admin/userList/page/:pageSize/:pageNumber',
            element: <UserListScreen />,
          },
          {
            path: '/admin/user/:id/edit',
            element: <UserEditScreen />,
          },
        ],
      },
    ],
  },
]);

const App = () => {
  return (
    <>
      <Provider store={store}>
        <PayPalScriptProvider deferLoading={true}>
          <RouterProvider router={router} />
          <ToastContainer
            position='bottom-right'
            autoClose={5000}
            hideProgressBar
            theme='light'
          />
        </PayPalScriptProvider>
      </Provider>
    </>
  );
};

export default App;
