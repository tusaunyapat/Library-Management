"use client";
import Link from "next/link";
import Card from "./Card";
import { BookItem, BookJson } from "../type/interface";

export default function BookCatalog({ books }: { books: BookItem[] }) {
  return (
    <div
      className="
        grid w-full gap-4 
        grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 
        auto-rows-fr
      "
    >
      {books.map((book) => (
        <Link key={book.id} href={`/books/${book.id}`} className="w-full">
          <Card bookInfo={book} />
        </Link>
      ))}
    </div>
  );
}
