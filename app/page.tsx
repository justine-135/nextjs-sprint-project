import { buttonVariants } from "@/components/ui/button";
import Link from "next/link";
import { ROUTE_URL } from "./lib/constants";

export default function Home() {
  return (
    <main className="flex flex-col items-center justify-center h-screen">
      <h1 className="text-lg font-bold mb-6">Create project</h1>

      <Link
        className={buttonVariants({ variant: "default" })}
        href={`/${ROUTE_URL.SPRINT}`}
      >
        Login
      </Link>
    </main>
  );
}
