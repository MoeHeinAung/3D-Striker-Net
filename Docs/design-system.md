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
Focus on readability with a "Data-Driven" feel.

- **Primary Font:** `Inter` or `Roboto` (Professional, clean).
- **Secondary (Monospace):** `JetBrains Mono` or `Fira Code` (Used for IDs, data values, and tech labels).
- **Headings:** All-caps with increased letter spacing for a "HUD" feel.

---

## 4. UI Components & Accents

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

## 5. Information Density & Layout
To remain professional, the app must avoid "flashy but empty" space.

- **Density:** High information density. Use compact Ant Design tables and lists.
- **Hierarchy:** Use font weights (600 for labels, 400 for values) instead of color to establish hierarchy where possible.
- **Alignment:** Strict 4px or 8px grid alignment. No "floating" elements.
- **Micro-Copy:** Tooltips on every icon. Technical labels (e.g., `SENS_STAT: ACTIVE`) instead of generic text.

---

## 6. Architectural Constraints (Rules.md Integration)
- **Contrast:** AA level accessibility is mandatory. No low-contrast "vibe" text.
- **Responsiveness:** HUD elements must collapse into a clean "Mobile Command" view.
- **Performance:** No heavy 3D assets unless functional. Use CSS/SVG for effects.

---

## 6. Implementation Checklist
- [ ] Main background set to `#0A0B0E`.
- [ ] Borders use `#2D323E` with `#00F0FF` highlights.
- [ ] Typography follows the Inter/Mono pairing.
- [ ] Buttons use the "Striker Blue" neon gradient on hover.
