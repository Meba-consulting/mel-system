import { Component, OnInit, Input } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { NgxDhis2HttpClientService } from '@iapps/ngx-dhis2-http-client';
import { ResourcesService } from '../../services/resources.service';
import { Store } from '@ngrx/store';
import { State } from 'src/app/store';
import { loadResources } from '../../store/actions';
import { Router } from '@angular/router';

@Component({
  selector: 'app-resource-form',
  templateUrl: './resource-form.component.html',
  styleUrls: ['./resource-form.component.css']
})
export class ResourceFormComponent implements OnInit {
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
      file: ['', Validators.required]
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
          url: this.url
        })
        .subscribe(response => {
          this.resourceService
            .saveDocument({
              name: this.name,
              type: 'UPLOAD_FILE',
              attachment: true,
              external: false,
              url: response.response.fileResource.id
            })
            .subscribe(documentResponse => {
              let sharingSettingsData = {
                meta: {
                  allowPublicAccess: true,
                  allowExternalAccess: true
                },
                object: {
                  id: documentResponse['response']['uid'],
                  name: this.name,
                  displayName: this.name,
                  publicAccess: 'r-------',
                  user: {
                    id: this.currentUser.id,
                    name: this.currentUser.name
                  },
                  externalAccess: false,
                  userGroupAccesses: [
                    {
                      id: this.resourceGroup[0].id,
                      name: this.resourceGroup[0].name,
                      displayName: this.resourceGroup[0].name,
                      access: 'r-------'
                    }
                  ]
                }
              };
              this.resourceService
                .saveSharingSettingsForDocuments(sharingSettingsData)
                .subscribe(sharingResponse => {
                  this.store.dispatch(loadResources({ reload: true }));
                  // this.router.navigate(['/resources/documents']);
                  setTimeout(() => {
                    this.router
                      .navigateByUrl('/', { skipLocationChange: true })
                      .then(() =>
                        this.router.navigate(['resources/documents'], {
                          queryParams: { status: 'added' }
                        })
                      );
                  }, 70);
                  console.log(sharingResponse);
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
      console.log('url', this.url);
      let data = {
        name: this.name,
        type: 'EXTERNAL_URL',
        attachment: false,
        url: this.url,
        external: true
      };
      console.log('data');
      this.resourceService.saveDocument(data).subscribe(response => {
        console.log('response', response);
        this.store.dispatch(loadResources({ reload: true }));
        // this.router.navigate(['/resources/documents']);
        setTimeout(() => {
          this.router
            .navigateByUrl('/', { skipLocationChange: true })
            .then(() =>
              this.router.navigate(['resources/documents'], {
                queryParams: { status: 'added' }
              })
            );
        }, 70);
      });
      this.nameIsEmpty = false;
      this.requiredField = false;
    }
  }
}
