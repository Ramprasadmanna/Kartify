import CategoryImageBox from './CategoryImageBox';
import LinkItem from './LinkItem';

const MenMegaMenuDisplay = () => {
  return (
    <section className='border-t'>
      <div className='relative z-50 mx-auto hidden max-w-7xl gap-10 bg-white px-3 py-8 sm:px-6 lg:flex lg:px-8'>
        <div className='grid w-full grid-cols-12 gap-8'>
          <div className='col-span-2'>
            <h6 className='mb-6 text-sm font-semibold text-slate-900'>
              Categories
            </h6>
            <ul className='flex flex-col gap-y-3'>
              <LinkItem url='#' label="Men's Fashion" />
              <LinkItem url='#' label='New Arrivals' />
              <LinkItem url='#' label='Clothing' />
              <LinkItem url='#' label='Footwear' />
              <LinkItem url='#' label='Watches' />
              <LinkItem url='#' label='Jewellery' />
              <LinkItem url='#' label='Backpacks' />
              <LinkItem url='#' label='Luggage' />
            </ul>
          </div>

          <div className='col-span-2'>
            <h6 className='mb-6 text-sm font-semibold text-slate-900'>
              Top Brands
            </h6>
            <ul className='flex flex-col gap-y-3'>
              <LinkItem url='#' label='Nike' />
              <LinkItem url='#' label='Tommy Hilfiger' />
              <LinkItem url='#' label='Skechers' />
              <LinkItem url='#' label='Converse' />
              <LinkItem url='#' label='Puma' />
              <LinkItem url='#' label='Adidas' />
              <LinkItem url='#' label='Under Armor' />
              <LinkItem url='#' label='Jack & Jones' />
            </ul>
          </div>

          <div className='col-span-5'>
            <CategoryImageBox
              url='#'
              label='Luxury Watches'
              imageUrl='/images/men-watches-category.jpg'
              height='h-72'
            />
          </div>

          <div className='col-span-3'>
            <CategoryImageBox
              url='#'
              label="Men's Suits"
              imageUrl='/images/mens-suit-category.jpg'
              height='h-72'
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default MenMegaMenuDisplay;
