import { configureStore } from "@reduxjs/toolkit";
import activeFiltersReducer from "../feature/activeFiltersSlice";
import ModalsReducer from "../feature/modalsSlice";

export const API_URL = "http://localhost:1025/";

export const store = configureStore({
    reducer: {
        activeFilters: activeFiltersReducer,
        modals: ModalsReducer
    },
    middleware: getDefaultMiddleware => getDefaultMiddleware({
        serializableCheck: false
    })
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;