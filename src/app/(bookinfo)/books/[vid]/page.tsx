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
    <main className="flex justify-center p-5 mt-18">
      <div className="flex flex-row gap-20 text-white/80 bg-black/50 border-[1px] border-white/10 w-full h-[80vh] items-center pl-32">
        <div className="w-96 h-80 relative rounded-md">
          <Image
            src={book.coverPicture}
            alt={book.title}
            fill
            className="rounded-md shadow-xl shadow-white/10"
          />
        </div>
        <div className="flex flex-col gap-4">
          <h1 className="font-classic text-6xl">Title: {book.title}</h1>
          <p className="text-xl font-serif  text-white/50">
            Author: {book.author}
          </p>
          <p className="text-xl font-serif  text-white/50">ISBN: {book.ISBN}</p>
          <p className="text-xl font-serif  text-white/50">
            Publisher: {book.publisher}
          </p>
          <p className="text-xl font-serif  text-white/50">
            Available Amount: {book.availableAmount}
          </p>
          <Link
            href={`/booking?id=${vid}&name=${book.title}&author=${book.author}&ISBN=${book.ISBN}`}
          >
            <button className="block rounded-md bg-stone-700 hover:bg-black/80 border-[0.1px] border-black/20 shadow-lg shadow-black/40 px-6 py-3 cursor-pointer font-classic text-white/80 transition-all duration-300 ">
              BORROW NOW
            </button>
          </Link>
        </div>
      </div>
    </main>
  );
}
