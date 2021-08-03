import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

import * as _ from 'lodash';
import { Observable } from 'rxjs';
import { DataService } from 'src/app/core/services/data.service';

@Component({
  selector: 'app-non-repeatable-stage',
  templateUrl: './non-repeatable-stage.component.html',
  styleUrls: ['./non-repeatable-stage.component.css'],
})
export class NonRepeatableStageComponent implements OnInit {
  @Input() programDataStoreConfigs: any;
  @Input() stage: any;
  @Input() program: any;
  @Input() trackedEntityInstanceId: string;
  data$: Observable<any>;

  @Output() formValuesData = new EventEmitter<any>();
  @Output() isFormValid = new EventEmitter<boolean>();
  constructor(private dataService: DataService) {}

  ngOnInit(): void {
    this.data$ = this.dataService.getTrackedEntityInstanceDetailsByProgram(
      this.trackedEntityInstanceId,
      this.program
    );
  }

  onGetFormValuesData(e, dataElements) {
    this.formValuesData.emit(e);
  }

  onGetFormValidity(e) {
    this.isFormValid.emit(e);
  }
}
