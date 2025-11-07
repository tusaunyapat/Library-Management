export default async function userRegister(
  userEmail: string,
  userPassword: string,
  name: string,
  tel: string
) {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/auth/register`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: userEmail,
        password: userPassword,
        name: name,
        tel: tel,
        role: "member",
      }),
    }
  );

  if (!response.ok) {
    throw new Error("failed to login");
  }
  return await response.json();
}
