import CategoryImageBox from './CategoryImageBox';

const AllCategoryMenuDisplay = () => {
  return (
    <div className='border-t'>
      <div className='mx-auto hidden max-w-7xl bg-white px-3 py-8 sm:px-6 lg:flex lg:px-8'>
        <div className='grid w-full grid-cols-12 gap-8'>
          <div className='col-span-3'>
            <CategoryImageBox
              url='#'
              imageUrl='/images/men-category.jpg'
              label='Men'
            />
          </div>

          <div className='col-span-3'>
            <CategoryImageBox
              url='#'
              imageUrl='/images/women-category.jpg'
              label='Women'
            />
          </div>

          <div className='col-span-3'>
            <CategoryImageBox
              url='#'
              imageUrl='/images/kids-category.jpg'
              label='Kids'
            />
          </div>

          <div className='col-span-3'>
            <CategoryImageBox
              url='#'
              imageUrl='/images/collections-category.jpg'
              label='Collections'
            />
          </div>

          <div className='col-span-3'>
            <CategoryImageBox
              url='#'
              imageUrl='/images/watches-category.jpg'
              label='Watches'
            />
          </div>

          <div className='col-span-3'>
            <CategoryImageBox
              url='#'
              imageUrl='/images/shoes-category.jpg'
              label='Shoes'
            />
          </div>

          <div className='col-span-3'>
            <CategoryImageBox
              url='#'
              imageUrl='/images/accessories-category.jpg'
              label='Accessories'
            />
          </div>

          <div className='col-span-3'>
            <CategoryImageBox
              url='#'
              imageUrl='/images/sale-category.jpg'
              label='Sale'
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default AllCategoryMenuDisplay;
