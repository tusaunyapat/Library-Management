import { TextField, Select, MenuItem } from "@mui/material";
import DateReserve from "./DateReserve";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { AppDispatch } from "@/redux/store";
import dayjs, { Dayjs } from "dayjs";
import { BookingItem } from "../type/interface";
import { addBooking } from "@/redux/features/bookSlice";
export default function Form() {
  const [pickupDate, setPickupDate] = useState<Dayjs | null>(null);
  const [pickupLocation, setPickupLocation] = useState<string>("");

  const [fullname, setFullname] = useState<string>("");
  const [tel, setTel] = useState<string>("");
  const dispatch = useDispatch<AppDispatch>();

  const makeBooking = () => {
    console.log(
      "to item",
      fullname,
      tel,
      pickupLocation,
      dayjs(pickupDate).format("YYYY/MM/DD")
    );
    if (fullname && pickupLocation) {
      const item: BookingItem = {
        nameLastname: fullname,
        tel: tel,
        venue: pickupLocation,
        bookDate: dayjs(pickupDate).format("YYYY/MM/DD"),
      };
      console.log("item", item);
      dispatch(addBooking(item));
      setFullname("");
      setTel("");
      setPickupDate(null);
      setPickupLocation("");
    }
  };
  return (
    <div className="w-full">
      {/* Name */}
      <div className="px-4">
        <TextField
          name="Name-Lastname"
          label="Name-Lastname"
          variant="standard"
          fullWidth
          value={fullname}
          onChange={(e) => setFullname(e.target.value)}
          className="bg-gray-50 rounded-md px-3 py-3"
        />
      </div>

      {/* Contact */}
      <div className="px-4">
        <TextField
          name="Contact-Number"
          label="Contact-Number"
          variant="standard"
          fullWidth
          value={tel}
          onChange={(e) => setTel(e.target.value)}
          className="bg-gray-50 rounded-md px-3 py-3"
        />
      </div>

      {/* Date Picker */}
      <div className="px-4">
        <label className="block text-sm font-medium text-gray-600 mb-2">
          Reservation Date
        </label>
        <DateReserve
          onDateChange={(value: Dayjs) => {
            setPickupDate(value);
          }}
          onLocationChange={(value: string) => setPickupLocation(value)}
        />
      </div>

      {/* Submit Button */}
      <div className="flex justify-center mt-6">
        <button
          type="submit"
          name="Book Venue"
          onClick={makeBooking}
          className="bg-indigo-600 hover:bg-indigo-700 text-white font-semibold px-8 py-3 rounded-lg shadow-md transition-all duration-200"
        >
          Book Venue
        </button>
      </div>
    </div>
  );
}
