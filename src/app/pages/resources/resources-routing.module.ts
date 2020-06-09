import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';
import { HomeComponent } from './pages/home/home.component';
import { UploadResourceComponent } from './containers/upload-resource/upload-resource.component';
import { ResourcesComponent } from './containers/resources/resources.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'documents',
    pathMatch: 'full'
  },
  {
    path: 'documents',
    component: HomeComponent,
    children: [
      {
        path: '',
        component: ResourcesComponent,
        pathMatch: 'full'
      },
      {
        path: ':type/:usergroupId/:resourceId',
        component: UploadResourceComponent,
        pathMatch: 'full'
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ResourcesRoutingModule {}
