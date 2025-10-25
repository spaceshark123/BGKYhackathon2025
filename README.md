# House Search App

A modern house search application with React, TypeScript, Next.js frontend and Express.js backend.

## Getting Started

### Prerequisites
- Node.js 18+ installed

### Installation

1. Install dependencies:
\`\`\`bash
npm install
\`\`\`

### Running the Application

You have two options:

**Option 1: Run both servers together (recommended)**
\`\`\`bash
npm run dev:all
\`\`\`

**Option 2: Run servers separately**

Terminal 1 - Express Backend:
\`\`\`bash
npm run dev:server
\`\`\`

Terminal 2 - Next.js Frontend:
\`\`\`bash
npm run dev
\`\`\`

The Express server will run on `http://localhost:3001` and the Next.js app on `http://localhost:3000`.

## Architecture

- **Frontend**: Next.js 16 with React 19 and TypeScript
- **Backend**: Express.js REST API
- **Data**: JSON file-based storage with server-side filtering and pagination
- **Styling**: Tailwind CSS with shadcn/ui components

## API Endpoints

- `GET /api/properties` - Fetch filtered and paginated properties
  - Query params: `minPrice`, `maxPrice`, `minSquareFeet`, `maxSquareFeet`, `bedrooms`, `bathrooms`, `location`, `page`
