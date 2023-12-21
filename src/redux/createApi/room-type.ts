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
      query: ({ dataQuery }) => `/daa/room-type${dataQuery}`,
      providesTags: ['typeRoom']
    }),
    gettypeRoom: build.query<any, string>({
      query: (id) => `/daa/room-type?id=${id}`,
      providesTags: ['typeRoom']
    }),
    addtypeRoom: build.mutation<any, string>({
      query(body) {
        return {
          url: '/daa/room-type',
          method: 'POST',
          body: body
        }
      },
      invalidatesTags: ['typeRoom']
    }),
    updatetypeRoom: build.mutation<any, { id: string; body: Omit<any, 'id'> }>({
      query(body) {
        return {
          url: `/daa/room-type?id=${body.id}`,
          method: 'PUT',
          body: body.body
        }
      },
      invalidatesTags: ['typeRoom']
    }),
    deletetypeRoom: build.mutation({
      query(id) {
        return {
          url: `/daa/room-type?id=${id}`,
          method: 'DELETE'
        }
      },
      invalidatesTags: ['typeRoom']
    })
  })
})

export const {
  useGettypeRoomsQuery,
  useGettypeRoomQuery,
  useAddtypeRoomMutation,
  useUpdatetypeRoomMutation,
  useDeletetypeRoomMutation
} = typeRoomApi
