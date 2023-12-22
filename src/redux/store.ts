import { configureStore } from '@reduxjs/toolkit'
// Or from '@reduxjs/toolkit/query/react'
import { setupListeners } from '@reduxjs/toolkit/query'
import { billApi } from './createApi/bill'
import { customerApi } from './createApi/customer'
import { regulationApi } from './createApi/regulation'
import { reportApi } from './createApi/report'
import { roomRentalApi } from './createApi/room-rental'
import { typeRoomApi } from './createApi/room-type'
import { roomApi } from './createApi/room'
import { serviceDetailApi } from './createApi/service-detail'
import { serviceTypeApi } from './createApi/service-type'
import { serviceApi } from './createApi/service'
import { staffApi } from './createApi/staff'

export const store = configureStore({
  reducer: {
    // Add the generated reducer as a specific top-level slice
    [billApi.reducerPath]: billApi.reducer,
    [customerApi.reducerPath]: customerApi.reducer,
    [regulationApi.reducerPath]: regulationApi.reducer,
    [reportApi.reducerPath]: reportApi.reducer,
    [roomRentalApi.reducerPath]: roomRentalApi.reducer,
    [typeRoomApi.reducerPath]: typeRoomApi.reducer,
    [roomApi.reducerPath]: roomApi.reducer,
    [serviceDetailApi.reducerPath]: serviceDetailApi.reducer,
    [serviceTypeApi.reducerPath]: serviceTypeApi.reducer,
    [serviceApi.reducerPath]: serviceApi.reducer,
    [staffApi.reducerPath]: staffApi.reducer
  },
  // Adding the api middleware enables caching, invalidation, polling,
  // and other useful features of `rtk-query`.
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(
      billApi.middleware,
      customerApi.middleware,
      regulationApi.middleware,
      reportApi.middleware,
      roomRentalApi.middleware,
      typeRoomApi.middleware,
      roomApi.middleware,
      serviceDetailApi.middleware,
      serviceTypeApi.middleware,
      serviceApi.middleware,
      staffApi.middleware
    )
})

// optional, but required for refetchOnFocus/refetchOnReconnect behaviors
// see `setupListeners` docs - takes an optional callback as the 2nd arg for customization
setupListeners(store.dispatch)
