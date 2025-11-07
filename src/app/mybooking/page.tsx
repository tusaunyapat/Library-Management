"use client";
import BookingList from "@/components/BookingList";
import { useBooks } from "@/context/BooksContext";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import { IoIosSearch } from "react-icons/io";

export default function Book() {
  const [books, setBooks] = useState([]);
  const { data: session } = useSession();

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
      setBooks(await response.json().then((data) => data.data));
    };
    loadReservations();
  }, [session?.user.token]);

  return (
    <main className="mx-auto text-center p-5 w-full md:w-10/12 flex flex-col items-center mt-28 z-49">
      {/* <div className="inset-0 absolute bg-black/70 w-screen h-auto"></div> */}
      <h1 className="text-3xl font-serif text-white/90 z-49">
        My Reservations
      </h1>

      {/* Optional Description */}
      <p className="text-white/70 text-center font-serif z-49 mb-12">
        Here are all the books you’ve reserved! You can view details, cancel
        reservations, or pick them up at the library.
      </p>

      <BookingList books={books} />
      {/* <div className="w-full flex flex-row justify-center items-center gap-2 z-49 my-4 mt-12">
        <div className="p-2 px-8 rounded-md bg-white/40 shadow border-[1px] border-white/30 cursor-pointer hover:bg-white/60 font-serif font-bold">
          Prev
        </div>
        <div className="p-2 px-8 rounded-md bg-white/40 shadow border-[1px] border-white/30 cursor-pointer hover:bg-white/60 font-serif font-bold">
          Next
        </div>
      </div> */}
    </main>
  );
}
