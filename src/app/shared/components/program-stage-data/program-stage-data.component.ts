import { Component, Input, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { DataService } from 'src/app/core/services/data.service';

@Component({
  selector: 'app-program-stage-data',
  templateUrl: './program-stage-data.component.html',
  styleUrls: ['./program-stage-data.component.css'],
})
export class ProgramStageDataComponent implements OnInit {
  @Input() program: any;
  @Input() trackedEntityInstanceId: string;
  @Input() programStage: any;
  response$: Observable<any>;
  constructor(private dataService: DataService) {}

  ngOnInit(): void {
    this.response$ = this.dataService.getTrackedEntityInstanceDetailsByProgram(
      this.trackedEntityInstanceId,
      this.program
    );
  }
}
