import reducer, { openDialog, closeDialog, resetDialog } from "../dialogSlice";

describe("dialogSlice", () => {
  const initialState: any = {
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

  it("should return the initial state when passed an empty action", () => {
    expect(reducer(undefined, { type: "" })).toEqual(initialState);
  });

  it("should handle openDialog and set state correctly", () => {
    const payload = {
      status: "warning",
      title: "Confirm Delete",
      content: "Are you sure?",
      onConfirm: jest.fn(),
      onCancel: jest.fn()
    };

    const state = reducer(initialState, openDialog(payload));

    expect(state.open).toBe(true);
    expect(state.dialogDetail).toEqual(payload);
  });

  it("should handle closeDialog and reset open to false with default dialogDetail", () => {
    const currentState: any = {
      open: true,
      dialogDetail: {
        status: "info",
        title: "Some Title",
        content: "Some Content",
        onConfirm: jest.fn(),
        onCancel: jest.fn()
      }
    };

    const state = reducer(currentState, closeDialog());

    expect(state.open).toBe(false);
    expect(state.dialogDetail).toEqual(initialState.dialogDetail);
  });

  it("should handle resetDialog and return to initialState", () => {
    const currentState: any = {
      open: true,
      dialogDetail: {
        status: "error",
        title: "Oops",
        content: "Something went wrong",
        onConfirm: jest.fn(),
        onCancel: jest.fn()
      }
    };

    const state = reducer(currentState, resetDialog());

    expect(state).toEqual(initialState);
  });
});
