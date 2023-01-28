/** @format */

import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import Axios from "../axios";

export const fetchOrders = createAsyncThunk("order/fetchOrders", async () => {
  const response = await Axios.get("/user/orders").then((res) => res.data);
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
    [fetchOrders.fulfilled]: (state, { payload }) => {
      console.log(payload);
      if (payload.status === "ok") {
        state.orders = payload.orders;
        state.fetched = true;
        state.loading = false;
      } else if (payload.status === "error") {
        state.error = payload.error;
        state.loading = false;
      }
    },
    [fetchOrders.pending]: (state, action) => {
      state.loading = true;
    },
    [fetchOrders.rejected]: (state, action) => {
      state.error = action.error.message;
      state.loading = false;
    },
  },
});
export default OrdersSlice.reducer;
