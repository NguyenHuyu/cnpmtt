import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

export const classroomApi = createApi({
  reducerPath: 'classroomApi',
  tagTypes: ['Classroom'],
  baseQuery: fetchBaseQuery({
    baseUrl: ''
  }),
  keepUnusedDataFor: 10000,

  endpoints: (build) => ({
    getClassrooms: build.query<any, { dataQuery: string }>({
      query: ({ dataQuery }) => `/daa/classroom${dataQuery}`,
      providesTags: ['Classroom']
    }),
    getClassroom: build.query<any, string>({
      query: (id) => `/daa/classroom/${id}`,
      providesTags: ['Classroom']
    }),
    addClassroom: build.mutation<any, string>({
      query(body) {
        return {
          url: '/daa/classroom',
          method: 'POST',
          body: body
        }
      },
      invalidatesTags: ['Classroom']
    }),
    updateClassroom: build.mutation<any, { id: string; body: Omit<any, 'id'> }>(
      {
        query(body) {
          return {
            url: `/daa/classroom/${body.id}`,
            method: 'PUT',
            body: body.body
          }
        },
        invalidatesTags: ['Classroom']
      }
    ),
    deleteClassroom: build.mutation({
      query(id) {
        return {
          url: `/daa/classroom/${id}`,
          method: 'DELETE'
        }
      },
      invalidatesTags: ['Classroom']
    })
  })
})

export const {
  useGetClassroomQuery,
  useGetClassroomsQuery,
  useAddClassroomMutation,
  useUpdateClassroomMutation,
  useDeleteClassroomMutation
} = classroomApi
