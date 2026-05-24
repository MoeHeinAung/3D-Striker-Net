# Business Logic - Navigation Redesign

## Navigation Structure
The application navigation has been restructured for improved usability and intuitive access to features.

| New Label | Mapping | Former Label |
| :--- | :--- | :--- |
| **Draws** | `/draws` | Operations |
| **Partners** | `/network` | Network |
| **Sales** | `/sale` | Sale |
| **Dashboard** | `/` (Logo) | Overview |
| **Risk** | `/risk` | Risk |
| **Report** | `/report` | Report |
| **Settings** | `/settings` | System |

## Requirements
1. **Logo Interaction**: The main logo is the primary navigation to the `Dashboard` (`/`). The CSS must be updated to enable pointer events.
2. **Naming Consistency**: All references (routes, API endpoints, file naming, and UI labels) must be updated to reflect the new labels (Draws, Partners, Settings, etc.) to maintain consistency across the entire codebase.
3. **Functionality Preservation**: The refactoring must not alter existing business logic, data flow, or API contract expectations.
4. **Architectural Integrity**: All changes must respect the established layer boundaries (Frontend -> API -> Services -> Repositories -> Models).
