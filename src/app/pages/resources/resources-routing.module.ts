import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';
import { HomeComponent } from './pages/home/home.component';
import { FormsComponent } from './containers/forms/forms.component';
import { ProceduresComponent } from './containers/procedures/procedures.component';

const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
    children: [
      {
        path: 'forms',
        component: FormsComponent
      },
      {
        path: 'procedures',
        component: ProceduresComponent
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ResourcesRoutingModule {}
