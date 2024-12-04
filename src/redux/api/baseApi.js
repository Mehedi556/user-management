import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const baseApi = createApi({
  reducerPath: "baseApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "https://wesoftin-backend.vercel.app",
  }),
  tagTypes: ["users"],
  endpoints: (builder) => ({
    getAllUsers: builder.query({
      query: () => {
        return {
          url: `/users?sort=asc`,
          method: "GET",
        };
      },
      providesTags: ["users"],
    }),
    getSingleUser: builder.query({
      query: (id) => {
        return {
          url: `/users/${id}`,
          method: "GET",
        };
      },
    }),
    createUser: builder.mutation({
      query: (data) => ({
        url: "/users",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["users"],
    }),
    updateUser: builder.mutation({
      query: (data) => ({
        url: `/users/${data?._id}`,
        method: "PUT",
        body: data,
      }),
      invalidatesTags: ["users"],
    }),
    deleteUser: builder.mutation({
      query: (_id) => ({
        url: `/users/${_id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["users"],
    }),
  }),
});

export const {
  useGetAllUsersQuery,
  useGetSingleUserQuery,
  useCreateUserMutation,
  useUpdateUserMutation,
  useDeleteUserMutation,
} = baseApi;
