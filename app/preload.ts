import { contextBridge } from "electron";
import * as services from "./ipc/ipc-services";

console.log('[Preload] Loading preload script...');
console.log('[Preload] services object:', services);
console.log('[Preload] services.database:', services.database);

contextBridge.exposeInMainWorld('services', services);

console.log('[Preload] Exposed services to window');