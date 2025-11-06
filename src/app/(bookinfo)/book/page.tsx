import VenueCatalog from "@/components/BookCatalog";
import getVenues from "@/libs/getBooks";
export default async function Venue() {
  const venues = await getVenues();

  return (
    <main className="text-center p-5">
      <h1 className="text-xl fint-medium">Select your Venue Partner</h1>
      <VenueCatalog venuesJson={venues} />
    </main>
  );
}
