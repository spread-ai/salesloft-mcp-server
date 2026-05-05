import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { z } from "zod";
import * as client from "../client.js";

export function register(server: McpServer): void {
  server.tool(
    "salesloft_get_me",
    "Get the current authenticated user's profile and team info",
    {},
    async () => {
      const result = await client.get("/me.json");
      return { content: [{ type: "text", text: JSON.stringify(result, null, 2) }] };
    }
  );

  server.tool(
    "salesloft_list_users",
    "List all users in the team",
    {
      page: z.number().optional().describe("Page number"),
      per_page: z.number().min(1).max(100).optional().describe("Records per page"),
      sort_by: z.string().optional().describe("Field to sort by"),
      sort_direction: z.enum(["ASC", "DESC"]).optional().describe("Sort direction"),
    },
    async (params) => {
      const result = await client.get("/users.json", params);
      return { content: [{ type: "text", text: JSON.stringify(result, null, 2) }] };
    }
  );

  server.tool(
    "salesloft_get_user",
    "Get a single user by ID",
    { id: z.number().describe("User ID") },
    async ({ id }) => {
      const result = await client.get(`/users/${id}.json`);
      return { content: [{ type: "text", text: JSON.stringify(result, null, 2) }] };
    }
  );

  server.tool(
    "salesloft_list_groups",
    "List all groups in the team",
    {
      page: z.number().optional().describe("Page number"),
      per_page: z.number().min(1).max(100).optional().describe("Records per page"),
    },
    async (params) => {
      const result = await client.get("/groups.json", params);
      return { content: [{ type: "text", text: JSON.stringify(result, null, 2) }] };
    }
  );

  server.tool(
    "salesloft_get_team",
    "Get team information",
    {},
    async () => {
      const result = await client.get("/team.json");
      return { content: [{ type: "text", text: JSON.stringify(result, null, 2) }] };
    }
  );

  server.tool(
    "salesloft_list_custom_roles",
    "List all custom roles in the team",
    {
      page: z.number().optional().describe("Page number"),
      per_page: z.number().min(1).max(100).optional().describe("Records per page"),
    },
    async (params) => {
      const result = await client.get("/custom_roles.json", params);
      return { content: [{ type: "text", text: JSON.stringify(result, null, 2) }] };
    }
  );
}
