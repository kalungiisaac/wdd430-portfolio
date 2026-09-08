# Portfolio

A responsive Next.js App Router portfolio for W01.

## Run locally

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Reflection

**What is the purpose of `layout.tsx`?** `layout.tsx` provides shared UI and metadata for a route segment, so the navigation and page shell can persist while individual pages change. It also supplies the root HTML and body structure for the application.

**Why are Server Components used by default in the App Router?** Server Components render on the server, which keeps browser JavaScript smaller and lets pages securely access server-side resources. A component only needs to become a Client Component when it requires browser-only behavior such as state, effects, or event handlers.

## Custom component

`ProfileNote` is the custom Server Component rendered on the About page. It accepts a typed `label` prop and presents a short personal statement with Tailwind CSS styling.
