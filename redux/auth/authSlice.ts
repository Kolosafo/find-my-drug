import { UserType } from "@/types";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type initialStateType = {
  user: UserType;
  authLoading: boolean;
  isLogged: boolean;
};
const initailState: initialStateType = {
  user: {
    email: "kolosafo@gmail.com",
    id: "skfV4vLtRWOkLSCU84cffZ9LGgB3",
    userType: "individual",
    name: "Dauda Kolo",
    location: "Abuja",
    phoneNumber: 9075976217,
  },
  authLoading: false,
  isLogged: true,
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
        email: "kolosafo@gmail.com",
        id: "skfV4vLtRWOkLSCU84cffZ9LGgB3",
        userType: "individual",
        name: "Dauda Kolo",
        location: "Abuja",
        phoneNumber: 9075976217,
      };
      state.isLogged = true;
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
