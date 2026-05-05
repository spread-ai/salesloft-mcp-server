import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";

export interface SalesloftPagingMetadata {
  per_page: number;
  current_page: number;
  next_page: number | null;
  prev_page: number | null;
  total_pages: number;
  total_count: number;
}

export interface SalesloftListResponse<T = Record<string, unknown>> {
  data: T[];
  metadata: {
    paging: SalesloftPagingMetadata;
    filtering: Record<string, unknown>;
    sorting: Record<string, unknown>;
  };
}

export interface SalesloftSingleResponse<T = Record<string, unknown>> {
  data: T;
}

export interface SalesloftErrorResponse {
  error?: string;
  errors?: Record<string, string[]>;
}

export type ToolRegistrar = (server: McpServer) => void;
