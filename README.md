# Prime Estate Properties — Demo Website

A single-page, fully responsive demo website for a property dealer, built with **plain HTML, CSS and
JavaScript** — no build step, no dependencies to install. "Prime Estate Properties" is placeholder
branding; swap in the real client's details before going live.

## Run it

Just open `index.html` in any browser — double-click it, or:

```bash
# optional: serve locally (nicer for the map iframe / relative paths)
npx serve .
# or
python -m http.server 8000
```

Then visit `http://localhost:8000`.

## File structure

```
property/
├── index.html        # all page content & sections
├── css/styles.css    # all styling (brand colors at the top)
├── js/main.js         # nav, scroll animations, counters, form
└── README.md
```

## How to rebrand for the real client

Everything the client needs to change is grouped and labelled. The main spots:

| What to change | Where |
|----------------|-------|
| **Brand colors** | `css/styles.css` → `:root` variables (`--primary`, `--accent`) — changes the whole site |
| **Company name / logo** | search `Prime`/`Estate` in `index.html` (header `.brand`, footer, titles) |
| **Phone numbers** | search `911234567890` (WhatsApp links) and `+911234567890` (call links) in `index.html` |
| **Email** | search `hello@primeestate.example` |
| **WhatsApp number** | replace `911234567890` (country code + number, **no `+`**) everywhere |
| **Hero text / headline** | `#home` section in `index.html` |
| **Stats numbers** | `data-target="…"` attributes in the stats band |
| **Services** | the cards under `id="services"` |
| **Property listings** | the cards under `id="listings"` — replace image URLs, price, location, beds/baths |
| **Founder & team** | `id="team"` section — names, roles, photos |
| **Office addresses** | `id="locations"` section |
| **Google Map** | replace the `<iframe src="…">` with the client's real embed (Google Maps → Share → Embed a map) |
| **Photos** | currently use Unsplash URLs — replace with the client's real photos in `assets/img/` |
| **Social links** | footer `.socials` — set the real `href`s |

## Making the contact form actually send

The form is demo-only (it validates and shows a success message but doesn't send anything). To make it
deliver enquiries with **no backend**, use a free service like [Formspree](https://formspree.io):

1. Create a form on Formspree and copy your endpoint URL.
2. In `index.html`, set the form to `<form ... action="https://formspree.io/f/yourid" method="POST">`.
3. In `js/main.js`, remove the `e.preventDefault();` line in the submit handler (or let Formspree's
   AJAX handle it).

## Deploy (free, no cold starts)

It's a static site, so it can go on any of these free tiers (all allow commercial use except Vercel
Hobby):

- **Cloudflare Pages** — connect the repo or drag-drop the folder.
- **Netlify** — drag-drop the folder onto the dashboard.
- **GitHub Pages** — push to a repo, enable Pages.

No server, no database, no cold starts.
