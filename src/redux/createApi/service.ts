import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

export const serviceApi = createApi({
  reducerPath: 'serviceApi',
  tagTypes: ['service'],
  baseQuery: fetchBaseQuery({
    baseUrl: ''
  }),
  keepUnusedDataFor: 10000,

  endpoints: (build) => ({
    getServices: build.query<any, { dataQuery: string }>({
      query: ({ dataQuery }) => `/daa/service${dataQuery}`,
      providesTags: ['service']
    }),
    getService: build.query<any, string>({
      query: (id) => `/daa/service?id=${id}`,
      providesTags: ['service']
    }),
    addService: build.mutation<any, string>({
      query(body) {
        return {
          url: '/daa/service',
          method: 'POST',
          body: body
        }
      },
      invalidatesTags: ['service']
    }),
    updateService: build.mutation<any, { id: string; body: Omit<any, 'id'> }>({
      query(body) {
        return {
          url: `/daa/service?id=${body.id}`,
          method: 'PUT',
          body: body.body
        }
      },
      invalidatesTags: ['service']
    }),
    deleteService: build.mutation({
      query(id) {
        return {
          url: `/daa/service?id=${id}`,
          method: 'DELETE'
        }
      },
      invalidatesTags: ['service']
    })
  })
})

export const {
  useGetServicesQuery,
  useGetServiceQuery,
  useAddServiceMutation,
  useUpdateServiceMutation,
  useDeleteServiceMutation
} = serviceApi
