import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { UsersService } from 'src/app/core/services/user.service';
import { getCurrentUser, State } from 'src/app/store';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css'],
})
export class UsersComponent implements OnInit {
  users$: Observable<any[]>;
  currentUser$: Observable<any>;
  constructor(private userService: UsersService, private store: Store<State>) {}

  ngOnInit(): void {
    this.users$ = this.userService.loadUsers();
    this.currentUser$ = this.store.select(getCurrentUser);
  }

  onReloadUsers(e) {
    this.users$ = this.userService.loadUsers();
  }
}
