import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Store } from '@ngrx/store';
import { State } from 'src/app/store/reducers';
import {
  LoadUserGroup,
  getLoadedUserGroupsEntities,
  getCurrentUserGroupById,
  getCurrentUser
} from 'src/app/store';
import { Observable } from 'rxjs';
import { loadResources } from '../../store/actions';
import { getResourceById } from '../../store/selectors/resources.selector';

@Component({
  selector: 'app-upload-resource',
  templateUrl: './upload-resource.component.html',
  styleUrls: ['./upload-resource.component.css']
})
export class UploadResourceComponent implements OnInit {
  userGroup$: Observable<any>;
  action: string;
  currentResource$: Observable<any>;
  currentUser$: Observable<any>;
  constructor(private route: ActivatedRoute, private store: Store<State>) {
    this.action = this.route.snapshot.params['type'];
    this.currentUser$ = this.store.select(getCurrentUser);
  }

  ngOnInit(): void {
    this.store.dispatch(
      new LoadUserGroup(this.route.snapshot.params['usergroupId'])
    );
    this.userGroup$ = this.store.select(getCurrentUserGroupById, {
      id: this.route.snapshot.params['usergroupId']
    });
    if (this.action == 'edit') {
      this.store.dispatch(loadResources({ reload: true }));
      this.currentResource$ = this.store.select(getResourceById, {
        id: this.route.snapshot.params['resourceId']
      });
    }
  }
}
