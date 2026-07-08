"use client";

import { useState, type ChangeEvent, type FormEvent } from "react";

type FormState = {
  name: string;
  email: string;
  phone: string;
  preferredDate: string;
  message: string;
};

const initialState: FormState = {
  name: "",
  email: "",
  phone: "",
  preferredDate: "",
  message: "",
};

export default function ContactForm() {
  const [form, setForm] = useState<FormState>(initialState);
  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">(
    "idle",
  );
  const [errorMessage, setErrorMessage] = useState("");

  function handleChange(
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  }

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setStatus("submitting");
    setErrorMessage("");

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      if (!res.ok) {
        const body = await res.json().catch(() => ({}));
        throw new Error(body.error || "Something went wrong. Please try again.");
      }

      setStatus("success");
      setForm(initialState);
    } catch (err) {
      setStatus("error");
      setErrorMessage(
        err instanceof Error ? err.message : "Something went wrong. Please try again.",
      );
    }
  }

  if (status === "success") {
    return (
      <div className="rounded-2xl border border-border bg-white p-8 text-center shadow-sm">
        <h2 className="font-serif text-2xl font-semibold text-foreground">
          Message Sent
        </h2>
        <p className="mt-2 text-muted">
          Thanks for reaching out to Pilkington Reporting. We&apos;ll be in
          touch shortly.
        </p>
        <button
          type="button"
          onClick={() => setStatus("idle")}
          className="mt-6 rounded-full bg-brand px-6 py-2 text-sm font-semibold text-white hover:bg-brand-dark"
        >
          Send another message
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="grid gap-4 sm:grid-cols-2">
        <label className="block text-sm">
          <span className="font-medium text-foreground">
            Name<span className="text-brand"> *</span>
          </span>
          <input
            type="text"
            name="name"
            value={form.name}
            onChange={handleChange}
            required
            placeholder="Jane Doe"
            className="mt-1 w-full rounded-lg border border-border bg-white px-3 py-2 text-foreground shadow-sm focus:border-brand focus:outline-none focus:ring-1 focus:ring-brand"
          />
        </label>

        <label className="block text-sm">
          <span className="font-medium text-foreground">
            Email<span className="text-brand"> *</span>
          </span>
          <input
            type="email"
            name="email"
            value={form.email}
            onChange={handleChange}
            required
            placeholder="jane@lawfirm.com"
            className="mt-1 w-full rounded-lg border border-border bg-white px-3 py-2 text-foreground shadow-sm focus:border-brand focus:outline-none focus:ring-1 focus:ring-brand"
          />
        </label>

        <label className="block text-sm">
          <span className="font-medium text-foreground">Phone</span>
          <input
            type="tel"
            name="phone"
            value={form.phone}
            onChange={handleChange}
            placeholder="123-456-7890"
            className="mt-1 w-full rounded-lg border border-border bg-white px-3 py-2 text-foreground shadow-sm focus:border-brand focus:outline-none focus:ring-1 focus:ring-brand"
          />
        </label>

        <label className="block text-sm">
          <span className="font-medium text-foreground">
            Preferred Date
          </span>
          <input
            type="date"
            name="preferredDate"
            value={form.preferredDate}
            onChange={handleChange}
            className="mt-1 w-full rounded-lg border border-border bg-white px-3 py-2 text-foreground shadow-sm focus:border-brand focus:outline-none focus:ring-1 focus:ring-brand"
          />
        </label>
      </div>

      <label className="block text-sm">
        <span className="font-medium text-foreground">
          Message<span className="text-brand"> *</span>
        </span>
        <textarea
          name="message"
          value={form.message}
          onChange={handleChange}
          required
          rows={5}
          placeholder="Tell us about the deposition or hearing you'd like to schedule, or any questions you have."
          className="mt-1 w-full rounded-lg border border-border bg-white px-3 py-2 text-foreground shadow-sm focus:border-brand focus:outline-none focus:ring-1 focus:ring-brand"
        />
      </label>

      {status === "error" && (
        <p className="rounded-lg bg-red-50 px-4 py-3 text-sm text-red-700">
          {errorMessage}
        </p>
      )}

      <button
        type="submit"
        disabled={status === "submitting"}
        className="rounded-full bg-brand px-8 py-3 text-sm font-semibold text-white transition-colors hover:bg-brand-dark disabled:cursor-not-allowed disabled:opacity-60"
      >
        {status === "submitting" ? "Sending..." : "Send Message"}
      </button>
    </form>
  );
}
