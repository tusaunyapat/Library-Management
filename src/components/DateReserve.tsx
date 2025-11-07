/* eslint-disable @typescript-eslint/no-unsafe-function-type */
"use client";

import { DatePicker } from "@mui/x-date-pickers";
import { Select, MenuItem } from "@mui/material";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { Dayjs } from "dayjs";
import { useState } from "react";
export default function DateReserve({
  onDateChange,
}: {
  onDateChange: Function;
}) {
  const [reserveDate, setReserveDate] = useState<Dayjs | null>(null);
  return (
    <div className="w-fit flex gap-4 rounded-md bg-stone-100/40">
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <DatePicker
          className="text-white"
          value={reserveDate}
          onChange={(value) => {
            setReserveDate(value);
            onDateChange(value);
          }}
        />
      </LocalizationProvider>
      {/* Venue */}
      {/* <div className="px-4">
        <label className="block text-sm font-medium text-gray-600 mb-2">
          Select Venue
        </label>
        <Select
          id="venue"
          name="venue"
          fullWidth
          className="rounded-md bg-gray-50 "
          value={location}
          onChange={(e) => {
            setLocation(e.target.value);
            onLocationChange(e.target.value);
          }}
        >
          <MenuItem value="Bloom">The Bloom Pavilion</MenuItem>
          <MenuItem value="Spark">Spark Space</MenuItem>
          <MenuItem value="GrandTable">The Grand Table</MenuItem>
        </Select>
      </div> */}
    </div>
  );
}
