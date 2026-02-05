import AiraloReducer from "@airalo/redux/slices/mainSlice";
import { configureStore } from "@reduxjs/toolkit";

export const store = configureStore({
  reducer: {
    main: AiraloReducer,
  },
});
