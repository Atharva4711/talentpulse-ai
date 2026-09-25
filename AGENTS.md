# AntiGravity Pro-Level Blueprint — Project Rules & Guidelines

This workspace adheres to the **AntiGravity Pro-Level 4-Step Engineering Workflow**.

---

## 🧱 Step 1: The "Painful Specificity" Protocol
1. **No Guessing**: Never begin writing production code without a complete feature specification and logic map.
2. **Logic Before Code**: Break each user story into:
   - Primary state transitions
   - Edge cases & validation rules
   - Data structures / models
   - Export / persistence targets
3. **Spec Alignment**: Clarify open questions on behavior, access patterns, and integrations before implementation.

---

## 🎨 Step 2: Design Identity & Visual Standards
1. **Ban Generic Default Aesthetics**: 
   - No standard unstyled browser controls or raw primary colors (e.g., `#000`, pure `#ff0000`, basic `#0000ff`).
   - Use a cohesive design system defined via CSS Custom Properties / Design Tokens:
     - Primary brand color, secondary accent, alert/warning, muted background, surface glassmorphism/cards.
     - Modern Google Fonts (`Plus Jakarta Sans`, `Inter`, `JetBrains Mono`).
2. **Micro-Interactions & Polish**:
   - Subtle hover states, active transitions, and loading states for every interactive element.
   - Smooth animations, crisp contrast ratios, and responsive breakpoints for mobile and desktop.
3. **Asset Integrity**: Real mock data, SVG icons, and dynamic generated imagery where visual demonstrations are needed (no broken placeholder boxes).

---

## 🤖 Step 3: Multi-Agent "War Room" Operating Model
Split complex implementation tasks across three distinct internal roles:
1. **The Architect**:
   - Owns application state, data persistence, business logic, API integrations, and data integrity.
   - Ensures modular, decoupled architecture and zero unhandled failure modes.
2. **The Designer**:
   - Owns UI presentation, layout structure, typography hierarchy, CSS variables, and animation polish.
   - Guarantees the application looks and feels like a top-tier modern product.
3. **The Debugger (Automated QA)**:
   - Verifies work in real-time.
   - Performs browser testing, catches runtime console errors, and self-heals bugs before user review.

---

## ⚙️ Step 4: Customization & Invariant Rules
1. **Safety & Resilience**:
   - Include undo actions or safe rollback mechanisms for destructive state updates.
   - Graceful fallback for offline mode, empty states, and network timeouts.
2. **Consistency Invariants**:
   - Maintain consistent typography scales, button sizing, and modal behavior across all views.
   - Keep responsive layouts unbroken on mobile viewports.
3. **Codebase Cleanliness**:
   - Keep files modular and organized by concern (components, state, styles, utils).
   - Document key logic and maintain clean git history.

---

## 🌐 Step 5: Multi-Model Gateway & Orchestration Architecture
1. **Ruflo Swarm Alignment**:
   - Maintain explicit separation of concerns across the three core agents:
     - **The Architect**: Data contracts, heuristic ATS parsers, test runner.
     - **The Designer**: UI presentation, audio visualizer, webcam vision HUD, avatar.
     - **The Debugger**: Automated in-browser QA, proctoring checks, zero-failure local fallbacks.
2. **OmniRoute Gateway Pattern**:
   - Route AI requests through a unified gateway client adapter (`src/utils/aiGateway.js`).
   - Always maintain a quota-aware fallback cascade: Primary LLM API (Gemini/OpenAI) → Secondary LLM → Deterministic Local Heuristic Simulator.
   - Never introduce heavy server-side UI packages into the client-side bundle.

---

## ⚡ Step 6: Autonomous Execution Protocol ("Accept All Changes")
1. **Zero Repeated Questions**: The USER has globally authorized and accepted all architectural, styling, and engineering changes.
2. **Proactive Self-Direction**: Never interrupt or block the user with `ask_question` or permission checks. Make the optimal technical and aesthetic decisions autonomously.
3. **Continuous End-to-End Delivery**: Complete the implementation, verify builds, test the browser interface, and commit work directly without halting.
