import { Injectable } from "@angular/core";
import { Login } from "../models/Login";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Observable } from "rxjs";

@Injectable()
export class UsuariosService {

    private url: string = 'https://67e7f7da20e3af747c400878.mockapi.io/dwec06/api/usuarios';

      private httpOptions = {
        headers: new HttpHeaders({
        'Content-Type': 'application/json'
        })
      };
    
      constructor(public _http : HttpClient) {}
      
      
      getUsuarios(): Observable<Login[]> {
        return this._http.get<Login[]>(this.url);
      }
    
      getUsuarioyId(id: number): Observable<Login> {
        return this._http.get<Login>(`${this.url}/${id}`);
      }
    
      createUsuario(login: Login): Observable<Login> {
        return this._http.post<Login>(this.url, login, this.httpOptions);
      }
    
      updateUsuario(login: Login): Observable<Login> {
        return this._http.put<Login>(`${this.url}/${login.id}`, login, this.httpOptions);
      }
    
      deleteUsuario(id: number): Observable<any> {
        return this._http.delete(`${this.url}/${id}`);
      }
    }