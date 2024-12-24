import { MagnifyingGlassIcon } from '@heroicons/react/24/outline';
import { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

const MobileSearchBar = () => {
  const navigate = useNavigate();
  const { keyword: urlKeyword } = useParams();

  const [keyword, setKeyword] = useState(urlKeyword || '');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (keyword.trim()) {
      navigate(`/search/${keyword.trim()}`);
    } else {
      navigate('/');
    }
  };
  return (
    <form
      onSubmit={handleSubmit}
      className='mx-3 mb-3 flex flex-grow items-center gap-3 rounded-lg bg-slate-200 px-4 py-1.5 md:hidden'>
      <MagnifyingGlassIcon className='h-4 w-4 text-slate-400' />
      <input
        type='search'
        value={keyword}
        onChange={(e) => setKeyword(e.target.value)}
        placeholder='What are you looking for?'
        className='w-full border-none bg-transparent p-1 text-sm outline-none placeholder:text-slate-500 focus:ring-0'
      />
    </form>
  );
};

export default MobileSearchBar;
