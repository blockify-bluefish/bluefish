"use client";

import { DarkThemeToggle } from "flowbite-react";
import Link from "next/link";
import { ReactNode } from "react";
import { usePathname } from "next/navigation";

type MainLayoutProps = {
  children: ReactNode;
};

export default function MainLayout({ children }: MainLayoutProps) {
  const pathname = usePathname();

  // Function to determine if a link is active
  const isActive = (path: string) => {
    return pathname === path;
  };

  // Function to get appropriate class based on active state
  const getLinkClass = (path: string) => {
    return isActive(path)
      ? "block rounded-lg bg-blue-50 px-3 py-2 text-blue-600 dark:bg-blue-900/20 dark:text-blue-400"
      : "block rounded-lg px-3 py-2 text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-800";
  };

  return (
    <main className="min-h-screen bg-white dark:bg-gray-900">
      {/* Sidebar */}
      <div className="fixed top-0 left-0 h-full w-56 border-r border-gray-200 bg-white p-4 dark:border-gray-700 dark:bg-gray-900">
        <div className="mb-6">
          <Link href="/" className="flex items-center text-xl font-bold">
            <span>B</span>
            <span className="ml-2">BlueFish</span>
          </Link>
        </div>
        <nav className="space-y-1">
          <Link href="/" className={getLinkClass("/")}>
            Bluefish
          </Link>
          <Link
            href="/privacy-policy"
            className={getLinkClass("/privacy-policy")}
          >
            Privacy Policy
          </Link>
          <Link
            href="/terms-of-service"
            className={getLinkClass("/terms-of-service")}
          >
            Terms of Service
          </Link>
        </nav>
        <div className="absolute right-4 bottom-4 left-4">
          <div className="flex items-center justify-center space-x-2 text-sm text-gray-500">
            <span>Powered by Bluefish</span>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="ml-56">
        {/* Search Bar */}
        <div className="sticky top-0 z-10 flex h-14 items-center border-b border-gray-200 bg-white px-4 dark:border-gray-700 dark:bg-gray-900">
          <div className="relative w-full max-w-lg">
            <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
              <svg
                className="h-5 w-5 text-gray-400"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                />
              </svg>
            </div>
            <input
              type="search"
              className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2 pl-10 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-800 dark:text-white dark:placeholder-gray-400"
              placeholder="Search..."
            />
            <div className="absolute inset-y-0 right-0 flex items-center pr-3 text-gray-400">
              <span>⌘</span>
              <span>K</span>
            </div>
          </div>
          <div className="ml-auto">
            <DarkThemeToggle />
          </div>
        </div>

        {/* Content */}
        <div className="max-w-4xl p-8">{children}</div>
      </div>
    </main>
  );
}
