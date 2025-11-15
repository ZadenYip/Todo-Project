import { registerDatabaseHandlers } from "./database.handler";

export function registerAllIPCHandlers() {
    registerDatabaseHandlers();
}