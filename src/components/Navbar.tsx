"use client";

import Link from "next/link";
import Image from "next/image";
import logo from "@/assets/logo.png";

export default function Navbar() {
  return (
    <header className="sticky top-0 z-50 border-b border-border bg-background/95 backdrop-blur">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
        <Link href="/" className="flex items-center gap-3">
          <Image src={logo} alt="" width={36} height={36} className="h-9 w-9" />
          <span className="font-serif text-lg font-semibold tracking-tight text-foreground">
            Pilkington Reporting
          </span>
        </Link>

        <Link
          href="/contact"
          className="rounded-full bg-brand px-5 py-2 text-sm font-semibold text-white transition-colors hover:bg-brand-dark"
        >
          Contact
        </Link>
      </div>
    </header>
  );
}
