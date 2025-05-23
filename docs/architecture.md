# Gene Weaver Application Architecture

## Overview

Gene Weaver is a full-stack web application designed to visually demonstrate basic Mendelian genetics to schoolchildren. It consists of a frontend built with React (TypeScript) and a backend built with Express (TypeScript).

## Application Components

### Frontend (React + TypeScript)

- Interactive UI for selecting parent genotypes.
- Visual representation of offspring genotype and phenotype probabilities.
- Communicates with backend via REST API.

### Backend (Express + TypeScript)

- REST API endpoints for genetic calculations.
- Implements Punnett Square logic.
- Stateless, no database required for MVP.

## Communication

Frontend ↔ Backend via HTTP REST API (JSON)

## Diagram

See [app-diagram.png](./diagrams/app-diagram.png) for visual representation.
