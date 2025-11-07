/* eslint-disable @typescript-eslint/no-explicit-any */
import { BookItem } from "@/type/interface";

export default async function updateReservation(
  id: string,
  reservationData: any,
  token: string
) {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/reservations/${id}`,
    {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        borrowDate: reservationData.borrowDate,
        pickupDate: reservationData.pickupDate,
        user: reservationData.userId,
        book: reservationData.bookId,
      }),
    }
  );
  if (!response.ok) {
    throw new Error("failed to update book");
  }
  console.log("udpate response", response);
  return await response.json();
}
