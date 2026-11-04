# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some Oxlint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Oxc](https://oxc.rs)
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/)

## React Compiler

The React Compiler is enabled on this template. See [this documentation](https://react.dev/learn/react-compiler) for more information.

Note: This will impact Vite dev & build performances.

## Expanding the Oxlint configuration

If you are developing a production application, we recommend using TypeScript with type-aware lint rules enabled. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) for information on how to integrate TypeScript and Oxlint's TypeScript related rules in your project.

## The contact form

Messages from the form are sent by the small mail server in `server/` (Express + Resend) to `MAIL_TO`, with the visitor's address as reply-to. Its settings live in `server/.env` (`RESEND_API_KEY`, `RESEND_FROM_EMAIL`, `MAIL_TO`, `CORS_ORIGIN`); that file is git-ignored, keep it that way.

- **While developing:** `npm run dev:all` starts the site and the mail server together. The site finds the server through `.env.development` (`http://localhost:3001/api/contact`). Add `MAIL_DRY_RUN=true` to print messages in the terminal instead of sending them.
- **On the live site:** the mail server must be hosted somewhere (for example Render, as a Node web service with root directory `server`, start command `npm start`, and the same variables as `server/.env`). Then copy `.env.production.example` to `.env.production`, set `VITE_CONTACT_API_URL` to `https://<your-server>/api/contact`, and build. Until then the form falls back to opening the visitor's email app.
