import Link from "next/link";

export default function TopMenuItem({
  title,
  pageRef,
}: {
  title: string;
  pageRef: string;
}) {
  return (
    <Link
      className="px-4 py-2 text-white/90 font-bold bg-amber-950 rounded-md hover:bg-amber-950/70 transition-all duration-200"
      href={pageRef}
    >
      {title}
    </Link>
  );
}
