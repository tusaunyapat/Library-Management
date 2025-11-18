/* eslint-disable react-hooks/set-state-in-effect */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { TextField, Select, MenuItem } from "@mui/material";
import DateReserve from "./DateReserve";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { AppDispatch } from "@/redux/store";
import dayjs, { Dayjs } from "dayjs";
import { BookingItem } from "../type/interface";
import { addBooking } from "@/redux/features/bookSlice";
import createReservation from "@/libs/createReservation";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
export default function Form({
  bookId,
  userId,
  token,
}: {
  bookId: string;
  userId: string | null;
  token: string | null;
}) {
  const [pickupDate, setPickupDate] = useState<Dayjs | null>(null);
  const [submitting, setSubmitting] = useState(false);
  const [isCreated, setIsCreated] = useState(false);

  const [error, setError] = useState<string>("");

  const [reservations, setReservations] = useState([]);
  const { data: session } = useSession();

  const router = useRouter();

  useEffect(() => {
    const loadReservations = async () => {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/reservations`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${session?.user.token}`,
          },
        }
      );
      setReservations(await response.json().then((data) => data.data));
    };
    loadReservations();
  }, [session?.user.token]);

  useEffect(() => {
    if (!bookId || !reservations) return;
    const existingReservation = reservations.find(
      (reservation: any) => reservation.book._id === bookId
    );
    if (existingReservation) {
      // setIsReserved(true);
      setIsCreated(true);
    } else {
      // setIsReserved(false);
    }
  }, [bookId, reservations]);

  const makeBooking = () => {
    if (!session) {
      router.push("/signin");
      return;
    }

    if (reservations.length >= 3) {
      setError(
        "You have reached the maximum number of active reservations (3). Please cancel an existing reservation before making a new one."
      );
      return;
    }

    if (pickupDate && userId && token && !isCreated) {
      setSubmitting(true);
      createReservation(bookId, userId, pickupDate, token).then((res) => {
        console.log("reservation created", res);
        setIsCreated(true);
        setSubmitting(false);
      });
    }
    setPickupDate(null);
  };

  return (
    <div className="w-full">
      <div className="flex flex-col lg:flex-row gap-4 my-4 w-full">
        <div className="px-4 w-full">
          <label className="block text-sm font-medium text-white/70 mb-2">
            Borrow Date
          </label>
          <div className="bg-stone-100/40 w-full p-4 rounded-md font-medium text-black/40 px-8 pointer-none select-none cursor-default">
            {" "}
            TODAY
          </div>
        </div>
        <div className="px-4 w-full">
          <label className="block text-sm font-medium text-white/70 mb-2">
            Pickup Date
          </label>
          <DateReserve
            onDateChange={(value: Dayjs) => {
              setPickupDate(value);
            }}
          />
        </div>
      </div>

      {/* Submit Button */}
      <div className="flex justify-center mt-10">
        <button
          type="submit"
          name="Book Venue"
          onClick={makeBooking}
          className={`bg-stone-800  text-white/60 font-classic text-sm px-8 py-3 rounded-lg shadow-md transition-all duration-200 ${
            isCreated ? "cursor-default" : "hover:bg-stone-900 cursor-pointer "
          }`}
        >
          {isCreated
            ? "Requested"
            : submitting
            ? "Requesting..."
            : "Request Reservation"}
        </button>
      </div>
      <div className="flex flex-row w-full justify-center">
        {error && (
          <p className="text-red-600 text-center mt-4  font-mono text-xs bg-black/30 rounded-md p-1 px-4 w-fit">
            {error}
          </p>
        )}
      </div>
    </div>
  );
}
