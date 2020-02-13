import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Game } from '../interfaces/interfaces';
import { of } from 'rxjs';
import { tap, catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class GameService {

  private juegos: Game[] = [];

  constructor(private http: HttpClient) { }

  getNominados() {
    //asi ahorramos llamadas a petiones innecesarias

    if(this.juegos.length > 0) {
      //retorna observable de juegos vacios
      return of(this.juegos);
    } else {
      return this.http.get<Game[]>(`${environment.url}/api/goty`)
        .pipe(
          tap(juegos => this.juegos = juegos )
        );
    }

  }

  votarJuego(id: string) {
    
    return this.http.post(`${environment.url}/api/goty/${id}`, {})
    .pipe(
      catchError(err => {
        throw err.error;
      })
    );

  }

}
