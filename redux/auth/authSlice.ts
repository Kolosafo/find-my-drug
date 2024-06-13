import { UserType } from "@/types";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type initialStateType = {
  user: UserType;
  authLoading: boolean;
  isLogged: boolean;
};
const initailState: initialStateType = {
  user: {
    email: "",
    id: "",
    userType: "pharmacy",
    name: "",
    location: "",
    phoneNumber: 0,
  },
  authLoading: false,
  isLogged: false,
};
const userSlice = createSlice({
  name: "user",
  initialState: initailState,
  reducers: {
    login: (state, action: PayloadAction<UserType>) => {
      console.log("LOGIN DISPATCH: ", action.payload);
      state.user = action.payload;
      state.isLogged = true;
      state.authLoading = false;
    },
    logout: (state) => {
      state.user = {
        email: "",
        id: "",
        userType: "pharmacy",
        name: "",
        location: "",
        phoneNumber: 0,
      };
      state.isLogged = false;
      window.location.reload;
    },

    handleSignUp: (state, { payload }) => {
      console.log("SIGN UP USER: ", payload);
      state.user = payload;
    },
  },
});

export const { login, logout, handleSignUp } = userSlice.actions;
export default userSlice.reducer;
