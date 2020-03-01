import { StoreModule } from "@ngrx/store";
import { procedureReducer } from "./procedures.reducer";

export const reducers: any[] = [
  StoreModule.forFeature("procedures", procedureReducer)
];
