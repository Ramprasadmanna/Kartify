import { ClipLoader } from 'react-spinners';
const Loader = () => {
  return (
    <div className='flex justify-center items-center min-h-96'>
      <ClipLoader color='#4f46e5' size={50} />
    </div>
  );
};

export default Loader;
