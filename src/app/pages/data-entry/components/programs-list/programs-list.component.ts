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
import { ResourcesService } from 'src/app/pages/resources/services/resources.service';

@Component({
  selector: 'app-programs-list',
  templateUrl: './programs-list.component.html',
  styleUrls: ['./programs-list.component.css'],
})
export class ProgramsListComponent implements OnInit {
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @Input() programs: any;
  @Input() department: any;
  @Input() userGroups: any;
  @Input() currentUser: any;
  programConfigs$: Observable<any>;
  configurationOpened: boolean = false;
  displayedColumns: string[] = [
    'position',
    'name',
    'department',
    'type',
    'action',
  ];
  dataSource: any;
  userGroups$: Observable<any>;
  userGroupSearchingText: string = '';
  currentProgram: any;
  flowMessage: string = 'Start';
  configuredGroups: Array<any>;
  message: string = '';
  setRemove: boolean = false;
  programMetadata$: Observable<any>;
  programMetadata: any;
  sharingSettings: boolean = false;
  sharingSettingsMessage: string = '';
  canPerformMaintenance: boolean = false;
  currentLevel: number = 1;
  level: number = 1;
  deleteMessage: string = '';
  shouldDelete: boolean = false;
  constructor(
    private store: Store<State>,
    private httpClient: NgxDhis2HttpClientService,
    private resourceService: ResourcesService
  ) {
    this.userGroups$ = this.store.select(getAllUserGroups);
  }

  ngOnInit(): void {
    this.dataSource = new MatTableDataSource(
      filterProgramsForDataTable(this.programs, this.department)
    );
    this.dataSource.paginator = this.paginator;
    _.each(this.currentUser.userGroups, (userGroup) => {
      if (userGroup.name.indexOf('MAINTENANCE') > -1) {
        this.canPerformMaintenance = true;
      }
    });
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  openConfiguration(program) {
    this.store.dispatch(loadProgramDataEntryFlowConfigs({ id: program.id }));
    this.currentProgram = program;
    this.programConfigs$ = this.store.select(
      getCurrentProgramDataEntryFlowConfigs,
      { id: program.id }
    );
    this.programConfigs$.subscribe((configs) => {
      if (configs) {
        this.configuredGroups = configs.groups;
        // console.log('configuredGroups', this.configuredGroups);
        this.level = _.orderBy(
          this.configuredGroups,
          ['order'],
          ['desc']
        )[0].order;
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

  openSharingSettings(metadata) {
    this.programMetadata$ = this.httpClient.get(
      'programs/' + metadata.id + '.json'
    );
    this.programMetadata$.subscribe((response) => {
      if (response) {
        this.programMetadata = response;
      }
    });
    this.sharingSettings = true;
  }

  addGroupToConfigs(group) {
    this.flowMessage = 'Next group';
    const formattedGroup = {
      id: group.id,
      name: group.name,
      order: this.level,
    };
    this.configuredGroups = [...this.configuredGroups, formattedGroup];
  }

  removeGroup(group) {
    this.setRemove = false;
    const groups = _.filter(this.configuredGroups, (configuredGroup) => {
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
      groups: this.configuredGroups,
    };
    this.message = 'Saving configurations......';
    this.httpClient
      .put('dataStore/data-entry/' + this.currentProgram.id, data)
      .subscribe((eventResponse) => {
        setTimeout(() => {
          this.message = 'Saved successfuly!';
        }, 500);
        setTimeout(() => {
          this.message = '';
        }, 1000);
      });
  }

  cancelDeletion() {
    this.shouldDelete = false;
  }

  delete(program, shouldDelete) {
    this.currentProgram = program;
    this.shouldDelete = true;
    if (shouldDelete) {
      this.deleteMessage = 'Deleting ' + program.name;
      this.httpClient.delete('programs/' + program.id).subscribe(
        (response) => {
          if (response) {
            setTimeout(() => {
              this.deleteMessage = 'Deleted';
            }, 1000);
            setTimeout(() => {
              this.deleteMessage = '';
              this.shouldDelete = false;
            }, 2000);
          }
        },
        (error) => {
          setTimeout(() => {
            this.deleteMessage = error.message;
          }, 1000);
          setTimeout(() => {
            this.deleteMessage = '';
            this.shouldDelete = false;
          }, 2000);
        }
      );
    }
  }

  closeSharingSettings() {
    this.sharingSettings = false;
  }

  addUserGroupToSharingSettings(userGroup, resource) {
    let userGroupAccesses = [];
    let sharingSettingsData = {
      meta: {
        allowPublicAccess: true,
        allowExternalAccess: true,
      },
      object: {
        id: resource.id,
        name: resource.name,
        displayName: resource.name,
        publicAccess: 'rwrw----',
        externalAccess: false,
        userGroupAccesses: [],
      },
    };
    userGroupAccesses.push({
      id: userGroup.id,
      name: userGroup.name,
      displayName: userGroup.name,
      access: 'rwrw----',
    });
    userGroupAccesses = [...userGroupAccesses, ...resource.userGroupAccesses];
    sharingSettingsData.object.userGroupAccesses = _.uniqBy(
      userGroupAccesses,
      'id'
    );
    this.sharingSettingsMessage = 'Saving sharing settings.......!';
    this.resourceService
      .saveSharingSettingsForPrograms(sharingSettingsData)
      .subscribe(
        (sharingResponse) => {
          this.sharingSettingsMessage = 'Sharing settings saved!';
          setTimeout(() => {
            this.sharingSettingsMessage = '';
            setTimeout(() => {
              this.sharingSettings = false;
            }, 1000);
          }, 2000);
        },
        (error) => {
          setTimeout(() => {
            this.sharingSettingsMessage = error.message;
            setTimeout(() => {
              this.sharingSettings = false;
            }, 1000);
          }, 2000);
        }
      );
  }

  removeUserGroupAccess(userGroupToRemove, resource) {
    let userGroupAccesses = [];
    let sharingSettingsData = {
      meta: {
        allowPublicAccess: true,
        allowExternalAccess: true,
      },
      object: {
        id: resource.id,
        name: resource.name,
        displayName: resource.name,
        publicAccess: 'rwrw----',
        externalAccess: false,
        userGroupAccesses: [],
      },
    };
    userGroupAccesses = _.filter(resource.userGroupAccesses, (userGroup) => {
      if (userGroup.id != userGroupToRemove.id) {
        return userGroup;
      }
    });
    sharingSettingsData.object.userGroupAccesses = _.uniqBy(
      userGroupAccesses,
      'id'
    );
    this.sharingSettingsMessage =
      'Removing "' + userGroupToRemove.displayName + '"............';
    this.resourceService
      .saveSharingSettingsForPrograms(sharingSettingsData)
      .subscribe(
        (sharingResponse) => {
          this.sharingSettingsMessage = 'Changes saved!';
          setTimeout(() => {
            this.sharingSettingsMessage = '';
            // setTimeout(() => {
            //   this.sharingSettings = false;
            // }, 1000);
          }, 2000);
        },
        (error) => {
          setTimeout(() => {
            this.sharingSettingsMessage = error.message;
            // setTimeout(() => {
            //   this.sharingSettings = false;
            // }, 1000);
          }, 2000);
        }
      );
  }
}
