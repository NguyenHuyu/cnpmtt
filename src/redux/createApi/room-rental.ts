import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

export const roomRentalApi = createApi({
  reducerPath: 'roomRentalApi',
  tagTypes: ['roomRental'],
  baseQuery: fetchBaseQuery({
    baseUrl: ''
  }),
  keepUnusedDataFor: 10000,

  endpoints: (build) => ({
    getRoomRentals: build.query<any, { dataQuery: string }>({
      query: ({ dataQuery }) => `/daa/room-rental${dataQuery}`,
      providesTags: ['roomRental']
    }),
    getRoomRental: build.query<any, string>({
      query: (id) => `/daa/room-rental?id=${id}`,
      providesTags: ['roomRental']
    }),
    addRoomRental: build.mutation<any, string>({
      query(body) {
        return {
          url: '/daa/room-rental',
          method: 'POST',
          body: body
        }
      },
      invalidatesTags: ['roomRental']
    }),
    updateRoomRental: build.mutation<any, { id: string; body: Omit<any, 'id'> }>({
      query(body) {
        return {
          url: `/daa/room-rental?id=${body.id}`,
          method: 'PUT',
          body: body.body
        }
      },
      invalidatesTags: ['roomRental']
    }),
    deleteRoomRental: build.mutation({
      query(id) {
        return {
          url: `/daa/room-rental?id=${id}`,
          method: 'DELETE'
        }
      },
      invalidatesTags: ['roomRental']
    })
  })
})

export const {
  useGetRoomRentalsQuery,
  useGetRoomRentalQuery,
  useAddRoomRentalMutation,
  useUpdateRoomRentalMutation,
  useDeleteRoomRentalMutation
} = roomRentalApi
