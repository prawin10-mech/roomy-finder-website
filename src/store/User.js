import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  email: null,
  password: null,
  firstName: null,
  lastName: null,
  profilePicture: null,
  gender: null,
  country: null,
  fcmToken: null,
  type: null,
  isLoggedIn: false,
  myBookings: [],
  messageReceived: false,
};

const LoginSlice = createSlice({
  name: "login",
  initialState,
  reducers: {
    messageReceived(state) {
      state.messageReceived = !state.messageReceived;
    },
    email(state, action) {
      state.email = action.payload;
    },
    lastName(state, action) {
      state.lastName = action.payload;
    },
    firstName(state, action) {
      state.firstName = action.payload;
    },
    password(state, action) {
      state.password = action.payload;
    },
    isLoggedIn(state, action) {
      state.isLoggedIn = action.payload;
    },
    myBookings(state, action) {
      state.myBookings = action.payload;
    },

    country(state, action) {
      state.country = action.payload;
    },
    gender(state, action) {
      state.gender = action.payload;
    },
    fcmToken(state, action) {
      state.fcmToken = action.payload;
    },
    profilePicture(state, action) {
      state.profilePicture = action.payload;
    },
    type(state, action) {
      state.type = action.payload;
    },
  },
});

export const UserActions = LoginSlice.actions;

export default LoginSlice.reducer;
