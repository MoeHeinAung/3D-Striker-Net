# Business Logic — 3D-Striker-Net

This document outlines the core business rules for the 3D-Striker-Net application.

## 1. Sales Rules
- Sales are processed in batches via `/sales/batch` (POST).
- Each sale record includes `draw_id`, `agent_id`, `ticket`, `amount`, and optional `note`.
- Sales must be associated with an active draw and an agent.

## 2. Risk Management
- Risk data is summarized by `adminMaxHold`.
- Risk summary is only enabled if `adminMaxHold` is greater than 0.

## 3. Draw Management
- Draws are the primary organizational entity for sales and batches.
- Lifecycle management (Create, Update, Delete) is provided for individual draw records.

## 4. Batch Processing
- Batches group multiple sales together for a single draw.
- A batch includes `draw_id`, `agent_id`, `total_amount`, optional `note`, and a collection of individual sales.
