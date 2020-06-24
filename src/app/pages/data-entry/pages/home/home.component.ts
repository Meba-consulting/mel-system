import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { State } from 'src/app/store/reducers';
import {
  loadDataEntryFormsByOu,
  loadDataEntryFlow,
  loadEvents,
  loadProgramMetadata
} from '../../store/actions';
import { Observable } from 'rxjs';
import {
  getDataEntryFormsByOuId,
  getProgramMetadata,
  getProgramStageById
} from '../../store/selectors';

import * as _ from 'lodash';
import { DataEntrySelections } from '../../modals/data-entry-selections';
import { getDataEntryFlowConfigs } from '../../store/selectors/data-entry-flow.selectors';
import { getEventsById } from '../../store/selectors/events.selectors';
import { getCurrentUser } from 'src/app/store/selectors';
import { NgxDhis2HttpClientService } from '@iapps/ngx-dhis2-http-client';
import { DataEntryService } from '../../services/data-entry.service';
import {
  formatAttributesValues,
  filterWithContainingCharactes
} from '../../helpers';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  selectionFilterConfig: any = {
    showDataFilter: false,
    showPeriodFilter: false,
    showOrgUnitFilter: true,
    showLayout: false,
    showFilterButton: false,
    orgUnitFilterConfig: {
      singleSelection: true,
      showUserOrgUnitSection: false,
      showOrgUnitLevelGroupSection: false,
      showOrgUnitGroupSection: false,
      showOrgUnitLevelSection: false,
      reportUse: false,
      additionalQueryFields: ['programs'],
      batchSize: 400,
      selectedOrgUnitItems: []
    }
  };
  selectedOrgUnitItems: Array<any> = [];
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
  currentUser$: Observable<any>;

  dataEntrySelections = new DataEntrySelections('', '');
  dataEntryFlowConfigs$: Observable<any>;
  dataEntryFlowConfigs: any;
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

  eventsForReports$: Observable<any>;
  programMetadata$: Observable<any>;
  selectedForm: any;
  isFormSet: boolean = false;
  reportListHeaders: Array<any> = [];
  programStage$: Observable<any>;
  formId: string;
  eventsDataDimensions: any;
  viewEvent: boolean = false;
  currentEvent: string;

  constructor(
    private store: Store<State>,
    private httpClient: NgxDhis2HttpClientService,
    private dataEntryService: DataEntryService,
    private route: ActivatedRoute,
    private router: Router
  ) {
    this.store.dispatch(loadProgramMetadata());
    this.currentUser$ = this.store.select(getCurrentUser);
    this.programMetadata$ = this.store.select(getProgramMetadata);
    // this.store.select(getCurrentUser).subscribe(user => {
    //   if (user) {
    //     _.map(user['organisationUnits'], ou => {
    //       this.selectedOrgUnitItems.push({
    //         id: ou.id,
    //         name: ou.name,
    //         level: ou.level,
    //         type: 'ORGANISATION_UNIT'
    //       });
    //     });
    //   }
    // });
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
                    'name'
                  );
                }
              });
            }
          });
      }
    });
  }

  ngOnInit() {
    this.dataElements$ = this.dataEntryService.getTrackedEntityAttributes();
    if (
      this.route.snapshot.queryParams['form'] &&
      this.route.snapshot.queryParams['ou']
    ) {
      this.formId = this.route.snapshot.queryParams['form'];
      this.programStage$ = this.store.select(getProgramStageById, {
        id: this.formId
      });

      this.programStage$.subscribe(stage => {
        if (stage) {
          this.isFormSet = false;
          setTimeout(() => {
            this.trackerProgramId = stage['trackerProgramId'];
            this.selectedProgram = {
              id: stage.id,
              name: stage['name'],
              shortName: stage['name'],
              trackedEntityType: stage['trackedEntityType']
            };
            this.dataEntryService
              .getBasicOuDetails(this.route.snapshot.queryParams['ou'])
              .subscribe(ouResponse => {
                if (ouResponse) {
                  this.selectedOrgUnitItems = [
                    {
                      dimension: 'ou',
                      items: [
                        {
                          id: ouResponse.id,
                          name: ouResponse.name,
                          level: ouResponse.level,
                          type: 'ORGANISATION_UNIT'
                        }
                      ],
                      changed: true,
                      layout: 'rows'
                    }
                  ];
                  this.selectedOu = this.selectedOrgUnitItems[0]['items'][0];

                  this.isFormSet = true;
                  this.selectedForm = stage;
                  this.selectedDataEntryForm = this.selectedForm[
                    'dataEntryForm'
                  ];
                  if (this.selectedOrgUnitItems.length > 0) {
                    this.selectedOu = this.selectedOrgUnitItems[0]['items'][0];

                    this.entityAttributeHeaders = [];
                    this.reportListHeaders = [];

                    const dimension = {
                      ou: this.selectedOrgUnitItems[0]['items'][0].id,
                      program: this.trackerProgramId
                    };

                    this.dataEntryService
                      .getTrackedEntityInstancesList(dimension)
                      .subscribe(trackedEntityInstancesLoaded => {
                        if (trackedEntityInstancesLoaded) {
                          this.trackedEntityInstances =
                            trackedEntityInstancesLoaded[
                              'trackedEntityInstances'
                            ];

                          this.eventValues = formatAttributesValues(
                            trackedEntityInstancesLoaded[
                              'trackedEntityInstances'
                            ]
                          );

                          if (this.selectedProgram.id.indexOf('default') > -1) {
                            this.hasParentData = false;
                            this.formType = 'tracker';

                            this.dataElements = this.selectedProgram.programStageDataElements;
                            this.dataElements$ = this.dataEntryService.getTrackedEntityAttributes();

                            this.dataElements$.subscribe(elements => {
                              if (elements) {
                                this.entityAttributeHeaders.push({
                                  id: 'created',
                                  name: 'Entry Date',
                                  valueType: 'DATE'
                                });
                                this.entityAttributeHeaders = _.union(
                                  this.entityAttributeHeaders,
                                  filterWithContainingCharactes(
                                    elements['trackedEntityAttributes'],
                                    'Inspection'
                                  )
                                );
                                this.isReportSet = false;
                                setTimeout(() => {
                                  this.isReportSet = true;
                                }, 20);
                              }
                            });
                          } else {
                            this.formType = 'event';
                            this.hasParentData = true;
                            this.reportListHeaders.push({
                              id: 'created',
                              name: 'Entry Date',
                              valueType: 'DATE'
                            });
                            this.eventsDataDimensions = {
                              ou: this.selectedOu.id,
                              program: this.trackerProgramId,
                              programStage: this.selectedProgram.id
                            };

                            this.eventsForReports$ = this.dataEntryService.getEventsData(
                              this.eventsDataDimensions
                            );

                            this.isReportSet = false;
                            setTimeout(() => {
                              this.isReportSet = true;
                            }, 20);

                            this.dataElements = this.getDataElements(
                              this.selectedForm['programStageDataElements']
                            );

                            this.reportListHeaders = _.union(
                              this.reportListHeaders,
                              this.dataElements
                            );
                          }
                        }
                      });
                  }

                  this.isReportSet = false;
                  this.atLeastOneDataEntered = false;
                }
              });
          }, 20);
        }
      });
    }
  }

  onEventSet(data) {
    console.log('evevnt data', data);
    this.currentEvent = data.id;
    if (data.id && data.id.indexOf('trackedEntityInstance') == -1) {
      this.elementsDataValues = {};
      console.log('changed route to view event');
      // load event data and format them
      this.dataEntryService
        .getEventDataById(this.currentEvent)
        .subscribe(data => {
          this.dataEntryFlowConfigs$.subscribe(dataFlowConfigs => {
            if (dataFlowConfigs) {
              console.log(dataFlowConfigs);
              _.map(data['dataValues'], dataValue => {
                this.elementsDataValues[
                  dataValue['dataElement'] + '-dataElement'
                ] = {
                  id:
                    this.selectedProgram.id +
                    '-' +
                    dataValue['dataElement'] +
                    '-val',
                  value: dataValue['value']
                };
              });
            }
            console.log('elementsDataValues', this.elementsDataValues);
          });
          this.viewEvent = false;
          setTimeout(() => {
            this.viewEvent = true;
          }, 20);
        });
    } else {
      this.isDefaultDataSet = true;
      this.isFormSet = true;
      this.dataEntryService
        .getTrackedEntityInstanceById(data.id.split('-')[0])
        .subscribe(response => {
          this.elementsDataValues = {};

          if (response) {
            this.eventValues = formatAttributesValues([response]);
            // console.log('event values', this.eventValues);
            _.each(Object.keys(this.eventValues[0]), key => {
              this.elementsDataValues[key + '-dataElement'] = {
                id: this.selectedForm + '-' + key + '-val',
                value: ''
              };
            });
            console.log('elementsDataValues', this.elementsDataValues);
            console.log(this.dataElements);
            this.dataElements$ = this.dataEntryService.getTrackedEntityAttributes();
            this.dataElements$.subscribe(attributes => {
              console.log(
                'attributes',
                filterWithContainingCharactes(
                  attributes['trackedEntityAttributes'],
                  'Inspection'
                )
              );
            });
          }
        });
    }
  }

  showFormsList() {
    this.isFormSet = false;
    this.viewEvent = false;
    this.isReportSet = false;
  }

  onSelectForm(form) {
    console.log('form', form);
    this.isFormSet = false;
    setTimeout(() => {
      this.isFormSet = true;
      this.selectedForm = form;
      this.selectedDataEntryForm = this.selectedForm['dataEntryForm'];
    }, 20);

    this.trackerProgramId = form['trackerProgramId'];
    this.selectedProgram = {
      id: form.id,
      name: form['name'],
      shortName: form['name'],
      trackedEntityType: form['trackedEntityType']
    };

    if (this.selectedOrgUnitItems.length > 0) {
      this.selectedOu = this.selectedOrgUnitItems[0]['items'][0];

      this.entityAttributeHeaders = [];
      this.reportListHeaders = [];

      const dimension = {
        ou: this.selectedOrgUnitItems[0]['items'][0].id,
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

            if (this.selectedProgram.id.indexOf('default') > -1) {
              this.hasParentData = false;
              this.formType = 'tracker';

              this.dataElements = this.selectedProgram.programStageDataElements;
              this.dataElements$ = this.dataEntryService.getTrackedEntityAttributes();

              this.dataElements$.subscribe(elements => {
                if (elements) {
                  this.entityAttributeHeaders.push({
                    id: 'created',
                    name: 'Entry Date',
                    valueType: 'DATE'
                  });
                  this.entityAttributeHeaders = _.union(
                    this.entityAttributeHeaders,
                    filterWithContainingCharactes(
                      elements['trackedEntityAttributes'],
                      'Inspection'
                    )
                  );
                  this.isReportSet = false;
                  setTimeout(() => {
                    this.isReportSet = true;
                  }, 20);
                }
              });
            } else {
              this.formType = 'event';
              this.hasParentData = true;
              this.reportListHeaders.push({
                id: 'created',
                name: 'Entry Date',
                valueType: 'DATE'
              });
              this.eventsDataDimensions = {
                ou: this.selectedOu.id,
                program: this.trackerProgramId,
                programStage: this.selectedProgram.id
              };

              this.eventsForReports$ = this.dataEntryService.getEventsData(
                this.eventsDataDimensions
              );

              this.isReportSet = false;
              setTimeout(() => {
                this.isReportSet = true;
              }, 20);

              this.dataElements = this.getDataElements(
                this.selectedForm['programStageDataElements']
              );

              this.reportListHeaders = _.union(
                this.reportListHeaders,
                this.dataElements
              );
            }
          }
        });
    }

    this.router.navigate([], { queryParams: { form: form.id } });

    this.isReportSet = false;
    this.atLeastOneDataEntered = false;
  }

  onGetDataEntryFlowAndForm(dataEntryFlow) {
    this.dataEntryFlowConfigs = dataEntryFlow['configs'];
    this.trackerProgramId = dataEntryFlow['form']['trackerProgramId'];
    this.selectedProgram = {
      id: dataEntryFlow['form'].id,
      name: dataEntryFlow['form']['name'],
      shortName: dataEntryFlow['form']['name'],
      trackedEntityType: dataEntryFlow['form']['trackedEntityType']
    };
    this.isReportSet = false;
    this.isFormSet = false;
    this.atLeastOneDataEntered = false;
  }

  onFilterUpdate(selection) {
    this.dataEntrySelections.selectedDate = '';
    this.dataEntrySelections.batchNo = '';
    this.selectedOu = selection[0].items[0];
    this.selectedOrgUnitItems = selection;
    this.selectionFilterConfig.orgUnitFilterConfig.selectedOrgUnitItems = selection;
    this.entityAttributeHeaders = [];
    this.reportListHeaders = [];

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

          if (this.selectedProgram.id.indexOf('default') > -1) {
            this.hasParentData = false;
            this.isDefaultDataSet = true;
            this.isFormSet = true;
            console.log('geeeeeeeeeeeeeeeeeeeeeeeee');
            this.formType = 'tracker';

            this.dataElements = this.selectedProgram.programStageDataElements;
            this.dataElements$ = this.dataEntryService.getTrackedEntityAttributes();

            this.dataElements$.subscribe(elements => {
              if (elements) {
                this.entityAttributeHeaders.push({
                  id: 'created',
                  name: 'Entry Date',
                  valueType: 'DATE'
                });
                this.entityAttributeHeaders = _.union(
                  this.entityAttributeHeaders,
                  filterWithContainingCharactes(
                    elements['trackedEntityAttributes'],
                    'Inspection'
                  )
                );
                this.isReportSet = false;
                setTimeout(() => {
                  this.isReportSet = true;
                }, 100);
              }
            });
          } else {
            this.formType = 'event';
            this.hasParentData = true;
            this.reportListHeaders.push({
              id: 'created',
              name: 'Entry Date',
              valueType: 'DATE'
            });

            console.log(this.selectedForm.id);
            this.eventsDataDimensions = {
              ou: this.selectedOu.id,
              program: this.trackerProgramId,
              programStage: this.selectedProgram.id
            };
            console.log(this.eventsDataDimensions);

            this.eventsForReports$ = this.dataEntryService.getEventsData(
              this.eventsDataDimensions
            );

            this.isReportSet = false;
            setTimeout(() => {
              this.isReportSet = true;
            }, 20);

            this.dataElements = this.getDataElements(
              this.selectedForm['programStageDataElements']
            );

            this.reportListHeaders = _.union(
              this.reportListHeaders,
              this.dataElements
            );
          }
        }
      });

    this.router.navigate([], {
      queryParams: { form: this.selectedForm.id, ou: this.selectedOu.id }
    });
  }

  setReport() {
    this.isReportSet = true;
    this.currentEvent = '';
    this.elementsDataValues = {};
    this.dataEntrySelections.selectedDate = '';
    this.dataEntrySelections.batchNo = '';
  }
  unSetReport() {
    this.isReportSet = false;
    this.currentEvent = '';
  }

  onSelectBatch(item) {
    this.isDefaultDataSet = false;
    this.selectedTrackedEntityInstance = item.id;
    this.dataEntrySelections.batchNo = item.name;
    console.log('trackedEntityInstance', this.selectedTrackedEntityInstance);
    console.log('configs ', this.dataEntryFlowConfigs['referencedDataConfigs']);

    _.map(
      this.dataEntryFlowConfigs['referencedDataConfigs'][
        this.selectedProgram.id
      ],
      dataConfigs => {
        this.elementsDataValues[dataConfigs['id'] + '-dataElement'] = {
          id: this.selectedProgram.id + '-' + dataConfigs['id'] + '-val',
          value: _.filter(
            _.filter(this.trackedEntityInstances, {
              trackedEntityInstance: item.id
            })[0]['attributes'],
            { attribute: dataConfigs['correspondingId'] }
          )[0]['value']
        };
      }
    );
    console.log('elementsDataValues', this.elementsDataValues);
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
  }

  saveData() {
    if (this.selectedProgram.id.indexOf('default') > -1) {
      let attributesValues = [];
      _.map(Object.keys(this.elementsDataValues), key => {
        attributesValues.push({
          attribute: this.elementsDataValues[key]['id'].split('-')[0],
          value: this.elementsDataValues[key]['value']
        });
      });
      let attributesData = {
        trackedEntityType: this.selectedProgram['trackedEntityType'],
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
                // this.eventsForReports$ = this.dataEntryService.getEventsData(
                //   this.eventsDataDimensions
                // );

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

                      this.hasParentData = false;
                      this.formType = 'tracker';
                      this.entityAttributeHeaders = [];

                      this.dataElements = this.selectedProgram.programStageDataElements;
                      this.dataElements$ = this.dataEntryService.getTrackedEntityAttributes();

                      this.dataElements$.subscribe(elements => {
                        if (elements) {
                          this.entityAttributeHeaders.push({
                            id: 'created',
                            name: 'Entry Date',
                            valueType: 'DATE'
                          });
                          this.entityAttributeHeaders = _.union(
                            this.entityAttributeHeaders,
                            filterWithContainingCharactes(
                              elements['trackedEntityAttributes'],
                              'Inspection'
                            )
                          );
                          this.isReportSet = false;
                          this.isDataSaved = true;
                          setTimeout(() => {
                            this.isReportSet = true;
                          }, 20);
                        }
                      });
                    }
                  });
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
                    eventResponse['response']['importSummaries'][0]['reference']
                  ) {
                    this.eventsForReports$ = this.dataEntryService.getEventsData(
                      this.eventsDataDimensions
                    );

                    this.isReportSet = false;
                    setTimeout(() => {
                      this.isReportSet = true;
                    }, 20);
                    this.isDataSaved = true;
                  }
                });
            }
          }
        });
    }
  }

  onDeleteEvent() {
    this.dataEntryService.deleteEvent(this.currentEvent).subscribe(response => {
      // console.log(response);
      this.eventsForReports$ = this.dataEntryService.getEventsData(
        this.eventsDataDimensions
      );

      this.isReportSet = false;
      this.viewEvent = false;
      setTimeout(() => {
        this.isReportSet = true;
      }, 20);
      this.isDataSaved = true;
    });
  }
}
