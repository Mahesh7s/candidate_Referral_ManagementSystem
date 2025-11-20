import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./slices/authSlice";
import referralReducer from "./slices/referralSlice";

const store = configureStore({
  reducer: {
    auth: authReducer,
    referral: referralReducer
  }
});

export default store;
