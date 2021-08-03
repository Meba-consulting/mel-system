import { Component, OnInit, Input } from '@angular/core';
import { loadSSBResources } from '../../store/actions';
import { Validators, FormBuilder, FormGroup } from '@angular/forms';
import { ResourcesService } from 'src/app/pages/resources/services/resources.service';
import { Store } from '@ngrx/store';
import { State } from 'src/app/store';
import { Router } from '@angular/router';

@Component({
  selector: 'app-report-form',
  templateUrl: './report-form.component.html',
  styleUrls: ['./report-form.component.css'],
})
export class ReportFormComponent implements OnInit {
  formResource: FormGroup;
  nameIsEmpty: boolean = false;
  name: string;
  file: any;
  url: string;
  resourceType: any;
  requiredField: boolean = false;

  @Input() resourceGroup: any;
  @Input() action: string;
  @Input() resource: any;
  @Input() currentUser: any;
  constructor(
    private _formBuilder: FormBuilder,
    private resourceService: ResourcesService,
    private store: Store<State>,
    private router: Router
  ) {}

  ngOnInit(): void {
    if (this.action == 'edit') {
      this.name = this.resource.name;
      this.resourceType = this.resource.external ? 'link' : 'document';
    }
    this.formResource = this._formBuilder.group({
      name: ['', Validators.required],
      isFile: ['', Validators.required],
      file: ['', Validators.required],
    });
  }

  onChangeResourceType(type) {
    if (type == 'link') {
      this.file = '';
    } else {
      this.url = '';
    }
  }

  fileSelection(event) {
    const element: HTMLElement = document.getElementById('fileSelector');
    this.file = element.id;
    // console.log(this.file);
    // console.log(event.target.files[0]);
    if (element) {
      this.requiredField = false;
    } else {
      this.requiredField = true;
    }
    const reader = new FileReader();
    if (!this.nameIsEmpty) {
      this.resourceService
        .fileUpload({
          resourceName: this.name,
          resourceType: this.resourceType,
          attachment: this.resourceType == 'link' ? false : true,
          file: event.target.files[0],
          url: this.url,
        })
        .subscribe((response) => {
          this.resourceService
            .saveDocument({
              name: this.name,
              type: 'UPLOAD_FILE',
              attachment: true,
              external: false,
              url: response.response.fileResource.id,
            })
            .subscribe((documentResponse) => {
              let sharingSettingsData = {
                meta: {
                  allowPublicAccess: true,
                  allowExternalAccess: true,
                },
                object: {
                  id: documentResponse['response']['uid'],
                  name: this.name,
                  displayName: this.name,
                  publicAccess: 'r-------',
                  user: {
                    id: this.currentUser.id,
                    name: this.currentUser.name,
                  },
                  externalAccess: false,
                  userGroupAccesses: [
                    {
                      id: this.resourceGroup[0].id,
                      name: this.resourceGroup[0].name,
                      displayName: this.resourceGroup[0].name,
                      access: 'r-------',
                    },
                  ],
                },
              };
              this.resourceService
                .saveSharingSettingsForDocuments(sharingSettingsData)
                .subscribe((sharingResponse) => {
                  this.store.dispatch(
                    loadSSBResources({
                      reload: true,
                    })
                  );
                  // this.router.navigate(['/reports']);
                  setTimeout(() => {
                    this.router
                      .navigateByUrl('/', {
                        skipLocationChange: true,
                      })
                      .then(() =>
                        this.router.navigate(['reports'], {
                          queryParams: {
                            status: 'added',
                          },
                        })
                      );
                  }, 70);
                });
            });
        });
    } else {
      this.nameIsEmpty = true;
    }
  }

  setUrlStatus() {
    if (this.url != '') {
      this.requiredField = false;
    } else {
      this.requiredField = true;
    }
  }

  setNameStatus() {
    if (this.name != '') {
      this.nameIsEmpty = false;
    } else {
      this.nameIsEmpty = true;
    }
  }

  saveResource() {
    if (!this.name || this.name == '') {
      this.nameIsEmpty = true;
    } else if (this.name && !this.file && !this.url) {
      this.requiredField = true;
    } else {
      let data = {
        name: this.name,
        type: 'EXTERNAL_URL',
        attachment: false,
        url: this.url,
        external: true,
      };
      this.resourceService.saveDocument(data).subscribe((response) => {
        this.store.dispatch(loadSSBResources({ reload: true }));
        // this.router.navigate(['/resources/documents']);
        setTimeout(() => {
          this.router
            .navigateByUrl('/', { skipLocationChange: true })
            .then(() =>
              this.router.navigate(['reports'], {
                queryParams: { status: 'added' },
              })
            );
        }, 70);
      });
      this.nameIsEmpty = false;
      this.requiredField = false;
    }
  }
}
