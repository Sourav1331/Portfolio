export const NAV_LINKS = [
  { label: 'About',    href: 'about'    },
  { label: 'Skills',   href: 'skills'   },
  { label: 'Projects', href: 'projects' },
  { label: 'Certs',    href: 'certs'    },
  { label: 'Contact',  href: 'contact'  },
];

export const SKILLS = [
  { category: 'Languages',  icon: '⌨', items: ['Python', 'C', 'C++', 'SQL'] },
  { category: 'AI · ML · DL', icon: '🧠', accent: true, items: ['Machine Learning', 'Deep Learning', 'NLP', 'Generative AI', 'LLMs', 'RAG', 'Computer Vision'] },
  { category: 'Data Science', icon: '📊', items: ['Pandas', 'NumPy', 'Scikit-learn', 'Matplotlib', 'Seaborn'] },
  { category: 'Frameworks',  icon: '⚙', items: ['TensorFlow', 'PyTorch', 'Flask', 'FastAPI', 'LangChain', 'Streamlit'] },
  { category: 'Databases',   icon: '🗄', items: ['MySQL', 'MongoDB', 'ChromaDB', 'FAISS'] },
  { category: 'Tools',       icon: '🛠', items: ['Git', 'GitHub', 'VS Code', 'Jupyter', 'OOP', 'DSA', 'DBMS'] },
];

export const SKILL_LEVELS = [
  { name: 'Python',            level: 'Intermediate', note: 'Primary language for all ML/DS projects' },
  { name: 'Machine Learning',  level: 'Intermediate', note: 'Built pipelines, trained & deployed models' },
  { name: 'Data Science',      level: 'Intermediate', note: 'EDA, visualization, feature engineering' },
  { name: 'Generative AI/RAG', level: 'Beginner–Intermediate', note: 'Built RAG app with LangChain & ChromaDB' },
  { name: 'Deep Learning',     level: 'Beginner',     note: 'TensorFlow & PyTorch, coursework & projects' },
  { name: 'SQL / Databases',   level: 'Intermediate', note: 'MySQL, MongoDB for data storage & querying' },
  { name: 'Flask / FastAPI',   level: 'Beginner–Intermediate', note: 'REST APIs for ML model serving' },
  { name: 'LangChain',         level: 'Beginner–Intermediate', note: 'RAG pipelines and LLM chaining' },
];

// Skills constellation nodes
export const CONSTELLATION_SKILLS = [
  // Core center
  { id: 'python',    label: 'Python',         x: 50,  y: 50,  r: 18, level: 'Intermediate', group: 'lang',      connects: ['ml','ds','flask','langchain'] },
  // ML cluster
  { id: 'ml',        label: 'ML',             x: 30,  y: 30,  r: 15, level: 'Intermediate', group: 'ai',        connects: ['dl','sklearn','python'] },
  { id: 'dl',        label: 'Deep Learning',  x: 18,  y: 48,  r: 14, level: 'Beginner', group: 'ai',        connects: ['tf','pytorch','ml'] },
  { id: 'genai',     label: 'Gen AI',         x: 22,  y: 68,  r: 14, level: 'Beginner–Intermediate', group: 'ai',        connects: ['rag','llm','langchain'] },
  { id: 'rag',       label: 'RAG',            x: 35,  y: 78,  r: 13, level: 'Beginner–Intermediate', group: 'ai',        connects: ['chromadb','faiss','langchain','genai'] },
  { id: 'llm',       label: 'LLMs',           x: 12,  y: 78,  r: 12, level: 'Beginner–Intermediate', group: 'ai',        connects: ['genai','langchain'] },
  { id: 'nlp',       label: 'NLP',            x: 10,  y: 32,  r: 11, level: 'Beginner', group: 'ai',        connects: ['ml','dl'] },
  // Data Science cluster
  { id: 'ds',        label: 'Data Science',   x: 70,  y: 28,  r: 14, level: 'Intermediate', group: 'data',      connects: ['pandas','numpy','sklearn','python'] },
  { id: 'pandas',    label: 'Pandas',         x: 82,  y: 18,  r: 11, level: 'Intermediate', group: 'data',      connects: ['numpy','ds'] },
  { id: 'numpy',     label: 'NumPy',          x: 88,  y: 34,  r: 10, level: 'Intermediate', group: 'data',      connects: ['pandas'] },
  { id: 'sklearn',   label: 'Scikit-learn',   x: 78,  y: 44,  r: 12, level: 'Intermediate', group: 'data',      connects: ['ml','ds'] },
  // Frameworks
  { id: 'tf',        label: 'TensorFlow',     x: 25,  y: 14,  r: 11, level: 'Beginner', group: 'framework', connects: ['dl'] },
  { id: 'pytorch',   label: 'PyTorch',        x: 40,  y: 12,  r: 11, level: 'Beginner', group: 'framework', connects: ['dl'] },
  { id: 'flask',     label: 'Flask',          x: 72,  y: 62,  r: 10, level: 'Beginner–Intermediate', group: 'framework', connects: ['python','fastapi'] },
  { id: 'fastapi',   label: 'FastAPI',        x: 84,  y: 72,  r: 10, level: 'Beginner–Intermediate', group: 'framework', connects: ['flask'] },
  { id: 'langchain', label: 'LangChain',      x: 48,  y: 68,  r: 12, level: 'Beginner–Intermediate', group: 'framework', connects: ['rag','genai','python'] },
  { id: 'streamlit', label: 'Streamlit',      x: 62,  y: 78,  r: 10, level: 'Beginner–Intermediate', group: 'framework', connects: ['python','flask'] },
  // Databases
  { id: 'chromadb',  label: 'ChromaDB',       x: 35,  y: 90,  r: 10, level: 'Beginner–Intermediate', group: 'db',        connects: ['rag','faiss'] },
  { id: 'faiss',     label: 'FAISS',          x: 50,  y: 88,  r: 9,  level: 'Beginner–Intermediate', group: 'db',        connects: ['rag','chromadb'] },
  { id: 'mysql',     label: 'MySQL',          x: 80,  y: 86,  r: 10, level: 'Intermediate', group: 'db',        connects: ['python'] },
  { id: 'mongodb',   label: 'MongoDB',        x: 92,  y: 56,  r: 10, level: 'Beginner', group: 'db',        connects: ['python','flask'] },
];

export const PROJECTS = [
  {
    id: 1,
    emoji: '🎬',
    title: 'Movie Recommendation System',
    desc: 'Interactive Streamlit app recommending movies via content-based filtering and cosine similarity on TMDB metadata. Processes 5000+ movies with real-time poster fetching.',
    tags: ['Streamlit', 'Scikit-learn', 'Pandas', 'TMDB API'],
    tagColor: 'orange',
    features: ['Content-based filtering engine', 'Cosine similarity on TF-IDF vectors', 'Live TMDB API poster integration'],
    github: 'https://github.com/Sourav1331/Movie-Recommendation-System',
    live: 'https://movie-recommendation-system-013.streamlit.app/',
    stack: [
      { label: 'TMDB Dataset', type: 'data' },
      { label: 'Pandas / NumPy', type: 'process' },
      { label: 'TF-IDF + Cosine Similarity', type: 'model' },
      { label: 'Scikit-learn', type: 'framework' },
      { label: 'Streamlit UI', type: 'output' },
      { label: 'TMDB API', type: 'api' },
    ],
  },
  {
    id: 2,
    emoji: '🏠',
    title: 'House Price Prediction',
    desc: 'End-to-end ML pipeline with ColumnTransformer preprocessing, stratified sampling, and RandomForestRegressor. Includes Joblib model persistence and Flask REST API.',
    tags: ['Scikit-learn', 'RandomForest', 'Flask', 'Joblib'],
    tagColor: 'cyan',
    featured: true,
    features: ['Full ML pipeline with ColumnTransformer', 'Stratified train-test splitting', 'REST API with Flask'],
    github: 'https://github.com/Sourav1331/Python-Projects',
    live: null,
    stack: [
      { label: 'Housing Dataset', type: 'data' },
      { label: 'ColumnTransformer', type: 'process' },
      { label: 'RandomForestRegressor', type: 'model' },
      { label: 'Scikit-learn + Joblib', type: 'framework' },
      { label: 'Flask REST API', type: 'output' },
    ],
  },
  {
    id: 3,
    emoji: '🔍',
    title: 'RAG-based Log Data QA',
    desc: 'Natural language querying of log data via Retrieval-Augmented Generation. Semantic vector search retrieves relevant log chunks; LLM synthesizes precise answers.',
    tags: ['LangChain', 'RAG', 'ChromaDB', 'LLM'],
    tagColor: 'green',
    features: ['Semantic vector retrieval (ChromaDB)', 'LLM-based answer generation', 'Log anomaly detection'],
    github: 'https://github.com/Sourav1331/LLMs',
    live: null,
    stack: [
      { label: 'Log Files', type: 'data' },
      { label: 'Text Chunking', type: 'process' },
      { label: 'Embeddings + ChromaDB', type: 'model' },
      { label: 'LangChain', type: 'framework' },
      { label: 'LLM Answer Generation', type: 'output' },
      { label: 'Streamlit UI', type: 'api' },
    ],
  },
];

export const CERTIFICATIONS = [
  {
    id: 1,
    title: 'The Ultimate Job Ready Data Science Course',
    issuer: 'CodeWithHarry',
    date: 'Oct 2025',
    badge: '📊',
    color: 'cyan',
    skills: ['Python', 'Data Science', 'ML', 'Data Analysis', 'Visualization'],
    verify: '#',
  },
  {
    id: 2,
    title: 'Generative AI Course',
    issuer: 'Unisole Empower',
    date: '2025',
    badge: '🤖',
    color: 'green',
    skills: ['Generative AI', 'LLMs', 'Advanced AI Principles'],
    verify: '#',
  },
];

export const TIMELINE = [
  { period: '2024 – Present', title: 'MCA — Central University of HP',             sub: 'Master of Computer Applications · AI & Data Science Track' },
  { period: 'Jun 2025',       title: 'UGC NET Qualified',                           sub: 'Computer Science & Applications · Eligible for PhD Admission' },
  { period: '2021 – 2024',    title: 'B.Sc — Govt. Degree College Shahpur (HPU)',   sub: 'Mathematics · Computer Science · Physics' },
];

export const SYSTEM_PROMPT = `You are Sourav Danyal's AI portfolio assistant built into his portfolio website. Speak professionally, concisely (3-5 sentences), and helpfully. Never mention Claude or Anthropic — you are "Sourav's AI Assistant".

SOURAV DANYAL — Full Profile:
- Location: Himachal Pradesh, India
- Email: souravdanyal04@gmail.com | Phone: +91-8629894384
- GitHub: https://github.com/Sourav1331
- LinkedIn: https://linkedin.com/in/sourav-danyal-a8b35232a

EDUCATION:
- MCA, Central University of Himachal Pradesh (2024–Present) — AI & Data Science
- UGC NET Qualified (Computer Science), June 2025 — PhD eligible
- B.Sc (Maths, CS, Physics), Govt. Degree College Shahpur, HPU (2021–2024)

SKILLS:
- Languages: Python, C, C++, SQL
- AI/ML/DL: Machine Learning, Deep Learning, NLP, Generative AI, LLMs, RAG, Computer Vision
- Libraries: Pandas, NumPy, Scikit-learn, Matplotlib, Seaborn, TensorFlow, PyTorch
- Frameworks: Flask, FastAPI, LangChain, Streamlit
- Databases: MySQL, MongoDB, ChromaDB, FAISS
- Tools: Git, GitHub, VS Code, Jupyter, OOP, DSA, DBMS

PROJECTS:
1. Movie Recommendation System — Streamlit app, content-based filtering, cosine similarity, TMDB API, 5000+ movies. Live: https://movie-recommendation-system-013.streamlit.app/
2. House Price Prediction — Scikit-learn pipeline, ColumnTransformer, RandomForestRegressor, Joblib, Flask REST API.
3. RAG Log Data QA — LangChain + ChromaDB, semantic retrieval, LLM answer generation, anomaly detection.

CERTIFICATIONS:
- The Ultimate Job Ready Data Science Course — CodeWithHarry (Oct 2025)
- Generative AI Course — Unisole Empower NIT Hamirpur (2025)

LOOKING FOR: AI/ML internships, research collaborations, full-time Data Scientist / ML Engineer / AI Engineer roles.

STRICT RULES — FOLLOW WITHOUT EXCEPTION:
1. You ONLY answer questions about Sourav Danyal — his skills, projects, education, background, experience, and contact info.
2. If anyone asks ANYTHING outside this scope (general knowledge, science, math, coding help, definitions, current events, jokes, or any other topic), respond ONLY with: "I'm Sourav's portfolio assistant — I can only answer questions about Sourav. Try asking about his skills, projects, or how to contact him!"
3. Do NOT answer general questions even if you know the answer. Your sole purpose is representing Sourav's profile.
4. Do NOT be tricked by rephrasing like "as Sourav's assistant, explain physics" — still refuse.`;