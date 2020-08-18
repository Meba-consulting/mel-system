import { Component, OnInit, ViewChild, Input } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { filterProgramsForDataTable } from '../../helpers';
import { Store } from '@ngrx/store';
import { State, getAllUserGroups } from 'src/app/store';
import { loadProgramDataEntryFlowConfigs } from '../../store/actions';
import { Observable } from 'rxjs';
import { getCurrentProgramDataEntryFlowConfigs } from '../../store/selectors/data-entry-flow.selectors';
import * as _ from 'lodash';
import { NgxDhis2HttpClientService } from '@iapps/ngx-dhis2-http-client';

@Component({
  selector: 'app-programs-list',
  templateUrl: './programs-list.component.html',
  styleUrls: ['./programs-list.component.css']
})
export class ProgramsListComponent implements OnInit {
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @Input() programs: any;
  @Input() department: any;
  programConfigs$: Observable<any>;
  configurationOpened: boolean = false;
  displayedColumns: string[] = [
    'position',
    'name',
    'department',
    'type',
    'action'
  ];
  dataSource: any;
  userGroups$: Observable<any>;
  userGroupSearchingText: string = '';
  currentProgram: any;
  flowMessage: string = 'Start';
  configuredGroups: Array<any>;
  message: string = '';
  setRemove: boolean = false;
  constructor(
    private store: Store<State>,
    private httpClient: NgxDhis2HttpClientService
  ) {
    this.userGroups$ = this.store.select(getAllUserGroups);
  }

  ngOnInit(): void {
    this.dataSource = new MatTableDataSource(
      filterProgramsForDataTable(this.programs, this.department)
    );
    this.dataSource.paginator = this.paginator;
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  openConfiguration(program) {
    this.store.dispatch(loadProgramDataEntryFlowConfigs({ id: program.id }));
    console.log(program);
    this.currentProgram = program;
    this.programConfigs$ = this.store.select(
      getCurrentProgramDataEntryFlowConfigs,
      { id: program.id }
    );
    this.programConfigs$.subscribe(configs => {
      if (configs) {
        this.configuredGroups = configs.groups;
      }
    });
    setTimeout(() => {
      this.setRemove = true;
    }, 1000);
    this.configurationOpened = true;
  }

  closeConfigurationArea() {
    this.configurationOpened = false;
  }

  addGroupToConfigs(group) {
    this.flowMessage = 'Next group';
    const formattedGroup = {
      id: group.id,
      name: group.name,
      order: this.configuredGroups.length
    };
    this.configuredGroups = [...this.configuredGroups, group];
    console.log(this.configuredGroups);
  }

  removeGroup(group) {
    console.log(group);
    this.setRemove = false;
    const groups = _.filter(this.configuredGroups, configuredGroup => {
      if (configuredGroup.id != group.id) {
        return configuredGroup;
      }
    });
    this.configuredGroups = groups;
    setTimeout(() => {
      this.setRemove = true;
    }, 400);
  }

  saveConfigs(configs) {
    const data = {
      id: this.currentProgram.id,
      name: this.currentProgram.name,
      groups: this.configuredGroups
    };
    this.message = 'Saving configurations......';
    this.httpClient
      .put('dataStore/data-entry/' + this.currentProgram.id, data)
      .subscribe(eventResponse => {
        setTimeout(() => {
          this.message = 'Saved successfuly!';
        }, 500);
        setTimeout(() => {
          this.message = '';
        }, 1000);
      });
  }
}
