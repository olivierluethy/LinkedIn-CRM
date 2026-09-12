# LinkedIn-CRM

A lightweight LinkedIn relationship/outreach CRM in the browser: track leads and
creators across a board, schedule follow-ups on a calendar, and stay within your
weekly connection limits.

## Features

- **Board view** — manage leads as cards, add and edit them, and schedule actions.
- **Creators view** — keep a list of creators/profiles you follow and engage with.
- **Calendar view** — see and manage scheduled outreach and follow-ups.
- **Weekly limit tracker** — visualize how close you are to a weekly connection cap.
- **FOMO strength meter** — a per-lead scoring indicator derived from leads and creators.
- **Local, client-side state** — data is held in the app via React hooks/store.
- **Optional LinkedIn scraper** — a Playwright boilerplate (`scraper/linkedin-scraper.js`)
  that extracts a profile into structured data you can import. Use responsibly and
  in line with LinkedIn's Terms of Service.

## Tech

- React 19 + Vite
- Tailwind CSS
- lucide-react icons
- Playwright (for the optional scraper)

## Run

```bash
npm install
npm run dev
```

Then open the URL Vite prints (default http://localhost:5173).

Build for production:

```bash
npm run build
npm run preview
```

### Optional scraper

```bash
npm install playwright
node scraper/linkedin-scraper.js "https://linkedin.com/in/<profile>"
```
