# Business Logic — Rules and Requirements

This file documents the business logic constraints and rules extracted from the project requirements.

## 1. Core Principles
- The application logic resides in the `backend/app/services/` layer.
- Routes in `backend/app/api/` perform no business logic; they only delegate to services.
- Data access is handled exclusively in `backend/app/repositories/`.
- Validation is enforced via Pydantic schemas in `backend/app/schemas/`.

## 2. Layout and Structural Rules
- **Viewport Constraints**: The application layout must be strictly contained within the browser viewport (100vh and 100vw).
- **Overflow Management**: Body-level overflow is forbidden. All content exceeding the 100vh/100vw area must be managed through internal scrollable containers or pagination.
- **Main Layout Grid**: The main content area must use a CSS Grid system with 12 columns and 8 rows.
- **Component Integration**: Components (especially tables) must be optimized to span appropriate grid columns and rows.

## 3. Data Integrity
- UI tables must include `Array.isArray(data)` checks before rendering.
- Numeric fields must use null-safe formatting (e.g., `(val ?? 0).toLocaleString()`).
- All API interactions follow the standard `SuccessEnvelope` / `ErrorEnvelope` format defined in `SSOT.md`.

## 4. Operational Rules
- All backend paths target `app.db` at the project root using `PROJECT_ROOT` pathing.
- React forms must use `destroyOnClose` and `preserve={false}` on Modals.
- Forms must reset fields on visibility change to clear stale state.
