import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

export const roomApi = createApi({
  reducerPath: 'roomApi',
  tagTypes: ['room'],
  baseQuery: fetchBaseQuery({
    baseUrl: ''
  }),
  keepUnusedDataFor: 10000,

  endpoints: (build) => ({
    getRooms: build.query<any, { dataQuery: string }>({
      query: ({ dataQuery }) => `/daa/room${dataQuery}`,
      providesTags: ['room']
    }),
    getRoom: build.query<any, string>({
      query: (id) => `/daa/room?id=${id}`,
      providesTags: ['room']
    }),
    addRoom: build.mutation<any, string>({
      query(body) {
        return {
          url: '/daa/room',
          method: 'POST',
          body: body
        }
      },
      invalidatesTags: ['room']
    }),
    updateRoom: build.mutation<any, { id: string; body: Omit<any, 'id'> }>({
      query(body) {
        return {
          url: `/daa/room?id=${body.id}`,
          method: 'PUT',
          body: body.body
        }
      },
      invalidatesTags: ['room']
    }),
    deleteRoom: build.mutation({
      query(id) {
        return {
          url: `/daa/room?id=${id}`,
          method: 'DELETE'
        }
      },
      invalidatesTags: ['room']
    })
  })
})

export const {
  useGetRoomsQuery,
  useGetRoomQuery,
  useAddRoomMutation,
  useUpdateRoomMutation,
  useDeleteRoomMutation
} = roomApi
