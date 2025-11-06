export default async function getBook(vid: string) {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/books/${vid}`
  );
  if (!response.ok) {
    throw new Error("Failed to fetch book");
  }
  const data = await response.json();
  return data.data;
}
