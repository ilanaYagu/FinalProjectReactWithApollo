import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Event, Task } from "../generated/graphql";


interface modalsState {
    itemForm: { open: boolean, item?: (Event | Task) };
    deleteItemForm: { open: boolean, item?: (Event | Task) };
}

const initialModalsState: modalsState = {
    itemForm: { open: false },
    deleteItemForm: { open: false }
};


const ModalsSlice = createSlice({
    name: 'Modals',
    initialState: initialModalsState,
    reducers: {
        closeItemForm: (state): void => {
            state.itemForm = { open: false };
        },
        closeDeleteItemForm: (state): void => {
            state.deleteItemForm = { open: false };
        },
        openItemForm: (state, action: PayloadAction<{ item?: (Event | Task) }>): void => {
            state.itemForm = { open: true, item: action.payload.item };
        },
        openDeleteItemForm: (state, action: PayloadAction<{ item?: (Event | Task) }>): void => {
            state.deleteItemForm = { open: true, item: action.payload.item };
        }
    }
})

export const { closeItemForm, closeDeleteItemForm, openDeleteItemForm, openItemForm } = ModalsSlice.actions;
export default ModalsSlice.reducer;