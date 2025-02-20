"use client";
import { logout } from "@/lib/auth";

export const SignOutButton = ({
  displayName,
}: {
  displayName: string | null;
}) => {
  if (displayName) {
    return (
      <button className="text-2xl text-white" onClick={() => logout()}>
        Sign {displayName} out of Spotify
      </button>
    );
  } else
    return (
      <button className="text-2xl text-white" onClick={() => logout()}>
        Sign Out of Spotify
      </button>
    );
};
