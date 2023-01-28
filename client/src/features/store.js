import home from "./home";
import user from "./user";
import orders from "./orders";
import products from "./products";
import popUpMessage from "./popUpMessage";
import { configureStore } from "@reduxjs/toolkit";

export default configureStore({
  reducer: {
    user,
    home,
    orders,
    products,
    popUpMessage,
  },
});
