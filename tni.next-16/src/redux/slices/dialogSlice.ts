import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  open: false,
  dialogDetail: {
    status: "",
    title: "",
    content: "",
    onConfirm: null,
    onCancel: null,
    redirectPath: ""
  }
};

export const dialogSlice = createSlice({
  name: "dialog",
  initialState,
  reducers: {
    openDialog: (state, action) => {
      state.open = true;
      state.dialogDetail = action.payload;
    },
    closeDialog: (state) => {
      state.open = false;
      state.dialogDetail = initialState.dialogDetail;
    },
    resetDialog: (state) => {
      Object.assign(state, initialState);
    }
  }
});

export const { openDialog, closeDialog, resetDialog } = dialogSlice.actions;
export default dialogSlice.reducer;
