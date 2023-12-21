import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

export const serviceDetailApi = createApi({
  reducerPath: 'serviceDetailApi',
  tagTypes: ['serviceDetail'],
  baseQuery: fetchBaseQuery({
    baseUrl: ''
  }),
  keepUnusedDataFor: 10000,

  endpoints: (build) => ({
    getServiceDetails: build.query<any, { dataQuery: string }>({
      query: ({ dataQuery }) => `/daa/service-detail${dataQuery}`,
      providesTags: ['serviceDetail']
    }),
    getServiceDetail: build.query<any, string>({
      query: (id) => `/daa/service-detail?id=${id}`,
      providesTags: ['serviceDetail']
    }),
    addServiceDetail: build.mutation<any, string>({
      query(body) {
        return {
          url: '/daa/service-detail',
          method: 'POST',
          body: body
        }
      },
      invalidatesTags: ['serviceDetail']
    }),
    updateServiceDetail: build.mutation<
      any,
      { id: string; body: Omit<any, 'id'> }
    >({
      query(body) {
        return {
          url: `/daa/service-detail?id=${body.id}`,
          method: 'PUT',
          body: body.body
        }
      },
      invalidatesTags: ['serviceDetail']
    }),
    deleteServiceDetail: build.mutation({
      query(id) {
        return {
          url: `/daa/service-detail?id=${id}`,
          method: 'DELETE'
        }
      },
      invalidatesTags: ['serviceDetail']
    })
  })
})

export const {
  useGetServiceDetailsQuery,
  useGetServiceDetailQuery,
  useAddServiceDetailMutation,
  useUpdateServiceDetailMutation,
  useDeleteServiceDetailMutation
} = serviceDetailApi
