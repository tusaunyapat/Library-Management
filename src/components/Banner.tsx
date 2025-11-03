"use client";
import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

export default function Banner() {
  const [index, setIndex] = useState(0);
  const imageSrc = ["cover.jpg", "cover2.jpg", "cover3.jpg", "cover4.jpg"];
  const { data: session } = useSession();
  console.log("session", session?.user.token);
  const router = useRouter();
  const handleClick = () => {
    setIndex((prev) => (prev + 1) % imageSrc.length);
  };

  return (
    <div
      className="relative w-full h-screen overflow-hidden"
      onClick={handleClick}
    >
      <img
        src={`/img/${imageSrc[index]}`}
        alt={`Banner ${index + 1}`}
        className={`object-cover transition-opacity duration-1000 h-full w-full`}
      />

      <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-6">
        <h1 className="text-4xl md:text-5xl font-bold text-white drop-shadow-lg mb-4">
          where every event finds its venue
        </h1>
        <h2 className="text-lg md:text-xl text-gray-200 max-w-2xl drop-shadow">
          Finding the perfect venue has never been easier. Whether it's a
          wedding, corporate event, or private party, we connect people to the
          perfect place.
        </h2>
        {session ? (
          <div className="z-30 absolute top-5 right-10 font-semibold text-amber-400 text-xl">
            Welcome {session.user.name}
          </div>
        ) : null}
      </div>
      <div className="absolute bottom-36 right-24 shadow-2xl shadow-emerald-950">
        <Link
          href="/venue"
          className="bg-white text-gray-900 px-6 py-3 rounded-xl shadow-lg font-semibold hover:bg-gray-100 transition"
          onClick={(e) => e.stopPropagation()} // prevent banner click
        >
          Find Venues →
        </Link>
      </div>
    </div>
  );
}
