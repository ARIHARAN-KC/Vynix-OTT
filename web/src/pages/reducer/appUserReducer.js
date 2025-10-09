import { createSlice } from "@reduxjs/toolkit";
import { DEFAULT_LANGUAGE } from "../../constants";

const initialState = {
  token: "",
  user: null,
  language: DEFAULT_LANGUAGE,
  message: null,
};

export const appUserSlice = createSlice({
  name: "appUser",
  initialState,
  reducers: {
    setAppUser: (state, action) => {
      state.token = action.payload.token;
      state.user = action.payload.user;
    },
    setLanguage: (state, action) => {
      state.language = action.payload;
    },
    setMessage: (state, action) => {
      state.message = action.payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const { setAppUser, setLanguage, setMessage } = appUserSlice.actions;

export default appUserSlice.reducer;
