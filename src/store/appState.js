import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    isDrawerOpen: true,
    isBackDropOpen: false,
    syncingAttendance: false,
    isAddStudentModalOpen: false,
    isLicenseModalOpen: false
}

const slice = createSlice({
    name: 'appState',
    initialState,
    reducers: {
        toggleDrawer(state, action) {
            state.isDrawerOpen = !state.isDrawerOpen
        },
        setIsBackDropOpen(state, action) {
            state.isBackDropOpen = action.payload
        },
        setSyncingAttendance(state, action) {
            state.syncingAttendance = action.payload
        },
        setIsAddStudentModalOpen(state, action) {
            state.isAddStudentModalOpen = action.payload
        },
        setIsLicenseModalOpen(state, action) {
            state.isLicenseModalOpen = action.payload
        }
    }
})

export const appStateActions = slice.actions;

export default slice.reducer;