import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
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

  @Output() delete = new EventEmitter<any>();
  @Output() edit = new EventEmitter<any>();
  response$: Observable<any>;
  constructor(private dataService: DataService) {}

  ngOnInit(): void {
    this.response$ = this.dataService.getTrackedEntityInstanceDetailsByProgram(
      this.trackedEntityInstanceId,
      this.program
    );
  }

  onEdit(e) {
    this.edit.emit(e);
  }

  onDelete(e) {
    this.delete.emit(e);
  }
}
