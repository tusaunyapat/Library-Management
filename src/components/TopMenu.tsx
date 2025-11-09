"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useSession, signOut } from "next-auth/react";
import { useState } from "react";
import { FiMenu, FiX } from "react-icons/fi";

export default function TopMenu() {
  const { data: session } = useSession();
  const path = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);

  if (path === "/signin" || path === "/signup") return null;

  const toggleMenu = () => setMenuOpen(!menuOpen);

  const commonLinks = (
    <>
      <Link
        href="/books"
        className="cursor-pointer p-3 px-6 hover:bg-white/10 rounded-md hover:underline underline-offset-3"
        onClick={() => setMenuOpen(false)}
      >
        BOOKS
      </Link>
    </>
  );

  const userLinks =
    session?.user.role === "admin" ? (
      <>
        {commonLinks}
        <Link
          href="/managebook"
          className="cursor-pointer p-3 px-6 hover:bg-white/10 rounded-md hover:underline underline-offset-3"
          onClick={() => setMenuOpen(false)}
        >
          MANAGE BOOKS
        </Link>
        <Link
          href="/managereservation"
          className="cursor-pointer p-3 px-6 hover:bg-white/10 rounded-md hover:underline underline-offset-3"
          onClick={() => setMenuOpen(false)}
        >
          MANAGE RESERVATIONS
        </Link>
      </>
    ) : (
      <>
        <Link
          href="/"
          className="cursor-pointer p-3 px-6 hover:bg-white/10 rounded-md hover:underline underline-offset-3"
          onClick={() => setMenuOpen(false)}
        >
          HOME
        </Link>
        {commonLinks}
        <Link
          href="/mybooking"
          className="cursor-pointer p-3 px-6 hover:bg-white/10 rounded-md hover:underline underline-offset-3"
          onClick={() => setMenuOpen(false)}
        >
          MY RESERVATIONS
        </Link>
      </>
    );

  return (
    <nav className="fixed top-0 z-50 w-full bg-black/40 backdrop-blur-xs shadow-md font-serif">
      <div className="flex items-center justify-between px-6 py-4 md:px-10">
        {/* Logo */}
        <Link
          href="/"
          className="text-white/90 font-bold text-lg md:text-xl cursor-pointer"
        >
          CUPPA READ
        </Link>

        {/* Desktop Menu */}
        <div className="hidden md:flex flex-row items-center gap-10 text-white/90">
          {userLinks}
          {session ? (
            <div
              className="cursor-pointer p-3 px-6 hover:bg-white/10 rounded-md hover:underline underline-offset-3"
              onClick={() => signOut({ callbackUrl: "/signin" })}
            >
              Sign Out of {session.user.name}
            </div>
          ) : (
            <Link
              href="/signin"
              className="cursor-pointer p-3 px-6 hover:bg-white/10 rounded-md hover:underline underline-offset-3"
            >
              SIGN-IN
            </Link>
          )}
        </div>

        {/* Mobile Menu Button */}
        <div
          className="md:hidden text-white cursor-pointer"
          onClick={toggleMenu}
        >
          {menuOpen ? <FiX size={26} /> : <FiMenu size={26} />}
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      {menuOpen && (
        <div className="flex flex-col items-center bg-black/90 text-white/90 space-y-4 py-6 md:hidden">
          {userLinks}
          {session ? (
            <div
              className="cursor-pointer p-3 px-6 hover:bg-white/10 rounded-md hover:underline underline-offset-3"
              onClick={() => {
                setMenuOpen(false);
                signOut({ callbackUrl: "/signin" });
              }}
            >
              Sign Out of {session.user.name}
            </div>
          ) : (
            <Link
              href="/signin"
              className="cursor-pointer p-3 px-6 hover:bg-white/10 rounded-md hover:underline underline-offset-3"
              onClick={() => setMenuOpen(false)}
            >
              SIGN-IN
            </Link>
          )}
        </div>
      )}
    </nav>
  );
}
