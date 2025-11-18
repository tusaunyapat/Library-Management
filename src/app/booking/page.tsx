"use client";

import Form from "@/components/Form";
import { useSearchParams } from "next/navigation";

import dayjs from "dayjs";
import { BookingItem } from "../../type/interface";
import { useEffect, useState } from "react";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/authOptions";
import { useSession } from "next-auth/react";

export default function Booking() {
  const urlParams = useSearchParams();
  const vid = urlParams.get("id") ?? "";
  const title = urlParams.get("name") ?? "";
  const author = urlParams.get("author") ?? "";
  const ISBN = urlParams.get("ISBN") ?? "";

  const { data: session } = useSession();

  // useEffect(() => {
  //   const loadUser = async () => {
  //     const session = await getServerSession(authOptions);
  //     setUserId(session?.user._id ?? null);
  //     setUserToken(session?.user.token ?? null);
  //   };
  //   loadUser();
  // }, []);

  // return (
  //   <div className="h-screen flex flex-col gap-4 items-center justify-center">
  //     <div className="w-full md:w-4/5 lg:w-1/2 p-18 px-24 bg-white/20 backdrop-blur-sm rounded-md border-white/10 shadow-xl shadow-black/30">
  //       {/* Heading */}
  //       <h2 className="text-3xl font-bold text-white/60 text-center tracking-wide mb-6 font-classic">
  //         Make a Reservation
  //       </h2>
  //       <div className="flex flex-row gap-4 ml-4 mt-8">
  //         <h3 className="text-xl font-serif text-white/80">
  //           Book Title: {title}
  //         </h3>
  //         <h3 className="text-xl font-serif text-white/80">Author: {author}</h3>
  //         <h3 className="text-xl font-serif text-white/80">ISBN: {ISBN}</h3>
  //       </div>
  //       <Form
  //         bookId={vid}
  //         userId={session?.user._id ?? null}
  //         token={session?.user.token ?? null}
  //       />
  //     </div>
  //   </div>
  // );
  return (
    <div className="min-h-screen flex flex-col gap-4 items-center justify-center p-4">
      <div className="w-full md:w-4/5 lg:w-1/2 p-6 md:p-12 bg-white/20 backdrop-blur-sm rounded-md border border-white/10 shadow-xl shadow-black/30">
        {/* Heading */}
        <h2 className="text-2xl md:text-3xl font-bold text-white/60 text-center tracking-wide mb-6 font-classic">
          Make a Reservation
        </h2>

        {/* Book Info */}
        <div className="flex flex-col md:flex-row md:flex-wrap gap-2 md:gap-4 mt-4 md:mt-8 text-center md:text-left">
          <h3 className="text-lg md:text-xl font-serif text-white/80 break-all">
            Book Title: {title}
          </h3>
          <h3 className="text-lg md:text-xl font-serif text-white/80 break-all">
            Author: {author}
          </h3>
          <h3 className="text-lg md:text-xl font-serif text-white/80 break-all">
            ISBN: {ISBN}
          </h3>
        </div>

        <div className="mt-6">
          <Form
            bookId={vid}
            userId={session?.user._id ?? null}
            token={session?.user.token ?? null}
          />
        </div>
      </div>
    </div>
  );
}
