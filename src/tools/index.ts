import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { register as registerPeople } from "./people.js";
import { register as registerAccounts } from "./accounts.js";
import { register as registerCadences } from "./cadences.js";
import { register as registerActivities } from "./activities.js";
import { register as registerOpportunities } from "./opportunities.js";
import { register as registerUsers } from "./users.js";
import { register as registerCalendar } from "./calendar.js";
import { register as registerWorkflows } from "./workflows.js";
import { register as registerAdmin } from "./admin.js";
import { register as registerConversations } from "./conversations.js";

export function registerAllTools(server: McpServer): void {
  registerPeople(server);
  registerAccounts(server);
  registerCadences(server);
  registerActivities(server);
  registerOpportunities(server);
  registerUsers(server);
  registerCalendar(server);
  registerWorkflows(server);
  registerAdmin(server);
  registerConversations(server);
}
