# Business Rules - Sorting & Data Handling

## 1. Sorting Logic
- **Global Feature:** All data tables in the user interface MUST support column-based sorting.
- **Directionality:** Columns must be toggleable between Ascending and Descending order.
- **Indicators:** Visual sort indicators (arrows/icons) are required on all sortable column headers to reflect the current state (None, Asc, Desc).
- **Sorting Mechanism:**
    - For small to medium datasets, client-side sorting is preferred for responsiveness.
    - For large datasets or high-volume data, server-side sorting is mandatory to ensure performance.
- **Multi-column Sorting:** (Optional) Support for primary and secondary sorting criteria, triggered via `Shift + Click` on subsequent columns.

## 2. Data Handling & UI Safety
- **Array Safety:** UI tables must perform a check (`Array.isArray(data)`) before rendering to prevent runtime errors from `undefined` or object responses.
- **Null Safety:** All numerical fields displayed in tables must utilize null-safe formatting (e.g., `(value ?? 0).toLocaleString()`) to prevent crashes on missing data.
- **Response Handling:** Frontend services must adhere to the standard API Success/Error envelopes defined in `SSOT.md` and avoid double-unwrapping responses.

## 3. Architecture Constraints
- **Layer Boundary:** Business logic for sorting (e.g., server-side logic) must reside in `backend/app/services/`.
- **Repository Access:** Database queries and sorting logic for server-side operations must be implemented in `backend/app/repositories/`.
- **Validation:** Pydantic schemas must be updated to support sorting/filtering parameters if server-side implementation is chosen.
