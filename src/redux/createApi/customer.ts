import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

export const customerApi = createApi({
  reducerPath: 'customerApi',
  tagTypes: ['customer'],
  baseQuery: fetchBaseQuery({
    baseUrl: ''
  }),
  keepUnusedDataFor: 10000,

  endpoints: (build) => ({
    getCustomers: build.query<any, { dataQuery: string }>({
      query: ({ dataQuery }) => `/daa/customer${dataQuery}`,
      providesTags: ['customer']
    }),
    getCustomer: build.query<any, string>({
      query: (id) => `/daa/customer?id=${id}`,
      providesTags: ['customer']
    }),
    addCustomer: build.mutation<any, string>({
      query(body) {
        return {
          url: '/daa/customer',
          method: 'POST',
          body: body
        }
      },
      invalidatesTags: ['customer']
    }),
    updateCustomer: build.mutation<any, { id: string; body: Omit<any, 'id'> }>({
      query(body) {
        return {
          url: `/daa/customer?id=${body.id}`,
          method: 'PUT',
          body: body.body
        }
      },
      invalidatesTags: ['customer']
    }),
    deleteCustomer: build.mutation({
      query(id) {
        return {
          url: `/daa/customer?id=${id}`,
          method: 'DELETE'
        }
      },
      invalidatesTags: ['customer']
    })
  })
})

export const {
  useGetCustomersQuery,
  useGetCustomerQuery,
  useAddCustomerMutation,
  useUpdateCustomerMutation,
  useDeleteCustomerMutation
} = customerApi
