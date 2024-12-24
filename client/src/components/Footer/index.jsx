const Footer = () => {
  return (
    <div className='w-full bg-slate-100'>
      <div className='mx-auto max-w-7xl px-3 py-2 sm:px-6 lg:px-8'>
        <p className='text-center text-sm'>
          © {new Date().getFullYear()} KARTIFY. All Rights Reserved.
        </p>
      </div>
    </div>
  );
};

export default Footer;
