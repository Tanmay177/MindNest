# MindNest ChatGPT Wrapper

A simple Next.js app that wraps OpenAI's ChatGPT API with a frontend chat UI.

## Setup

1. Install dependencies:
   ```bash
   npm install
   ```
2. Create a `.env.local` file in the root with your OpenAI API key:
   ```env
   OPENAI_API_KEY=your-openai-api-key-here
   ```
3. Run the development server:
   ```bash
   npm run dev
   ```

## Usage

- Visit `http://localhost:3000` to use the chat UI.
- Messages are sent to the `/api/chat` endpoint, which proxies requests to OpenAI's API.
# MindNest
