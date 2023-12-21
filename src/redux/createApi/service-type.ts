import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

export const serviceTypeApi = createApi({
  reducerPath: 'serviceTypeApi',
  tagTypes: ['serviceType'],
  baseQuery: fetchBaseQuery({
    baseUrl: ''
  }),
  keepUnusedDataFor: 10000,

  endpoints: (build) => ({
    getServiceTypes: build.query<any, { dataQuery: string }>({
      query: ({ dataQuery }) => `/daa/service-type${dataQuery}`,
      providesTags: ['serviceType']
    }),
    getServiceType: build.query<any, string>({
      query: (id) => `/daa/service-type?id=${id}`,
      providesTags: ['serviceType']
    }),
    addServiceType: build.mutation<any, string>({
      query(body) {
        return {
          url: '/daa/service-type',
          method: 'POST',
          body: body
        }
      },
      invalidatesTags: ['serviceType']
    }),
    updateServiceType: build.mutation<
      any,
      { id: string; body: Omit<any, 'id'> }
    >({
      query(body) {
        return {
          url: `/daa/service-type?id=${body.id}`,
          method: 'PUT',
          body: body.body
        }
      },
      invalidatesTags: ['serviceType']
    }),
    deleteServiceType: build.mutation({
      query(id) {
        return {
          url: `/daa/service-type?id=${id}`,
          method: 'DELETE'
        }
      },
      invalidatesTags: ['serviceType']
    })
  })
})

export const {
  useGetServiceTypesQuery,
  useGetServiceTypeQuery,
  useAddServiceTypeMutation,
  useUpdateServiceTypeMutation,
  useDeleteServiceTypeMutation
} = serviceTypeApi
