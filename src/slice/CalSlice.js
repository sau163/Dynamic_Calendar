import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  currentMonth: new Date().getMonth(),
  currentYear: new Date().getFullYear(),
  events: [], // Array to store events
};

const calendarSlice = createSlice({
  name: "calendar",
  initialState,
  reducers: {
    incrementMonth: (state) => {
      if (state.currentMonth === 11) {
        state.currentMonth = 0;
        state.currentYear += 1;
      } else {
        state.currentMonth += 1;
      }
    },
    decrementMonth: (state) => {
      if (state.currentMonth === 0) {
        state.currentMonth = 11;
        state.currentYear -= 1;
      } else {
        state.currentMonth -= 1;
      }
    },
    addEvent: (state, action) => {
      state.events.push(action.payload);
    },
    editEvent: (state, action) => {
      const index = state.events.findIndex((event) => event.id === action.payload.id);
      if (index !== -1) {
        state.events[index] = action.payload;
      }
    },
    deleteEvent: (state, action) => {
      state.events = state.events.filter((event) => event.id !== action.payload);
    },
  },
});

export const { incrementMonth, decrementMonth, addEvent, editEvent, deleteEvent } = calendarSlice.actions;
export default calendarSlice.reducer;


