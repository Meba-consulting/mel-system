import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { ProceduresComponent } from "./pages/procedures/procedures.component";

const routes: Routes = [
  {
    path: "",
    redirectTo: "corporate-affairs",
    pathMatch: "full"
  },
  {
    path: ":id",
    component: ProceduresComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProceduresRoutingModule {}
