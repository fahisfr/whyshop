
import { createSlice } from "@reduxjs/toolkit";

export const PopUpMessageSlice = createSlice({
  name: "popUpMessage",
  initialState: {
    sidePopUp: {
      trigger: false,
      error: false,
      message: "",
    },
  },
  reducers: {
    triggerSidePopUp: (state, { payload }) => {
      state.sidePopUp = {
        trigger: true,
        error: payload.error,
        message: payload.message,
      };
    },
    closeSidePopUp: (state, { payload }) => {
      state.sidePopUp.trigger = false;
    },
  },
});

export const { triggerSidePopUp, closeSidePopUp } = PopUpMessageSlice.actions;

export default PopUpMessageSlice.reducer;
