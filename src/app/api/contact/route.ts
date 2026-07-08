import { NextResponse } from "next/server";
import { Resend } from "resend";

type ContactRequest = {
  name: string;
  email: string;
  phone: string;
  preferredDate: string;
  message: string;
};

const REQUIRED_FIELDS: (keyof ContactRequest)[] = ["name", "email", "message"];

function formatDate(value: string) {
  if (!value) return "Not specified";
  const date = new Date(`${value}T00:00:00`);
  if (Number.isNaN(date.getTime())) return value;
  return date.toLocaleDateString("en-US", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

function buildEmailText(data: ContactRequest) {
  return [
    "New message from the Pilkington Reporting website",
    "",
    `Name: ${data.name}`,
    `Email: ${data.email}`,
    `Phone: ${data.phone || "Not provided"}`,
    `Preferred Date: ${formatDate(data.preferredDate)}`,
    "",
    "Message:",
    data.message,
  ].join("\n");
}

export async function POST(request: Request) {
  const data = (await request.json().catch(() => null)) as ContactRequest | null;

  if (!data) {
    return NextResponse.json({ error: "Invalid request body." }, { status: 400 });
  }

  const missing = REQUIRED_FIELDS.filter((field) => !data[field]?.trim());
  if (missing.length > 0) {
    return NextResponse.json(
      { error: `Missing required fields: ${missing.join(", ")}` },
      { status: 400 },
    );
  }

  const apiKey = process.env.RESEND_API_KEY;
  const notifyEmail = process.env.SCHEDULE_NOTIFY_EMAIL;

  if (!apiKey || !notifyEmail) {
    console.error(
      "Contact form submitted, but RESEND_API_KEY or SCHEDULE_NOTIFY_EMAIL is not configured.",
      data,
    );
    return NextResponse.json(
      {
        error:
          "Email sending isn't configured yet. See README for setup instructions.",
      },
      { status: 500 },
    );
  }

  const resend = new Resend(apiKey);

  const { error } = await resend.emails.send({
    from: process.env.SCHEDULE_FROM_EMAIL || "Pilkington Reporting <onboarding@resend.dev>",
    to: [notifyEmail],
    replyTo: data.email,
    subject: `New website message from ${data.name}`,
    text: buildEmailText(data),
  });

  if (error) {
    console.error("Resend error:", error);
    return NextResponse.json(
      { error: "Failed to send email. Please try again." },
      { status: 500 },
    );
  }

  return NextResponse.json({ success: true });
}
