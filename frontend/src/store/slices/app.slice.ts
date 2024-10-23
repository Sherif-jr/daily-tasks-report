import { createSlice } from "@reduxjs/toolkit";

export interface AppState {
  darkMode: boolean;
}
const INITIAL_STATE: AppState = {
  darkMode: false,
};
const appSlice = createSlice({
  name: "app",
  initialState: INITIAL_STATE,
  reducers: {
    toggleDarkMode: (state) => {
      state.darkMode = !state.darkMode;
    },
  },
});

export const { toggleDarkMode } = appSlice.actions;
const appReducer = appSlice.reducer;
export default appReducer;
