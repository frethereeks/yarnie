import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export type siteSliceProps = {
    selectedId?: string 
    openModal: boolean
    theme: "dark" | "light"
}

const initialState: siteSliceProps = {
    selectedId: undefined,
    openModal: false,
    theme: "light"
}

export const siteSlice = createSlice({
    name: "site",
    initialState,
    reducers: {
        triggerModal(state, action: PayloadAction<{ id: string | undefined, open: boolean }>) {
            state.selectedId = action.payload.id
            state.openModal = action.payload.open
        },
    }
})

export const { triggerModal } = siteSlice.actions
export default siteSlice.reducer