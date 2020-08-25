import { Component, OnInit } from '@angular/core';
import {
  LoadUserGroup,
  getCurrentUserGroupById,
  State,
  getCurrentUser
} from 'src/app/store';
import { getResourceById } from '../../store/selectors';
import { loadSSBResources } from '../../store/actions';
import { Observable } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import { Store } from '@ngrx/store';

@Component({
  selector: 'app-upload-new-report',
  templateUrl: './upload-new-report.component.html',
  styleUrls: ['./upload-new-report.component.css']
})
export class UploadNewReportComponent implements OnInit {
  userGroup$: Observable<any>;
  action: string;
  currentResource$: Observable<any>;
  currentUser$: Observable<any>;
  constructor(private route: ActivatedRoute, private store: Store<State>) {
    this.currentUser$ = this.store.select(getCurrentUser);
  }

  ngOnInit(): void {
    this.store.dispatch(
      new LoadUserGroup(this.route.snapshot.params['usergroupId'])
    );
    this.userGroup$ = this.store.select(getCurrentUserGroupById, {
      id: this.route.snapshot.params['usergroupId']
    });
    // if (this.action == 'edit') {
    //   this.store.dispatch(loadSSBResources({ reload: true }));
    //   this.currentResource$ = this.store.select(getResourceById, {
    //     id: this.route.snapshot.params['resourceId']
    //   });
    // }
  }
}
