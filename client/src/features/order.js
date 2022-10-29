import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import Axios from "../axios";

export const fetchOrder = createAsyncThunk("Order/fetchCart", async () => {
  const response = await Axios.get("/order").then((res) => res.data);
  return response;
});
export const OrderSlice = createSlice({
  name: "order",
  initialState: {
    OrderInfo: [],
    error: "",
    loding: false,
  },
  extraReducers: {
    [fetchOrder.fulfilled]: (state, action) => {
      state.loding = false;
      state.OrderInfo = action.payload.order;
    },
    [fetchOrder.pending]: (state, action) => {
      state.loding = true;
    },
    [fetchOrder.rejected]: (state, action) => {
      state.error = action.error;
      state.loding = false;
    },
  },
});
export default OrderSlice.reducer;
