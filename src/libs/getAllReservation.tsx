export default async function getReservations(token: string) {
  console.log(process.env.NEXT_PUBLIC_BACKEND_URL);
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/reservations`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    }
  );
  if (!response.ok) {
    throw new Error("Failed to fetch books");
  }
  return await response.json();
}
