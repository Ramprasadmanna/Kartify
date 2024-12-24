import { USERS_URL } from "../constants";
import { apiSlice } from "./apiSlice";

export const usersApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getOtp: builder.mutation({
      query: (data) => ({
        url: `${USERS_URL}/otp`,
        method: "POST",
        body: data,
      })
    }),
    verifyOtp: builder.mutation({
      query: (data) => ({
        url: `${USERS_URL}/verifyOtp`,
        method: "POST",
        body: data,
      })
    }),
    login: builder.mutation({
      query: (data) => ({
        url: `${USERS_URL}/login`,
        method: "POST",
        body: data,
      })
    }),
    logout: builder.mutation({
      query: () => ({
        url: `${USERS_URL}/logout`,
        method: 'POST',
      })
    }),
    register: builder.mutation({
      query: (data) => ({
        url: `${USERS_URL}`,
        method: 'POST',
        body: data
      })
    }),
    profile: builder.mutation({
      query: (data) => ({
        url: `${USERS_URL}/profile`,
        method: 'PUT',
        body: data
      })
    }),
    getUsers: builder.query({
      query: ({ pageSize, pageNumber, keyword }) => ({
        url: USERS_URL,
        method: 'GET',
        params: { pageSize, pageNumber, keyword }
      }),
      providesTags: ['User'],
      keepUnusedDataFor: 5,
    }),
    delete: builder.mutation({
      query: (id) => ({
        url: `${USERS_URL}/${id}`,
        method: 'DELETE',
      }),
      providesTags: ['User'],
    }),
    enableUser: builder.mutation({
      query: (id) => ({
        url: `${USERS_URL}/${id}/activate`,
        method: 'POST',
      }),
      providesTags: ['User'],
    }),
    disableUser: builder.mutation({
      query: (id) => ({
        url: `${USERS_URL}/${id}/deactivate`,
        method: 'POST',
      }),
      providesTags: ['User'],
    }),
    getUserDetails: builder.query({
      query: (id) => ({
        url: `${USERS_URL}/${id}`,
        method: 'GET',
      }),
      keepUnusedDataFor: 5,
      invalidatesTags: ['User'],
    }),
    updateUser: builder.mutation({
      query: (data) => ({
        url: `${USERS_URL}/${data.userId}`,
        method: 'PUT',
        body: data,
      }),
      invalidatesTags: ['User'],
    }),
  })
})

export const {
  useGetOtpMutation,
  useVerifyOtpMutation,
  useLoginMutation,
  useLogoutMutation,
  useRegisterMutation,
  useProfileMutation,
  useGetUsersQuery,
  useDeleteMutation,
  useEnableUserMutation,
  useDisableUserMutation,
  useGetUserDetailsQuery,
  useUpdateUserMutation
} = usersApiSlice;