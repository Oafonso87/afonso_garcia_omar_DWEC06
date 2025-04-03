import { Component, OnInit } from '@angular/core';
import { Review } from '../models/Review';
import { ReviewsService } from '../services/reviews.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-resenias',
  standalone: false,
  templateUrl: './resenias.component.html',
  styleUrl: './resenias.component.css',
  providers: [ReviewsService]
})
export class ReseniasComponent implements OnInit {

  public listado : boolean = true;
  public formReview : boolean = false;
  public formEdit : boolean = false;

  public serie : string = '';
  public usuario : string = '';
  public review : string = '';
  public nota : number = 0;
  public fecha : number = Date.now();

  public idReviewEdit: number = 0;
  
  public mensaje : string = '';

  public usuarioGuardado : string | null = sessionStorage.getItem('usuarioLogueado');


  public usuarioObj : any = null;


  public reviews: Review[] = [];
  constructor(private _reviewsService: ReviewsService, private _router: Router) {}

  ngOnInit(): void {
    this.loadReviews();
    console.log(this.usuarioGuardado);
    
    if (this.usuarioGuardado) {
      this.usuarioObj = JSON.parse(this.usuarioGuardado);
      this.usuario = this.usuarioObj.nombre || '';
    }
  }

  loadReviews(): void {
    this._reviewsService.getReviews().subscribe({
      next: (data: Review[]) => {
        this.reviews = data;
      },
      error: (error) => {
        console.error("Error al cargar las reseñas:", error);
      }
    });
  }

  escribirReview() {    
    if (!this.usuarioGuardado) {
      alert("Antes de escribir una reseña debe loguearse");
    } else {
      this.listado = false;
      this.formReview = true;
    }

  }

  publicarReview() {

    if (this.formReview) {
      let nuevoReview = new Review(0, this.serie, this.usuario, this.review, this.nota, this.fecha);
      
      this._reviewsService.createReview(nuevoReview).subscribe({
        next: (res) => {
          this.formReview = false;
          alert("Reseña publicada con éxito")
          this.listado = true; 
        },
        error: (err) => {
          console.error("Error al registrar la review:", err);
        }
      });
    }
  }

  editarReview(reviewId: number): void {
    this._reviewsService.getReviewById(reviewId).subscribe({
      next: (review: Review) => {
        console.log("Review obtenida para editar:", review);        
            this.idReviewEdit = review.id;
            this.serie = review.serie;
            this.usuario = review.usuario;
            this.review = review.comentario;
            this.nota = review.puntuacion;

            this.formEdit = true;
            this.listado = false;
          },
          error: (err) => {
            console.error("Error al obtener la review:", err);
          }
        });
  }

  actualizarReview(): void {
    
    let reviewEditada = new Review(this.idReviewEdit, this.serie, this.usuario, this.review, this.nota, this.fecha);
    this._reviewsService.updateReview(reviewEditada).subscribe({
      next: (res) => {
        alert("Reseña actualizada con éxito");
        this.formEdit = false;
        this.listado = true;
        this.loadReviews();
      },
      error: (err) => {
        console.error("Error al actualizar la review:", err);
      }
    });
  }

  borrarReview(reviewId: number): void {
    this._reviewsService.deleteReview(reviewId).subscribe({
      next: (res) => {
        alert("Reseña borrada con éxito");
        this.formEdit = false;
        this.listado = true;
        this.loadReviews();
        
      },
      error: (err) => {
        console.error("Error al borrar la review:", err);
        alert("Error al borrar la reseña");
      }
    });
  }

}