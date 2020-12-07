import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';
import { State, getCurrentUser } from 'src/app/store';
import { NgxDhis2HttpClientService } from '@iapps/ngx-dhis2-http-client';

import * as _ from 'lodash';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-new-program',
  templateUrl: './new-program.component.html',
  styleUrls: ['./new-program.component.css']
})
export class NewProgramComponent implements OnInit {
  currentUser$: Observable<any>;
  name: string = '';
  uids$: Observable<any>;
  uids: string[];
  message: string = '';
  nameAlert: string = 'Name of program is required';
  constructor(
    private store: Store<State>,
    private httpClient: NgxDhis2HttpClientService,
    private route: ActivatedRoute,
    private router: Router
  ) {
    this.currentUser$ = this.store.select(getCurrentUser);
    this.uids$ = this.httpClient.get('system/id.json?limit=6');
    this.uids$.subscribe(uidsResponse => {
      if (uidsResponse) {
        this.uids = uidsResponse['codes'];
      }
    });
  }

  ngOnInit(): void {}

  saveProgram() {
    //api/29/metadata
    const data = {
      programs: [
        {
          publicAccess: 'rw------',
          id: this.uids[0],
          name: this.name,
          shortName: this.name.substring(0, 49),
          programType: 'WITHOUT_REGISTRATION',
          categoryCombo: {
            id: 'bjDvmb4bfuf'
          },
          userGroupAccesses: [
            {
              id: this.route.snapshot.params['id'],
              name: 'DPT: ' + this.route.snapshot.params['name'],
              displayName: 'DPT: ' + this.route.snapshot.params['name'],
              access: 'rwrw----'
            }
          ],
          programTrackedEntityAttributes: [],
          notificationTemplates: [],
          organisationUnits: [
            {
              id: 'WoDcP1GEqm3'
            },
            {
              id: 'cwxMua5fAMO'
            },
            {
              id: 'YANu6SOCmTF'
            }
          ],
          programSections: [],
          programStages: [
            {
              id: this.uids[1]
            }
          ]
        }
      ],
      programStages: [
        {
          publicAccess: 'rw------',
          id: this.uids[1],
          name: this.name,
          validationStrategy: 'ON_COMPLETE',
          programStageDataElements: [
            {
              id: this.uids[2],
              programStage: {
                id: this.uids[1]
              },
              sortOrder: 1,
              dataElement: {
                id: 'TebwJX5PGqd',
                displayName: 'Uploaded document',
                valueType: 'FILE_RESOURCE',
                renderTypeOptions: ['DEFAULT']
              },
              displayInReports: true
            },
            {
              id: this.uids[3],
              programStage: {
                id: this.uids[1]
              },
              sortOrder: 2,
              dataElement: {
                id: 'MFBuF12a58L',
                displayName: 'Current user group acted',
                valueType: 'TEXT',
                renderTypeOptions: [
                  'DEFAULT',
                  'VALUE',
                  'AUTOCOMPLETE',
                  'QR_CODE',
                  'BAR_CODE'
                ]
              },
              displayInReports: true
            },
            {
              id: this.uids[4],
              programStage: {
                id: this.uids[1]
              },
              sortOrder: 3,
              dataElement: {
                id: 'JGV9wKloWLo',
                displayName: 'Current user group id acted',
                valueType: 'TEXT',
                renderTypeOptions: [
                  'DEFAULT',
                  'VALUE',
                  'AUTOCOMPLETE',
                  'QR_CODE',
                  'BAR_CODE'
                ]
              },
              displayInReports: true
            }
          ],
          notificationTemplates: [],
          programStageSections: []
        }
      ]
    };
    this.message = 'Saving ' + this.name + '  ..........';
    this.httpClient.post('metadata', data).subscribe(response => {
      if (response) {
        setTimeout(() => {
          this.message = 'Save successfuly';
          const configs = {
            id: this.uids[0],
            name: this.name,
            groups: []
          };
          this.httpClient
            .post('dataStore/data-entry/' + this.uids[0], configs)
            .subscribe(eventResponse => {});
        }, 400);
        setTimeout(() => {
          this.message = '';
        }, 1000);
        setTimeout(() => {
          this.router.navigate(['/data-entry']);
        }, 1200);
      }
    });
  }
}
