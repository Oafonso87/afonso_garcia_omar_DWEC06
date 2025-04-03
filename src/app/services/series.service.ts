import { Injectable } from "@angular/core";
import { Serie } from "../models/Serie";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Observable } from "rxjs";

@Injectable()
export class SeriesService {

    private url: string = 'https://api.tvmaze.com/shows?page=';

    constructor(public _http : HttpClient) {}
    
    getAllSeries(): Observable<Serie[]> {
        return new Observable<Serie[]>(observer => {
          const seriesArray: Serie[] = [];
          let page = 0;
      
          const cargarPagina = () => {
            this._http.get<any[]>(`${this.url}${page}`).subscribe({
              next: (data) => {
                if (data.length === 0) {
                  observer.next(seriesArray);
                  observer.complete();
                } else {
                  data.forEach(show => {
                    let serie = new Serie(
                      show.id,
                      show.name,
                      show.rating?.average || 0,
                      show.image?.medium || 'img/No-Image-Placeholder.svg.png',
                      Array.isArray(show.genres) ? show.genres.join(', ') : '',
                      show.premiered ? new Date(show.premiered).getFullYear() : "Desconocido",
                      show.network ? show.network.name : "Desconocido",
                      show.summary
                    );
                    seriesArray.push(serie);
                  });
                  page++;
                  cargarPagina();
                }
              },
              error: (error) => {
                if (error.status === 404) {
                    const topSeries = seriesArray
                    .sort((a, b) => b.rating - a.rating)
                    .slice(0, 200);
                  observer.next(topSeries);
                  observer.complete();
                } else {
                  console.error('Error al cargar las series:', error);
                  observer.error(error);
                }
              }
            });
          };      
          cargarPagina();
        });
    }      
}