import { Dayjs } from "dayjs";

export default async function createReservation(
  bookId: string,
  userId: string,
  pickupDate: Dayjs,
  token: string
) {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/reservations`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        book: bookId,
        user: userId,
        pickupDate: pickupDate,
        borrowDate: Date.now(),
      }),
    }
  );
  if (!response.ok) {
    throw new Error("failed to create reservation");
  }
  console.log("creaete response", response);
  return await response.json();
}
