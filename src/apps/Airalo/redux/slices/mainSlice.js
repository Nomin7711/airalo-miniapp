import { airaloApis } from "@airalo/api";
import {
  createAsyncThunk,
  createSelector,
  createSlice,
} from "@reduxjs/toolkit";

const initialState = {
  isAuthorized: false,
  userAiralo: {},
  loading: false,
  phoneNumber: "",
};

export const fetchUserAiralo = createAsyncThunk(
  "main/user/airalo",
  async () => {
    return await airaloApis.fetchUserAiralo();
  }
);

export const airaloSlice = createSlice({
  name: "airalo",
  initialState,
  reducers: {
    reducer(state = initialState, action) {
      switch (action.type) {
        case "UPDATE_PHONENUMBER":
          return { ...state, phoneNumber: action?.payload };
        default:
          return state;
      }
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchUserAiralo.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchUserAiralo.fulfilled, (state, action) => {
        state.userAiralo = action.payload;
        state.isAuthorized = true;
        state.loading = false;
      })
      .addCase(fetchUserAiralo.rejected, (state) => {
        state.loading = false;
      });
  },
});

const getMain = createSelector([(state) => state.main], (main) => main);

export const airaloSelector = {
  getMain,
};
export default airaloSlice.reducer;
