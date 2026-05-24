# Business Logic Documentation

## Overview
This document outlines the business rules and domain model requirements for the ticket system.

## Ticket System Rules

### Winning Tickets
1. **Primary Identifier**: Winning tickets are categorized by their `type`, which must be either `JACKPOT` or `MINOR`.
2. **Amount**: The `amount` field is restricted to reporting and query purposes. It must not be used as a primary identifier for ticket types.

### Blacklist Tickets
1. **Structure**: Blacklist tickets must include a `draw_id` and a `type` for identification.
2. **Schema Restrictions**: The `reason` field is deprecated and must be removed from the schema.
3. **Consistency**: `draw_id` must be present in both the SQLAlchemy ORM model and the Pydantic schema.

## API Routing Requirements
1. **Consistency**: All subresource endpoints must follow the standard RESTful pattern: `/resource/{id}/subresource/`.
2. **Standardization**: Non-standard endpoints like `/tickets/winning` and `/tickets/blacklisted` must be migrated to follow the consistent resource-based routing structure.
