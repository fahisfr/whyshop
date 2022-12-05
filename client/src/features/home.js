

import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "../axios";

export const fetchCatgorys = createAsyncThunk("fetchCatgorys", async () => {
  return await axios.get("/home/catgorys").then((res) => res.data);
});

export const fetchRecommendations = createAsyncThunk(
  "fetchRecommendations",
  async () => {
    return await axios.get("/recommendations").then((res) => res.data);
  }
);
export const fetchBanners = createAsyncThunk("fetchBanners", async () => {
  return await axios.get("/home/banners").then((res) => res.data);
});

const baseObj = {
  loading: false,
  fetched: false,
  result: [],
};

const lofet = {
  loading: false,
  fetched: true,
};

export const homeSlice = createSlice({
  name: "home",
  initialState: {
    catgorys: baseObj,
    banners: baseObj,
    recommendations: baseObj,
  },
  extraReducers: {
    [fetchCatgorys.fulfilled]: (state, { payload }) => {
      if (payload.status === "ok") {
        state.catgorys = {
          result: payload.result,
          ...lofet,
        };
      }
    },
    [fetchRecommendations.fulfilled]: (state, { payload }) => {
      if (payload.status === "ok") {
        state.recommendations = {
          result: payload.recommendations,
          ...lofet,
        };
      }
    },
    [fetchBanners.fulfilled]: (state, { payload }) => {
      if (payload.status === "ok") {
        state.banners = {
          result: payload.result,
          ...lofet,
        };
      }
    },

    [fetchCatgorys.pending]: (state, action) => {
      state.catgorys.loading = true;
    },
    [fetchBanners.pending]: (state, action) => {
      state.banners.loading = true;
    },
    [fetchRecommendations]: (state, action) => {
      state.recommendations.loading = true;
    },

    [fetchCatgorys.rejected]: (state, action) => {},
  },
});
export default homeSlice.reducer;
