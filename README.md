# Sourav Portfolio 🚀

A modern, interactive portfolio built with **React + Vite** to showcase Sourav Danyal's work in AI, Machine Learning, and Data Science.

## ✨ Highlights

- Editorial design with locally hosted DM Sans, DM Mono, and Instrument Serif fonts
- Original animated copper sculpture with pause controls and reduced-motion support
- Staggered headline entrances, scroll reveals, and interactive project artwork with reduced-motion support
- Filterable AI/ML project showcase with custom visuals, detailed case studies, and keyboard-accessible architecture explorers
- Real project interface screenshots and repository-backed descriptions of engineering choices
- Light and dark themes that follow the system preference and remember a visitor's selection
- Custom 1200 × 630 social sharing image with Open Graph and Twitter metadata
- Scroll-responsive Himachal mountain illustration with reduced-motion support
- Education, expertise, and downloadable certification sections
- Accessible AI assistant dialog, mobile navigation, and email-copy interaction
- Responsive layouts verified from 320px to 1920px

## 🛠️ Tech Stack

- **Frontend:** React 19, Vite 8
- **Styling:** CSS Modules
- **Visuals:** Canvas 2D, SVG, and CSS
- **Icons:** Lucide React
- **AI Integration:** Groq API (via `VITE_GROQ_API_KEY`)

## 📂 Project Structure

```text
src/
  components/        # UI sections (Hero, About, Skills, Projects, Contact, etc.)
  data.js            # Portfolio content, skills, projects, certifications, AI prompt
  projectStudies.js  # Case-study narratives, architecture steps, and screenshot metadata
  App.jsx            # Main page composition
  main.jsx           # App entry point

public/
  assets/            # Resume, certificates, and social-preview.png
    projects/        # Screenshots of deployed project interfaces
```

## ⚙️ Getting Started

### 1. Install dependencies

```bash
npm install
```

### 2. Configure environment

Create a `.env` file in the project root:

```env
VITE_GROQ_API_KEY=your_groq_api_key
```

### 3. Start development server

```bash
npm run dev
```

Open `http://localhost:5173` in your browser.

## 📜 Available Scripts

- `npm run dev` — Run local development server
- `npm run build` — Create production build
- `npm run preview` — Preview production build locally
- `npm run lint` — Run ESLint checks

## 🧠 Project Content Model

Most editable content is centralized in `src/data.js`:

- Navigation links
- Skills and skill levels
- Projects and project metadata
- Certifications
- Education timeline
- AI assistant system prompt

Case-study copy, architecture steps, and screenshot captions are in `src/projectStudies.js`, keyed by the project IDs in `src/data.js`. Screenshot files live in `public/assets/projects/`; they show the deployed interfaces and are not performance benchmarks.

The sharing image is `public/assets/social-preview.png` (1200 × 630). Canonical and social URLs in `index.html` use `https://www.souravdanyal.me/`; update those URLs together if the production domain changes. Share previews will use the new image after the site is deployed and the sharing service refreshes its cache.


## 👨‍💻 Author

**Sourav Danyal**

- GitHub: https://github.com/Sourav1331
- LinkedIn: https://linkedin.com/in/sourav-danyal-a8b35232a
