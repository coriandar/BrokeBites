## VSCode setup

1. Install prettier.
2. `ctrl+shift+p`, "User Settings (JSON).
3. Replace everything in `settings.json` with:

```json
{
    "workbench.colorTheme": "Default Dark Modern",
    "workbench.startupEditor": "none",
    "prettier.tabWidth": 4,
    "editor.formatOnSave": true,
    "[typescriptreact]": {
        "editor.defaultFormatter": "esbenp.prettier-vscode"
    }
}
```

---

## Getting Started

1. `Node.js v18.17.1 LTS` install first.
2. Open this repo folder in vscode.
3. Download and place .env in the root directory of project.
4. `npm i` to install dependencies
5. `npm run dev` run the development server
6. Open [http://localhost:3000](http://localhost:3000).

You can start editing the page by modifying `pages/index.tsx`. The page auto-updates as you edit the file.

[API routes](https://nextjs.org/docs/api-routes/introduction) can be accessed on [http://localhost:3000/api/hello](http://localhost:3000/api/hello). This endpoint can be edited in `pages/api/hello.ts`.

The `pages/api` directory is mapped to `/api/*`. Files in this directory are treated as [API routes](https://nextjs.org/docs/api-routes/introduction) instead of React pages.

This project uses [`next/font`](https://nextjs.org/docs/basic-features/font-optimization) to automatically optimize and load Inter, a custom Google Font.

---

## Learn More

To learn more about Next.js, take a look at the following resources:

-   [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
-   [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js/) - your feedback and contributions are welcome!

---

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/deployment) for more details.

---
