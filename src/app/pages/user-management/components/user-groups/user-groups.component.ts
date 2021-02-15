import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { UserGroupsService } from 'src/app/core';

@Component({
  selector: 'app-user-groups',
  templateUrl: './user-groups.component.html',
  styleUrls: ['./user-groups.component.css'],
})
export class UserGroupsComponent implements OnInit {
  userGroups$: Observable<any[]>;
  constructor(private userGroupService: UserGroupsService) {}

  ngOnInit(): void {
    this.userGroups$ = this.userGroupService.loadUserGroups();
  }
}
