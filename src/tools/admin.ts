import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { z } from "zod";
import * as client from "../client.js";

export function register(server: McpServer): void {
  // Custom Fields
  server.tool(
    "salesloft_list_custom_fields",
    "List custom fields configured in Salesloft",
    {
      page: z.number().optional().describe("Page number"),
      per_page: z.number().min(1).max(100).optional().describe("Records per page"),
      field_type: z.string().optional().describe("Filter by field type (person, account, opportunity)"),
    },
    async (params) => {
      const result = await client.get("/custom_fields.json", params);
      return { content: [{ type: "text", text: JSON.stringify(result, null, 2) }] };
    }
  );

  server.tool(
    "salesloft_create_custom_field",
    "Create a new custom field",
    {
      name: z.string().describe("Field name"),
      field_type: z.string().describe("Field type (person, account, opportunity)"),
    },
    async (params) => {
      const result = await client.post("/custom_fields.json", params);
      return { content: [{ type: "text", text: JSON.stringify(result, null, 2) }] };
    }
  );

  // Tags
  server.tool(
    "salesloft_list_tags",
    "List all tags",
    {
      page: z.number().optional().describe("Page number"),
      per_page: z.number().min(1).max(100).optional().describe("Records per page"),
      search: z.string().optional().describe("Search term to filter tags"),
    },
    async (params) => {
      const result = await client.get("/tags.json", params);
      return { content: [{ type: "text", text: JSON.stringify(result, null, 2) }] };
    }
  );

  // Email Templates
  server.tool(
    "salesloft_list_email_templates",
    "List email templates",
    {
      page: z.number().optional().describe("Page number"),
      per_page: z.number().min(1).max(100).optional().describe("Records per page"),
      sort_by: z.string().optional().describe("Field to sort by"),
      sort_direction: z.enum(["ASC", "DESC"]).optional().describe("Sort direction"),
      search: z.string().optional().describe("Search term to filter templates"),
    },
    async (params) => {
      const result = await client.get("/email_templates.json", params);
      return { content: [{ type: "text", text: JSON.stringify(result, null, 2) }] };
    }
  );

  server.tool(
    "salesloft_get_email_template",
    "Get a single email template by ID",
    { id: z.number().describe("Email template ID") },
    async ({ id }) => {
      const result = await client.get(`/email_templates/${id}.json`);
      return { content: [{ type: "text", text: JSON.stringify(result, null, 2) }] };
    }
  );

  // Call Dispositions
  server.tool(
    "salesloft_list_call_dispositions",
    "List call dispositions (outcome labels for calls)",
    {
      page: z.number().optional().describe("Page number"),
      per_page: z.number().min(1).max(100).optional().describe("Records per page"),
    },
    async (params) => {
      const result = await client.get("/call_dispositions.json", params);
      return { content: [{ type: "text", text: JSON.stringify(result, null, 2) }] };
    }
  );

  // Call Sentiments
  server.tool(
    "salesloft_list_call_sentiments",
    "List call sentiments",
    {
      page: z.number().optional().describe("Page number"),
      per_page: z.number().min(1).max(100).optional().describe("Records per page"),
    },
    async (params) => {
      const result = await client.get("/call_sentiments.json", params);
      return { content: [{ type: "text", text: JSON.stringify(result, null, 2) }] };
    }
  );

  // Webhook Subscriptions
  server.tool(
    "salesloft_list_webhooks",
    "List webhook subscriptions",
    {
      page: z.number().optional().describe("Page number"),
      per_page: z.number().min(1).max(100).optional().describe("Records per page"),
    },
    async (params) => {
      const result = await client.get("/webhook_subscriptions.json", params);
      return { content: [{ type: "text", text: JSON.stringify(result, null, 2) }] };
    }
  );

  // Person Stages
  server.tool(
    "salesloft_list_person_stages",
    "List person stages",
    {
      page: z.number().optional().describe("Page number"),
      per_page: z.number().min(1).max(100).optional().describe("Records per page"),
    },
    async (params) => {
      const result = await client.get("/person_stages.json", params);
      return { content: [{ type: "text", text: JSON.stringify(result, null, 2) }] };
    }
  );

  // Account Stages
  server.tool(
    "salesloft_list_account_stages",
    "List account stages",
    {
      page: z.number().optional().describe("Page number"),
      per_page: z.number().min(1).max(100).optional().describe("Records per page"),
    },
    async (params) => {
      const result = await client.get("/account_stages.json", params);
      return { content: [{ type: "text", text: JSON.stringify(result, null, 2) }] };
    }
  );

  // Account Tiers
  server.tool(
    "salesloft_list_account_tiers",
    "List account tiers",
    {
      page: z.number().optional().describe("Page number"),
      per_page: z.number().min(1).max(100).optional().describe("Records per page"),
    },
    async (params) => {
      const result = await client.get("/account_tiers.json", params);
      return { content: [{ type: "text", text: JSON.stringify(result, null, 2) }] };
    }
  );

  // Saved List Views
  server.tool(
    "salesloft_list_saved_list_views",
    "List saved list views",
    {
      page: z.number().optional().describe("Page number"),
      per_page: z.number().min(1).max(100).optional().describe("Records per page"),
    },
    async (params) => {
      const result = await client.get("/saved_list_views.json", params);
      return { content: [{ type: "text", text: JSON.stringify(result, null, 2) }] };
    }
  );

  // Successes
  server.tool(
    "salesloft_list_successes",
    "List success records (tracked successful outcomes)",
    {
      page: z.number().optional().describe("Page number"),
      per_page: z.number().min(1).max(100).optional().describe("Records per page"),
      sort_by: z.string().optional().describe("Field to sort by"),
      sort_direction: z.enum(["ASC", "DESC"]).optional().describe("Sort direction"),
    },
    async (params) => {
      const result = await client.get("/successes.json", params);
      return { content: [{ type: "text", text: JSON.stringify(result, null, 2) }] };
    }
  );

  // CRM Activities
  server.tool(
    "salesloft_list_crm_activities",
    "List CRM activities synced from/to CRM",
    {
      page: z.number().optional().describe("Page number"),
      per_page: z.number().min(1).max(100).optional().describe("Records per page"),
      sort_by: z.string().optional().describe("Field to sort by"),
      sort_direction: z.enum(["ASC", "DESC"]).optional().describe("Sort direction"),
      updated_at: z.string().optional().describe("Filter by updated_at"),
    },
    async (params) => {
      const result = await client.get("/crm_activities.json", params);
      return { content: [{ type: "text", text: JSON.stringify(result, null, 2) }] };
    }
  );

  // CRM Activity Fields
  server.tool(
    "salesloft_list_crm_activity_fields",
    "List CRM activity field mappings",
    {
      page: z.number().optional().describe("Page number"),
      per_page: z.number().min(1).max(100).optional().describe("Records per page"),
    },
    async (params) => {
      const result = await client.get("/crm_activity_fields.json", params);
      return { content: [{ type: "text", text: JSON.stringify(result, null, 2) }] };
    }
  );

  // Actions
  server.tool(
    "salesloft_list_actions",
    "List actions (due actions for the current user)",
    {
      page: z.number().optional().describe("Page number"),
      per_page: z.number().min(1).max(100).optional().describe("Records per page"),
      type: z.string().optional().describe("Filter by action type"),
    },
    async (params) => {
      const result = await client.get("/actions.json", params);
      return { content: [{ type: "text", text: JSON.stringify(result, null, 2) }] };
    }
  );

  // Caller IDs
  server.tool(
    "salesloft_list_caller_ids",
    "List available caller IDs for making calls",
    {
      page: z.number().optional().describe("Page number"),
      per_page: z.number().min(1).max(100).optional().describe("Records per page"),
    },
    async (params) => {
      const result = await client.get("/caller_ids.json", params);
      return { content: [{ type: "text", text: JSON.stringify(result, null, 2) }] };
    }
  );

  // Steps
  server.tool(
    "salesloft_list_steps",
    "List cadence steps",
    {
      page: z.number().optional().describe("Page number"),
      per_page: z.number().min(1).max(100).optional().describe("Records per page"),
      cadence_id: z.number().optional().describe("Filter by cadence ID"),
    },
    async (params) => {
      const result = await client.get("/steps.json", params);
      return { content: [{ type: "text", text: JSON.stringify(result, null, 2) }] };
    }
  );

  server.tool(
    "salesloft_get_step",
    "Get a single cadence step by ID",
    { id: z.number().describe("Step ID") },
    async ({ id }) => {
      const result = await client.get(`/steps/${id}.json`);
      return { content: [{ type: "text", text: JSON.stringify(result, null, 2) }] };
    }
  );
}
