import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { FormsComponent } from "./pages/forms/forms.component";

const routes: Routes = [
  {
    path: "",
    redirectTo: "compliance",
    pathMatch: "full"
  },
  {
    path: ":id",
    component: FormsComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class FormsRoutingModule {}
