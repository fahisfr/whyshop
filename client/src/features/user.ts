import { IChangeProductQuantity } from "./../helper/interfaces";
import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import axios from "../helper/axios";
import { IProduct, IUser } from "../helper/interfaces";

interface IUserState extends IUser {
  error: unknown;
  isError: boolean;
  isLoading: boolean;
}

export const fetchUser = createAsyncThunk("user/fetchUser", async () => {
  const { data } = await axios.get("/user");
  return data;
});

const initialState: IUserState = {
  name: "",
  number: "",
  role: "",
  cart: [],
  error: null,
  isError: false,
  isLoading: false,
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    login: (state, action: PayloadAction<IUser>) => {
      return {
        ...state,
        ...action.payload,
      };
    },
    logout: (state) => {
      state = initialState;
    },
    addToCart: (state, action: PayloadAction<IProduct>) => {
      state.cart.push({ ...action.payload, selectedQuantity: 1 });
    },
    changeProductQuantity: (
      state,
      { payload }: PayloadAction<IChangeProductQuantity>
    ) => {
      const item = state.cart.find((itme) => itme._id === payload.productId);
      if (item) {
        item.selectedQuantity += payload.quantity;
      }
    },
    removeFromCart: (state, action: PayloadAction<string>) => {
      state.cart = state.cart.filter((item) => item._id !== action.payload);
    },
    clearCart: (state) => {
      state.cart = [];
    },
  },
  extraReducers: (builder) => {
    builder.addCase(
      fetchUser.fulfilled,
      (state, action: PayloadAction<IUser>) => {
        return {
          ...state,
          ...action.payload,
          isLoading: false,
        };
      }
    );
    builder.addCase(fetchUser.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(fetchUser.rejected, (state, action) => {
      return {
        ...state,
        error: action.error,
        isLoading: false,
        isError: true,
      };
    });
  },
});

export const {
  login,
  logout,
  addToCart,
  changeProductQuantity,
  removeFromCart,
  clearCart,
} = userSlice.actions;

export default userSlice.reducer;
