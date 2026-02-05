import {
  createAsyncThunk,
  createSelector,
  createSlice,
} from "@reduxjs/toolkit";
import { travelsimApis } from "@travelsim/api";

const initialState = {
  isAuthorized: false,
  userTravelsim: {},
  loading: false,
  phoneNumber: "",
};

export const fetchUserTravelsim = createAsyncThunk(
  "main/user/travelsim",
  async () => {
    return await travelsimApis.fetchUserTravelsim();
  }
);

export const mainSlice = createSlice({
  name: "travelsim",
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
      .addCase(fetchUserTravelsim.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchUserTravelsim.fulfilled, (state, action) => {
        state.userTravelsim = action.payload;
        state.isAuthorized = true;
        state.loading = false;
      })
      .addCase(fetchUserTravelsim.rejected, (state) => {
        state.loading = false;
      });
  },
});

const getMain = createSelector([(state) => state.main], (main) => main);

export const travelsimSelectors = {
  getMain,
};
export default mainSlice.reducer;
