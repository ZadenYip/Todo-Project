import { ipcMain } from 'electron';
import { runSQL } from '../database/database';

export function registerDatabaseHandlers() {
    ipcMain.handle(
        'database:runSQL', async (event, sql: string, params?: any[]) => {
            return runSQL(sql, params);
        }
    );
}
