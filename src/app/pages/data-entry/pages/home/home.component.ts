import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { State } from 'src/app/store/reducers';
import {
  loadDataEntryFormsByOu,
  loadDataEntryFlow,
  loadEvents
} from '../../store/actions';
import { Observable } from 'rxjs';
import { getDataEntryFormsByOuId } from '../../store/selectors';

import * as _ from 'lodash';
import { DataEntrySelections } from '../../modals/data-entry-selections';
import { getDataEntryFlowConfigs } from '../../store/selectors/data-entry-flow.selectors';
import { getEventsById } from '../../store/selectors/events.selectors';
import { getCurrentUser } from 'src/app/store/selectors';
import { NgxDhis2HttpClientService } from '@iapps/ngx-dhis2-http-client';
import { DataEntryService } from '../../services/data-entry.service';
import { formatAttributesValues } from '../../helpers';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  selectedOrgUnitItems: Array<any> = [];
  orgUnitFilterConfig: any = {
    singleSelection: true,
    showUserOrgUnitSection: false,
    showOrgUnitLevelGroupSection: false,
    showOrgUnitGroupSection: false,
    showOrgUnitLevelSection: false
  };
  selectionFilterConfig: any = {
    showDataFilter: false,
    showPeriodFilter: false,
    showOrgUnitFilter: true,
    showLayout: false,
    showFilterButton: false,
    orgUnitFilterConfig: {
      singleSelection: true,
      showOrgUnitLevelGroupSection: false,
      showUserOrgUnitSection: false
    }
  };
  selectedOu: any;
  dataEntryFormsByOu$: Observable<any>;
  selectedDataEntryForm: any;
  selectedProgram: any;
  dataElements = [];
  dataElements$: Observable<any>;
  formType: string = 'event';
  eventsDimensions: Array<any> = [];
  events$: Observable<any>;
  hasParentData: Boolean = false;
  dataInfo = [];
  elementsDataValues: any = {};
  trackerProgramId: string = '';

  dataEntrySelections = new DataEntrySelections('', '');
  dataEntryFlowConfigs$: Observable<any>;
  dataEntryFlowConfigs: any;
  currentUser$: Observable<any>;
  currentUserGroups: Array<any> = [];
  dataEntryForms: Array<any> = [];
  trackedEntityInstances: Array<any> = [];
  selectedTrackedEntityInstance: string;
  isDefaultDataSet: Boolean = false;
  atLeastOneDataEntered: Boolean = false;
  isDataSaved: Boolean = false;

  eventValues: any = {};
  entityAttributeHeaders = [];
  isReportSet: Boolean = false;

  constructor(
    private store: Store<State>,
    private httpClient: NgxDhis2HttpClientService,
    private dataEntryService: DataEntryService
  ) {
    this.store.dispatch(loadDataEntryFlow());
    this.dataEntryFlowConfigs$ = this.store.select(getDataEntryFlowConfigs);

    this.currentUser$ = this.store.select(getCurrentUser);
    this.currentUser$.subscribe(user => {
      if (user) {
        this.httpClient
          .get('users/' + user.id + '.json?fields=id,name,userGroups[id,name]')
          .subscribe(userGroupData => {
            if (userGroupData) {
              this.currentUserGroups = userGroupData['userGroups'];
              this.dataEntryFlowConfigs$.subscribe(dataEntryFlowConfigs => {
                if (
                  dataEntryFlowConfigs &&
                  dataEntryFlowConfigs['programsStagesUserGroupAccesses']
                ) {
                  _.map(this.currentUserGroups, userGroup => {
                    if (
                      dataEntryFlowConfigs['programsStagesUserGroupAccesses'][
                        userGroup.id
                      ]
                    ) {
                      this.dataEntryForms = _.union(
                        this.dataEntryForms,
                        dataEntryFlowConfigs['programsStagesUserGroupAccesses'][
                          userGroup.id
                        ]
                      );
                    }
                  });
                  this.dataEntryForms = _.uniqBy(
                    _.orderBy(this.dataEntryForms, ['priority']),
                    'id'
                  );
                }
              });
            }
          });
      }
    });
  }

  ngOnInit() {}

  onFilterUpdate(selection) {
    console.log(selection);
    this.selectedOu = selection[0].items[0];
    this.store.dispatch(
      loadDataEntryFormsByOu({ orgUnit: selection[0].items[0].id })
    );
    this.dataEntryFormsByOu$ = this.store.select(getDataEntryFormsByOuId, {
      id: this.selectedOu.id
    });
  }

  getEntryForm(id) {
    this.isReportSet = true;
    this.eventsDimensions = [];
    this.dataEntrySelections.batchNo = '';
    this.dataEntryFormsByOu$.subscribe(ouInfo => {
      if (ouInfo) {
        this.dataEntryFlowConfigs$.subscribe(dataEntryFlowConfigs => {
          if (
            dataEntryFlowConfigs &&
            dataEntryFlowConfigs['programsStagesUserGroupAccesses']
          ) {
            this.dataEntryFlowConfigs = dataEntryFlowConfigs;
            this.trackerProgramId = _.filter(this.dataEntryForms, {
              id: id
            })[0]['program'];
            console.log('tracked id', this.trackerProgramId);
            const dimension = {
              ou: this.selectedOu.id,
              program: this.trackerProgramId
            };
            this.dataEntryService
              .getTrackedEntityInstancesList(dimension)
              .subscribe(trackedEntityInstancesLoaded => {
                if (trackedEntityInstancesLoaded) {
                  this.trackedEntityInstances =
                    trackedEntityInstancesLoaded['trackedEntityInstances'];

                  this.eventValues = formatAttributesValues(
                    trackedEntityInstancesLoaded['trackedEntityInstances']
                  );
                  console.log('eventValues', this.eventValues);
                }
              });
            if (id == 'default') {
              this.hasParentData = false;
              this.formType = 'tracker';
              this.selectedDataEntryForm = _.filter(ouInfo['programs'], {
                id: _.filter(this.dataEntryForms, { id: id })[0]['program']
              })[0]['dataEntryForm'];
              this.selectedProgram = {
                id: id,
                name: _.filter(this.dataEntryForms, { id: id })[0]['name']
              };
              this.dataElements = _.filter(ouInfo['programs'], {
                id: _.filter(this.dataEntryForms, { id: id })[0]['program']
              })[0]['programTrackedEntityAttributes'];
              this.dataElements$ = this.dataEntryService.getTrackedEntityAttributes();

              this.dataElements$.subscribe(elements => {
                if (elements) {
                  this.entityAttributeHeaders.push({
                    id: 'created',
                    name: 'Created'
                  });
                  this.entityAttributeHeaders.push({
                    id: 'updated',
                    name: 'Updated'
                  });
                  console.log('elements', elements);
                  this.entityAttributeHeaders = _.union(
                    this.entityAttributeHeaders,
                    elements['trackedEntityAttributes']
                  );
                }
              });

              // this.store.dispatch(
              //   loadEvents({ dataDimenions: this.eventsDimensions })
              // );
              // this.events$ = this.store.select(getEventsById, {
              //   id: this.selectedOu.id + '-' + stages[stages.length - 1]
              // });
            } else {
              this.formType = 'event';
              this.hasParentData = true;
              console.log('hereeeeeeeeeeeeeeeeeeeee', ouInfo);
              console.log('form', this.selectedDataEntryForm);
              this.selectedDataEntryForm = _.filter(
                _.filter(ouInfo['programs'], {
                  id: this.trackerProgramId
                })[0]['programStages'],
                { id: id }
              )[0]['dataEntryForm'];

              this.selectedProgram = {
                id: id,
                name: _.filter(
                  _.filter(ouInfo['programs'], {
                    id: this.trackerProgramId
                  })[0]['programStages'],
                  { id: id }
                )[0]['name']
              };

              this.dataElements = this.getDataElements(
                _.filter(
                  _.filter(ouInfo['programs'], {
                    id: this.trackerProgramId
                  })[0]['programStages'],
                  { id: id }
                )[0]['programStageDataElements']
              );
            }
          }
        });
      }
      // this.selectedProgram = _.filter(ouInfo['programs'], { id: id })[0];
    });
  }

  setReport() {
    this.isReportSet = true;
  }
  unSetReport() {
    this.isReportSet = false;
  }

  createDataObject(id) {
    this.isDefaultDataSet = true;
    this.selectedTrackedEntityInstance = id;
    console.log('id ', id);
    console.log(
      'selectedTrackedEntityInstance',
      this.selectedTrackedEntityInstance
    );
    _.map(
      this.dataEntryFlowConfigs['referencedDataConfigs'][
        this.selectedProgram.id
      ],
      dataConfigs => {
        this.elementsDataValues[dataConfigs['id'] + '-dataElement'] = {
          id: this.selectedProgram.id + '-' + dataConfigs['id'] + '-val',
          value: _.filter(
            _.filter(this.trackedEntityInstances, {
              trackedEntityInstance: id
            })[0]['attributes'],
            { attribute: dataConfigs['correspondingId'] }
          )[0]['value']
        };
      }
    );
  }

  getItemName(trackedEntityInstance) {
    return (
      _.filter(trackedEntityInstance['attributes'], {
        attribute: 'JUsqDGTCbh2'
      })[0].value +
      ' by ' +
      _.filter(trackedEntityInstance['attributes'], {
        attribute: 'Ucd8KvbJ7K9'
      })[0].value
    );
  }

  getDataElements(programStageDataElements) {
    let formattedDataElements = [];
    _.map(programStageDataElements, PStageDataElement => {
      formattedDataElements.push(PStageDataElement.dataElement);
    });
    return formattedDataElements;
  }

  entryInfo(data) {
    this.dataInfo.push(data);
    this.atLeastOneDataEntered = true;
    this.elementsDataValues[data.id] = {
      id: data.domElementId,
      value: data.value
    };
    console.log('elementsDataValues', this.elementsDataValues);
  }

  saveData() {
    if (this.selectedProgram.id == 'default') {
      let attributesValues = [];
      _.map(Object.keys(this.elementsDataValues), key => {
        attributesValues.push({
          attribute: this.elementsDataValues[key]['id'].split('-')[0],
          value: this.elementsDataValues[key]['value']
        });
      });
      let attributesData = {
        trackedEntityType: 'GypuFqZTCTf',
        orgUnit: this.selectedOu.id,
        attributes: attributesValues
      };
      this.dataEntryService
        .saveTrackedEntityInstances(attributesData)
        .subscribe(response => {
          if (
            response &&
            response['response'] &&
            response['response']['importSummaries']
          ) {
            const enrollmentsData = {
              trackedEntityInstance: response['response']['importSummaries'][0][
                'href'
              ].split('trackedEntityInstances/')[1],
              program: this.trackerProgramId,
              status: 'ACTIVE',
              orgUnit: this.selectedOu.id,
              enrollmentDate: '2020-02-13',
              incidentDate: '2020-02-13'
            };
            this.dataEntryService
              .saveEnrollments(enrollmentsData)
              .subscribe(response => {
                console.log('response ', response);
              });
          }
        });
    } else {
      const dimension = {
        tei: this.selectedTrackedEntityInstance,
        program: this.trackerProgramId
      };
      this.dataEntryService
        .getTrackedEntityInstancesInfo(dimension)
        .subscribe(trackedEntityInstanceInfo => {
          if (
            trackedEntityInstanceInfo &&
            trackedEntityInstanceInfo['enrollments']
          ) {
            let dataValuesToSave = [];
            _.map(Object.keys(this.elementsDataValues), key => {
              dataValuesToSave.push({
                dataElement: key.split('-')[0],
                value: this.elementsDataValues[key]['value'],
                providedElsewhere: false
              });
            });
            if (dataValuesToSave.length > 0) {
              const eventsData = {
                events: [
                  {
                    trackedEntityInstance: this.selectedTrackedEntityInstance,
                    program: this.trackerProgramId,
                    programStage: this.selectedProgram.id,
                    enrollment:
                      trackedEntityInstanceInfo['enrollments'][0]['enrollment'],
                    orgUnit: this.selectedOu.id,
                    notes: [],
                    dataValues: dataValuesToSave,
                    status: 'COMPLETED',
                    eventDate: this.dataEntrySelections.selectedDate
                  }
                ]
              };
              this.dataEntryService
                .saveEvents(eventsData)
                .subscribe(eventResponse => {
                  if (
                    eventResponse &&
                    eventResponse['response']['importSummaries'] &&
                    eventResponse['response']['importSummaries']['reference']
                  ) {
                    console.log(eventResponse);
                    this.isDataSaved = true;
                  }
                });
            }
          }
        });
    }
  }
}
