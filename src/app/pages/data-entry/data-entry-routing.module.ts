import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { ProgramDataEntryComponent } from './pages/containers/program-data-entry/program-data-entry.component';

const routes: Routes = [
  {
    path: '',
    component: HomeComponent
  },
  {
    path: ':category/:type/:id',
    component: ProgramDataEntryComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DataEntryRoutingModule {}
