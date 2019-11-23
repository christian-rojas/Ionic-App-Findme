import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FormGroup, FormBuilder, FormControl, Validators, NgForm, NgModel } from '@angular/forms';
import { PupiloModel } from '../models/pupilo';
import { PupiloService} from '../services/pupilo.service';
import { map, delay } from 'rxjs/operators';
import { JsonPipe } from '@angular/common';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  
  pupilo: PupiloModel = new PupiloModel();
  //pupilo:{};
  cart = [];
  items = [];
  edits;
showButton:boolean;  datos_a_editar={
  ​  direccion: "",
    enfermedad: "",
    nombre: "",
    precauciones: "",
    telefono: "",
  };

  addForm : FormGroup;
  constructor(private http: HttpClient, private pupiloService:PupiloService) {
    /*this.addForm = new FormGroup({
      nombre: new FormControl(),
      enfermedad: new FormControl(),
      direccion: new FormControl(),
      telefono: new FormControl(),
      precauciones: new FormControl()
   });*/

  }

  url = "http://192.168.0.13:8000/api/notas";
  ionViewWillEnter() {
    this.items = this.getAll();
    //this.items = this.pupiloService.get();
    //console.log("items: "+this.items);
    //this.items = this.cartService.getProducts();
     

    this.showButton= false;
    console.log('show:'+this.showButton);
    
    
    //this.cart = this.cartService.getCart();
  }

  getAll(){

    fetch(this.url, {
		  method: 'GET',
		  headers:{
		    'Content-Type': 'application/json'
		  }
		}).then(res => res.json())
		.catch(error => console.error('Error:', error))
    .then(response => this.items =  response); 
    return this.items;
  }

  /*borrarHeroe( id: string ) {
    console.log('hola');
    this.http.delete(`${ this.url }/?${ id }`);
    console.log('chao');

  }*/

  clean(){
    this.datos_a_editar={
      ​  direccion: "",
        enfermedad: "",
        nombre: "",
        precauciones: "",
        telefono: "",
      }
  }
  borrarHeroe(id: string) {
    this.pupiloService.delete(this.url, id);
    let index = localStorage.getItem('index');
    this.items.splice(parseInt(index),1);
    //this.items = this.get();

  }

  editarPupilo() {
    let id = localStorage.getItem('id_cosito');
    let index = localStorage.getItem('index');
    console.log('id: '+id);
    console.log('index: '+index);
    this.pupiloService.put(this.url, id, this.datos_a_editar);
    
    this.items.splice(parseInt(index),1,this.datos_a_editar);
    this.clean();
    this.showButton=false;
    
    //this.items = this.pupiloService.get();
    //let index = localStorage.getItem('index');
    //this.items.splice(parseInt(index));

  }

  llamarEditar(id: string,i: string){
    console.log('hola llamar editar');
    fetch(this.url +"/"+id, {
		  method: 'GET',
		  headers:{
		    'Content-Type': 'application/json'
		  }
    }).then(res => res.json())
    .catch(error => console.error('Error mio:', error))
    .then(respuesta => this.process_llamarEditar(respuesta));
    localStorage.setItem('id_cosito',id);
    localStorage.setItem('index',i);
    //
  /* 
    this.addForm.controls['nombre'].setValue(this.edits.nombre);
    this.addForm.controls['enfermedad'].setValue(this.edits.enfermedad);
    this.addForm.controls['direccion'].setValue(this.edits.direccion);
    this.addForm.controls['telefono'].setValue(this.edits.telefono);
    this.addForm.controls['precauciones'].setValue(this.edits.precauciones);
 x
    console.log('items: '+JSON.stringify(this.edits.nombre));
    localStorage.setItem('id_cosito',this.edits.id);
             */
  }
  /*llamarEditar(){
    
  }*/

  process_llamarEditar(res){
    console.log(res);
    this.datos_a_editar = res;
    
  }

  /*agregar() {
    console.log('hola agregar');
    //console.log(this.addForm.value.nombre)
    fetch('http://localhost:8000/api/notas', {
      method: 'POST',
      body:JSON.stringify(this.addForm.getRawValue()),
		  headers:{
		    'Content-Type': 'application/json'
		  }
		}).then(res => res.json())
		.catch(error => console.error('Error:', error));
    
   
            console.log(this.addForm.getRawValue());
  }*/
  agregar(form :NgForm){
    //console.log(this.datos_a_editar);
    this.pupiloService.save(this.url,this.datos_a_editar);
    this.items.push(this.datos_a_editar);
    this.clean();
  }
}
