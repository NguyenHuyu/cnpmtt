import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

export const staffApi = createApi({
  reducerPath: 'staffApi',
  tagTypes: ['staff'],
  baseQuery: fetchBaseQuery({
    baseUrl: ''
  }),
  keepUnusedDataFor: 10000,

  endpoints: (build) => ({
    getstaffs: build.query<any, { dataQuery: string }>({
      query: ({ dataQuery }) => `/daa/staff${dataQuery}`,
      providesTags: ['staff']
    }),
    getstaff: build.query<any, string>({
      query: (id) => `/daa/staff?id=${id}`,
      providesTags: ['staff']
    }),
    addstaff: build.mutation<any, string>({
      query(body) {
        return {
          url: '/daa/staff',
          method: 'POST',
          body: body
        }
      },
      invalidatesTags: ['staff']
    }),
    updatestaff: build.mutation<any, { id: string; body: Omit<any, 'id'> }>({
      query(body) {
        return {
          url: `/daa/staff?id=${body.id}`,
          method: 'PUT',
          body: body.body
        }
      },
      invalidatesTags: ['staff']
    }),
    deletestaff: build.mutation({
      query(id) {
        return {
          url: `/daa/staff?id=${id}`,
          method: 'DELETE'
        }
      },
      invalidatesTags: ['staff']
    })
  })
})

export const {
  useGetstaffsQuery,
  useGetstaffQuery,
  useAddstaffMutation,
  useUpdatestaffMutation,
  useDeletestaffMutation
} = staffApi
