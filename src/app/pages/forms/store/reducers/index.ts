import { StoreModule } from "@ngrx/store";
import { formsReducer } from "./forms.reducer";

export const reducers: any[] = [StoreModule.forFeature("forms", formsReducer)];
