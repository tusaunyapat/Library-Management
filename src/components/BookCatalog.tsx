import Link from "next/link";
import Card from "./Card";
import { BookJson } from "../type/interface";

export default async function BookCatalog({
  booksJson,
}: {
  booksJson: Promise<BookJson>;
}) {
  const resolvedData = await booksJson;

  return (
    <div
      className="
        grid w-full gap-4 
        grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 
        auto-rows-fr
      "
    >
      {resolvedData.data.map((book) => (
        <Link key={book.id} href={`/book/${book.id}`} className="w-full">
          <Card bookInfo={book} />
        </Link>
      ))}
    </div>
  );
}
