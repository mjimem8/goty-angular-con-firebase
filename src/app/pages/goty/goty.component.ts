import { Component, OnInit } from '@angular/core';
import { GameService } from '../../services/game.service';
import { Game } from '../../interfaces/interfaces';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-goty',
  templateUrl: './goty.component.html',
  styleUrls: ['./goty.component.css']
})
export class GotyComponent implements OnInit {

  juegos: Game[] = [];

  constructor(
    private GameService: GameService
  ) { }

  ngOnInit() {
    this.GameService.getNominados()
      .subscribe(juegos => {
        this.juegos = juegos;
      });
  }

  votarJuego(juego: Game) {
    this.GameService.votarJuego(juego.id)
      .subscribe(
        (response: any) => {        
          Swal.fire('Gracias', response.mensaje, 'success');  
        },
        error => { 
          Swal.fire('Oops', error.mensaje, 'error');
        }
      );
  }

}
