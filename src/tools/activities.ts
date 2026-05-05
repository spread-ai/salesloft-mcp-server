import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { z } from "zod";
import * as client from "../client.js";

export function register(server: McpServer): void {
  // Activities
  server.tool(
    "salesloft_list_activities",
    "List activities with optional type filter and pagination. Activity types include: call, email, sent_email, received_email, note, task, voicemail, meeting, etc.",
    {
      page: z.number().optional().describe("Page number"),
      per_page: z.number().min(1).max(100).optional().describe("Records per page"),
      sort_by: z.string().optional().describe("Field to sort by"),
      sort_direction: z.enum(["ASC", "DESC"]).optional().describe("Sort direction"),
      type: z.string().optional().describe("Filter by activity type"),
      updated_at: z.string().optional().describe("Filter by updated_at"),
    },
    async (params) => {
      const result = await client.get("/activities.json", params);
      return { content: [{ type: "text", text: JSON.stringify(result, null, 2) }] };
    }
  );

  // Calls
  server.tool(
    "salesloft_list_calls",
    "List calls with optional filters and pagination",
    {
      page: z.number().optional().describe("Page number"),
      per_page: z.number().min(1).max(100).optional().describe("Records per page"),
      sort_by: z.string().optional().describe("Field to sort by"),
      sort_direction: z.enum(["ASC", "DESC"]).optional().describe("Sort direction"),
      updated_at: z.string().optional().describe("Filter by updated_at"),
    },
    async (params) => {
      const result = await client.get("/activities/calls.json", params);
      return { content: [{ type: "text", text: JSON.stringify(result, null, 2) }] };
    }
  );

  server.tool(
    "salesloft_get_call",
    "Get a single call by ID",
    { id: z.number().describe("Call ID") },
    async ({ id }) => {
      const result = await client.get(`/activities/calls/${id}.json`);
      return { content: [{ type: "text", text: JSON.stringify(result, null, 2) }] };
    }
  );

  // Emails
  server.tool(
    "salesloft_list_emails",
    "List emails with optional filters and pagination",
    {
      page: z.number().optional().describe("Page number"),
      per_page: z.number().min(1).max(100).optional().describe("Records per page"),
      sort_by: z.string().optional().describe("Field to sort by"),
      sort_direction: z.enum(["ASC", "DESC"]).optional().describe("Sort direction"),
      updated_at: z.string().optional().describe("Filter by updated_at"),
      person_id: z.number().optional().describe("Filter by person ID"),
    },
    async (params) => {
      const result = await client.get("/activities/emails.json", params);
      return { content: [{ type: "text", text: JSON.stringify(result, null, 2) }] };
    }
  );

  server.tool(
    "salesloft_get_email",
    "Get a single email by ID",
    { id: z.number().describe("Email ID") },
    async ({ id }) => {
      const result = await client.get(`/activities/emails/${id}.json`);
      return { content: [{ type: "text", text: JSON.stringify(result, null, 2) }] };
    }
  );

  // Tasks
  server.tool(
    "salesloft_list_tasks",
    "List tasks with optional filters and pagination",
    {
      page: z.number().optional().describe("Page number"),
      per_page: z.number().min(1).max(100).optional().describe("Records per page"),
      sort_by: z.string().optional().describe("Field to sort by"),
      sort_direction: z.enum(["ASC", "DESC"]).optional().describe("Sort direction"),
      person_id: z.number().optional().describe("Filter by person ID"),
      current_user: z.boolean().optional().describe("Filter to current user's tasks"),
      completed: z.boolean().optional().describe("Filter by completion status"),
    },
    async (params) => {
      const result = await client.get("/tasks.json", params);
      return { content: [{ type: "text", text: JSON.stringify(result, null, 2) }] };
    }
  );

  server.tool(
    "salesloft_create_task",
    "Create a new task",
    {
      subject: z.string().describe("Task subject"),
      person_id: z.number().optional().describe("Associated person ID"),
      due_date: z.string().optional().describe("Due date (ISO 8601)"),
      description: z.string().optional().describe("Task description"),
      task_type: z.string().optional().describe("Task type (e.g. call, email)"),
      remind_at: z.string().optional().describe("Reminder time (ISO 8601)"),
    },
    async (params) => {
      const result = await client.post("/tasks.json", params);
      return { content: [{ type: "text", text: JSON.stringify(result, null, 2) }] };
    }
  );

  server.tool(
    "salesloft_update_task",
    "Update an existing task",
    {
      id: z.number().describe("Task ID"),
      subject: z.string().optional().describe("Task subject"),
      due_date: z.string().optional().describe("Due date (ISO 8601)"),
      description: z.string().optional().describe("Task description"),
      completed: z.boolean().optional().describe("Mark as completed"),
    },
    async ({ id, ...body }) => {
      const result = await client.put(`/tasks/${id}.json`, body);
      return { content: [{ type: "text", text: JSON.stringify(result, null, 2) }] };
    }
  );

  // Notes
  server.tool(
    "salesloft_list_notes",
    "List notes with optional filters and pagination",
    {
      page: z.number().optional().describe("Page number"),
      per_page: z.number().min(1).max(100).optional().describe("Records per page"),
      sort_by: z.string().optional().describe("Field to sort by"),
      sort_direction: z.enum(["ASC", "DESC"]).optional().describe("Sort direction"),
      associated_with_type: z.string().optional().describe("Filter by associated type (person, account)"),
      associated_with_id: z.number().optional().describe("Filter by associated ID"),
    },
    async (params) => {
      const result = await client.get("/notes.json", params);
      return { content: [{ type: "text", text: JSON.stringify(result, null, 2) }] };
    }
  );

  server.tool(
    "salesloft_create_note",
    "Create a new note associated with a person or account",
    {
      content: z.string().describe("Note content"),
      associated_with_type: z.string().describe("Type to associate with (person or account)"),
      associated_with_id: z.number().describe("ID of the person or account"),
    },
    async (params) => {
      const result = await client.post("/notes.json", params);
      return { content: [{ type: "text", text: JSON.stringify(result, null, 2) }] };
    }
  );
}
