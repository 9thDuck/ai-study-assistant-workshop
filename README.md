This project leverages Unbody AI and Next.js to create a robust study AI assistant, offering advanced chat and search functionalities based on the ability to provide it your data as context.

## Features added:

1. **File Type Filters for Search**: Enhance search precision by filtering results according to specific file types.
2. **Message Editing**: Edit existing messages and initiate new conversations based on edited content, preserving chat history up to the point of the edit.
3. **Chat History Sidebar**: Navigate through past conversations via an intuitive sidebar interface.
4. **Dynamic Chat Ordering**: Automatically elevate recent or modified chats to the top of the list for easy access.
5. **Local Storage Persistence**: Maintain chat data using browser's localStorage API, ensuring continuity across sessions.

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

Replace `your_project_id` and `your_api_key` with your actual Unbody project ID and API key.

For production environment on Netlify, you can set these variables in the Netlify dashboard. Check Netlify docs for more info

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
