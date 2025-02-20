"use server";

import { auth } from "@/auth";
import { Forge } from "./forge";
export default async function Home() {
  const session = await auth();

  if (session?.user) {
    return <Forge sessionData={session} />;
  }

  return <Forge sessionData={null} />;
}
