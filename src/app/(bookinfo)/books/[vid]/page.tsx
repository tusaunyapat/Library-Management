import getBook from "@/libs/getBook";
import { BookItem } from "@/type/interface";
import Image from "next/image";
import Link from "next/link";
export default async function BookDetailPage({
  params,
}: {
  params: Promise<{ vid: string }>;
}) {
  const { vid } = await params;
  const book: BookItem = await getBook(vid);
  console.log(book);

  return (
    <main className="flex justify-center p-5">
      <div className="flex flex-row gap-20">
        <Image
          src={book.coverPicture}
          alt={book.title}
          width={400}
          height={300}
        />
        <div className="flex flex-col">
          <h1 className="text-xl font-semibold">Title: {book.title}</h1>
          <p>Author: {book.author}</p>
          <p>ISBN: {book.ISBN}</p>
          <p>Publisher: {book.publisher}</p>
          <p>Available Amount: {book.availableAmount}</p>
        </div>
        <Link href={`/booking?id=${vid}&name=${book.title}`}>
          <button className="block rounded-md bg-sky-600 hover:bg-indigo-600 px-3 py-1 text-white">
            book now
          </button>
        </Link>
      </div>
    </main>
  );
}
