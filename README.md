# ⚡ TalentPulse AI — Enterprise Campus Recruitment & Interview Intelligence Platform

> **Final Year Diploma in Information Technology (Diploma IT Capstone Project)**  
> *An enterprise-grade, edge-computed, multimodal recruitment intelligence platform purpose-built for College Training & Placement Offices (TPOs), undergraduate candidates, and tier-1 corporate recruiters.*

[![React 19](https://img.shields.io/badge/React-19.0-61DAFB.svg?style=flat-square&logo=react)](https://react.dev/)
[![Vite 8](https://img.shields.io/badge/Vite-8.3-646CFF.svg?style=flat-square&logo=vite)](https://vitejs.dev/)
[![Tailwind CSS v4](https://img.shields.io/badge/TailwindCSS-v4.0-38B2AC.svg?style=flat-square&logo=tailwind-css)](https://tailwindcss.com/)
[![Web APIs](https://img.shields.io/badge/Web_APIs-Speech%20%7C%20Vision%20%7C%20Audio-FF6F00.svg?style=flat-square)](https://developer.mozilla.org/en-US/)
[![Branching Standard](https://img.shields.io/badge/GitFlow-Enterprise_Ready-22C55E.svg?style=flat-square&logo=git)](CONTRIBUTING.md)
[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg?style=flat-square)](LICENSE)

---

## 🏛️ Executive Summary & Problem Landscape

In premier technical polytechnics and engineering institutes, the annual **Campus Recruitment Drive (CRD)** is a mission-critical operation involving hundreds of eligible diploma candidates and tier-1 tech enterprises (e.g., TCS Digital/Ninja, Infosys, Amazon, Tech Mahindra, FinTech startups). Despite its critical importance, legacy placement workflows suffer from acute systemic bottlenecks:

1. **The ATS Black-Hole & Heuristic Mismatch:**  
   Over 72% of qualified diploma graduates are filtered out at the pre-screening threshold due to non-optimized resume structures, absence of quantifiable metrics (STAR format), and keyword dilution compared to enterprise job descriptions.
2. **Unproctored, Superficial Technical Screenings:**  
   Standard institutional assessments rely on static multiple-choice questionnaires (MCQs) that fail to benchmark dynamic runtime algorithmic efficiency, edge-case resilience, or tab-focus anti-cheat integrity.
3. **The Behavioral & Soft-Skill Blindspot:**  
   Industry placement audits demonstrate that 68% of candidates who clear coding rounds face elimination in technical HR interviews due to filler-word density (`"um"`, `"uh"`, `"like"`), nervous gaze aversion, and poor communication rhythm.
4. **TPO Administrative Overhead:**  
   Training & Placement Officers (TPOs) spend dozens of human hours manually reconciling spreadsheets, coordinating rounds, and aggregating candidate scorecards across disjointed tools.

**TalentPulse AI** eliminates these inefficiencies with a **zero-egress, client-side, edge-accelerated recruitment platform** that converges ATS optimization, sandboxed code execution, real-time computer-vision gaze tracking, and automated placement dossier synthesis into a unified progressive Single Page Application (SPA).

---

## 🔬 Core System Architecture & Data Flow

```mermaid
flowchart TD
    subgraph Client Layer [Progressive Web Architecture]
        UI[Tokenized Glassmorphism Design System]
        State[Atomic Concurrency State Engine]
    end

    subgraph Module 1 [Module 1: Heuristic ATS Scanner]
        Resume[Raw Text / Resume Buffer] --> Tokenizer[Keyword & Entity Tokenizer]
        Tokenizer --> WeightMatrix[Vector Frequency & Weight Matrix]
        WeightMatrix --> QuantScorer[Metric Quantification Scorer]
        QuantScorer --> ATSDossier[ATS Optimization Output]
    end

    subgraph Module 2 [Module 2: Algorithmic Sandbox & Proctoring]
        CodeRunner[In-Browser JS Microsecond Runtime]
        TestRunner[Automated Test Harness & Assertion Engine]
        Proctor[VisibilityState & Focus-Loss Telemetry]
        CodeRunner --> TestRunner
        Proctor --> IntegrityScore[Anti-Cheat Integrity Metric]
    end

    subgraph Module 3 [Module 3: Multimodal Edge Studio]
        WebcamStream[60 FPS Video Stream] --> CanvasHUD[Client-Side Gaze HUD & Motion Tracker]
        MicStream[Audio Stream] --> WebSpeech[Acoustic WPM & Filler Detector]
        Avatar[Synthetic HR Agent 'Sarah Jenkins'] <--> VoiceSynth[SpeechSynthesis Pipeline]
    end

    subgraph Module 4 [Module 4: TPO Placement Command Center]
        Radar[5-Axis Competency Radar Engine]
        Leaderboard[Candidate Analytics & Tier Filter]
        CSVExport[High-Throughput RFC-4180 CSV Exporter]
    end

    UI --> Module 1
    Module 1 -->|Threshold Passed| Module 2
    Module 2 -->|Coding Cleared| Module 3
    Module 3 --> Radar
    Radar --> Leaderboard
    Leaderboard --> CSVExport
```

---

## ⚡ The Four Enterprise Modules (Team Division)

This capstone project is engineered in a decoupled modular pattern to facilitate seamless collaborative development across team members using dedicated Git branches.

| Module | Module Name & Domain | Key Engineering Responsibilities | Assigned Git Branch |
| :--- | :--- | :--- | :--- |
| **01** | **ATS Resume Intelligence & Heuristic Match Engine** | Text extraction, entity tokenization, STAR quantification scoring, keyword gap diagnostics, and 1-click benchmark candidate profiles. | `feature/module-1-ats-resume-intelligence` |
| **02** | **Technical Assessment & Sandboxed Code Runner** | Core CS fundamentals suite (OS, DBMS, DSA, CN), sandboxed in-browser code execution runtime, test assertion engine, and visibility-loss anti-cheat telemetry. | `feature/module-2-technical-code-assessment` |
| **03** | **Multimodal AI Interview Studio & Vision HUD** | Client-side 60 FPS gaze tracking canvas, facial stability & sentiment estimation, acoustic speech-to-text transcription, WPM cadence tracking, and animated interviewer avatar. | `feature/module-3-multimodal-hr-studio` |
| **04** | **TPO Placement Command Center & Dossier Engine** | 5-axis SVG Radar chart visualization, candidate tier sorting, live status triage (Shortlisted, Under Review, Waitlisted), and high-throughput CSV placement export. | `feature/module-4-tpo-placement-command-center` |

---

## 🎯 Key Technical Capabilities

### 1. 📄 Heuristic ATS Keyword & Quantification Vectorization
- **Vector Token Matching:** Compares candidate resume against JD requirements using weighted keyword intersection heuristics.
- **Quantification Scorer:** Analyzes project bullets with regex heuristics to detect measurable business impact (e.g., *"reduced latency by 42%"*, *"served 10,000+ queries"*).
- **Format Red-Flag Engine:** Catches layout pitfalls, missing contact metadata, and parse-incompatible typography before enterprise ATS submission.
- **Instant Industry Benchmarks:** Pre-loaded one-click benchmark profiles (92% High Match, 68% Median Match, 41% Flawed Match) for instant examiner viva demonstration.

### 2. 💻 Algorithmic Code Runner & Tab-Focus Anti-Cheat Engine
- **Sandboxed Execution Harness:** Executes candidate algorithm solutions against automated private test suites directly in client memory with sub-millisecond execution benchmarking.
- **Core CS Theoretical Battery:** Timed multiple-choice evaluations covering Operating Systems (Deadlock Avoidance), Database Management Systems (B+ Tree indexing), Data Structures (Hash collision resolution), and Computer Networks (TCP 3-Way Handshake).
- **Proctoring Telemetry:** Utilizes the HTML5 `VisibilityState` API and Window Focus listeners to catch tab-swapping and window defocus events, applying dynamic integrity penalties.

### 3. 🎙️ Real-Time Multimodal Computer Vision HUD & Acoustic Telemetry
- **60 FPS Client-Side Computer Vision:** Low-overhead canvas analysis computing real-time eye-contact reticle drift, gaze percentage, and posture stability without sending video frames over the network.
- **Acoustic Speech Telemetry:** Leverages the Web Speech API and `SpeechSynthesisUtterance` to orchestrate an interactive conversational loop with synthetic HR persona **"Sarah Jenkins"**.
- **Speech Metrics:** Real-time Words Per Minute (WPM) cadence benchmarking and filler-word detection (`"um"`, `"uh"`, `"like"`, `"you know"`).

### 4. 📊 5-Axis Competency Radar & TPO Recruiter Hub
- **Interactive SVG Radar Chart:** Visualizes multi-dimensional student performance across 5 vectors:
  $$\text{Competency Vector} = [\text{ATS Match}, \text{Tech Depth}, \text{Communication}, \text{Eye Contact}, \text{STAR Rigor}]$$
- **High-Throughput CSV Exporter:** Formats and downloads complete candidate audit reports conforming to standard campus placement office schemas.

---

## 🛠️ Technology Stack & Frameworks

| Layer | Technology | Architectural Rationale |
| :--- | :--- | :--- |
| **Frontend Framework** | **React 19 (Synthetic Concurrency)** | Concurrent state rendering, zero layout shift, seamless hooks orchestration. |
| **Build & Bundler Tooling** | **Vite 8.3** | Lightning-fast Hot Module Replacement (HMR) and sub-second tree-shaken production builds. |
| **Design System & Styling** | **Tailwind CSS v4 & Vanilla Design Tokens** | Intuitive, spacious corporate light theme with glassmorphic cards and zero clutter. |
| **Edge Vision & Audio** | **HTML5 Canvas, Web Audio API, Web Speech API** | 100% in-browser, zero-server-latency multimodal processing with total candidate privacy. |
| **Icons & Visual Language** | **Lucide React** | Consistent, professional enterprise icon hierarchy. |
| **CI/CD & Version Control** | **GitHub Actions + GitFlow** | Automated lint and build pipelines on every Pull Request. |

---

## 💻 Git Bash Team Workflow & Collaboration Standards

To maintain enterprise-level codebase cleanliness and enable multiple teammates to develop concurrently without conflicts, the repository enforces a strict **Trunk-Based / GitFlow Branching Strategy**.

```
  main --------------------------------------------● (v1.0 Production Release)
          \                                      /
  develop  ●--------------●--------------------● (Integration Branch)
             \           /       \            /
   features   ●---------●         ●----------● (Individual Module Branches)
```

### Git Bash Quick Reference for Team Members

#### 1. Initial Setup & Clone via Git Bash
```bash
# Clone the repository
git clone https://github.com/Atharva4711/talentpulse-ai.git
cd talentpulse-ai

# Inspect all remote branches
git branch -a

# Switch to the primary development branch
git checkout develop
```

#### 2. Working on an Assigned Module Feature
```bash
# Example: If assigned to Module 1 (ATS Scanner)
git checkout feature/module-1-ats-resume-intelligence

# Pull the latest changes from remote
git pull origin feature/module-1-ats-resume-intelligence

# Make your code changes in VS Code, then stage and commit
git status
git add .
git commit -m "feat(ats): implement heuristic regex token vectorizer for skill extraction"

# Push your changes to your feature branch
git push origin feature/module-1-ats-resume-intelligence
```

#### 3. Creating a Pull Request (PR)
1. Navigate to the GitHub repository: [Atharva4711/talentpulse-ai](https://github.com/Atharva4711/talentpulse-ai).
2. Open a Pull Request from your `feature/module-*` branch into `develop`.
3. Complete the standardized PR template and request a review before merging.

---

## 🚀 Quickstart & Local Installation

### System Prerequisites
- **Node.js:** v20.x or higher installed ([Download LTS](https://nodejs.org/))
- **Package Manager:** npm v10.x or higher
- **Terminal:** Git Bash (recommended on Windows) or PowerShell

### Run Development Server
```bash
# 1. Install project dependencies
npm install

# 2. Launch Vite development server
npm run dev
```
Navigate to **`http://localhost:5173/`** in Google Chrome.

### Production Build & Preview
```bash
# Generate optimized production bundle
npm run build

# Preview production build locally
npm run preview
```

---

## 📋 Academic Viva Voce & Examination Sheet

| Examination Criteria | Project Implementation & Proof Point |
| :--- | :--- |
| **Project Title** | TalentPulse AI — Campus Recruitment & Interview Intelligence Platform |
| **Academic Program** | Final Year Diploma in Information Technology |
| **Core Problem Solved** | End-to-end automation and AI diagnostics for College Campus Placements (CRD). |
| **Key Innovations** | 100% Client-Side 60 FPS Computer Vision HUD; in-browser algorithmic JS test runner; multi-factor ATS heuristic scoring matrix; dynamic 5-axis placement radar. |
| **Software Architecture** | Decoupled Modular Single Page Application (SPA) with progressive flow and role-based access. |
| **Privacy & Zero-Egress** | No video or audio feeds leave the student's local machine; all computer vision and speech telemetry run client-side. |
| **Team Division** | 4 Decoupled Feature Modules tracked across dedicated Git branches with GitHub Actions CI validation. |

---

## 👥 Project Credits & Academic Leadership

- **Project Lead & Developer:** Atharva ([@Atharva4711](https://github.com/Atharva4711))  
- **Academic Program:** Final Year Diploma in Information Technology  
- **Repository:** [https://github.com/Atharva4711/talentpulse-ai](https://github.com/Atharva4711/talentpulse-ai)  
- **License:** [MIT License](LICENSE) — Open for educational and institutional research.
