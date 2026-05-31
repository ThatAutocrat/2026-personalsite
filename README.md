#  Devashish Gogoi -Portfolio

A modern developer portfolio built with **Astro** — fast by default, zero JS unless you need it.
<img width="1881" height="854" alt="image" src="https://github.com/user-attachments/assets/5181c953-ff7e-4524-a162-c919d7693363" />



🌐 [devashish-dev.vercel.app](https://devashish-dev.vercel.app)





## Stack

| Layer | Technology |
|---|---|
| Framework | [Astro](https://astro.build)  |
| Typography | [Syne](https://fonts.google.com/specimen/Syne) + [DM Mono](https://fonts.google.com/specimen/DM+Mono) |
| Styling | Pure CSS with custom properties |

No Tailwind. No UI library. No unnecessary dependencies.

---

## Features

- **☾ / ☀ Theme toggle** — dark and light mode, persisted across sessions
- **Scroll-triggered animations** — content reveals as the user moves through the page
- **Floating code card hero** — distinctive, developer-focused landing section
- **Skill bars** — visual proficiency indicators with level labels
- **Project cards** — with GitHub repository and live preview links
- **Fully responsive** — mobile-first layout with hamburger navigation
- **Sticky nav** — active section highlighting as you scroll
- **CV download** — one-click résumé export

---

## Customization

All content lives directly in the component files — no CMS, no config file to hunt down.

| What | Where |
|---|---|
| Personal info & bio | Each `.astro` component directly |
| Projects list | `src/components/Projects.astro` → `projects` array |
| Skills & experience | `src/components/Experience.astro` → `skills` array |
| Résumé / CV | Replace `/public/CV.pdf` |
| Colors & typography | `src/styles/global.css` → CSS custom properties |

### Theming

All design tokens live in `global.css`. Swapping the entire color palette is a matter of editing a handful of CSS variables:

```css
:root {
  --color-bg: #0f0f0f;
  --color-text: #f0f0f0;
  --color-accent: #7c3aed;
  /* ... */
}
```

---

*Status: Active*
