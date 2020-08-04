import { Component, OnInit, Input } from '@angular/core';
import { Store } from '@ngrx/store';
import { State } from 'src/app/store';
import { loadEvents } from '../../store/actions';
import { Observable } from 'rxjs';
import {
  getEvents,
  getEventsById
} from '../../store/selectors/events.selectors';
import { checkIfCurrentUserCanAddNew } from '../../helpers';

@Component({
  selector: 'app-program-uploading',
  templateUrl: './program-uploading.component.html',
  styleUrls: ['./program-uploading.component.css']
})
export class ProgramUploadingComponent implements OnInit {
  @Input() program: any;
  @Input() dataEntryFlow: any;
  file: any;
  requiredField: boolean = false;
  @Input() orgUnit: any;
  @Input() currentUser: any;
  events$: Observable<any>;
  key: string;
  showFileUpload: boolean = false;
  canAddNew: boolean = false;
  constructor(private store: Store<State>) {}

  ngOnInit(): void {
    this.canAddNew = checkIfCurrentUserCanAddNew(
      this.dataEntryFlow,
      this.currentUser
    );
    this.key = this.orgUnit.id + '-' + this.program.programStages[0]['id'];
    this.loadEvents(this.orgUnit);
    this.events$ = this.store.select(getEventsById, {
      id: this.orgUnit.id + '-' + this.program.programStages[0]['id']
    });
  }

  fileSelection(event) {
    const element: HTMLElement = document.getElementById('fileSelector');
    this.file = event.target.files[0];
  }

  loadEvents(orgUnit) {
    // events/files?dataElementUid=iddd&eventUid=event
    this.store.dispatch(
      loadEvents({
        dataDimenions: [
          { stage: this.program.programStages[0]['id'], ou: orgUnit.id }
        ]
      })
    );
  }

  showUpload(shouldShow) {
    this.showFileUpload = shouldShow;
  }
}
