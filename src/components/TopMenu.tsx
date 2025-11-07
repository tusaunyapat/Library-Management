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
    <div className="fixed top-0 z-50 w-full flex flex-row gap-4 justify-between  items-center p-4 bg-white/10 shadow-md h-18 backdrop-blur-xs">
      <div className="text-white/90 font-bold text-lg ml-8 cursor-pointer p-2">
        CUPPA READS
      </div>
      <div className="flex flex-row items-center gap-12">
        <div className="">HOME</div>
        <div>test</div>
        <div>test</div>
      </div>
      <div className="flex flex-row items-center gap-2">
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
  );
}
