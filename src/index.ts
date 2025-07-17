import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import { z } from "zod";

// Helper function to fetch ticket info from external API
async function fetchTicketInfo(ticketId: string): Promise<any> {
  try {
    const response = await fetch(`http://localhost:3000/api/ticket/${ticketId}`);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    return await response.json();
  } catch (error) {
    console.error("Error fetching ticket info:", error);
    return null;
  }
}

// Create MCP server
const server = new McpServer({
  name: "youtrack-ticket",
  version: "1.0.0",
});

// Register tool to get ticket info
server.tool(
  "get-ticket-info",
  "Get YouTrack ticket information by ticket ID",
  {
    ticketId: z.string().regex(/^[A-Z]+-\d+$/).describe("Ticket ID in format PROJECT-123"),
  },
  async ({ ticketId }: { ticketId: string }) => {
    const apiResult = await fetchTicketInfo(ticketId);
    if (!apiResult || apiResult.status !== "success") {
      return {
        content: [
          {
            type: "text",
            text: `Failed to retrieve ticket info for ${ticketId}`,
          },
        ],
      };
    }
    // Merge comments into the first content block for better compatibility
    let mainText = JSON.stringify(apiResult.data, null, 2);
    if (Array.isArray(apiResult.data.comments) && apiResult.data.comments.length > 0) {
      mainText +=
        "\n\nComments:\n" +
        apiResult.data.comments
          .map(
            (x: any) =>
              `\n---\nComment by ${x.author} (${x.created}):\n${x.text}`
          )
          .join("");
    }
    return {
      content: [
        {
          type: "text",
          text: mainText,
        },
      ],
    };
  },
);

// Start the server
async function main() {
  const transport = new StdioServerTransport();
  await server.connect(transport);
  console.error("YouTrack MCP Server running on stdio");
}

main().catch((error) => {
  console.error("Fatal error in main():", error);
  process.exit(1);
});
