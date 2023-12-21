import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

export const billApi = createApi({
  reducerPath: 'billApi',
  tagTypes: ['bill'],
  baseQuery: fetchBaseQuery({
    baseUrl: ''
  }),
  keepUnusedDataFor: 10000,

  endpoints: (build) => ({
    getBills: build.query<any, { dataQuery: string }>({
      query: ({ dataQuery }) => `/daa/bill${dataQuery}`,
      providesTags: ['bill']
    }),
    getBill: build.query<any, string>({
      query: (id) => `/daa/bill?id=${id}`,
      providesTags: ['bill']
    }),
    addBill: build.mutation<any, string>({
      query(body) {
        return {
          url: '/daa/bill',
          method: 'POST',
          body: body
        }
      },
      invalidatesTags: ['bill']
    }),
    updateBill: build.mutation<any, { id: string; body: Omit<any, 'id'> }>({
      query(body) {
        return {
          url: `/daa/bill?id=${body.id}`,
          method: 'PUT',
          body: body.body
        }
      },
      invalidatesTags: ['bill']
    }),
    deleteBill: build.mutation({
      query(id) {
        return {
          url: `/daa/bill?id=${id}`,
          method: 'DELETE'
        }
      },
      invalidatesTags: ['bill']
    })
  })
})

export const {
  useGetBillsQuery,
  useGetBillQuery,
  useAddBillMutation,
  useUpdateBillMutation,
  useDeleteBillMutation
} = billApi
