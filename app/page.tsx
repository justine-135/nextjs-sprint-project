import { signIn } from "@/auth";
import { Button } from "@/components/ui/button";

export default function Home() {
  return (
    <main className="flex flex-col items-center justify-center h-screen">
      <form
        action={async () => {
          "use server";
          await signIn("github", { redirectTo: "/sprint" });
        }}
      >
        <h1 className="text-lg font-bold mb-6">Create project</h1>

        <Button type="submit">Login</Button>
      </form>
    </main>
  );
}
