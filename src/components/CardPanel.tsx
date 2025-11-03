"use client";
import Card from "./Card";
import { useReducer } from "react";
import Link from "next/link";
export default function CardPanel() {
  const ratingReducer = (
    ratingList: Map<string, number>,
    action: { type: string; venueName: string; rating?: number }
  ) => {
    switch (action.type) {
      case "add": {
        const newList = new Map(ratingList);
        newList.set(action.venueName, action.rating ?? 0);
        return newList;
      }
      case "remove": {
        const newList = new Map(ratingList);
        newList.delete(action.venueName);
        return newList;
      }

      default:
        return ratingList;
    }
  };

  const [ratingList, dispatchRating] = useReducer(
    ratingReducer,
    new Map<string, number>([
      ["The Bloom Pavilion", 0],
      ["Spark Space", 0],
      ["The Grand Table", 0],
    ])
  );

  const mockVenue = [
    { vid: "001", name: "The Bloom Pavilion", imageSrc: "/bloom.jpg" },
    { vid: "002", name: "Spark Space", imageSrc: "/sparkspace.jpg" },
    { vid: "003", name: "The Grand Table", imageSrc: "/grandtable.jpg" },
  ];
  return (
    <div className="flex flex-col">
      <div className="flex w-full flex-row gap-4 justify-around p-4">
        {mockVenue.map((venue) => (
          <Link href={`/venue/${venue.vid}`} key={venue.vid} className="w-1/3">
            <Card
              key={venue.vid}
              imgSrc={venue.imageSrc}
              venueName={venue.name}
              onRating={(action: {
                type: string;
                venueName: string;
                rating?: number;
              }) => dispatchRating(action)}
            />
          </Link>
        ))}
      </div>
      <div className="flex flex-col pb-24">
        <p className="font-bold text-lg">Rating</p>
        {Array.from(ratingList.entries()).map(([venueName, rating]) => (
          <div
            key={venueName}
            data-testid={`${venueName}`}
            onClick={() => dispatchRating({ type: "remove", venueName })}
            className="cursor-pointer"
          >
            {venueName}: {rating}
          </div>
        ))}
      </div>
    </div>
  );
}
