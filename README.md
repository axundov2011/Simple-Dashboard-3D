# Simple Dashboard 3D (React + TypeScript)

## Overview
This project implements the requested 2-page dashboard:

- **Designers** – list and add designers
- **Editor** – 3D canvas where objects can be added, selected, moved and edited

Since the real backend API is not accessible, the project includes a **mock API layer** implemented with Promise-based functions and localStorage persistence. The architecture allows easy replacement with a real API by modifying only the `src/api/*` layer.

---

## Live Demo

- 🌐 Live Demo: https://simple-dashboard-3d.netlify.app/
- 📦 GitHub Repository: https://github.com/axundov2011/Simple-Dashboard-3D

---

## Tech Stack

- React + TypeScript (Vite)
- React Router
- Zustand (state management)
- React Hook Form + Zod (form validation)
- three.js via @react-three/fiber + @react-three/drei
- SCSS Modules

---

## Features

### Designers Page
- View currently employed designers
- Add a new designer with validation
- Displays attached objects count (derived from editor data)
- Persisted state (refresh-safe)

### Editor Page
- Select active designer
- Double click on ground grid to add object
- Hover effect (color change)
- Object selection
- Drag to move object (with orbit controls auto-disabled during drag)
- Edit object properties (name, color, size)
- State persisted via localStorage

---

## Data & API Design

- `src/api/*` contains async mock API functions
- Simulated network delay
- localStorage persistence
- UI layer is decoupled from storage logic
- Replacing with real API requires updating only the API layer

---

## Project Structure

src/
api/
models/
pages/
store/
components/



## How to Run Locally

```bash
npm install
npm run dev

## To build for production:
npm run build
npm run preview

## Notes

3D interactions implemented using react-three-fiber

Dragging logic uses ray-plane intersection for stable movement

Focus was placed on clean architecture and requirement coverage