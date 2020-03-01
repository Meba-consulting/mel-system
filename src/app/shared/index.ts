import { SharedModule } from "./shared.module";
import { modules } from "./modules";

export const sharedModules: any[] = [SharedModule, ...modules];
export * from "./shared.module";
export * from "./modules";
