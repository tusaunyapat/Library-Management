import { authOptions } from "@/app/api/auth/[...nextauth]/authOptions";
import { getServerSession } from "next-auth";
import getUserProfile from "@/libs/getUserProfile";

export default async function Dashboard() {
  const session = await getServerSession(authOptions);
  if (!session || !session.user.token) return null;

  const profile = await getUserProfile(session.user.token);
  var createdAt = new Date(profile.data.createdAt);

  return (
    <main className="bg-slate-100 m-5 p-5">
      <div className="text-2xl">Profike</div>
      {session ? (
        <div className="flex flex-col bg-amber-200/40 p-6 rounded-lg">
          <div className="flex flex-row">
            <p className="w-36">Name</p>
            <p className="w-48">{profile?.data.name ?? "name"}</p>
          </div>
          <div className="flex flex-row">
            <p className="w-36">Email</p>
            <p className="w-48">{profile?.data.email ?? "email"}</p>
          </div>
          <div className="flex flex-row">
            <p className="w-36">Tel.</p>
            <p className="w-48">{profile?.data.tel ?? "tel"}</p>
          </div>
          <div className="flex flex-row">
            <p className="w-36">Member since</p>
            <p className="w-72">{profile?.data.createdAt ?? "createdAt"}</p>
          </div>
        </div>
      ) : null}
    </main>
  );
}
