import Image from "next/image";
import Link from "next/link";
import jill from "@/assets/jill-pilkington.jpg";
import handWriting from "@/assets/hand-writing.jpg";

const services = [
  {
    title: "Depositions & Hearings",
    description:
      "Accurate, verbatim coverage for depositions, sworn statements, and administrative hearings.",
  },
  {
    title: "Condensed Transcripts",
    description:
      "Multiple transcript pages compressed onto a single page for faster review.",
  },
  {
    title: "Word Indices",
    description:
      "Searchable word indices that make it easy to find key testimony fast.",
  },
  {
    title: "Electronic Files",
    description:
      "Transcripts delivered in PDF, E-transcript, and ASCII formats.",
  },
  {
    title: "Videography",
    description: "Synchronized video coverage available on request.",
  },
  {
    title: "Expedited Copy",
    description: "Rush turnaround available when your timeline is tight.",
  },
];

export default function Home() {
  return (
    <div>
      <section className="border-b border-border bg-brand-light/40">
        <div className="mx-auto flex max-w-6xl flex-col items-center gap-6 px-6 py-20 text-center sm:py-28">
          <p className="font-serif text-sm uppercase tracking-[0.2em] text-brand">
            Court Reporting Services
          </p>
          <h1 className="max-w-3xl font-serif text-4xl font-semibold leading-tight text-foreground sm:text-5xl">
            Precise, Reliable Court Reporting for Nebraska Attorneys
          </h1>
          <p className="max-w-xl text-lg text-muted">
            Jill R. Pilkington, RPR, RMR, has provided quality verbatim
            reporting to attorneys and courts throughout Nebraska for over 30
            years.
          </p>
          <Link
            href="/contact"
            className="rounded-full bg-brand px-8 py-3 text-sm font-semibold text-white transition-colors hover:bg-brand-dark"
          >
            Get in Touch
          </Link>
        </div>
      </section>

      <section id="services" className="mx-auto max-w-6xl px-6 py-20">
        <p className="font-serif text-sm uppercase tracking-[0.2em] text-brand">
          Services
        </p>
        <h2 className="mt-2 font-serif text-2xl font-semibold text-foreground sm:text-3xl">
          What We Offer
        </h2>
        <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {services.map((service) => (
            <div
              key={service.title}
              className="rounded-2xl border border-border bg-white p-6 shadow-sm"
            >
              <h3 className="font-serif text-lg font-semibold text-foreground">
                {service.title}
              </h3>
              <p className="mt-2 text-sm text-muted">{service.description}</p>
            </div>
          ))}
        </div>
      </section>

      <section id="about" className="border-t border-border bg-brand-light/40">
        <div className="mx-auto flex max-w-6xl flex-col items-center gap-10 px-6 py-20 sm:flex-row sm:items-start">
          <Image
            src={jill}
            alt="Jill R. Pilkington"
            className="h-56 w-56 flex-shrink-0 rounded-full object-cover shadow-md"
          />
          <div>
            <p className="font-serif text-sm uppercase tracking-[0.2em] text-brand">
              About
            </p>
            <h2 className="mt-2 font-serif text-2xl font-semibold text-foreground sm:text-3xl">
              Jill R. Pilkington, RPR, RMR
            </h2>
            <div className="mt-4 max-w-2xl space-y-4 text-muted">
              <p>
                Jill Pilkington has been a court reporter in Nebraska for 30
                years. Jill has provided quality, verbatim reporting involving
                medical malpractice, domestic, product liability, workers&apos;
                compensation, anti-trust cases, and personal injury. Jill has
                worked as an official court reporter for a judge in Omaha,
                Nebraska, for 11 years, as well as freelanced in Lincoln,
                Nebraska, for the remaining years of her career.
              </p>
              <p>
                Jill has served on the Nebraska Court Reporters Association
                for four years. While doing so, Jill worked closely with
                lobbyists on legislation affecting the court reporting
                profession.
              </p>
              <p>
                Jill holds the certifications of Registered Professional
                Reporter and Registered Merit Reporter, and is a current
                member of the Nebraska Court Reporters Association and the
                National Court Reporters Association.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-6 py-20">
        <div className="grid gap-10 sm:grid-cols-2 sm:items-center">
          <div>
            <h2 className="font-serif text-2xl font-semibold text-foreground sm:text-3xl">
              Ready to get started?
            </h2>
            <p className="mt-3 max-w-md text-muted">
              Send over the details of your deposition or hearing and
              we&apos;ll follow up to confirm.
            </p>
            <Link
              href="/contact"
              className="mt-6 inline-block rounded-full bg-brand px-8 py-3 text-sm font-semibold text-white transition-colors hover:bg-brand-dark"
            >
              Get in Touch
            </Link>
          </div>
          <Image
            src={handWriting}
            alt=""
            className="h-72 w-full rounded-2xl object-cover shadow-md"
          />
        </div>
      </section>
    </div>
  );
}
