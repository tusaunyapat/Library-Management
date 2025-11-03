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
      className="w-24 font-bold text-black  hover:text-blue-600 transition ease-in-out duration-300"
      href={pageRef}
    >
      {title}
    </Link>
  );
}
