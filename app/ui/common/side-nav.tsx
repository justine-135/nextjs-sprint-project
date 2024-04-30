"use client";

import { SprintLinks } from "@/app/lib/routes";
import clsx from "clsx";
import Link from "next/link";
import { usePathname } from "next/navigation";

export const SideNav = () => {
  const pathname = usePathname();

  return (
    <div className="p-12">
      <div className="mb-12">Logo</div>
      <nav>
        <ul className="flex flex-col gap-2">
          {SprintLinks.map((link, key) => {
            return (
              <li className="flex w-full " key={key}>
                <Link
                  className={clsx(
                    "w-full p-small rounded-xl hover:bg-slate-50",
                    {
                      "bg-slate-200 hover:bg-slate-200": pathname === link.href,
                    }
                  )}
                  href={link.href}
                >
                  {link.title}
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>
    </div>
  );
};
