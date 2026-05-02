import reducer, { openLoader, closeLoader } from "../loaderSlice";

describe("loaderSlice", () => {
  const initialState = {
    open: false
  };

  it("should return the initial state when passed an empty action", () => {
    expect(reducer(undefined, { type: "" })).toEqual(initialState);
  });

  it("should set open to true when openLoader is dispatched", () => {
    const state = reducer(initialState, openLoader());

    expect(state.open).toBe(true);
  });

  it("should set open to false when closeLoader is dispatched", () => {
    const currentState = { open: true };
    const state = reducer(currentState, closeLoader());

    expect(state.open).toBe(false);
  });

  it("should handle multiple open/close calls correctly", () => {
    let state = reducer(initialState, openLoader());
    expect(state.open).toBe(true);

    state = reducer(state, closeLoader());
    expect(state.open).toBe(false);

    state = reducer(state, openLoader());
    expect(state.open).toBe(true);
  });
});
