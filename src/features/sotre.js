import { configureStore } from "@reduxjs/toolkit";
import userSllice from "./userSllice";
export const store = configureStore({
  reducer: {
    user: userSllice,
  },
});
