import { createSlice } from "@reduxjs/toolkit";


interface SettingsState {
    settings: Map<string, string>;
}

const initialSettingsState: SettingsState = {
    settings: new Map<string, string>([["language", "Hebrew"]])
};


const settingsSlice = createSlice({
    name: 'settings',
    initialState: initialSettingsState,
    reducers: {
    }
})

export default settingsSlice.reducer;