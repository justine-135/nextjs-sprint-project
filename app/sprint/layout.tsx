import { SideNav } from "../ui/common/side-nav";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex h-screen flex-col md:flex-row md:overflow-hidden">
      <div className="w-full flex-none md:w-64 border-r-2 border-r-slate-100">
        <SideNav />
      </div>
      <div className="flex-grow md:overflow-y-auto pt-layout">{children}</div>
    </div>
  );
}
