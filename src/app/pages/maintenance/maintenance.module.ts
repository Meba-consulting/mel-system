import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from 'src/app/shared';
import { MaintenanceRoutingModule } from './maintenance-routing.module';
import { maintenancePages } from './pages';
@NgModule({
  declarations: [...maintenancePages],
  imports: [CommonModule, MaintenanceRoutingModule, SharedModule],
  providers: [],
  entryComponents: [],
})
export class MaintenanceModule {}
