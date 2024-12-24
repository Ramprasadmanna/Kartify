import { ORDERS_URL, PAYPAL_URL, RAZORPAY_URL } from "../constants";
import { apiSlice } from "./apiSlice";

export const orderApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    createOrder: builder.mutation({
      query: (order) => ({
        url: `${ORDERS_URL}/createOrder`,
        method: 'POST',
        body: order,
      })
    }),
    getOrderDetails: builder.query({
      query: (id) => ({
        url: `${ORDERS_URL}/${id}`,
        method: "GET",
      }),
      keepUnusedDataFor: 5,
    }),
    payOrder: builder.mutation({
      query: ({ id, details, paymentMethod }) => ({
        url: `${ORDERS_URL}/${id}/pay`,
        method: 'PUT',
        body: { ...details, paymentMethod },
      }),
    }),
    getPayPalClientId: builder.query({
      query: () => ({
        url: PAYPAL_URL,
        method: 'GET',
      }),
      keepUnusedDataFor: 5,
    }),
    getRazorPayKey: builder.query({
      query: () => ({
        url: RAZORPAY_URL,
        method: 'GET',
      }),
      keepUnusedDataFor: 5,
    }),
    createRazorPayOrder: builder.mutation({
      query: (orderDetails) => ({
        url: `${ORDERS_URL}/createRazorPayOrder`,
        method: 'POST',
        body: orderDetails,
      })
    }),
    verifyRazorPaySignature: builder.mutation({
      query: (data) => ({
        url: `${ORDERS_URL}/verifyRazorPaySignature`,
        method: 'POST',
        body: data,
      }),
      keepUnusedDataFor: 5,
    }),
    getMyOrders: builder.query({
      query: () => ({
        url: `${ORDERS_URL}/getMyOrders`,
        method: 'GET',
      }),
      keepUnusedDataFor: 5,
    }),
    getOrders: builder.query({
      query: ({ pageSize, pageNumber, keyword }) => ({
        url: ORDERS_URL,
        method: 'GET',
        params: { pageSize, pageNumber, keyword }
      }),
      keepUnusedDataFor: 5,
    }),
    deliverOrder: builder.mutation({
      query: (id) => ({
        url: `${ORDERS_URL}/${id}/deliver`,
        method: 'PUT',
      }),
      // invalidatesTags: ['Order'],
    }),
  })
})

export const {
  useCreateOrderMutation,
  useGetOrderDetailsQuery,
  usePayOrderMutation,
  useGetPayPalClientIdQuery,
  useGetRazorPayKeyQuery,
  useGetMyOrdersQuery,
  useCreateRazorPayOrderMutation,
  useVerifyRazorPaySignatureMutation,
  useGetOrdersQuery,
  useDeliverOrderMutation
} = orderApiSlice;