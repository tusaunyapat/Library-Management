import getVenue from "@/libs/getVenue";
import Image from "next/image";
import Link from "next/link";
export default async function VenueDetailPage({
  params,
}: {
  params: Promise<{ vid: string }>;
}) {
  const { vid } = await params;
  const venue = await getVenue(vid);

  return (
    <main className="flex justify-center p-5">
      <div className="flex flex-row gap-20">
        <Image
          src={venue.data.picture}
          alt={venue.data.name}
          width={400}
          height={300}
        />
        <div className="flex flex-col">
          <h1>Name: {venue.data.name}</h1>
          <h1>Address: {venue.data.address}</h1>
          <h1>Daily rate: {venue.data.dailyrate}</h1>
          <h1>Tel: {venue.data.tel}</h1>
        </div>
        <Link href={`/booking?id=${vid}&name=${venue.data.name}`}>
          <button className="block rounded-md bg-sky-600 hover:bg-indigo-600 px-3 py-1 text-white">
            book now
          </button>
        </Link>
      </div>
    </main>
  );
}
