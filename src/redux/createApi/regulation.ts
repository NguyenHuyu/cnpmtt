import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

export const regulationApi = createApi({
  reducerPath: 'regulationApi',
  tagTypes: ['regulation'],
  baseQuery: fetchBaseQuery({
    baseUrl: ''
  }),
  keepUnusedDataFor: 10000,

  endpoints: (build) => ({
    getRegulations: build.query<any, { dataQuery: string }>({
      query: ({ dataQuery }) => `/daa/regulation${dataQuery}`,
      providesTags: ['regulation']
    }),
    getRegulation: build.query<any, string>({
      query: (id) => `/daa/regulation?id=${id}`,
      providesTags: ['regulation']
    }),
    addRegulation: build.mutation<any, any>({
      query(body) {
        return {
          url: '/daa/regulation',
          method: 'POST',
          body: body
        }
      },
      invalidatesTags: ['regulation']
    }),
    updateRegulation: build.mutation<any,any>({
      query(body) {
        return {
          url: `/daa/regulation?id=${body.id}`,
          method: 'PUT',
          body: body.body
        }
      },
      invalidatesTags: ['regulation']
    }),
    deleteRegulation: build.mutation({
      query(id) {
        return {
          url: `/daa/regulation?id=${id}`,
          method: 'DELETE'
        }
      },
      invalidatesTags: ['regulation']
    })
  })
})

export const {
  useGetRegulationsQuery,
  useGetRegulationQuery,
  useAddRegulationMutation,
  useUpdateRegulationMutation,
  useDeleteRegulationMutation
} = regulationApi
