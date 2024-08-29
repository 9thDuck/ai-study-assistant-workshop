This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `pages/index.tsx`. The page auto-updates as you edit the file.

[API routes](https://nextjs.org/docs/api-routes/introduction) can be accessed on [http://localhost:3000/api/hello](http://localhost:3000/api/hello). This endpoint can be edited in `pages/api/hello.ts`.

The `pages/api` directory is mapped to `/api/*`. Files in this directory are treated as [API routes](https://nextjs.org/docs/api-routes/introduction) instead of React pages.

This project uses [`next/font`](https://nextjs.org/docs/basic-features/font-optimization) to automatically optimize and load Inter, a custom Google Font.

## Features added

Our Next.js application includes the following features:

1. **File Type Filters for Search**: You can send file type along with your query so that you can get the results only related to that file type.
2. **Message Editing**: Edit messages with the ability to start a new chat based on the edited message, including its chat history.
3. **Chat History Sidebar**: A sidebar displaying the history of all chats. You can select a chat to view it.
4. **Dynamic Chat Ordering**: Recently added or modified chats automatically move to the top of the list.
5. **Local Storage Persistence**: Chats are saved in the browser's local storage, allowing users to return to their conversations even after closing the browser.
