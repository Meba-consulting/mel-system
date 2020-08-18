import { Component, OnInit, ViewChild, Input } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { formatFileResourcesForDataTable } from '../../helpers';
import { NgxDhis2HttpClientService } from '@iapps/ngx-dhis2-http-client';
import { HttpClient } from '@angular/common/http';
import { ResourcesService } from 'src/app/pages/resources/services/resources.service';

import * as _ from 'lodash';

@Component({
  selector: 'app-file-resources-list',
  templateUrl: './file-resources-list.component.html',
  styleUrls: ['./file-resources-list.component.css']
})
export class FileResourcesListComponent implements OnInit {
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @Input() fileResources: any;
  @Input() dataEntryFlow: any;
  @Input() status: string;
  @Input() currentUser: any;
  displayedColumns: string[] = [
    'created',
    'name',
    'status',
    'currentGroupActed',
    'action'
  ];
  dataSource: any;
  openedEventArea: boolean = false;
  fileResourceInfo: any;
  message: string = '';
  selectedEventData: any;
  eventToUpdate: any;
  constructor(
    private httpClient: NgxDhis2HttpClientService,
    private http: HttpClient,
    private resourceService: ResourcesService
  ) {}

  ngOnInit(): void {
    console.log('dataEntryFlow', this.dataEntryFlow);
    this.dataSource = new MatTableDataSource(
      formatFileResourcesForDataTable(
        this.fileResources,
        this.status,
        this.dataEntryFlow,
        this.currentUser
      )
    );
    this.dataSource.paginator = this.paginator;
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  downloadFile(element) {
    window.open(
      '../../../api/events/files?dataElementUid=' +
        element.dataElementUid +
        '&eventUid=' +
        element.eventUid
    );
  }

  openActOnThisEvent(data) {
    this.openedEventArea = true;
    this.selectedEventData = data;
    this.httpClient.get('events/' + data.eventUid).subscribe(eventResponse => {
      this.eventToUpdate = eventResponse;
    });
  }

  close() {
    this.openedEventArea = false;
  }

  fileSelection(event) {
    const element: HTMLElement = document.getElementById('fileSelector');
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
      this.message =
        'Saving updated data for ' + this.fileResourceInfo.resourceName;
      this.resourceService
        .uploadDataValueResource(this.fileResourceInfo)
        .subscribe(response => {
          const groupToAct = this.getNextGroup(
            this.dataEntryFlow.groups,
            this.eventToUpdate
          );
          const maxOrder = this.getMaxOrder(this.dataEntryFlow.groups);
          const eventData = {
            event: this.eventToUpdate.event,
            eventDate: this.eventToUpdate.created.substring(0, 10),
            status: groupToAct[0].order != maxOrder ? 'ACTIVE' : 'COMPLETED',
            notes: [],
            completedDate:
              groupToAct[0].order != maxOrder
                ? ''
                : this.eventToUpdate.created.substring(0, 10),
            program: this.eventToUpdate.program,
            programStage: this.eventToUpdate.programStage,
            orgUnit: this.eventToUpdate.orgUnit,
            dataValues: [
              {
                dataElement: 'TebwJX5PGqd',
                value: response.response.fileResource.id
              },
              {
                dataElement: 'MFBuF12a58L',
                value: groupToAct[0].name
              },
              {
                dataElement: 'JGV9wKloWLo',
                value: groupToAct[0].id
              }
            ]
          };
          document.getElementById('fileSelector').innerHTML = '';
          this.httpClient
            .put('events/' + this.eventToUpdate.event + '.json', eventData)
            .subscribe(eventResponse => {
              setTimeout(() => {
                this.message = 'Data Updated !';
                this.fileResourceInfo = null;
              }, 500);
              setTimeout(() => {
                this.message = '';
              }, 1000);
            });
        });
    }
  }

  getNextGroup(groups, event) {
    const currentGroupId = _.filter(event['dataValues'], {
      dataElement: 'JGV9wKloWLo'
    })[0].value;
    const maxOrder = this.getMaxOrder(groups);
    let currOrder = _.filter(groups, { id: currentGroupId })[0].order;
    if (currOrder + 1 <= maxOrder) {
      return _.filter(groups, { order: currOrder + 1 });
    } else {
      return [];
    }
  }

  getMaxOrder(groups) {
    return groups.length;
  }
}
