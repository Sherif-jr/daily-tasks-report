import { Middleware } from "@reduxjs/toolkit";
import { StoreState } from "../index";

export const persistState: Middleware<object, StoreState> =
  ({ getState }) =>
  (next) =>
  async (action) => {
    const result = next(action);
    try {
      const state = getState();
      const cache = state.cache;

      localStorage.setItem("CACHE", JSON.stringify(cache));
    } catch (error) {
      console.error("Failed to save persist state:", error);
    }
    return result;
  };
