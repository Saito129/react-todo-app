# TaskFlow — Modern React TODO Application
### Case Study 9: Component-Driven React App with GitHub Pages Deployment

A modern, responsive, and feature-rich TODO application built with **React 19**, **Vite**, and **Lucide Icons**, deployed live to **GitHub Pages**.

🔗 **Live Demo:** [https://Saito129.github.io/react-todo-app/](https://Saito129.github.io/react-todo-app/)  
📂 **Repository:** [https://github.com/Saito129/react-todo-app](https://github.com/Saito129/react-todo-app)

---

## 🚀 Key Features

- **Task Management:**
  - ➕ **Add New Tasks:** Create tasks with title, priority (High, Medium, Low), category tags, and optional due dates.
  - 🔄 **Mark Completed/Uncompleted:** Interactive custom checkbox with animated strike-through styling.
  - ✏️ **Inline Editing:** Edit task text, category, priority, and due date on-the-fly without leaving the list.
  - 🗑️ **Delete Tasks:** Remove individual tasks or clear all completed tasks with one click.
  - 📦 **Sample Data Loader:** Quick restore button to populate demonstration tasks anytime.

- **Organization & Filtering:**
  - 🔍 **Real-Time Search:** Search tasks dynamically by keyword or category.
  - 📑 **Status Tabs:** Filter tasks by *All*, *Active*, or *Completed* with real-time counters.
  - 🏷️ **Category Filter:** Filter by Work, Personal, Study, Shopping, Health, and General.
  - ↕️ **Smart Sorting:** Sort by Newest, Oldest, Priority (High to Low), Due Date, or Alphabetical.

- **User Experience & Polish:**
  - 🌓 **Dark & Light Mode:** Seamless theme toggle with local storage persistence and system preference detection.
  - 📊 **Progress Bar & Daily Stats:** Live visual indicator showing completion percentage and today's date.
  - 💾 **LocalStorage Persistence:** All tasks and preferences automatically sync to browser storage.
  - 📱 **Fully Responsive:** Optimized layout for desktop, tablets, and mobile screens.

---

## 🏗️ Component Architecture

The application is structured into modular, reusable React components:

```
src/
├── components/
│   ├── TodoHeader.jsx      # App branding, real-time date, theme toggle, and completion progress bar
│   ├── TodoInput.jsx       # Form input for new tasks with priority, category, and due date controls
│   ├── TodoFilter.jsx      # Search bar, status tabs (All/Active/Completed), category filter, and sorting
│   ├── TodoList.jsx        # Task list container handling empty states and rendering tasks
│   ├── TodoItem.jsx        # Individual task item with complete toggle, badges, inline edit, and delete
│   ├── TodoStats.jsx       # Task counters, remaining count, "Mark All Done", and "Clear Completed"
│   └── TodoFooter.jsx      # Status badges, privacy info, and GitHub repository links
├── App.jsx                 # Central state manager, localStorage sync, filter & sort logic
├── index.css               # Modern CSS styling with CSS variables for light/dark themes
└── main.jsx                # React root mount point
```

---

## 🛠️ Tech Stack

| Technology | Purpose |
|------------|---------|
| **React 19** | Component-driven UI library |
| **Vite 8** | Ultra-fast bundling, HMR, and build tool |
| **Lucide React** | Clean, modern iconography |
| **Vanilla CSS3** | Custom design system with CSS custom properties & glassmorphism |
| **GitHub Pages & gh-pages** | Automated production hosting and continuous deployment |

---

## 💻 Local Development

1. **Clone the repository:**
   ```bash
   git clone https://github.com/Saito129/react-todo-app.git
   cd react-todo-app
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Start development server:**
   ```bash
   npm run dev
   ```
   Open `http://localhost:5173` in your browser.

4. **Build for production:**
   ```bash
   npm run build
   ```

5. **Deploy to GitHub Pages:**
   ```bash
   npm run deploy
   ```

---

## 🚢 Deployment to GitHub Pages

The project includes pre-configured deployment tooling:

1. `package.json` includes:
   ```json
   "homepage": "https://Saito129.github.io/react-todo-app/",
   "scripts": {
     "predeploy": "npm run build",
     "deploy": "gh-pages -d dist"
   }
   ```
2. Vite base configuration (`vite.config.js`) uses relative resolution (`base: './'`) ensuring asset paths resolve seamlessly on GitHub Pages.
3. Automated GitHub Actions workflow (`.github/workflows/deploy.yml`) is included for CI/CD builds on every push to `main`.

---

## 📄 License

MIT License. Developed for Case Study 9.
