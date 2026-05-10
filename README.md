# Portfolio (Astro)

<img width="1881" height="854" alt="image" src="https://github.com/user-attachments/assets/5181c953-ff7e-4524-a162-c919d7693363" />


Developer portfolio vibe-coded with **Astro**.

## Stack
- **Astro** — static site framework (zero JS by default)
- **Syne** + **DM Mono** — typography
- Pure CSS with custom properties (no Tailwind needed)

## Features
- ☾ Dark / ☀ Light mode toggle (persisted in localStorage)
- Scroll-triggered reveal animations
- Floating code card hero section
- Skill bars with level indicators
- Project cards with GitHub / live links
- Fully responsive (mobile hamburger menu)
- Download CV button
- Sticky nav with active section highlighting

## Getting Started

```bash
# Install dependencies
npm install

# Start dev server
npm run dev
# → http://localhost:4321

# Build for production
npm run build

# Preview production build
npm run preview
```

## Customization

- **Your info**: Edit the data in each `.astro` component directly
- **Projects**: Update the `projects` array in `src/components/Projects.astro`
- **Skills**: Update the `skills` array in `src/components/Experience.astro`
- **CV**: Replace `/public/CV.pdf` with your actual CV file
- **Colors**: Tweak CSS variables in `src/styles/global.css`
