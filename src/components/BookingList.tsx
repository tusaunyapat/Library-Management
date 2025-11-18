/* eslint-disable @typescript-eslint/no-explicit-any */
// "use client";

// import { AppDispatch, useAppSelector } from "@/redux/store";
// import { useDispatch } from "react-redux";
// import { removeBooking } from "@/redux/features/bookSlice";
// import { useEffect, useState } from "react";
// import { useSession } from "next-auth/react";
// export default function BookingList() {
//   const [books, setBooks] = useState([]);
//   const { data: session } = useSession();

//   useEffect(() => {
//     const loadReservations = async () => {
//       const response = await fetch(
//         `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/reservations`,
//         {
//           method: "GET",
//           headers: {
//             "Content-Type": "application/json",
//             Authorization: `Bearer ${session?.user.token}`,
//           },
//         }
//       );
//       setBooks(await response.json());
//     };
//     loadReservations();
//   }, [session?.user.token]);

//   return (

//   );
// }

"use client";
import Link from "next/link";
import Card from "./Card";
import { BookItem, BookJson } from "../type/interface";
import ReservationCard from "./ReservationCard";

export default function BookingList({ books }: { books: any }) {
  console.log("books in bookinglist", books);
  if (!books || books.length === 0) {
    return (
      <div className="text-white/70 font-serif text-xl mt-12">
        You have no reservations yet.
      </div>
    );
  }
  return (
    <div
      className="
        grid w-full gap-4
        grid-cols-1 sm:grid-cols-3 
        auto-rows-fr
      "
    >
      {books.map((book: any) => (
        // <Link key={book.id} href={`/books/${book.id}`} className="w-full">
        // </Link>

        <ReservationCard
          bookInfo={book.book}
          bookReservation={book}
          key={book.id}
        />
      ))}
    </div>
  );
}
