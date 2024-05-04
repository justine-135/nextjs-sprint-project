import { signIn } from "@/auth";
import { Button, buttonVariants } from "@/components/ui/button";
import Link from "next/link";

export default function Home() {
  return (
    <main className="flex flex-col items-center justify-center h-screen">
      <h1 className="text-lg font-bold mb-6">Create project</h1>

      <Link className={buttonVariants({ variant: "default" })} href="/login">
        Login
      </Link>
    </main>
  );
}
