import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface PopUpMessageState {
  trigger: boolean;
  isError: boolean;
  message: string;
}

const initialState: PopUpMessageState = {
  trigger: false,
  isError: false,
  message: "",
};

export const popUpMessageSlice = createSlice({
  name: "popUpMessage",
  initialState,
  reducers: {
    triggerSidePopUp: () => {},
    showSuccessMessage: (state, action: PayloadAction<string>) => {
      state.trigger = true;
      state.isError = false;
      state.message = action.payload;
    },
    showErrorMessage: (state, action: PayloadAction<string>) => {
      console.log("hello this not an error");

      state.trigger = true;
      state.isError = true;
      state.message = action.payload;
    },
    closeSidePopUp: (state) => {
      state.trigger = false;
    },
  },
});

export const {
  showSuccessMessage,
  showErrorMessage,
  closeSidePopUp,
  triggerSidePopUp,
} = popUpMessageSlice.actions;

export default popUpMessageSlice.reducer;
