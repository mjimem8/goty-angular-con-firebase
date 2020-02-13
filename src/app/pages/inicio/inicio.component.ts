import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { map } from 'rxjs/operators';
import { Game } from '../../interfaces/interfaces';

@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.component.html',
  styleUrls: ['./inicio.component.css']
})
export class InicioComponent implements OnInit {

  juegos: any[] = [];

  constructor(
    private db: AngularFirestore
  ) { }

  ngOnInit() {
    //para que nos lo permita en la web database -> reglas -> 
    //poner asi -> "allow read;"
    this.db.collection('goty').valueChanges()
      .pipe(
        map((juegos: Game[]) => {
          return juegos.map(({name, votos}) => ({name, value: votos}))
        })
      )
      .subscribe(juegos => {
        this.juegos = juegos;
      });

  }

}
