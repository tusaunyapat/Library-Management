import { BookItem } from "@/type/interface";

export default async function updateBook(
  id: string,
  bookData: Omit<BookItem, "_id" | "id">,
  token: string
) {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/books/${id}`,
    {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        title: bookData.title,
        author: bookData.author,
        ISBN: bookData.ISBN,
        publisher: bookData.publisher,
        availableAmount: bookData.availableAmount,
        coverPicture: bookData.coverPicture,
      }),
    }
  );
  if (!response.ok) {
    throw new Error("failed to update book");
  }
  console.log("udpate response", response);
  return await response.json();
}
