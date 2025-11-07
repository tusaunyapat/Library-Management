"use client";

import { useSession } from "next-auth/react";
import Banner from "../components/Banner";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function Home() {
  const { data: session } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (session) {
      if (session.user.role === "admin") {
        router.push("/managebook");
      }
    }
  }, [router, session]);

  return (
    <div className="">
      <main className="">
        <div className="inset-0 absolute w-screen h-screen bg-black/40 z-2"></div>
        <Banner />
      </main>
    </div>
  );
}
