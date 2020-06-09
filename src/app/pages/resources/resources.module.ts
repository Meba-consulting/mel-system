import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './pages/home/home.component';
import { ResourcesRoutingModule } from './resources-routing.module';
import { ResourcesListComponent } from './components/resources-list/resources-list.component';
import { reducers } from './store/reducers';
import { EffectsModule } from '@ngrx/effects';
import { effects } from './store/effects';
import { SharedModule } from 'src/app/shared/shared.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FilterByInputTextPipe } from './pipes';
import { ProceduresComponent } from './containers/procedures/procedures.component';
import { FormsComponent } from './containers/forms/forms.component';
import { UploadResourceComponent } from './containers/upload-resource/upload-resource.component';
import { ResourcesComponent } from './containers/resources/resources.component';
import { ResourceFormComponent } from './components/resource-form/resource-form.component';
import { EditResourceComponent } from './components/edit-resource/edit-resource.component';

@NgModule({
  declarations: [
    HomeComponent,
    ResourcesListComponent,
    FilterByInputTextPipe,
    ProceduresComponent,
    FormsComponent,
    UploadResourceComponent,
    ResourcesComponent,
    ResourceFormComponent,
    EditResourceComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    ResourcesRoutingModule,
    SharedModule,
    ...reducers,
    EffectsModule.forFeature(effects)
  ]
})
export class ResourcesModule {}
