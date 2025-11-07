"use client";
import BookTable from "@/components/BookTable";
import BookModal from "@/components/BookModal";
import { useBooks } from "@/context/BooksContext";
export default function ManageBook() {
  const { books } = useBooks();

  return (
    <main className="mx-auto p-6 w-full lg:w-10/12 flex flex-col gap-6 bg-beige-50 min-h-screen">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mt-18">
        <h1 className="text-4xl sm:text-5xl font-bold text-amber-800">
          Library Catalog
        </h1>

        <BookModal type="create" />
      </div>

      {/* Optional description */}
      <p className="text-amber-900/80">
        Manage your library books: view, edit, or delete entries. Click Add New
        Book to add a new one.
      </p>

      {/* Table container with soft earth tone background */}
      <BookTable books={books} />
    </main>
  );
}
