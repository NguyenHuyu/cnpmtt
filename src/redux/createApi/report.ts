import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

export const reportApi = createApi({
  reducerPath: 'reportApi',
  tagTypes: ['report'],
  baseQuery: fetchBaseQuery({
    baseUrl: ''
  }),
  keepUnusedDataFor: 10000,

  endpoints: (build) => ({
    getReports: build.query<any, { dataQuery: string }>({
      query: ({ dataQuery }) => `/daa/report${dataQuery}`,
      providesTags: ['report']
    }),
    getReport: build.query<any, string>({
      query: (id) => `/daa/report?id=${id}`,
      providesTags: ['report']
    }),
    addReport: build.mutation<any, string>({
      query(body) {
        return {
          url: '/daa/report',
          method: 'POST',
          body: body
        }
      },
      invalidatesTags: ['report']
    }),
    updateReport: build.mutation<any, { id: string; body: Omit<any, 'id'> }>({
      query(body) {
        return {
          url: `/daa/report?id=${body.id}`,
          method: 'PUT',
          body: body.body
        }
      },
      invalidatesTags: ['report']
    }),
    deleteReport: build.mutation({
      query(id) {
        return {
          url: `/daa/report?id=${id}`,
          method: 'DELETE'
        }
      },
      invalidatesTags: ['report']
    })
  })
})

export const {
  useGetReportsQuery,
  useGetReportQuery,
  useAddReportMutation,
  useUpdateReportMutation,
  useDeleteReportMutation
} = reportApi
