import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { z } from "zod";
import * as client from "../client.js";

export function register(server: McpServer): void {
  server.tool(
    "salesloft_list_accounts",
    "List accounts in Salesloft with optional filters and pagination",
    {
      page: z.number().optional().describe("Page number (starts at 1)"),
      per_page: z.number().min(1).max(100).optional().describe("Records per page (1-100)"),
      domain: z.string().optional().describe("Filter by domain"),
      sort_by: z.string().optional().describe("Field to sort by"),
      sort_direction: z.enum(["ASC", "DESC"]).optional().describe("Sort direction"),
      updated_at: z.string().optional().describe("Filter by updated_at (ISO 8601)"),
    },
    async (params) => {
      const result = await client.get("/accounts.json", params);
      return { content: [{ type: "text", text: JSON.stringify(result, null, 2) }] };
    }
  );

  server.tool(
    "salesloft_get_account",
    "Get a single account by ID",
    { id: z.number().describe("Account ID") },
    async ({ id }) => {
      const result = await client.get(`/accounts/${id}.json`);
      return { content: [{ type: "text", text: JSON.stringify(result, null, 2) }] };
    }
  );

  server.tool(
    "salesloft_create_account",
    "Create a new account",
    {
      name: z.string().describe("Account name"),
      domain: z.string().optional().describe("Account domain"),
      description: z.string().optional().describe("Description"),
      phone: z.string().optional().describe("Phone number"),
      website: z.string().optional().describe("Website URL"),
      linkedin_url: z.string().optional().describe("LinkedIn URL"),
      twitter_handle: z.string().optional().describe("Twitter handle"),
      street: z.string().optional().describe("Street address"),
      city: z.string().optional().describe("City"),
      state: z.string().optional().describe("State"),
      postal_code: z.string().optional().describe("Postal code"),
      country: z.string().optional().describe("Country"),
      industry: z.string().optional().describe("Industry"),
      company_type: z.string().optional().describe("Company type"),
      founded: z.string().optional().describe("Year founded"),
      revenue_range: z.string().optional().describe("Revenue range"),
      size: z.string().optional().describe("Company size"),
      owner_id: z.number().optional().describe("Owner user ID"),
      custom_fields: z.record(z.string(), z.string()).optional().describe("Custom fields"),
    },
    async (params) => {
      const result = await client.post("/accounts.json", params);
      return { content: [{ type: "text", text: JSON.stringify(result, null, 2) }] };
    }
  );

  server.tool(
    "salesloft_update_account",
    "Update an existing account",
    {
      id: z.number().describe("Account ID"),
      name: z.string().optional().describe("Account name"),
      domain: z.string().optional().describe("Account domain"),
      description: z.string().optional().describe("Description"),
      phone: z.string().optional().describe("Phone number"),
      website: z.string().optional().describe("Website URL"),
      linkedin_url: z.string().optional().describe("LinkedIn URL"),
      twitter_handle: z.string().optional().describe("Twitter handle"),
      street: z.string().optional().describe("Street address"),
      city: z.string().optional().describe("City"),
      state: z.string().optional().describe("State"),
      postal_code: z.string().optional().describe("Postal code"),
      country: z.string().optional().describe("Country"),
      industry: z.string().optional().describe("Industry"),
      owner_id: z.number().optional().describe("Owner user ID"),
      custom_fields: z.record(z.string(), z.string()).optional().describe("Custom fields"),
    },
    async ({ id, ...body }) => {
      const result = await client.put(`/accounts/${id}.json`, body);
      return { content: [{ type: "text", text: JSON.stringify(result, null, 2) }] };
    }
  );

  server.tool(
    "salesloft_delete_account",
    "Delete an account by ID",
    { id: z.number().describe("Account ID") },
    async ({ id }) => {
      await client.del(`/accounts/${id}.json`);
      return { content: [{ type: "text", text: `Account ${id} deleted successfully.` }] };
    }
  );

  server.tool(
    "salesloft_upsert_account",
    "Create or update an account by matching on domain or other unique field",
    {
      name: z.string().describe("Account name"),
      domain: z.string().optional().describe("Account domain (used for matching)"),
      description: z.string().optional().describe("Description"),
      phone: z.string().optional().describe("Phone number"),
      website: z.string().optional().describe("Website URL"),
      industry: z.string().optional().describe("Industry"),
      owner_id: z.number().optional().describe("Owner user ID"),
      custom_fields: z.record(z.string(), z.string()).optional().describe("Custom fields"),
    },
    async (params) => {
      const result = await client.post("/account_upserts.json", params);
      return { content: [{ type: "text", text: JSON.stringify(result, null, 2) }] };
    }
  );
}
