# Ambrosia

A React + Vite website built with `@tanstack/react-start`, Tailwind CSS and Nitro server-side rendering. The project is configured for Vercel deployment using a custom `vercel.json` build and route setup.

## Deployment

### 1. Build locally

```bash
npm install
npm run build
```

### 2. Deploy to Vercel

The project already includes a `vercel.json` configuration that routes all traffic to the Nitro SSR server entry at `.output/server/index.mjs`.

From the project root, you can deploy with:

```bash
npx vercel --prod
```

or, if you already have the Vercel CLI installed:

```bash
vercel --prod
```

### 3. Vercel configuration

- `vercel.json` uses the `@vercel/node` builder.
- All routes are forwarded to `.output/server/index.mjs`.
- `package.json` includes `vercel-build` that runs the Vite build.

### Notes

- The app is configured to use Node `18.x` via `package.json` engines.
- A `.vercelignore` file is present to exclude local build artifacts and development files from deployment.

## Scripts

- `npm run dev` - start Vite development server
- `npm run build` - build production assets
- `npm run preview` - preview production build locally
- `npm run vercel-build` - Vercel build command
- `npm run lint` - run ESLint
- `npm run format` - format code with Prettier
