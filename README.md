This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Getting Started

### Installing Dependencies

Before running the project, make sure to install the necessary dependencies:

```bash
npm install
# or
yarn install
```

### Setting Up Environment Variables

To get the Unbody project ID and API key, you need to create an account on [Unbody](https://unbody.ai) and create a new project. Create an API key from the Project Settings > Developer settings. Project ID is found in Project Settings > General > Project ID.

For local development, create a `.env.local` file in the root directory and add the following environment variables:

```
NEXT_PUBLIC_UNBODY_PROJECT_ID=your_project_id
NEXT_PUBLIC_UNBODY_API_KEY=your_api_key

```

For production environment on Netlify, you can set these variables in the Netlify dashboard.

Replace `your_project_id` and `your_api_key` with your actual Unbody project ID and API key.

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

## Features added:

1. **File Type Filters for Search**: You can send file type along with your query so that you can get the results only related to that file type.
2. **Message Editing**: Edit messages with the ability to start a new chat based on the edited message, including its chat history.
3. **Chat History Sidebar**: A sidebar displaying the history of all chats. You can select a chat to view it.
4. **Dynamic Chat Ordering**: Recently added or modified chats automatically move to the top of the list.
5. **Local Storage Persistence**: Chats are saved in the browser's local storage, allowing users to return to their conversations even after closing the browser.

## Environment Variables

For local development, create a `.env.local` file in the root directory and add the following environment variables:
