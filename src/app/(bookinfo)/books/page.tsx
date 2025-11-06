import BookCatalog from "@/components/BookCatalog";
import getBooks from "@/libs/getBooks";
export default async function Book() {
  const books = await getBooks();
  console.log(books);

  return (
    <main className="mx-auto text-center p-5 w-full md:w-10/12 flex flex-col items-center">
      <h1 className="text-3xl font-semibold text-gray-800">Library Catalog</h1>

      {/* Optional Description */}
      <p className="text-gray-600 text-center">
        Explore our collection of books. Click on a book to see more details.
      </p>
      <BookCatalog booksJson={books} />
    </main>
  );
}
