import { BookItem } from "@/type/interface";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/authOptions";

export default async function createBook(
  bookData: Omit<BookItem, "_id" | "id">,
  token: string
) {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/books`,
    {
      method: "POST",
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
    throw new Error("failed to create book");
  }
  console.log("creaete response", response);
  return await response.json();
}
