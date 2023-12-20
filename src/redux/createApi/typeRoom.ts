import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

export const typeRoomApi = createApi({
  reducerPath: 'typeRoomApi',
  tagTypes: ['typeRoom'],
  baseQuery: fetchBaseQuery({
    baseUrl: ''
  }),
  keepUnusedDataFor: 10000,

  endpoints: (build) => ({
    gettypeRooms: build.query<any, { dataQuery: string }>({
      query: ({ dataQuery }) => `/api/typeRoom${dataQuery}`,
      providesTags: ['typeRoom']
    }),
    gettypeRoom: build.query<any, string>({
      query: (id) => `/daa/typeRoom/${id}`,
      providesTags: ['typeRoom']
    }),
    addtypeRoom: build.mutation<any, string>({
      query(body) {
        return {
          url: '/daa/typeRoom',
          method: 'POST',
          body: body
        }
      },
      invalidatesTags: ['typeRoom']
    }),
    updatetypeRoom: build.mutation<any, { id: string; body: Omit<any, 'id'> }>(
      {
        query(body) {
          return {
            url: `/daa/typeRoom/${body.id}`,
            method: 'PUT',
            body: body.body
          }
        },
        invalidatesTags: ['typeRoom']
      }
    ),
    deletetypeRoom: build.mutation({
      query(id) {
        return {
          url: `/daa/typeRoom/${id}`,
          method: 'DELETE'
        }
      },
      invalidatesTags: ['typeRoom']
    })
  })
})

export const {
  useGettypeRoomsQuery,
  useAddtypeRoomMutation,
  useUpdatetypeRoomMutation,
  useDeletetypeRoomMutation
} = typeRoomApi
