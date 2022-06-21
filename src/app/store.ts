import { configureStore } from "@reduxjs/toolkit";
import settingsReducer from "../feature/settingsSlice";
import dashboardFiltersReducer from "../feature/dashboardFiltersSlice";

export const API_URL = "http://localhost:1025/";

export const store = configureStore({
    reducer: {
        settings: settingsReducer,
        dashboardFilters: dashboardFiltersReducer
    },
    middleware: getDefaultMiddleware => getDefaultMiddleware({
        serializableCheck: false
    })
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;