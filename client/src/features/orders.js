/** @format */

import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import Axios from "../axios";

export const fetchOrder = createAsyncThunk("Order/fetchCart", async () => {
  const response = await Axios.get("/orders").then((res) => res.data);
  return response;
});
export const OrdersSlice = createSlice({
  name: "orders",
  initialState: {
    orders: [],
    error: "",
    loading: false,
    fetched: false,
  },
  extraReducers: {
    [fetchOrder.fulfilled]: (state, { payload }) => {
      if (payload.status === "ok") {
        console.log(payload.orders,"from api");
        state.orders = payload.orders;
        console.log(state.orders);
        state.fetched = true;
        state.loading = false;
      } else if (payload.status === "error") {
        state.error = payload.error;
        state.loading = false;
      }
    },
    [fetchOrder.pending]: (state, action) => {
      state.loading = true;
    },
    [fetchOrder.rejected]: (state, action) => {
      state.error = action.error.message;
      state.loading = false;
    },
  },
});
export default OrdersSlice.reducer;
