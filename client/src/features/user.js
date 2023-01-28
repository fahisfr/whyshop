

import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "../axios";

export const fetchUser = createAsyncThunk("user/fetchUser", async (userId) => {
  const response = await axios.get("/user").then((res) => res.data);
  return response;
});
export const userSlice = createSlice({
  name: "user",
  initialState: {
    userInfo: {
      name: "",
      number: "",
      role: "",
      cart: [],
      cartTotalPirce: 0,
      isAuth: false,
    },
    error: "",
    loading: false,
  },
  reducers: {
    login: (state, action) => {
      state.userInfo = action.payload;
    },
    logout: (state, action) => {
      state.userInfo = {
        name: "",
        number: "",
        role: "",
        isAuth: false,
      };
    },
    addToCart: (state, action) => {
      state.userInfo.cart.push(action.payload);
    },
    changeProductQuantity: (state, action) => {
      state.userInfo.cart.find(
        (itme) => itme._id === action.payload.id
      ).quantity += action.payload.quantity;
    },
    removeFromCart: (state, action) => {
      state.userInfo.cart = state.userInfo.cart.filter(
        (item) => item._id !== action.payload
      );
    },
    clearCart: (state, action) => {
      state.userInfo.cart = [];
    },
  },
  extraReducers: {
    [fetchUser.fulfilled]: (state, { payload }) => {
      if (payload.status === "ok") {
        state.userInfo = payload.userInfo;
        
        state.loading = false;
      } else if (payload.status === "error") {
        state.error = payload.error;
      }
    },
    [fetchUser.pending]: (state, action) => {
      state.loading = true;
    },
    [fetchUser.rejected]: (state, action) => {
      state.error = action.error;
    },
  },
});

export const {
  login,
  logout,
  addToCart,
  changeProductQuantity,
  removeFromCart,
  clearCart,
  Checkout,
} = userSlice.actions;

export default userSlice.reducer;
