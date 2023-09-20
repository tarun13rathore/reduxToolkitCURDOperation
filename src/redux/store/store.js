import { configureStore } from "@reduxjs/toolkit";
import userDetailsSlice from "../feature/userDetailsSlice";

export const store = configureStore({
  reducer: {
    AllUser: userDetailsSlice,
  },
});
