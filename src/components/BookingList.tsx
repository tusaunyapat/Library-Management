"use client";

import { AppDispatch, useAppSelector } from "@/redux/store";
import { useDispatch } from "react-redux";
import { removeBooking } from "@/redux/features/bookSlice";
export default function BookingList() {
  const bookItems = useAppSelector((state) => state.bookSlice.bookItems);
  const dispatch = useDispatch<AppDispatch>();

  return (
    <div className="flex flex-col gap-4">
      {bookItems.length > 0 ? (
        bookItems.map((item, index) => (
          <div
            key={index}
            className="flex flex-col gap-2 border p-2 rounded-md"
          >
            <div className="text-xl font-semibold">
              Name: {item.nameLastname}
            </div>
            <div className="text-md">Tel: {item.tel}</div>
            <div className="text-md">Venue: {item.venue}</div>
            <div className="text-md">Date: {item.bookDate}</div>
            <button
              className="text-red-500 underline mt-2"
              onClick={() => dispatch(removeBooking(item))}
            >
              Cancel
            </button>
          </div>
        ))
      ) : (
        <p>No Venue Booking</p>
      )}
    </div>
  );
}
