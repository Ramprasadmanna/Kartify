import {
  ArrowLongLeftIcon,
  ArrowLongRightIcon,
} from '@heroicons/react/24/outline';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

const Paginate = ({ pages, pageSize, page, path, keyword }) => {
  const pathName = path ? path : '';

  return (
    pages > 1 && (
      <nav className='mt-10 flex items-center justify-between border-t border-gray-200 px-4 sm:px-0'>
        <div className='-mt-px flex w-0 flex-1'>
          {page > 1 ? (
            <Link
              to={`${keyword ? `/search/${keyword}/page/${pageSize}/${page - 1}` : `${pathName}/page/${pageSize}/${page - 1}`}`}
              className='inline-flex items-center border-t-2 border-transparent pr-1 pt-4 text-sm font-medium text-gray-500 hover:border-gray-300 hover:text-gray-700'>
              <ArrowLongLeftIcon
                aria-hidden='true'
                className='mr-3 h-5 w-5 text-gray-400'
              />
              Previous
            </Link>
          ) : (
            <span className='inline-flex cursor-not-allowed items-center border-t-2 border-transparent pr-1 pt-4 text-sm font-medium text-gray-300'>
              <ArrowLongLeftIcon
                aria-hidden='true'
                className='mr-3 h-5 w-5 text-gray-300'
              />
              Previous
            </span>
          )}
        </div>
        <div className='hidden md:-mt-px md:flex'>
          {[...Array(pages).keys()].map((x) => (
            <Link
              key={x + 1}
              to={`${keyword ? `/search/${keyword}/page/${pageSize}/${x + 1}` : `${pathName}/page/${pageSize}/${x + 1}`}`}
              // to={`${pathName}/page/${pageSize}/${x + 1}`}
              className={`inline-flex items-center border-t-2 border-transparent px-4 pt-4 text-sm font-medium text-gray-500 hover:border-gray-300 hover:text-gray-700 ${x + 1 === page && 'border-indigo-500 text-indigo-600'}`}>
              {x + 1}
            </Link>
          ))}
        </div>
        <div className='-mt-px flex w-0 flex-1 justify-end'>
          {page < pages ? (
            <Link
              to={`${keyword ? `/search/${keyword}/page/${pageSize}/${page - 1}` : `${pathName}/page/${pageSize}/${page + 1}`}`}
              className='inline-flex items-center border-t-2 border-transparent pl-1 pt-4 text-sm font-medium text-gray-500 hover:border-gray-300 hover:text-gray-700'>
              Next
              <ArrowLongRightIcon
                aria-hidden='true'
                className='ml-3 h-5 w-5 text-gray-400'
              />
            </Link>
          ) : (
            <span className='inline-flex cursor-not-allowed items-center border-t-2 border-transparent pl-1 pt-4 text-sm font-medium text-gray-300'>
              Next
              <ArrowLongRightIcon
                aria-hidden='true'
                className='ml-3 h-5 w-5 text-gray-300'
              />
            </span>
          )}
        </div>
      </nav>
    )
  );
};

Paginate.propTypes = {
  pages: PropTypes.number,
  page: PropTypes.number,
  pageSize: PropTypes.number,
  path: PropTypes.string,
  keyword: PropTypes.string,
};

export default Paginate;
