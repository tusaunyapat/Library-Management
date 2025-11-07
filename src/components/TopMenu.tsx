"use client";

/* eslint-disable react-hooks/rules-of-hooks */
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useSession } from "next-auth/react";
import { signOut } from "next-auth/react";

export default function TopMenu() {
  const { data: session } = useSession();
  const path = usePathname();
  console.log("top menu");
  // console.log(session);

  // if this page is /signin or /signup do not show the top menu

  if (path === "/signin" || path === "/signup") {
    return null;
  }

  return (
    <>
      <div className="fixed top-0 z-50 w-full flex flex-row gap-4 justify-between  items-center p-4 bg-black/40 shadow-md h-18 backdrop-blur-xs font-serif">
        <Link
          href={"/"}
          className="text-white/90 font-bold text-lg ml-8 cursor-pointer p-2"
        >
          CUPPA READ
        </Link>
        <div className="flex flex-row items-center gap-12 text-white/90">
          {session?.user.role == "admin" ? (
            <>
              <Link
                className="cursor-pointer p-3 px-6 hover:bg-white/10 rounded-md hover:underline underline-offset-3"
                href={"/managebook"}
              >
                MANAGE BOOKS
              </Link>
              <Link
                className="cursor-pointer p-3 px-6 hover:bg-white/10 rounded-md hover:underline underline-offset-3"
                href={"/managereservation"}
              >
                MANAGE RESERVATIONS
              </Link>
            </>
          ) : (
            <>
              <Link
                className="cursor-pointer p-3 px-6 hover:bg-white/10 rounded-md hover:underline underline-offset-3"
                href={"/"}
              >
                HOME
              </Link>
              <Link
                className="cursor-pointer p-3 px-6 hover:bg-white/10 rounded-md hover:underline underline-offset-3"
                href={"/books"}
              >
                BOOKS
              </Link>
              <Link
                className="cursor-pointer p-3 px-6 hover:bg-white/10 rounded-md hover:underline underline-offset-3"
                href={"/mybooking"}
              >
                MY RESERVATIONS
              </Link>
            </>
          )}
        </div>
        <div className="flex flex-row items-center gap-2">
          <div className="flex flex-row justify-start gap-6">
            {session ? (
              <div>
                <div
                  className="flex items-center justify-start text-white/90 cursor-pointer p-3 px-6 rounded-md hover:underline underline-offset-3"
                  onClick={() => signOut({ callbackUrl: "/signin" })}
                >
                  Sign-Out of {session.user.name}
                </div>
              </div>
            ) : (
              <Link href="/signin">
                <div className="flex items-center justify-start text-white/90 cursor-pointer p-3 px-6 rounded-md hover:underline underline-offset-3">
                  SIGN-IN
                </div>
              </Link>
            )}
            {/* <TopMenuItem title="My Booking" pageRef="/mybooking" /> */}
          </div>
          <div className="flex flex-row items-center">
            {/* <TopMenuItem title="Booking" pageRef="/booking" /> */}
          </div>
        </div>
      </div>
    </>
  );
}
