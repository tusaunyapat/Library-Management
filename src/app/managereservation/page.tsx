"use client";
import BookTable from "@/components/BookTable";
import BookModal from "@/components/BookModal";
import { useBooks } from "@/context/BooksContext";
import ReservationTable from "@/components/ReservationTable";
export default function ManageBook() {
  const { reservations } = useBooks();

  return (
    <main className="mx-auto p-6 w-full lg:w-10/12 flex flex-col gap-6 bg-beige-50 min-h-screen">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mt-18">
        <h1 className="text-4xl sm:text-5xl font-bold text-white">
          Reservation Records
        </h1>
      </div>

      {/* Optional description */}
      <p className="text-white/80">All reservation are shown.</p>

      {/* Table container with soft earth tone background */}
      <ReservationTable reservations={reservations} />
    </main>
  );
}
