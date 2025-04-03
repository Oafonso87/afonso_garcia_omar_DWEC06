import { Component, OnInit } from '@angular/core';
import { Serie } from '../models/Serie';
import { SeriesService } from '../services/series.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  standalone: false,
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
  providers: [SeriesService]
})
export class HomeComponent implements OnInit {public series: Serie[] = [];
  public loading: boolean = true;

  // public series : Array<Serie> = [];
  constructor(private _seriesService : SeriesService, private _router: Router) {
  }

  ngOnInit(): void {
    this._seriesService.getAllSeries().subscribe({
      next: (data) => {
        this.series = data;
        this.loading = false;
      },
      error: (error) => {
        console.error("Error al cargar las series:", error);
        this.loading = false;
      }
    });
  }
}