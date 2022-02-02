import { Component, Input, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { SavedFavoritesService } from 'src/app/core/services/saved-favorites.service';

@Component({
  selector: 'app-shared-visualization',
  templateUrl: './shared-visualization.component.html',
  styleUrls: ['./shared-visualization.component.css'],
})
export class SharedVisualizationComponent implements OnInit {
  @Input() visualizationId: string;
  reportReponse$: Observable<any>;
  constructor(private savedFavoritesService: SavedFavoritesService) {}

  ngOnInit(): void {
    this.reportReponse$ = this.savedFavoritesService.getFavoritesDetails(
      this.visualizationId
    );
  }
}
