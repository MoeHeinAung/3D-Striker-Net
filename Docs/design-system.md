# 🌌 Design System: 3D-Striker-Net
 > **Aesthetic Identity:** "Futuristic Precision" — A professional, high-performance dark interface with sci-fi accents.
 
 ## 1. Vision & Tone
 The goal is to make the user feel like they are operating a high-end command-and-control center. It must be **professional** first (functional, legible, efficient) and **sci-fi** second (immersive, glowing, high-tech).
 
 - **Professional:** Clear hierarchy, ample white space (breathing room), perfect alignment.
 - **Futuristic:** Deep blacks, neon accents, subtle glassmorphism, grid-based layouts.
 - **Modern:** Sharp corners, high-contrast typography, smooth transitions.
 
 ---
 
 ## 2. Color Palette
 Use a "Deep Space" palette with "Hyper-Link" accents.
 
 | Role | Color | Hex | Usage |
 |---|---|---|---|
 | **Void Black** | Background | `#0A0B0E` | Main app background |
 | **Obsidian** | Surface | `#14161C` | Cards, sidebars, modals |
 | **Striker Blue** | Primary | `#00F0FF` | Primary actions, highlights (Cyan Neon) |
 | **Neural Violet**| Secondary | `#8A2BE2` | Accents, data categories |
 | **Alert Red** | Error | `#FF0055` | Warnings, critical failures |
 | **Success Emerald**| Success | `#00FF9D` | Completions, positive status |
 | **Steel Grey** | Borders | `#2D323E` | Dividers, subtle framing |
 
 ---
 
 ## 3. Typography
 Focus on "Futuristic Precision" with a high-readability modular scale (Ratio 1.25). 
 
 - **Titles:** `Tektur` (Geometric, HUD-ready)
 - **Body Text:** `Instrument Sans` (Humanist, high legibility)
 - **Code/Numbers:** `JetBrains Mono` (High-precision monospace)
 
 ### 3.1 Typographic Scale
 Base: 16px. Line Height: 1.5.
 
 | Element | Tag | Size | Weight | Line H | Tracking | Case |
 |:---|:---|:---|:---|:---|:---|:---|
 | **H1** | H1 | 48px | 700 | 1.1 | 0.05em | Uppercase |
 | **H2** | H2 | 38px | 600 | 1.2 | 0.04em | Uppercase |
 | **H3** | H3 | 30px | 600 | 1.2 | 0.03em | Uppercase |
 | **H4** | H4 | 24px | 500 | 1.3 | 0.02em | Uppercase |
 | **H5** | H5 | 19px | 500 | 1.4 | 0.01em | Normal |
 | **H6** | H6 | 16px | 600 | 1.4 | 0.0em | Normal |
 | **Body (L)**| - | 20px | 400 | 1.5 | 0.0em | Normal |
 | **Body (M)**| P | 16px | 400 | 1.5 | 0.0em | Normal |
 | **Body (S)**| - | 14px | 400 | 1.5 | 0.01em | Normal |
 | **Data/Code**| Code | 14px | 500 | 1.4 | 0.02em | Normal |
 | **Label** | Label | 12px | 700 | 1.2 | 0.1em | Uppercase |
 
 ### 3.2 Application Rules
 - **Semantic Mapping:** `Tektur` is for structural headers only. `Instrument Sans` is the workhorse for narrative text. `JetBrains Mono` is reserved exclusively for numeric telemetry, IDs, timestamps, and programmatic code.
 - **Alignment:** Narrative text is left-aligned. Numeric data is right-aligned or tabular-aligned for scanning consistency.
 - **State & Color Management:**
     - **Default:** `#dce4e5`
     - **Hover:** `#00e5ff`
     - **Active/Focus:** Neon glow effect (0 0 8px #00e5ff)
     - **Disabled:** `#bac9cc` (40% opacity)
 
 ### 3.3 UI Pattern Specification
 - **Page Titles vs. Card Titles:** Page Titles occupy H1-H2 (Uppercase tracking). Card Titles use H4-H5 (Normal case), maintaining legibility within restricted container boundaries.
 - **Metadata:** Pair Labels (12px, 0.1em tracking) with context-specific icons. Maintain a strict color contrast with parent body text using `#bac9cc`.
 - **Spatial Layout:** Maintain a 4px vertical rhythm grid for all text elements. Ensure headers have 1.5x padding relative to sibling body elements to define spatial hierarchy.
 
 ---
 
 ## 4. Structural Hierarchy (Grid System)
 The application follows a strictly controlled, non-scrolling viewport architecture:
 *   **Root Level (`html`, `body`):** Locked to `100vw` x `100vh` with `overflow: hidden`.
 *   **Page Layout Wrapper (`.page-layout`):** Flexbox container (`column`) filling the viewport.
 *   **Header (`.navbar`):** Fixed height, `flex-shrink: 0`.
 *   **Main Container (`.main-content`):** `flex-grow: 1` container, enforcing a strict 12x8 CSS grid.

## 5. Layout Grid Logic
The grid is calculated to divide the remaining viewport height (minus navbar) into 8 equal rows while preserving a `24px` gutter between them.

*   **Grid Columns:** `repeat(12, minmax(0, 1fr))`
*   **Grid Rows:** `repeat(8, calc((100% - (7 * 24px)) / 8))`
*   **Gaps:** `24px` horizontal and vertical.
*   **Padding:** `24px` around the grid.

## 6. Component Architecture
### Cards (`.card`)
Cards are the primary unit of layout. Tables, Charts, and other components should be inside card container to prevent expansion of row height and overflow.
*   **Constraint:** `overflow: hidden` is enforced to prevent content-driven expansion of row height.
*   **Padding:** `16px`.
*   **Content Header:** `card-title` class provides a consistent border-bottom (`1px solid #f3f4f6`) and spacing.
*   **Border:** include accent corner border.

### Overflow Handling
For cards with excess content, the following strategies are required to maintain the grid's rigidity:
1.  **Internal Scrollbar (`.scroll-container`):** `flex-grow: 1`, `min-height: 0`, `overflow-y: auto`.
2.  **Internal Pagination (`.paginated-container`):**
    *   Body: `flex-grow: 1`, `min-height: 0`, `overflow: hidden` (no scroll).
    *   Controls: `flex-shrink: 0`, height `40px`.

---

## 7. UI Components & Accents
 
 ### 🛡️ The "Shield" Border
 Use 1px borders with a subtle gradient or a 10% opacity glow.
 - **CSS Pattern:** `border: 1px solid rgba(0, 240, 255, 0.2); box-shadow: 0 0 10px rgba(0, 240, 255, 0.05);`
 
 ### 🧪 Glassmorphism
 Use sparingly for overlays and modals.
 - **Blur:** `backdrop-filter: blur(12px);`
 - **Tint:** `background: rgba(20, 22, 28, 0.7);`
 
 ### 📡 Sci-Fi Accents (The "Vibe")
 - **Grid Overlays:** A very subtle `background-image` grid (20px intervals) at 2% opacity.
 - **Scanner Lines:** A slow, horizontal pulse animation on loading states.
 - **Micro-Interactions:** Buttons should have a "Digital Ping" sound feel (visual only) on click—subtle scale-up and a cyan flash.
 
 ---
 
 ## 8. Information Density & Layout
 To remain professional, the app must avoid "flashy but empty" space.
 
 - **Density:** High information density. Use compact Ant Design tables and lists.
 - **Hierarchy:** Use font weights (600 for labels, 400 for values) instead of color to establish hierarchy where possible.
 - **Alignment:** Strict 4px or 8px grid alignment. No "floating" elements.
 - **Micro-Copy:** Tooltips on every icon. Technical labels (e.g., `SENS_STAT: ACTIVE`) instead of generic text.
 
 ---
 
 ## 9. Architectural Constraints (Rules.md Integration)
 - **Contrast:** AA level accessibility is mandatory. No low-contrast "vibe" text.
 - **Responsiveness:** HUD elements must collapse into a clean "Mobile Command" view.
 - **Performance:** No heavy 3D assets unless functional. Use CSS/SVG for effects.
 
 ---
 
 ## 10. Implementation Checklist
 - [ ] Main background set to `#0A0B0E`.
 - [ ] Borders use `#2D323E` with `#00F0FF` highlights.
 - [ ] Typography follows the Inter/Mono pairing.
 - [ ] Buttons use the "Striker Blue" neon gradient on hover.
