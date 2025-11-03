import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { BookingItem } from "../../type/interface";

type BookState = {
  bookItems: BookingItem[];
};

const initialState: BookState = { bookItems: [] };

export const bookSlice = createSlice({
  name: "book",
  initialState,
  reducers: {
    addBooking: (state, action: PayloadAction<BookingItem>) => {
      console.log("Call addBooking");
      console.log(action.payload);

      const existingIndex = state.bookItems.findIndex(
        (item) =>
          item.venue === action.payload.venue &&
          item.bookDate === action.payload.bookDate
      );

      if (existingIndex !== -1) {
        // ✅ ถ้ามีอยู่แล้ว → แทนที่ข้อมูลเดิม
        state.bookItems[existingIndex] = action.payload;
        console.log("Updated existing booking");
      } else {
        // ✅ ถ้าไม่ซ้ำ → เพิ่มใหม่
        state.bookItems.push(action.payload);
        console.log("Added new booking");
      }
    },

    removeBooking: (state, action: PayloadAction<BookingItem>) => {
      console.log("Call removeBooking");
      console.log(action.payload);

      state.bookItems = state.bookItems.filter(
        (item) =>
          !(
            item.nameLastname === action.payload.nameLastname &&
            item.tel === action.payload.tel &&
            item.venue === action.payload.venue &&
            item.bookDate === action.payload.bookDate
          )
      );
    },
  },
});

export const { addBooking, removeBooking } = bookSlice.actions;
export default bookSlice.reducer;
