import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import Axios from "../axios";

export const fetchAllOrder = createAsyncThunk("AllOrder/fetchCart", async () => {
  const response = await Axios.get("/admin/orders").then((res) => res.data);
  return response;
});
export const AllOrderSlice = createSlice({
  name: "order",
  initialState: {
    OrdersInfo: [],
    error: "",
    loading: false,
  },
  extraReducers: {
    [fetchAllOrder.fulfilled]: (state, action) => {
      state.OrdersInfo = action.payload.Orders;
    },
    [fetchAllOrder.pending]: (state, action) => {
      state.loading = true;
    },
    [fetchAllOrder.rejected]: (state, action) => {
      state.error = action.error;
      state.loading = false;
    },
  },
});
export default AllOrderSlice.reducer;
