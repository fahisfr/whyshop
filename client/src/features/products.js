/** @format */

import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import Axios from "../axios";

export const fetchProduts = createAsyncThunk(
  "product/fetchproduct",
  async () => {
    const response = await Axios.get("/home").then((res) => res.data);
    return response;
  }
);
export const ProdutsSlice = createSlice({
  name: "produts",
  initialState: {
    products: [],
    types: [],
    recomments: [],
    error: false,
    loading: true,
  },
  reducers: {
    SetProducts: (state, action) => {
      state.products = action.payload;
    },
  },
  extraReducers: {
    [fetchProduts.pending]: (state, action) => {
      state.loading = true;
    },
    [fetchProduts.fulfilled]: (state, { payload }) => {
      if (payload.status === "ok") {
        state.products = payload.products;
        state.types = payload.types;

        state.loading = false;
      } else if (payload.status === "error") {
        state.error = payload.error;
      }
    },
    [fetchProduts.rejected]: (state, action) => {
      state.error = action.error.message;
    },
  },
});
export const { SetProducts } = ProdutsSlice.actions;
export default ProdutsSlice.reducer;
