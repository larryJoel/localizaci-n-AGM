import { Component, OnInit } from '@angular/core';
import { Marcador } from 'src/app/classes/marcador.class';
import { MatSnackBar } from "@angular/material/snack-bar";
import {MatDialog, MatDialogRef} from '@angular/material/dialog';
import { MapaEditarComponent } from './mapa-editar.component';
@Component({
  selector: 'app-mapa',
  templateUrl: './mapa.component.html',
  styleUrls: ['./mapa.component.css']
})
export class MapaComponent implements OnInit {

  marcadores: Marcador[]=[];

  title = 'Mi primer proyecto usando AGM (Angular Google Maps)';
  lat = -34.61003;
  lng = -58.37945;
  constructor( private snackBar:MatSnackBar,
               public dialog: MatDialog
               ) { 
    // const newMarcador = new Marcador(51.678418,7.809007);
    // this.marcadores.push(newMarcador)
    if(localStorage.getItem('marcadores')){
      this.marcadores = JSON.parse(localStorage.getItem('marcadores')!);
    }
  }

  ngOnInit(): void {
  }

  agregarMarcador(evento:any){
    const coords: {lat:number, lng:number} = evento.coords;
    const newMarcador = new Marcador(coords.lat,coords.lng);
    this.marcadores.push(newMarcador)
    this.guardarStorage()
    this.snackBar.open('marcador Agregado', 'Cerrar',{duration:2000});
  }

  guardarStorage(){
    localStorage.setItem('marcadores',JSON.stringify(this.marcadores))
  }
  

  borrarMarcador(i:number){
      this.marcadores.splice(i,1);
      this.guardarStorage();
    this.snackBar.open('marcador Borrado', 'Cerrar',{duration:2000});
  }

  editarMarcador(marcador:Marcador){
    const dialogRef = this.dialog.open(MapaEditarComponent, {
      width: '250px',
      data: {titulo: marcador.titulo, desc: marcador.desc}
    });
    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      if(!result){
        return;
      }
      marcador.titulo = result.titulo;
      marcador.desc = result.desc;

      this.guardarStorage();
      this.snackBar.open('marcador Actualizado', 'Cerrar',{duration:2000});
    });
  }
  

}
