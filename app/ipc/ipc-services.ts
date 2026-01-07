import { createProxy } from 'electron-ipc-cat/client';
import { AsyncifyProxy } from 'electron-ipc-cat/common';

import { DatabaseServiceIPCDescriptor, IDatabaseService } from "../database/database-service.interface";

export const database = createProxy<AsyncifyProxy<IDatabaseService>>(DatabaseServiceIPCDescriptor);

export const descriptors = {
    database: DatabaseServiceIPCDescriptor,
};
