# YouTrack MCP Server

A Model Context Protocol (MCP) server that integrates with YouTrack ticket system, allowing AI assistants to fetch and display ticket information.

## Features

- Implements the Model Context Protocol for AI assistant integration
- Provides a tool to fetch YouTrack ticket information
- Validates ticket IDs in the format PROJECT-123
- Returns structured ticket data for AI consumption

## Installation

```bash
# Clone the repository
git clone https://github.com/yourusername/yt-mcp.git
cd yt-mcp

# Install dependencies
npm install

# Build the project
npm run build
```

## Usage

### Starting the Server

```bash
npm run start
```

This starts the MCP server using stdio transport, which can be connected to compatible AI assistants.

### Development Mode

```bash
npm run dev
```

Starts the server with nodemon for automatic reloading during development.

### API Configuration

By default, the server attempts to connect to a YouTrack API at `http://localhost:3000/api/ticket/`. You may need to modify this URL in `src/index.ts` to match your YouTrack instance.

## Tool Documentation

### get-ticket-info

Retrieves information about a YouTrack ticket.

**Parameters:**
- `ticketId` (string): The ticket ID in the format PROJECT-123

**Returns:**
- Structured ticket information in JSON format

## Scripts

- `npm run build` — Compile TypeScript to JavaScript
- `npm run start` — Run the compiled app
- `npm run dev` — Start development server with nodemon
- `npm run lint` — Lint code with ESLint
- `npm run format` — Format code with Prettier

## Project Structure

- `src/` — Source TypeScript files
- `dist/` — Compiled JavaScript output

## Requirements

- Node.js 18+
- Access to a YouTrack instance (or mock API at http://localhost:3000)

## Dependencies

- [@modelcontextprotocol/sdk](https://github.com/model-context-protocol/mcp-js) - MCP SDK for JavaScript/TypeScript
- [zod](https://github.com/colinhacks/zod) - TypeScript-first schema validation

## License

MIT
