# Youth Singing Star — Voting Frontend

A React + Tailwind CSS web application for the **Youth Singing Star** talent competition. Audience members use a ticket number printed on their entry ticket to cast a vote for their favourite contestant.

## Features

- **Voting page (`/`)** — displays all 16 contestants in a grid; voter enters their ticket number, selects a contestant, and submits their vote. Duplicate ticket numbers are rejected.
- **Results page (`/results`)** — shows all contestants ranked by vote count with 🥇🥈🥉 medals, animated progress bars, and a live total/leader summary.
- Votes are persisted in `localStorage` (no backend required for the frontend demo).

## Tech stack

- [React 19](https://react.dev) + [Vite 7](https://vite.dev)
- [Tailwind CSS v4](https://tailwindcss.com) (via `@tailwindcss/vite`)
- [React Router v7](https://reactrouter.com)

## Getting started

```bash
npm install
npm run dev
```

Open [http://localhost:5173](http://localhost:5173) in your browser.

## Build for production

```bash
npm run build
npm run preview
```
