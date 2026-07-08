import Link from "next/link";

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-border bg-brand-light/40">
      <div className="mx-auto flex max-w-6xl flex-col gap-4 px-6 py-10 text-sm text-muted sm:flex-row sm:items-center sm:justify-between">
        <div>
          <p className="font-serif text-base font-semibold text-foreground">
            Pilkington Reporting
          </p>
          <p>Lincoln, Nebraska &middot; (402) 215-6515</p>
        </div>

        <nav className="flex flex-wrap gap-x-6 gap-y-2">
          <Link href="/" className="hover:text-brand">
            Home
          </Link>
          <Link href="/contact" className="hover:text-brand">
            Contact
          </Link>
        </nav>

        <p>&copy; {year} Pilkington Reporting. All rights reserved.</p>
      </div>
    </footer>
  );
}
