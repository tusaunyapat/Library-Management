/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import InteractiveCard from "./InteractiveCard";
import Box from "@mui/material/Box";
import Rating from "@mui/material/Rating";
import Typography from "@mui/material/Typography";
import { BookItem } from "@/type/interface";
import { useRouter } from "next/navigation";
import DateReserve from "./DateReserve";
import dayjs, { Dayjs } from "dayjs";
import updateReservation from "@/libs/updateReservation";
import { useSession } from "next-auth/react";
import deleteReservation from "@/libs/deleteReservation";

interface ReservationCardProps {
  bookInfo: BookItem;
  bookReservation: any;
}

const ReservationCard: React.FC<ReservationCardProps> = ({
  bookInfo,
  bookReservation,
}) => {
  const [deleteMode, setDeleteMode] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [pickupDate, setPickupDate] = useState<Dayjs>(
    bookReservation.pickupDate
  );
  const [isDeleted, setIsDeleted] = useState(false);
  const [error, setError] = useState<string>("");

  const { data: session } = useSession();

  useEffect(() => {
    if (!pickupDate || !bookReservation.borrowDate) return;

    const pickup = dayjs(pickupDate);
    const borrow = dayjs(bookReservation.borrowDate);

    if (!pickup.isValid() || !borrow.isValid()) return;

    if (pickup.isBefore(borrow, "day")) {
      setError("Pickup date cannot be in the past.");
    } else {
      setError("");
    }
  }, [pickupDate, bookReservation.borrowDate]);

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
      // hour: "2-digit",
      // minute: "2-digit",
    });
  };

  const handleEdit = () => {
    if (!session?.user.token) return;
    updateReservation(
      bookReservation.id,
      {
        borrowDate: bookReservation.borrowDate,
        pickupDate: pickupDate,
        userId: bookReservation.user.id,
        bookId: bookReservation.book.id,
      },
      session?.user.token ?? ""
    ).then((res) => {
      console.log("reservation updated", res);
      setEditMode(false);
    });
  };

  const handleDelete = () => {
    if (!session?.user.token) return;
    deleteReservation(bookReservation.id, session?.user.token ?? "").then(
      (res) => {
        console.log("reservation deleted", res);
        setDeleteMode(false);
        setIsDeleted(true);
      }
    );
  };

  if (isDeleted) return null;

  return (
    <InteractiveCard>
      <div className="flex flex-col h-full w-full rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300 items-center p-2 pb-8 pt-6">
        {!deleteMode ? (
          <>
            <div className="w-[80%] flex justify-center h-40 relative mb-4">
              <Image
                // className="w-52 h-72"
                // width={100}
                // height={300}
                src={bookInfo.coverPicture}
                fill
                // fill
                alt="bookPicture"
                className="rounded-md"
              />
            </div>
            <div className="text-white/80 font-classic">{bookInfo.title}</div>
            <div className="my-2 text-white/60 font-classic text-[10px]">
              Author:
              {bookInfo.author}
            </div>
          </>
        ) : (
          <div className="flex items-center justify-center flex-1 text-white/60">
            Are you sure?
          </div>
        )}
        {editMode ? (
          <div className="w-5/6">
            <label className="block text-sm font-medium text-white/70 mb-2">
              Pickup Date
            </label>
            <DateReserve
              onDateChange={(value: Dayjs) => {
                setPickupDate(value);
              }}
            />
            {error && (
              <p className="text-red-500 text-sm font-bold py-2">{error}</p>
            )}
          </div>
        ) : deleteMode ? null : (
          <div className="my-2 text-white/60 font-classic text-[10px]">
            Pickup Date:
            <span className="text-lime-500 font-serif text-base">
              {formatDate(pickupDate.toString())}
            </span>
          </div>
        )}

        <div className="flex flex-row gap-2 items-center justify-center mt-4">
          {deleteMode ? (
            <>
              <div
                className="bg-stone-700 p-2 px-4 border-[0.1px] border-black/30 cursor-pointer hover:bg-white/50 rounded-md font-classic text-xs text-white/50 transition-all duration-200 shadow-md shadow-black/20"
                onClick={() => setDeleteMode(false)}
              >
                No
              </div>
              <div
                className="bg-stone-800 p-2 px-4 border-[0.1px] border-black/30 cursor-pointer hover:bg-white/50 rounded-md font-classic text-xs text-white/70 transition-all duration-200 shadow-md shadow-black/20"
                onClick={handleDelete}
              >
                Yes
              </div>
            </>
          ) : editMode ? (
            <>
              <div
                className="bg-stone-700 p-2 px-4 border-[0.1px] border-black/30 cursor-pointer hover:bg-white/50 rounded-md font-classic text-xs text-white/50 transition-all duration-200 shadow-md shadow-black/20"
                onClick={() => setEditMode(false)}
              >
                Cancel
              </div>
              <div
                className="bg-stone-800 p-2 px-4 border-[0.1px] border-black/30 cursor-pointer hover:bg-white/50 rounded-md font-classic text-xs text-white/70 transition-all duration-200 shadow-md shadow-black/20"
                onClick={handleEdit}
              >
                Done
              </div>
            </>
          ) : (
            <>
              <div
                className="bg-stone-700 p-2 px-4 border-[0.1px] border-black/30 cursor-pointer hover:bg-white/50 rounded-md font-classic text-xs text-white/50 transition-all duration-200 shadow-md shadow-black/20"
                onClick={() => setDeleteMode(true)}
              >
                Return
              </div>
              <div
                className="bg-stone-800 p-2 px-4 border-[0.1px] border-black/30 cursor-pointer hover:bg-white/50 rounded-md font-classic text-xs text-white/70 transition-all duration-200 shadow-md shadow-black/20"
                onClick={() => setEditMode(true)}
              >
                Edit
              </div>
            </>
          )}
        </div>
      </div>
    </InteractiveCard>
  );
};

export default ReservationCard;
