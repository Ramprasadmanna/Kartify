import { PRODUCT_URL, UPLOAD_URL } from "../constants";
import { apiSlice } from "./apiSlice";


export const productApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getPublishProducts: builder.query({
      query: ({ keyword, pageSize, pageNumber }) => ({
        url: `${PRODUCT_URL}/publish`,
        params: { keyword, pageSize, pageNumber }
      }),
      keepUnusedDataFor: 5,
      providesTags: ['Product'],
    }),
    getAllProducts: builder.query({
      query: ({ pageSize, pageNumber, keyword }) => ({
        url: PRODUCT_URL,
        params: { pageSize, pageNumber, keyword }
      }),
      keepUnusedDataFor: 5,
      providesTags: ['Product'],
    }),
    getPublishProductDetails: builder.query({
      query: (productId) => ({
        url: `${PRODUCT_URL}/publish/${productId}`,
      }),
      keepUnusedDataFor: 5,
      providesTags: ['Product'],
    }),
    getProductDetails: builder.query({
      query: (productId) => ({
        url: `${PRODUCT_URL}/${productId}`,
      }),
      keepUnusedDataFor: 5,
      providesTags: ['Product'],
    }),
    getCartProduct: builder.mutation({
      query: (productIds) => ({
        url: `${PRODUCT_URL}/cart`,
        method: 'POST',
        body: productIds,
      }),
      keepUnusedDataFor: 5,
      providesTags: ['Product'],
    }),
    createProduct: builder.mutation({
      query: () => ({
        url: PRODUCT_URL,
        method: 'POST'
      }),
      keepUnusedDataFor: 5,
      invalidatesTags: ['Product'],
    }),
    publishProduct: builder.mutation({
      query: (id) => ({
        url: `${PRODUCT_URL}/${id}/publish`,
        method: 'PUT'
      }),
      keepUnusedDataFor: 5,
      invalidatesTags: ['Product'],
    }),
    unPublishProduct: builder.mutation({
      query: (id) => ({
        url: `${PRODUCT_URL}/${id}/unPublish`,
        method: 'PUT'
      }),
      keepUnusedDataFor: 5,
      invalidatesTags: ['Product'],
    }),
    updateProduct: builder.mutation({
      query: (data) => ({
        url: `${PRODUCT_URL}/${data.productId}`,
        method: 'PUT',
        body: data
      }),
      keepUnusedDataFor: 5,
      invalidatesTags: ['Product'],
    }),
    uploadProductImage: builder.mutation({
      query: (data) => ({
        url: UPLOAD_URL,
        method: 'POST',
        body: data
      }),
    }),
    deleteProduct: builder.mutation({
      query: (id) => ({
        url: `${PRODUCT_URL}/${id}`,
        method: 'DELETE',
        invalidatesTags: ['Product'],
      }),
    }),
    reviewProduct: builder.mutation({
      query: (data) => ({
        url: `${PRODUCT_URL}/${data.productId}/review`,
        method: 'POST',
        body: data,
        invalidatesTags: ['Product'],
      }),
    }),
  }),
});

export const {
  useGetPublishProductsQuery,
  useGetAllProductsQuery,
  useGetPublishProductDetailsQuery,
  useGetProductDetailsQuery,
  useGetCartProductMutation,
  useCreateProductMutation,
  usePublishProductMutation,
  useUnPublishProductMutation,
  useUpdateProductMutation,
  useUploadProductImageMutation,
  useDeleteProductMutation,
  useReviewProductMutation
} = productApiSlice