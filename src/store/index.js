import { configureStore } from "@reduxjs/toolkit";
import appState from "./appState";

const store = configureStore({
    reducer: {
        appState: appState,
    }
})

export default store