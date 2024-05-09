import LinkButton from "./ui/common/button/link-button";

export default function Home() {
  return (
    <main className="flex flex-col items-center justify-center h-screen">
      <h1 className="text-lg font-bold mb-6">Create project</h1>

      <LinkButton title="Login" href="/login" />
    </main>
  );
}
