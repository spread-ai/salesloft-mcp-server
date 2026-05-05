#!/usr/bin/env node

import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import { registerAllTools } from "./tools/index.js";

const server = new McpServer({
  name: "salesloft",
  version: "1.0.0",
  description:
    "MCP server for Salesloft REST API v2. Provides tools to manage people, accounts, cadences, activities, opportunities, users, calendar events, meetings, email templates, bulk jobs, and more.",
});

registerAllTools(server);

const transport = new StdioServerTransport();
await server.connect(transport);
