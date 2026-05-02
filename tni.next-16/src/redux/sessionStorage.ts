"use client";
const APP_NAME_SESSION = "app_session";

export const loadFromSessionStorage = () => {
  try {
    if (typeof window === "undefined" || !window.sessionStorage)
      return undefined;

    const serializedState = window.sessionStorage.getItem(APP_NAME_SESSION);
    if (serializedState === null) return undefined;

    return JSON.parse(serializedState);
  } catch (e) {
    console.warn("Could not load state from sessionStorage", e);
    return undefined;
  }
};

export const saveToSessionStorage = (state: any) => {
  try {
    const serializedState = JSON.stringify(state);
    sessionStorage.setItem(APP_NAME_SESSION, serializedState);
  } catch (e) {
    console.warn("Could not save state to sessionStorage", e);
  }
};
