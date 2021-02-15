import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserManagementRoutingModule } from './user-management-routing.module';
import { userManagementPages } from './pages';
import { SharedModule } from 'src/app/shared';
import { UserComponents } from './components';

@NgModule({
  declarations: [...userManagementPages, ...UserComponents],
  imports: [CommonModule, UserManagementRoutingModule, SharedModule],
  providers: [],
})
export class UserManagementModule {}
