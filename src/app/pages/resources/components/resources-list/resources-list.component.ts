import {
  Component,
  OnInit,
  Input,
  ViewChild,
  AfterViewInit
} from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import * as _ from 'lodash';
import { MatTableDataSource } from '@angular/material/table';
import { formatResourcesForDataTable } from '../../helpers/format-resources-for-datatable.helper';
import { ResourcesService } from '../../services/resources.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-resources-list',
  templateUrl: './resources-list.component.html',
  styleUrls: ['./resources-list.component.css']
})
export class ResourcesListComponent implements OnInit {
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @Input() resources: Array<any>;
  @Input() currentUser: any;
  @Input() userGroup: any;
  @Input() userGroups: any[];
  displayedColumns: string[] = ['position', 'name', 'type', 'action'];
  dataSource: any;
  showConfirmDeletion: boolean = false;
  confirmDeletion: boolean = false;
  resourceIdToDelete: string;
  sharingSettings: boolean = false;
  currentResource: any;
  userGroupSearchingText: string = '';
  sharingSettingsMessage: string = '';
  canAddResource: boolean = false;

  constructor(
    private resourceService: ResourcesService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.dataSource = new MatTableDataSource(
      formatResourcesForDataTable(this.resources, this.currentUser)
    );
    this.dataSource.paginator = this.paginator;
    _.each(this.currentUser.userGroups, userGroup => {
      if (userGroup.name.indexOf('_MAINTENANCE') > -1) {
        this.canAddResource = true;
      }
    });
  }

  redirectTo(uri: string) {
    this.router
      .navigateByUrl('/', { skipLocationChange: true })
      .then(() => this.router.navigate([uri]));
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  openResource(url) {
    window.open(url, '_blank');
  }

  cancelDeletion() {
    this.confirmDeletion = false;
  }

  deleteResource(id, confirmDelete) {
    this.confirmDeletion = true;
    this.resourceIdToDelete = id;
    if (confirmDelete) {
      this.resourceService.deleteResource(id).subscribe(response => {
        console.log(response);
        this.router.navigateByUrl('/', { skipLocationChange: true }).then(() =>
          this.router.navigate(['resources/documents'], {
            queryParams: { status: 'delete' }
          })
        );
        // this.redirectTo('resources/documents');
      });
    }
  }

  openResourceSharingSettings(resource) {
    this.sharingSettings = true;
    this.currentResource = resource;
  }
  addUserGroupToSharingSettings(userGroup, resource) {
    let userGroupAccesses = [];
    let sharingSettingsData = {
      meta: {
        allowPublicAccess: true,
        allowExternalAccess: true
      },
      object: {
        id: resource.id,
        name: resource.name,
        displayName: resource.name,
        publicAccess: 'r-------',
        externalAccess: false,
        userGroupAccesses: []
      }
    };
    userGroupAccesses.push({
      id: userGroup.id,
      name: userGroup.name,
      displayName: userGroup.name,
      access: 'r-------'
    });
    userGroupAccesses = [...userGroupAccesses, ...resource.userGroupAccesses];
    sharingSettingsData.object.userGroupAccesses = _.uniqBy(
      userGroupAccesses,
      'id'
    );
    this.sharingSettingsMessage = 'Saving sharing settings.......!';
    this.resourceService
      .saveSharingSettingsForDocuments(sharingSettingsData)
      .subscribe(
        sharingResponse => {
          this.sharingSettingsMessage = 'Sharing settings saved!';
          setTimeout(() => {
            this.sharingSettingsMessage = '';
            setTimeout(() => {
              this.sharingSettings = false;
            }, 1000);
          }, 2000);
        },
        error => {
          console.log(error);
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
        allowExternalAccess: true
      },
      object: {
        id: resource.id,
        name: resource.name,
        displayName: resource.name,
        publicAccess: 'r-------',
        externalAccess: false,
        userGroupAccesses: []
      }
    };
    userGroupAccesses = _.filter(resource.userGroupAccesses, userGroup => {
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
      .saveSharingSettingsForDocuments(sharingSettingsData)
      .subscribe(
        sharingResponse => {
          this.sharingSettingsMessage = 'Changes saved!';
          setTimeout(() => {
            this.sharingSettingsMessage = '';
            // setTimeout(() => {
            //   this.sharingSettings = false;
            // }, 1000);
          }, 2000);
        },
        error => {
          console.log(error);
          setTimeout(() => {
            this.sharingSettingsMessage = error.message;
            // setTimeout(() => {
            //   this.sharingSettings = false;
            // }, 1000);
          }, 2000);
        }
      );
  }

  closeSharingSettings() {
    this.sharingSettings = false;
  }
}
