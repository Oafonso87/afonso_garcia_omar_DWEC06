import { Injectable } from "@angular/core";
import { Review } from "../models/Review";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Observable } from "rxjs";

@Injectable()
export class ReviewsService {

  private url: string = 'https://67e7f7da20e3af747c400878.mockapi.io/dwec06/api/resenias';

  private httpOptions = {
    headers: new HttpHeaders({
    'Content-Type': 'application/json'
    })
  };

  constructor(public _http : HttpClient) {}
  
  
  getReviews(): Observable<Review[]> {
    return this._http.get<Review[]>(this.url);
  }

  getReviewById(id: number): Observable<Review> {
    return this._http.get<Review>(`${this.url}/${id}`);
  }

  createReview(review: Review): Observable<Review> {
    return this._http.post<Review>(this.url, review, this.httpOptions);
  }

  updateReview(review: Review): Observable<Review> {
    return this._http.put<Review>(`${this.url}/${review.id}`, review, this.httpOptions);
  }

  deleteReview(id: number): Observable<any> {
    return this._http.delete(`${this.url}/${id}`);
  }
}
          
