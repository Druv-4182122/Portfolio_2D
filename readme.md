# Druv Nagpal – Creative Developer (2D Portfolio)

A fast, responsive 2D portfolio built with vanilla HTML/CSS/JS and Vite. It highlights projects with smooth scroll animations, a mobile-friendly menu, and accessibility features.

## 🌐 Live

https://druv-nagpal-2d.vercel.app/

## ✨ Features

- Responsive layout with fluid typography and spacing
- Mobile hamburger menu with backdrop (hidden on iPads and desktops)
- GSAP + ScrollTrigger entrance animations for project cards
- Lenis smooth scrolling (respects prefers-reduced-motion)
- Custom cursor on desktop; hidden on touch devices
- Optimized images (lazy loading) and small bundle via Vite

## 🛠️ Tech Stack

- HTML, CSS, JavaScript (vanilla)
- Vite (root at `src/`, static assets at `static/`)
- GSAP + ScrollTrigger
- Lenis (smooth scrolling)
- Deployed via Vercel

## � Project Structure

```
Portfolio_2D/
├─ package.json
├─ vercel.json
├─ vite.config.js          # root: src/, publicDir: static/
├─ src/
│  ├─ index.html
│  ├─ style.css            # responsive styles, hamburger, projects
│  ├─ script.js            # Lenis + GSAP + mobile menu
│  ├─ cursor.css
│  └─ cursor.js
└─ static/
	 └─ img/
			├─ P1.png
			├─ P2.png
			└─ P3.png
```

Note: Because `publicDir` is `static/`, assets are referenced at runtime as `/img/...` (for example `/img/P1.png`).

## � Get Started

Prerequisites: Node.js 16+ and npm.

```bash
# install deps
npm install

# start dev server
npm run dev

# build for production (outputs to dist/)
npm run build
```

Open the dev server URL shown in the terminal. By default, Vite uses port 5173.

## 🔧 Configuration Notes

- Vite config (`vite.config.js`):
	- `root: 'src/'`
	- `publicDir: '../static/'`
	- `base: './'` for relative asset paths after build
- Animations and smooth scroll are disabled when users enable “Reduce motion”.
- The hamburger menu shows on phones and small tablets (not on iPads/desktops) and uses a dim backdrop; body scroll locks while open.

## 🧪 Scripts

```bash
npm run dev     # start development server
npm run build   # production build to dist/
npm run deploy  # vercel --prod (requires Vercel CLI)
```

## 🧑‍💻 Author

**Druv Nagpal**  
GitHub: [@Druv-4182122](https://github.com/Druv-4182122)

---

If this project helps you, consider starring the repo. 😊
