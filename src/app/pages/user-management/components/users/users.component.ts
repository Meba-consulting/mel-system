import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { UsersService } from 'src/app/core/services/user.service';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css'],
})
export class UsersComponent implements OnInit {
  users$: Observable<any[]>;
  constructor(private userService: UsersService) {}

  ngOnInit(): void {
    this.users$ = this.userService.loadUsers();
  }
}
