# Sourav Portfolio 🚀

A modern, interactive portfolio built with **React + Vite** to showcase Sourav Danyal's work in AI, Machine Learning, and Data Science.

## ✨ Highlights

- AI-powered portfolio assistant terminal
- Interactive skills constellation map
- Featured AI/ML project showcase with tech flow visualizer
- Certification and education timeline sections
- Smooth single-page navigation with progress indicator
- Fully responsive design for desktop and mobile

## 🛠️ Tech Stack

- **Frontend:** React 19, Vite 8
- **Styling:** CSS Modules
- **Animations:** Framer Motion
- **Icons:** Lucide React
- **AI Integration:** Groq API (via `VITE_GROQ_API_KEY`)

## 📂 Project Structure

```text
src/
  components/        # UI sections (Hero, About, Skills, Projects, Contact, etc.)
  data.js            # Portfolio content, skills, projects, certifications, AI prompt
  App.jsx            # Main page composition
  main.jsx           # App entry point

public/
  assets/            # Static files (e.g., resume)
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

This makes updates fast and consistent across the site.


## 👨‍💻 Author

**Sourav Danyal**

- GitHub: https://github.com/Sourav1331
- LinkedIn: https://linkedin.com/in/sourav-danyal-a8b35232a