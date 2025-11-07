/* eslint-disable @next/next/no-img-element */
"use client";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

export default function Banner() {
  const { data: session } = useSession();
  console.log("session", session?.user.token);
  const router = useRouter();

  return (
    <div className="w-full h-screen overflow-hidden flex items-center justify-center z-49">
      <div className="flex flex-col items-center px-6">
        <div className="mt-18"></div>
        <div className="w-full h-full flex flex-col items-center justify-center mb-28">
          <div className="text-4xl font-classic font-bold text-white/90 z-49">
            A World of Stories Awaits
          </div>
          <div className="text-xs font-classic font-bold text-white/60 w-[60vw] mt-4 text-center z-49">
            From timeless classics to modern favorites — your next adventure
            begins here. Reserve, read, and rediscover the joy of books, all
            from your screen.
          </div>
          <div
            className="px-6 py-2 bg-white/50 mt-4 rounded-md font-bold cursor-pointer hover:bg-white/70 transition z-49"
            onClick={() => router.push("/books")}
          >
            Browse Books
          </div>
        </div>
      </div>
    </div>
  );
}
