import { Component, OnInit, Input, ViewChild, ElementRef } from '@angular/core';
import { Store } from '@ngrx/store';
import { State } from 'src/app/store';
import { loadEvents } from '../../store/actions';
import { Observable } from 'rxjs';
import {
  getEvents,
  getEventsById
} from '../../store/selectors/events.selectors';
import { checkIfCurrentUserCanAddNew } from '../../helpers';
import { ResourcesService } from 'src/app/pages/resources/services/resources.service';
import { NgxDhis2HttpClientService } from '@iapps/ngx-dhis2-http-client';

import * as _ from 'lodash';

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
  fileResourceInfo: any;
  saved: boolean = false;
  message: string = '';
  fileName: string = '';
  @ViewChild('fileSelector') fileSelectorInput: ElementRef;

  constructor(
    private store: Store<State>,
    private resourceService: ResourcesService,
    private httpClient: NgxDhis2HttpClientService
  ) {}

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
    this.file = element.id;
    this.fileResourceInfo = {
      resourceName: event.target.files[0].name,
      resourceType: 'DATA_VALUE',
      attachment: true,
      file: event.target.files[0],
      url: ''
    };
    event.srcElement.value = null;
  }

  saveData() {
    if (this.fileResourceInfo) {
      this.message = 'Saving data for ' + this.fileResourceInfo.resourceName;
      const maxLevel = this.getMaxLevel(this.dataEntryFlow.groups);
      this.resourceService
        .uploadDataValueResource(this.fileResourceInfo)
        .subscribe(response => {
          const eventData = {
            eventDate: '2020-08-20',
            status: maxLevel > 1 ? 'ACTIVE' : 'COMPLETED',
            notes: [],
            completedDate: maxLevel > 1 ? '' : '2020-08-20',
            program: this.program.id,
            programStage: this.program.programStages[0].id,
            orgUnit: this.orgUnit.id,
            dataValues: [
              {
                dataElement: 'TebwJX5PGqd',
                value: response.response.fileResource.id
              },
              {
                dataElement: 'MFBuF12a58L',
                value: this.dataEntryFlow.groups[0].name
              },
              {
                dataElement: 'JGV9wKloWLo',
                value: this.dataEntryFlow.groups[0].id
              }
            ]
          };
          document.getElementById('fileSelector').innerHTML = '';
          this.httpClient
            .post('events.json', eventData)
            .subscribe(eventResponse => {
              setTimeout(() => {
                this.message = 'Data Saved !';
                this.fileResourceInfo = null;
              }, 500);
              setTimeout(() => {
                this.message = '';
              }, 1000);
            });
        });
    }
  }

  getMaxLevel(groups) {
    return _.orderBy(groups, ['order'], ['desc'])[0]['order'];
  }

  reset() {
    this.fileSelectorInput.nativeElement.value = '';
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
