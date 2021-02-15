import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { UsersService } from 'src/app/core/services/user.service';

@Component({
  selector: 'app-user-roles',
  templateUrl: './user-roles.component.html',
  styleUrls: ['./user-roles.component.css'],
})
export class UserRolesComponent implements OnInit {
  userRoles$: Observable<any[]>;
  constructor(private userService: UsersService) {}

  ngOnInit(): void {
    this.userRoles$ = this.userService.loadUserRoles();
  }
}
