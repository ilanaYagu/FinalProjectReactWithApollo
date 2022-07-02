import { configureStore } from "@reduxjs/toolkit";
import activeFiltersReducer from "../feature/activeFiltersSlice";

export const store = configureStore({
    reducer: {
        activeFilters: activeFiltersReducer
    },
    middleware: getDefaultMiddleware => getDefaultMiddleware({
        serializableCheck: false
    })
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;