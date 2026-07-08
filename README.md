# Pilkington Reporting

Website for Pilkington Reporting — Jill R. Pilkington, RPR, RMR, an independent
court reporter serving attorneys and courts in Lincoln, Nebraska. The site
introduces her services and lets prospective clients get in touch through a
contact form that emails a request directly to the business inbox.

Live at [pilkingtonreporting.com](https://pilkingtonreporting.com).

## Tech Stack

- [Next.js](https://nextjs.org) (App Router) + [React](https://react.dev) + TypeScript
- [Tailwind CSS](https://tailwindcss.com) for styling
- [Resend](https://resend.com) for sending contact form emails
- Hosted on [Vercel](https://vercel.com), domain via [Cloudflare](https://cloudflare.com)

## Running Locally

**Requirements:** Node.js 20+ and npm.

1. Install dependencies:

   ```bash
   npm install
   ```

2. Set up environment variables. Copy the example file:

   ```bash
   cp .env.local.example .env.local
   ```

   Then fill in `.env.local`:

   | Variable | Description |
   | --- | --- |
   | `RESEND_API_KEY` | API key from [resend.com](https://resend.com) (free tier is fine). |
   | `SCHEDULE_NOTIFY_EMAIL` | Inbox that contact form submissions get sent to. |
   | `SCHEDULE_FROM_EMAIL` | Optional. Only works once a domain is verified in Resend — leave unset to send from the default `onboarding@resend.dev` test sender. |

   Note: without a verified Resend domain, the test sender can only deliver to
   the email address the Resend account was signed up with.

3. Start the dev server:

   ```bash
   npm run dev
   ```

   Open [http://localhost:3000](http://localhost:3000).

## Project Structure

```
src/
  app/
    page.tsx           Home page (hero, services, about)
    contact/            Contact page + form
    api/contact/         Route handler that sends the contact email via Resend
    layout.tsx          Root layout (fonts, Navbar, Footer)
  components/            Navbar, Footer
  assets/                 Logo and photos, statically imported
```

## Deployment

Deployed on Vercel, connected to this repo's `master` branch — pushing to
`master` triggers a production deploy. `RESEND_API_KEY` and
`SCHEDULE_NOTIFY_EMAIL` must be set under the project's Environment Variables
in the Vercel dashboard (Production environment) for the contact form to work.
