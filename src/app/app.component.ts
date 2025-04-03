import { Component, OnInit } from '@angular/core';
import { Serie } from './models/Serie';
import { SeriesService } from './services/series.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  standalone: false,
  styleUrl: './app.component.css',
  providers: [SeriesService]
})
export class AppComponent implements OnInit {
  title = 'tarea_dwec06';

  constructor() {   

  }


  ngOnInit(): void {
    
  }

}
