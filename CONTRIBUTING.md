# Contributing to TalentPulse AI

Welcome to the **TalentPulse AI** engineering team! This guide establishes our team branching strategy, coding standards, and Pull Request (PR) workflow so every teammate can collaborate smoothly without merge conflicts.

---

## 🌿 Git Branching Strategy (Industry Standard)

We follow a structured **Feature Branching Workflow** based on GitFlow:

```
main (Production / Stable Viva Releases)
  ▲
  │ (Merged via PR after review)
develop (Active Integration Branch)
  ▲
  ├── feature/module-1-ats-scanner
  ├── feature/module-2-technical-assessment
  ├── feature/module-3-ai-interview-studio
  └── feature/module-4-tpo-command-center
```

### Branch Roles
- **`main`**: Production-ready code. **Never push directly to `main`**. All changes arrive via Pull Requests from `develop`.
- **`develop`**: The primary integration branch where all team features merge.
- **`feature/<module-name>`**: Where you write code for your assigned module.

---

## 🛠️ Git Bash Step-by-Step Workflow for Teammates

### 1. Clone the Repository
```bash
git clone https://github.com/Atharva4711/talentpulse-ai.git
cd talentpulse-ai
```

### 2. Switch to the `develop` Branch
```bash
git checkout develop
git pull origin develop
```

### 3. Create Your Feature Branch
Name your branch by module or task:
```bash
# Examples:
git checkout -b feature/module-1-ats-scanner
# or
git checkout -b feature/module-2-technical-assessment
```

### 4. Install Dependencies & Run Locally
```bash
npm install
npm run dev
```
Open [http://localhost:5173/](http://localhost:5173/) to verify your local environment.

### 5. Commit with Conventional Commits
Keep commits small, descriptive, and prefixed:
- `feat:` for new features (e.g. `feat: add PDF resume extraction to ATS scanner`)
- `fix:` for bug fixes (e.g. `fix: adjust camera HUD bounding box on mobile`)
- `docs:` for documentation (e.g. `docs: update setup instructions in README`)
- `refactor:` for code cleanups without changing behavior

```bash
git add .
git commit -m "feat: implement keyword frequency breakdown in ATS scanner"
```

### 6. Push Your Feature Branch to GitHub
```bash
git push -u origin feature/your-branch-name
```

### 7. Open a Pull Request (PR)
1. Go to [https://github.com/Atharva4711/talentpulse-ai/pulls](https://github.com/Atharva4711/talentpulse-ai/pulls).
2. Click **New Pull Request**.
3. Set **base: `develop`** $\leftarrow$ **compare: `feature/your-branch-name`**.
4. Fill in the provided Pull Request template and request a review from your teammate!

---

## 🧪 Quality Standards & Pre-PR Checklist

Before opening a PR, always verify:
1. **Clean Build:** Run `npm run build` — must succeed with zero errors.
2. **Design Spacing:** Follow the spacious light-theme design system (ample whitespace, no cramped widgets).
3. **No Secrets:** Never commit personal API keys or `.env` files.
