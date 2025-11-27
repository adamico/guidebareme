"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import Search from "./Search";

const chapters = [
  { href: "/chapitres", label: "Introduction" },
  { href: "/chapitres/chapitre-1", label: "1. Déficiences intellectuelles et difficultés de comportement" },
  { href: "/chapitres/chapitre-2", label: "2. Déficiences du psychisme" },
  { href: "/chapitres/chapitre-3", label: "3. Déficiences de l'audition" },
  { href: "/chapitres/chapitre-4", label: "4. Déficiences du langage et de la parole" },
  { href: "/chapitres/chapitre-5", label: "5. Déficiences de la vision" },
  { href: "/chapitres/chapitre-6", label: "6. Déficiences viscérales et générales" },
  { href: "/chapitres/chapitre-7", label: "7. Déficiences de l'appareil locomoteur" },
  { href: "/chapitres/chapitre-8", label: "8. Déficiences esthétiques" },
];

export default function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="fixed left-0 top-0 h-screen w-72 overflow-y-auto border-r border-gray-200 bg-gray-50 p-4">
      <nav aria-label="Table des matières">
        <h2 className="mb-4 text-lg font-bold text-gray-900">
          Guide-Barème
        </h2>
        <Search />
        <ul className="space-y-1">
          {chapters.map((chapter) => {
            const isActive = pathname === chapter.href;
            return (
              <li key={chapter.href}>
                <Link
                  href={chapter.href}
                  className={`block rounded-md px-3 py-2 text-sm transition-colors ${
                    isActive
                      ? "bg-blue-100 font-medium text-blue-800"
                      : "text-gray-700 hover:bg-gray-100 hover:text-gray-900"
                  }`}
                >
                  {chapter.label}
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>
    </aside>
  );
}
