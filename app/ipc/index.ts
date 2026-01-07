import { registerProxy } from 'electron-ipc-cat/server';
import { DatabaseServiceIPCDescriptor } from '../database/database-service.interface';
import { DatabaseService } from '../database/database-service';

export function registerAllIPCHandlers() {
    registerDatabaseHandlers();
    // registerSubtitleLibHandlers(); TODO
}

function registerDatabaseHandlers() {
    const databaseService = new DatabaseService();
    registerProxy(databaseService, DatabaseServiceIPCDescriptor);
}

