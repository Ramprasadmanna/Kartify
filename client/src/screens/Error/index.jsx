import Footer from '@components/Footer';
import Header from '@components/Header';
import { Link } from 'react-router-dom';

const ErrorScreen = () => {
  return (
    <>
      <div className='flex min-h-screen flex-col'>
        <Header />
        <div className='flex flex-grow items-center justify-center bg-white px-6 py-24 sm:py-32 lg:px-8'>
          <div className='text-center'>
            <p className='text-base font-semibold text-indigo-600'>404</p>
            <h1 className='mt-4 text-3xl font-bold tracking-tight text-slate-900 sm:text-5xl'>
              Page Not Found
            </h1>
            <p className='mt-6 text-base text-slate-600'>
              Sorry, we could not find the page you are looking for.
            </p>

            <Link
              replace
              to='/'
              className='mt-6 inline-block w-fit rounded bg-indigo-600 px-3 py-2 text-sm text-white hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600'>
              Go Back Home
            </Link>
          </div>
        </div>
        <Footer />
      </div>
    </>
  );
};

export default ErrorScreen;
