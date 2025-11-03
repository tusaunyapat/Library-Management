"use client";

import Form from "@/components/Form";
import { useSearchParams } from "next/navigation";

import dayjs from "dayjs";
import { BookingItem } from "../../type/interface";
export default function Booking() {
  const urlParams = useSearchParams();
  const vid = urlParams.get("id") ?? "";
  const venue = urlParams.get("name") ?? "";

  return (
    <div className="w-2/4 mx-auto mt-12 p-10 bg-white rounded-2xl shadow-xl space-y-8">
      {/* Heading */}
      <h2 className="text-3xl font-bold text-gray-800 text-center tracking-wide mb-6">
        Book Venue
      </h2>
      <h3>Venue: {venue}</h3>
      <Form />
    </div>
  );
}
