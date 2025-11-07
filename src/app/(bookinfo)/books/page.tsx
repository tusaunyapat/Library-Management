/* eslint-disable react-hooks/set-state-in-effect */
"use client";
import BookCatalog from "@/components/BookCatalog";
import { useBooks } from "@/context/BooksContext";
import { useEffect, useState } from "react";
import { IoIosSearch } from "react-icons/io";

export default function Book() {
  const { books } = useBooks();
  const [filteredBooks, setFilteredBooks] = useState(books);
  const [searchInput, setSearchInput] = useState("");
  const [debouncedInput, setDebouncedInput] = useState(searchInput);

  // debounce logic (700ms)
  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedInput(searchInput);
    }, 700);

    return () => {
      clearTimeout(handler);
    };
  }, [searchInput]);

  // filter books when debouncedInput changes
  useEffect(() => {
    const lowercasedInput = debouncedInput.toLowerCase();
    const filtered = books.filter(
      (book) =>
        book.title.toLowerCase().includes(lowercasedInput) ||
        book.author.toLowerCase().includes(lowercasedInput) ||
        book.ISBN.toLowerCase().includes(lowercasedInput)
    );
    setFilteredBooks(filtered);
  }, [books, debouncedInput]);

  return (
    <main className="mx-auto text-center p-5 w-full md:w-10/12 flex flex-col items-center mt-28 z-49">
      <h1 className="text-3xl font-serif text-white/90 z-49">
        Search for Books in the Library
      </h1>

      <p className="text-white/70 text-center font-serif z-49">
        Enter a title, author, or ISBN to find the book you’re looking for.
        Check availability and reserve instantly.
      </p>

      <div className="rounded-full p-4 border w-[80%] border-white/30 bg-white/10 my-6 mb-12 text-white/80 font-serif flex flex-row gap-2 items-center z-49">
        <IoIosSearch className="text-2xl ml-6" />
        <input
          className="placeholder:text-white/30 w-full ring-0 focus:ring-0 outline-none bg-transparent"
          placeholder="Search by title, author, or ISBN..."
          value={searchInput}
          onChange={(e) => setSearchInput(e.target.value)}
        />
      </div>

      <BookCatalog books={filteredBooks} />

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
