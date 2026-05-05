import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { z } from "zod";
import * as client from "../client.js";

const PaginationParams = {
  page: z.number().optional().describe("Page number (starts at 1)"),
  per_page: z
    .number()
    .min(1)
    .max(100)
    .optional()
    .describe("Records per page (1-100, default 25)"),
};

export function register(server: McpServer): void {
  server.tool(
    "salesloft_list_people",
    "List people in Salesloft with optional filters and pagination",
    {
      ...PaginationParams,
      email_addresses: z
        .string()
        .optional()
        .describe("Filter by email address"),
      sort_by: z
        .string()
        .optional()
        .describe("Field to sort by (e.g. created_at, updated_at)"),
      sort_direction: z
        .enum(["ASC", "DESC"])
        .optional()
        .describe("Sort direction"),
      updated_at: z
        .string()
        .optional()
        .describe("Filter by updated_at (ISO 8601 for cursor-based polling)"),
    },
    async (params) => {
      const result = await client.get("/people.json", params);
      return { content: [{ type: "text", text: JSON.stringify(result, null, 2) }] };
    }
  );

  server.tool(
    "salesloft_get_person",
    "Get a single person by ID",
    { id: z.number().describe("Person ID") },
    async ({ id }) => {
      const result = await client.get(`/people/${id}.json`);
      return { content: [{ type: "text", text: JSON.stringify(result, null, 2) }] };
    }
  );

  server.tool(
    "salesloft_create_person",
    "Create a new person in Salesloft",
    {
      email_address: z.string().describe("Primary email address"),
      first_name: z.string().optional().describe("First name"),
      last_name: z.string().optional().describe("Last name"),
      phone: z.string().optional().describe("Phone number"),
      title: z.string().optional().describe("Job title"),
      city: z.string().optional().describe("City"),
      state: z.string().optional().describe("State"),
      country: z.string().optional().describe("Country"),
      account_id: z.number().optional().describe("Associated account ID"),
      owner_id: z.number().optional().describe("Owner user ID"),
      custom_fields: z
        .record(z.string(), z.string())
        .optional()
        .describe("Custom fields as key-value pairs"),
    },
    async (params) => {
      const result = await client.post("/people.json", params);
      return { content: [{ type: "text", text: JSON.stringify(result, null, 2) }] };
    }
  );

  server.tool(
    "salesloft_update_person",
    "Update an existing person",
    {
      id: z.number().describe("Person ID"),
      email_address: z.string().optional().describe("Primary email address"),
      first_name: z.string().optional().describe("First name"),
      last_name: z.string().optional().describe("Last name"),
      phone: z.string().optional().describe("Phone number"),
      title: z.string().optional().describe("Job title"),
      city: z.string().optional().describe("City"),
      state: z.string().optional().describe("State"),
      country: z.string().optional().describe("Country"),
      account_id: z.number().optional().describe("Associated account ID"),
      owner_id: z.number().optional().describe("Owner user ID"),
      custom_fields: z
        .record(z.string(), z.string())
        .optional()
        .describe("Custom fields as key-value pairs"),
    },
    async ({ id, ...body }) => {
      const result = await client.put(`/people/${id}.json`, body);
      return { content: [{ type: "text", text: JSON.stringify(result, null, 2) }] };
    }
  );

  server.tool(
    "salesloft_delete_person",
    "Delete a person by ID",
    { id: z.number().describe("Person ID") },
    async ({ id }) => {
      await client.del(`/people/${id}.json`);
      return { content: [{ type: "text", text: `Person ${id} deleted successfully.` }] };
    }
  );

  server.tool(
    "salesloft_upsert_person",
    "Create or update a person by matching on a unique field (e.g. email). Uses the person upsert endpoint.",
    {
      email_address: z.string().describe("Email address to match on"),
      first_name: z.string().optional().describe("First name"),
      last_name: z.string().optional().describe("Last name"),
      phone: z.string().optional().describe("Phone number"),
      title: z.string().optional().describe("Job title"),
      city: z.string().optional().describe("City"),
      state: z.string().optional().describe("State"),
      country: z.string().optional().describe("Country"),
      account_id: z.number().optional().describe("Associated account ID"),
      owner_id: z.number().optional().describe("Owner user ID"),
      custom_fields: z
        .record(z.string(), z.string())
        .optional()
        .describe("Custom fields as key-value pairs"),
    },
    async (params) => {
      const result = await client.post("/person_upserts.json", params);
      return { content: [{ type: "text", text: JSON.stringify(result, null, 2) }] };
    }
  );
}
