import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { z } from "zod";
import * as client from "../client.js";

export function register(server: McpServer): void {
  server.tool(
    "salesloft_list_opportunities",
    "List opportunities with optional filters and pagination",
    {
      page: z.number().optional().describe("Page number"),
      per_page: z.number().min(1).max(100).optional().describe("Records per page"),
      sort_by: z.string().optional().describe("Field to sort by"),
      sort_direction: z.enum(["ASC", "DESC"]).optional().describe("Sort direction"),
    },
    async (params) => {
      const result = await client.get("/opportunities.json", params);
      return { content: [{ type: "text", text: JSON.stringify(result, null, 2) }] };
    }
  );

  server.tool(
    "salesloft_get_opportunity",
    "Get a single opportunity by ID",
    { id: z.number().describe("Opportunity ID") },
    async ({ id }) => {
      const result = await client.get(`/opportunities/${id}.json`);
      return { content: [{ type: "text", text: JSON.stringify(result, null, 2) }] };
    }
  );

  server.tool(
    "salesloft_list_opportunity_stages",
    "List all opportunity stages",
    {
      page: z.number().optional().describe("Page number"),
      per_page: z.number().min(1).max(100).optional().describe("Records per page"),
    },
    async (params) => {
      const result = await client.get("/opportunity_stages.json", params);
      return { content: [{ type: "text", text: JSON.stringify(result, null, 2) }] };
    }
  );
}
