import { configureStore } from "@reduxjs/toolkit";
import travelsimReducer from "@travelsim/redux/slices/mainSlice";

export const store = configureStore({
  reducer: {
    main: travelsimReducer,
  },
});
