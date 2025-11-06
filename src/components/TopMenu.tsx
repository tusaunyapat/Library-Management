import Image from "next/image";
import TopMenuItem from "./TopMenuItem";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/authOptions";
import Link from "next/link";

export default async function TopMenu() {
  const session = await getServerSession(authOptions);
  console.log("top menu");
  console.log(session);

  return (
    <div className="flex flex-row gap-4 justify-between  items-center p-4 bg-white shadow-md h-18">
      <div className="flex flex-row justify-start gap-6">
        {session ? (
          <Link href="/api/auth/signout">
            <div className="flex items-center justify-start text-slate-900 text-md font-bold">
              Sign-Out of {session.user.name}
            </div>
          </Link>
        ) : (
          <Link href="/api/auth/signin">
            <div className="flex items-center justify-start text-slate-900 text-md font-bold">
              Sign-In
            </div>
          </Link>
        )}
        <TopMenuItem title="My Booking" pageRef="/mybooking" />
        {session && session?.user.role == "admin" && (
          <TopMenuItem title="Manage Book" pageRef="/managebook" />
        )}
      </div>
      <div className="flex flex-row items-center">
        <TopMenuItem title="Booking" pageRef="/booking" />
        <div className="p-0">
          <Image
            src="/logo.png"
            alt="logo"
            width={50}
            height={0}
            className="h-auto w-auto"
          />
        </div>
      </div>
    </div>
  );
}
