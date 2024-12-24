import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import ReactMarkdown from 'react-markdown';

import Alert from '@components/Alert';
import Loader from '@components/Loader';
import {
  useGetProductDetailsQuery,
  useUpdateProductMutation,
  useUploadProductImageMutation,
} from '@slices/productApiSlice';

const ProductEditScreen = () => {
  const { id: productId } = useParams();

  const [name, setName] = useState('');
  const [price, setPrice] = useState(0);
  const [brand, setBrand] = useState('');
  const [image, setImage] = useState('');
  const [category, setCategory] = useState('');
  const [countInStock, setCountInStock] = useState(0);
  const [description, setDescription] = useState('');
  const [content, setContent] = useState('');
  const [publish, setPublish] = useState(false);

  const navigate = useNavigate();

  const {
    data: product,
    isLoading,
    error,
  } = useGetProductDetailsQuery(productId);

  const [updateProduct, { isLoading: loadingUpdate }] =
    useUpdateProductMutation();

  const [uploadProductImage, { isLoading: imageUploadLoading }] =
    useUploadProductImageMutation();

  useEffect(() => {
    if (product) {
      setName(product.name);
      setPrice(product.price);
      setImage(product.image);
      setBrand(product.brand);
      setCategory(product.category);
      setCountInStock(product.countInStock);
      setDescription(product.description);
      setContent(product.content);
      setPublish(product.publish);
    }
  }, [product]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (+price === 0) {
      return toast.error('Price Cannot Be 0');
    }

    const updatedProduct = {
      productId,
      name,
      price,
      image,
      brand,
      category,
      countInStock,
      description,
      content,
      publish,
    };

    try {
      await updateProduct(updatedProduct).unwrap();
      toast.success('Product updated successfully');
      navigate(`/admin/productlist`);
    } catch (error) {
      toast.error(error?.data?.message || error?.message);
    }
  };

  const handleUploadFile = async (e) => {
    if (e.target.files.length) {
      const formData = new FormData();
      formData.append('image', e.target.files[0]);
      console.log(formData);

      try {
        const result = await uploadProductImage(formData).unwrap();
        toast.success(result.message);
        setImage(result.image);
      } catch (error) {
        toast.error(
          error?.data?.message || error?.message || 'Something Went Wrong...'
        );
      }
    }
  };

  return (
    <div className='bg-white'>
      <div className='mx-auto max-w-2xl px-4 pb-24 pt-10 sm:px-6 lg:max-w-7xl lg:px-8'>
        <h1 className='text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl'>
          Edit Product - {product?.name}
        </h1>

        {isLoading ? (
          <Loader />
        ) : error ? (
          <Alert type='error'>{error?.data?.message || error?.message}</Alert>
        ) : (
          <form className='mx-auto mt-20 max-w-3xl' onSubmit={handleSubmit}>
            <div className='space-y-12'>
              <div className='border-b border-gray-900/10 pb-12'>
                <div className='mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6'>
                  <div className='sm:col-span-full'>
                    <label
                      htmlFor='name'
                      className='block text-sm font-medium leading-6 text-gray-900'>
                      Name
                    </label>
                    <div className='mt-2'>
                      <input
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        id='name'
                        type='text'
                        className='block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6'
                      />
                    </div>
                  </div>

                  <div className='sm:col-span-full'>
                    <label
                      htmlFor='price'
                      className='block text-sm font-medium leading-6 text-gray-900'>
                      Price
                    </label>
                    <div className='mt-2'>
                      <input
                        value={Number(price).toLocaleString('en-IN')}
                        onChange={(e) =>
                          setPrice(
                            isNaN(Number(e.target.value.replaceAll(',', '')))
                              ? price
                              : Number(e.target.value.replaceAll(',', ''))
                          )
                        }
                        onWheel={(e) => e.target.blur()} // Remove focus
                        id='price'
                        type='text'
                        className='block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6'
                      />
                    </div>
                  </div>

                  <div className='sm:col-span-full'>
                    <label
                      htmlFor='image'
                      className='block text-sm font-medium leading-6 text-gray-900'>
                      Image
                    </label>
                    <div className='mt-2 overflow-hidden rounded-md sm:w-3/6'>
                      {imageUploadLoading ? (
                        <>
                          <Loader />
                          <small>Uploading Image</small>
                        </>
                      ) : (
                        <img
                          alt={name + ' Image'}
                          src={image}
                          id='image'
                          className='block w-full rounded-md border-0 object-cover object-top'
                        />
                      )}
                      <input
                        onChange={(e) => handleUploadFile(e)}
                        type='file'
                        disabled={imageUploadLoading}
                        className='mt-4 block w-full cursor-pointer rounded-md text-sm outline-0 ring-1 ring-inset ring-gray-300 file:border-0 file:bg-indigo-600 file:px-4 file:py-3 file:text-white placeholder:text-gray-400 focus:z-10 focus:outline-0 focus:ring-2 focus:ring-inset focus:ring-indigo-600'
                      />
                    </div>
                  </div>

                  <div className='sm:col-span-full'>
                    <label
                      htmlFor='brand'
                      className='block text-sm font-medium leading-6 text-gray-900'>
                      Brand
                    </label>
                    <div className='mt-2'>
                      <input
                        value={brand}
                        onChange={(e) => setBrand(e.target.value)}
                        id='brand'
                        type='text'
                        className='block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6'
                      />
                    </div>
                  </div>

                  <div className='sm:col-span-full'>
                    <label
                      htmlFor='countInStock'
                      className='block text-sm font-medium leading-6 text-gray-900'>
                      Count in stock
                    </label>
                    <div className='mt-2'>
                      <input
                        value={countInStock}
                        onChange={(e) =>
                          setCountInStock(Math.max(+e.target.value, 0))
                        }
                        onWheel={(e) => e.target.blur()} // Remove focus
                        id='countInStock'
                        type='number'
                        className='block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 [appearance:textfield] placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none'
                      />
                    </div>
                  </div>

                  <div className='sm:col-span-full'>
                    <label
                      htmlFor='category'
                      className='block text-sm font-medium leading-6 text-gray-900'>
                      Category
                    </label>
                    <div className='mt-2'>
                      <input
                        value={category}
                        onChange={(e) => setCategory(e.target.value)}
                        id='category'
                        type='text'
                        className='block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6'
                      />
                    </div>
                  </div>

                  <div className='col-span-full'>
                    <label
                      htmlFor='description'
                      className='block text-sm font-medium leading-6 text-gray-900'>
                      Description
                    </label>
                    <div className='mt-2'>
                      <textarea
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        id='description'
                        rows={3}
                        className='block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6'
                      />
                    </div>
                    <p className='mt-3 text-sm leading-6 text-gray-600'>
                      Short description of the product.
                    </p>
                  </div>

                  <div className='col-span-full'>
                    <label
                      htmlFor='content'
                      className='block text-sm font-medium leading-6 text-gray-900'>
                      Content
                    </label>
                    <div className='mt-2'>
                      <textarea
                        value={content}
                        onChange={(e) => setContent(e.target.value)}
                        id='content'
                        rows={10}
                        className='block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6'
                      />
                    </div>
                    <p className='mt-3 text-sm leading-6 text-gray-600'>
                      Markdown content of the product.
                    </p>
                  </div>

                  <div className='col-span-full'>
                    <p
                      htmlFor='content'
                      className='block text-sm font-medium leading-6 text-gray-900'>
                      Markdown Content Preview
                    </p>
                    <div className='mt-2'>
                      <div className='prose prose-sm block min-w-full rounded-md border-0 p-4 text-slate-500 shadow-sm ring-1 ring-inset ring-gray-300 sm:text-sm sm:leading-6'>
                        <ReactMarkdown>{content}</ReactMarkdown>
                      </div>
                    </div>
                  </div>

                  <div className='col-span-full'>
                    <div className='mt-2 flex items-center gap-4'>
                      <input
                        type='checkbox'
                        id='publish'
                        className='cursor-pointer'
                        checked={publish}
                        onChange={() => setPublish(!publish)}
                      />
                      <label
                        htmlFor='publish'
                        className='block cursor-pointer text-sm font-medium leading-6 text-gray-900'>
                        Publish Product After Updating.
                      </label>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className='mt-6 flex items-center justify-end gap-x-6'>
              <button
                type='submit'
                className='rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600'>
                {loadingUpdate ? 'Updating...' : 'Update'}
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};

export default ProductEditScreen;
