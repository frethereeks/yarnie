"use client"
import { configureStore } from '@reduxjs/toolkit'
import cartSlice from './reducers/cartSlice'
import siteSlice from './reducers/siteSlice'

export const makeStore = () => {
    return configureStore({
        reducer: {
            cart: cartSlice,
            site: siteSlice,
        }
    })
}

// Infer the type of makeStore
export type AppStore = ReturnType<typeof makeStore>
// Infer the `OwnerState` and `AppDispatch` types from the store itself
export type OwnerState = ReturnType<AppStore['getState']>
export type AppDispatch = AppStore['dispatch']