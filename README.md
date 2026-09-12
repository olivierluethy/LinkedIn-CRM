<div align="center">
  <img src="public/favicon.svg" alt="LinkedIn-CRM logo" width="140" />
  <h1>LinkedIn-CRM</h1>
  <p><b>A lightweight CRM for LinkedIn outreach, right in your browser.</b><br/>Track leads on a board, schedule follow-ups on a calendar, and stay within your weekly connection limits.</p>
  <p>
    <a href="LICENSE"><img alt="License: MIT" src="https://img.shields.io/badge/License-MIT-blue.svg"></a>
    <img alt="React" src="https://img.shields.io/badge/React-20232A?logo=react&logoColor=61DAFB">
    <img alt="Vite" src="https://img.shields.io/badge/Vite-646CFF?logo=vite&logoColor=white">
    <img alt="Tailwind CSS" src="https://img.shields.io/badge/Tailwind_CSS-38B2AC?logo=tailwind-css&logoColor=white">
    <img alt="Playwright" src="https://img.shields.io/badge/Playwright-2EAD33?logo=playwright&logoColor=white">
  </p>
</div>

---

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

## License

Released under the [MIT License](LICENSE) © 2026 Olivier Lüthy. You're free to use, modify and distribute this
software, including commercially, as long as the copyright notice and license are included.

## Author

Built by **Olivier Lüthy** — [GitHub](https://github.com/olivierluethy).
