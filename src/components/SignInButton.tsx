"use client";
import { login } from "@/lib/auth";

export const SignInButton = () => {
  return <button onClick={() => login()}> Sign In To Spotify</button>;
};

// <button
//   className="bg-babyPink flex items-center hover:bg-altBabyPink text-black text-xs p-1 mx-2 rounded-full md:py-5 md:px-10 md:text-base"
//   onClick={() => console.log("Login Clicked")}
// >
//   <div className="hidden md:block md:mr-1">{<FaSpotify />}</div>
//   <div className={`${unbounded.className}`}>Log in with Spotify</div>
// </button>
