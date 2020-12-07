import { Component, OnInit, Input } from '@angular/core';
import { getFileResourcesDimensions } from '../../helpers';
import { Store } from '@ngrx/store';
import { State } from 'src/app/store';
import { loadFileResources } from '../../store/actions';
import { Observable } from 'rxjs';
import { getFilesByKey } from '../../store/selectors/events.selectors';

@Component({
  selector: 'app-file-resources',
  templateUrl: './file-resources.component.html',
  styleUrls: ['./file-resources.component.css']
})
export class FileResourcesComponent implements OnInit {
  @Input() events: any[];
  @Input() key: string;
  @Input() dataEntryFlow: any;
  @Input() currentUser: any;
  resourcesDimensions: string[];
  fileResources$: Observable<any>;
  status: string = 'ACTIVE';
  statusSet: boolean = false;
  currentUserGroupForAction: any;
  constructor(private store: Store<State>) {}

  ngOnInit(): void {
    setTimeout(() => {
      this.statusSet = true;
    }, 20);
    this.resourcesDimensions = getFileResourcesDimensions(
      this.events['data']['rows'],
      this.events['data']['headers']
    );
    this.store.dispatch(
      loadFileResources({ dimensions: this.resourcesDimensions, key: this.key })
    );
    this.fileResources$ = this.store.select(getFilesByKey, { id: this.key });
  }

  setStatus(status) {
    this.status = status;
    this.statusSet = false;
    setTimeout(() => {
      this.statusSet = true;
    }, 20);
  }
}
