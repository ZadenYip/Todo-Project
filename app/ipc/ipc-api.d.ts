import { IServicesWithOnlyObservables, IServicesWithoutObservables } from "electron-ipc-cat/common";
import * as services from "./ipc-services";

declare global {
  interface Window {
    observables: IServicesWithOnlyObservables<typeof services>;
    services: IServicesWithoutObservables<typeof services>;
  }
}