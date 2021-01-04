import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserManagementRoutingModule } from './user-management-routing.module';
import { userManagementPages } from './pages';
import { SharedModule } from 'src/app/shared';

@NgModule({
  declarations: [...userManagementPages],
  imports: [CommonModule, UserManagementRoutingModule, SharedModule],
  providers: [],
})
export class UserManagementModule {}
