import Link from "next/link";
import Card from "./Card";
import { VenueJson } from "../type/interface";

export default async function VenueCatalog({
  venuesJson,
}: {
  venuesJson: Promise<VenueJson>;
}) {
  const resolvedData = await venuesJson;
  return (
    <div className="flex w-full gap-2">
      {resolvedData.data.map((venue) => (
        <Link href={`/venue/${venue.id}`} key={venue.id} className="w-1/3">
          <Card imgSrc={venue.picture} venueName={venue.name} />
        </Link>
      ))}
    </div>
  );
}
