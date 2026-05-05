import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { z } from "zod";
import * as client from "../client.js";

export function register(server: McpServer): void {
  server.tool(
    "salesloft_list_cadences",
    "List cadences with optional filters and pagination",
    {
      page: z.number().optional().describe("Page number"),
      per_page: z.number().min(1).max(100).optional().describe("Records per page"),
      sort_by: z.string().optional().describe("Field to sort by"),
      sort_direction: z.enum(["ASC", "DESC"]).optional().describe("Sort direction"),
      updated_at: z.string().optional().describe("Filter by updated_at"),
      team_cadence: z.boolean().optional().describe("Filter by team vs personal cadences"),
    },
    async (params) => {
      const result = await client.get("/cadences.json", params);
      return { content: [{ type: "text", text: JSON.stringify(result, null, 2) }] };
    }
  );

  server.tool(
    "salesloft_get_cadence",
    "Get a single cadence by ID",
    { id: z.number().describe("Cadence ID") },
    async ({ id }) => {
      const result = await client.get(`/cadences/${id}.json`);
      return { content: [{ type: "text", text: JSON.stringify(result, null, 2) }] };
    }
  );

  server.tool(
    "salesloft_list_cadence_memberships",
    "List cadence memberships (people enrolled in cadences)",
    {
      page: z.number().optional().describe("Page number"),
      per_page: z.number().min(1).max(100).optional().describe("Records per page"),
      cadence_id: z.number().optional().describe("Filter by cadence ID"),
      person_id: z.number().optional().describe("Filter by person ID"),
      sort_by: z.string().optional().describe("Field to sort by"),
      sort_direction: z.enum(["ASC", "DESC"]).optional().describe("Sort direction"),
    },
    async (params) => {
      const result = await client.get("/cadence_memberships.json", params);
      return { content: [{ type: "text", text: JSON.stringify(result, null, 2) }] };
    }
  );

  server.tool(
    "salesloft_create_cadence_membership",
    "Add a person to a cadence",
    {
      cadence_id: z.number().describe("Cadence ID"),
      person_id: z.number().describe("Person ID to add"),
    },
    async (params) => {
      const result = await client.post("/cadence_memberships.json", params);
      return { content: [{ type: "text", text: JSON.stringify(result, null, 2) }] };
    }
  );

  server.tool(
    "salesloft_delete_cadence_membership",
    "Remove a person from a cadence",
    { id: z.number().describe("Cadence membership ID") },
    async ({ id }) => {
      await client.del(`/cadence_memberships/${id}.json`);
      return {
        content: [{ type: "text", text: `Cadence membership ${id} removed.` }],
      };
    }
  );
}
