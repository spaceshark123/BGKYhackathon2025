# Open Home

A simplified house search application for Bowling Green, using React, TypeScript, and Express.js

## Getting Started

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

Terminal 1 - Backend:
\`\`\`bash
npm run dev:server
\`\`\`

Terminal 2 - Frontend:
\`\`\`bash
npm run dev
\`\`\`

The Express server will run on `http://localhost:3001` and the actual web app on `http://localhost:5173`.

## Architecture

- **Frontend**: React + Typescript
- **Backend**: Node JS + Express.js
- **Data**: JSON file-based storage with server-side querying, filtering and pagination. Data sourced from RentCast API
- **Styling**: Tailwind CSS with shadcn/ui components
