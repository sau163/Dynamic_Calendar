import { configureStore } from "@reduxjs/toolkit";
import calendarReducer from "./slice/CalSlice";

export const store = configureStore({
  reducer: {
    calendar: calendarReducer,
  },
  // Disable serializable state invariant middleware in development
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false, // Disable this middleware in development
    }),
});

