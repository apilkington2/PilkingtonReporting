import type { Metadata } from "next";
import ContactForm from "./ContactForm";

export const metadata: Metadata = {
  title: "Contact | Pilkington Reporting",
  description: "Get in touch with Pilkington Reporting in Lincoln, Nebraska.",
};

export default function ContactPage() {
  return (
    <div className="mx-auto max-w-5xl px-6 py-16 sm:py-24">
      <p className="font-serif text-sm uppercase tracking-[0.2em] text-brand">
        Contact
      </p>
      <h1 className="mt-2 font-serif text-3xl font-semibold text-foreground sm:text-4xl">
        Get in Touch
      </h1>
      <p className="mt-4 max-w-xl text-muted">
        Have a deposition or hearing to schedule, or a question about
        services? Send a message below and we&apos;ll follow up right away.
      </p>

      <div className="mt-10 grid gap-10 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.4fr)]">
        <div className="h-fit rounded-2xl border border-border bg-white p-8 shadow-sm">
          <p className="font-serif text-xl font-semibold text-foreground">
            Pilkington Reporting
          </p>
          <p className="mt-1 text-muted">
            Jill R. Pilkington, RPR, RMR &mdash; Owner
          </p>

          <dl className="mt-6 space-y-4">
            <div>
              <dt className="text-xs font-semibold uppercase tracking-wide text-muted">
                Address
              </dt>
              <dd className="mt-1 text-foreground">
                9310 Whispering Wind Road
                <br />
                Lincoln, Nebraska 68512
              </dd>
            </div>
            <div>
              <dt className="text-xs font-semibold uppercase tracking-wide text-muted">
                Phone
              </dt>
              <dd className="mt-1 text-foreground">
                <a href="tel:+14022156515" className="hover:text-brand">
                  (402) 215-6515
                </a>
              </dd>
            </div>
            <div>
              <dt className="text-xs font-semibold uppercase tracking-wide text-muted">
                Email
              </dt>
              <dd className="mt-1 text-foreground">
                <a
                  href="mailto:jpilkington5@gmail.com"
                  className="hover:text-brand"
                >
                  jpilkington5@gmail.com
                </a>
              </dd>
            </div>
          </dl>
        </div>

        <ContactForm />
      </div>
    </div>
  );
}
