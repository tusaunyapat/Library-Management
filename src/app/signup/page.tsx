// /* eslint-disable @typescript-eslint/no-unused-vars */
// /* eslint-disable @typescript-eslint/no-explicit-any */
// "use client";

// import Link from "next/link";
// import Image from "next/image";
// import { useEffect, useState } from "react";
// import userRegister from "@/libs/userRegister";
// import { FaHandPointLeft } from "react-icons/fa6";
// // import { getUserByEmail, getUserByUsername } from "../api/auth";
// // import { Profile } from "../types/profile";
// import { useRouter } from "next/navigation";

// export default function SignUp() {
//   const [email, setEmail] = useState("");
//   const [username, setUsername] = useState("");
//   const [password, setPassword] = useState("");
//   const [repeatPassword, setRepeatPassword] = useState("");
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState("");
//   const [tel, setTel] = useState("");

//   const router = useRouter();

//   useEffect(() => {
//     if (password && password.length < 6) {
//       setError("Password must be at least 6 characters long");
//       return;
//     }
//     if (password && repeatPassword && password !== repeatPassword) {
//       setError("Password and Repeat Password do not match");
//     } else {
//       setError("");
//     }
//   }, [password, repeatPassword]);

//   const handleSignUp = async () => {
//     if (!email || !username || !password || !repeatPassword) {
//       setError("Please fill in all fields");
//       return;
//     }
//     if (error) {
//       return;
//     }

//     setLoading(true);
//     setError("");
//     try {
//       const res = await userRegister(email, password, username, tel);
//       if (res.error) {
//         setError("Something went wrong, please try again");
//       }
//       console.log("Sign up successful");
//       router.push("/signin");
//     } catch (err: any) {
//       setError("Invalid email/username or password");
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <>
//       <Link
//         className="fixed top-6 left-6 text-base-400 font-bold flex flex-row gap-2 items-center py-2 px-4 border-b-[1px] border-base-300 text-xl hover:bg-white/80 cursor-pointer bg-white/40"
//         href={"/"}
//       >
//         <FaHandPointLeft />
//         Home
//       </Link>
//       <Image
//         src={"/images/cat1.png"}
//         width={300}
//         height={300}
//         alt="LoginCat"
//         className="fixed right-0 -bottom-24"
//       />
//       <div className="w-[100vw] h-[100vh] overflow-hidden flex justify-center items-center flex-col">
//         <Image
//           src={"/images/dog1.png"}
//           width={100}
//           height={100}
//           alt="LoginCat"
//           className="relative top-7 right-28"
//           style={{ rotate: "20deg" }}
//         />
//         <div className="w-[30vw] px-12 py-16 bg-stone-200 flex flex-col gap-4 shadow-2xl mb-24">
//           <div className="text-4xl font-classic text-base-400 mb-4">
//             CUPPA READ
//           </div>
//           <div className="flex flex-col">
//             <div className="w-full flex items-center text-sm text-base-400">
//               {`Let's join out community 👋 create an account.`}
//             </div>
//           </div>
//           <div className="w-full flex flex-col gap-4">
//             <div className="flex flex-row justify-between border-[1px] border-base-300 rounded-md">
//               <input
//                 className="flex-1 items-center p-4 focus:outline-none focus:ring-0"
//                 type="text"
//                 placeholder="Email"
//                 value={email}
//                 onChange={(e) => setEmail(e.target.value)}
//                 disabled={loading}
//               />
//             </div>

//             <div className="flex flex-row justify-between border-[1px] border-base-300 rounded-md">
//               <input
//                 className="flex-1 items-center p-4 focus:outline-none focus:ring-0"
//                 type="text"
//                 placeholder="Username"
//                 value={username}
//                 onChange={(e) => setUsername(e.target.value)}
//                 disabled={loading}
//               />
//             </div>
//             <input
//               className="p-4 items-center border-[1px] border-base-300 rounded-md focus:outline-none focus:ring-0"
//               type="password"
//               placeholder="Password"
//               value={password}
//               onChange={(e) => setPassword(e.target.value)}
//               disabled={loading}
//             />
//             <input
//               className="p-4 items-center border-[1px] border-base-300 rounded-md focus:outline-none focus:ring-0"
//               type="password"
//               placeholder="RepeatPassword"
//               value={repeatPassword}
//               onChange={(e) => setRepeatPassword(e.target.value)}
//               disabled={loading}
//             />
//             <input
//               className="p-4 items-center border-[1px] border-base-300 rounded-md focus:outline-none focus:ring-0"
//               type="text"
//               placeholder="Telephone Number"
//               value={tel}
//               onChange={(e) => setTel(e.target.value)}
//               disabled={loading}
//             />
//           </div>

//           <div className={`h-3`}>
//             {error && <div className="text-red-500 text-sm">{error}</div>}
//           </div>
//           <button
//             className="w-full bg-stone-400 hover:bg-stone-500 cursor-pointer rounded-xl p-4 flex justify-center items-center font-bold text-base-400 text-lg"
//             onClick={handleSignUp}
//             disabled={loading}
//           >
//             {loading ? "Creating an account" : "Create an account"}
//           </button>
//           <div className="w-full flex items-center text-sm text-base-400 gap-2">
//             <div className="text-base-400/70 text-sm">
//               Already have an account?
//             </div>
//             <Link
//               href={"/signin"}
//               className="text-base-400 font-bold hover:text-amber-800/90 hover:underline underline-offset-2"
//             >
//               Sign in
//             </Link>
//           </div>
//         </div>
//       </div>
//     </>
//   );
// }

/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import Link from "next/link";
import Image from "next/image";
import { useEffect, useState } from "react";
import userRegister from "@/libs/userRegister";
import { FaHandPointLeft } from "react-icons/fa6";
import { useRouter } from "next/navigation";

export default function SignUp() {
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [repeatPassword, setRepeatPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [tel, setTel] = useState("");

  const router = useRouter();

  useEffect(() => {
    if (password && password.length < 6) {
      setError("Password must be at least 6 characters long");
      return;
    }
    if (password && repeatPassword && password !== repeatPassword) {
      setError("Password and Repeat Password do not match");
    } else {
      setError("");
    }
  }, [password, repeatPassword]);

  const handleSignUp = async () => {
    if (!email || !username || !password || !repeatPassword) {
      setError("Please fill in all fields");
      return;
    }
    if (error) return;

    setLoading(true);
    setError("");

    try {
      const res = await userRegister(email, password, username, tel);
      if (res.error) {
        setError("Something went wrong, please try again");
      } else {
        console.log("Sign up successful");
        router.push("/signin");
      }
    } catch (err: any) {
      setError("Invalid email/username or password");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {/* Back Button */}
      <Link
        className="fixed top-4 left-4 flex items-center gap-2 text-base-400 font-bold py-2 px-4 border border-base-300 rounded-md bg-white/40 hover:bg-white/80 transition-all duration-200 cursor-pointer text-lg"
        href={"/"}
      >
        <FaHandPointLeft />
        Home
      </Link>

      {/* Background Decorations */}
      <Image
        src={"/images/cat1.png"}
        width={250}
        height={250}
        alt="LoginCat"
        className="fixed right-0 -bottom-20 opacity-90 hidden sm:block"
      />
      {/* <Image
        src={"/images/dog1.png"}
        width={100}
        height={100}
        alt="LoginDog"
        className="absolute top-12 right-12 rotate-[20deg] hidden md:block"
      /> */}

      {/* Main Container */}
      <div className="w-screen h-screen flex justify-center items-center p-4">
        <div className="w-full max-w-md sm:max-w-lg md:max-w-xl lg:max-w-2xl px-6 sm:px-10 py-10 sm:py-14 bg-stone-200 rounded-xl shadow-2xl flex flex-col gap-4 text-base-400 backdrop-blur-md mb-10">
          <div className="text-3xl sm:text-4xl font-classic text-center mb-4">
            CUPPA READ
          </div>
          <div className="text-center text-sm sm:text-base text-base-400 mb-6">
            {`Let's join our community 👋 Create an account.`}
          </div>

          {/* Input Fields */}
          <div className="w-full flex flex-col gap-4">
            <input
              className="p-3 sm:p-4 border border-base-300 rounded-md text-base w-full focus:outline-none focus:ring-2 focus:ring-stone-400 transition-all duration-150"
              type="text"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              disabled={loading}
            />
            <input
              className="p-3 sm:p-4 border border-base-300 rounded-md text-base w-full focus:outline-none focus:ring-2 focus:ring-stone-400 transition-all duration-150"
              type="text"
              placeholder="Username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              disabled={loading}
            />
            <input
              className="p-3 sm:p-4 border border-base-300 rounded-md text-base w-full focus:outline-none focus:ring-2 focus:ring-stone-400 transition-all duration-150"
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              disabled={loading}
            />
            <input
              className="p-3 sm:p-4 border border-base-300 rounded-md text-base w-full focus:outline-none focus:ring-2 focus:ring-stone-400 transition-all duration-150"
              type="password"
              placeholder="Repeat Password"
              value={repeatPassword}
              onChange={(e) => setRepeatPassword(e.target.value)}
              disabled={loading}
            />
            <input
              className="p-3 sm:p-4 border border-base-300 rounded-md text-base w-full focus:outline-none focus:ring-2 focus:ring-stone-400 transition-all duration-150"
              type="text"
              placeholder="Telephone Number"
              value={tel}
              onChange={(e) => setTel(e.target.value)}
              disabled={loading}
            />
          </div>

          {/* Error Message */}
          {error && (
            <div className="text-red-500 text-sm text-center mt-2">{error}</div>
          )}

          {/* Sign Up Button */}
          <button
            className="w-full mt-4 bg-stone-400 hover:bg-stone-500 text-white font-bold text-lg py-3 sm:py-4 rounded-xl transition-all duration-200 disabled:opacity-60"
            onClick={handleSignUp}
            disabled={loading}
          >
            {loading ? "Creating an account..." : "Create an account"}
          </button>

          {/* Sign In Link */}
          <div className="w-full text-center mt-4 text-sm sm:text-base text-base-400">
            <span className="text-base-400/70">Already have an account?</span>{" "}
            <Link
              href={"/signin"}
              className="font-bold text-stone-600 hover:text-amber-800 hover:underline underline-offset-2 transition-all duration-150"
            >
              Sign in
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}
