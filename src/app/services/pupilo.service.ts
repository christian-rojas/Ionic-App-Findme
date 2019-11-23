import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Pupilo } from "../interfaces/pupilo";
@Injectable({
  providedIn: 'root'
})
export class PupiloService {
	items;
	API_ENDPOINT = 'http://192.168.0.13:8000/api/notas';
	constructor(private http:HttpClient) {
	}
	get(){
		//return this.http.get(this.API_ENDPOINT + "/notas")
		fetch(this.API_ENDPOINT, {
		  method: 'GET',
		  headers:{
		    'Content-Type': 'application/json'
		  }
		}).then(res => res.json())
		.catch(error => console.error('Error:', error))
	.then(response => this.items =  response);
		//return this.items;
	}
	getById(id){
		if(id){
			return this.http.get(this.API_ENDPOINT + "/notas/"+id);
		}
		
	}
	/*save(pupilo: Pupilo){
		const headers = new HttpHeaders({'Content-Type': 'application/json'});
		return this.http.post(this.API_ENDPOINT + '/notas',pupilo, {headers: headers});
	}*/
	save(url,datos){
		fetch(url, {
      method: 'POST',
      body:JSON.stringify(datos),
		  headers:{
		    'Content-Type': 'application/json'
		  }
		}).then(res => res.json())
		.catch(error => console.error('Error:', error));
	}

	put(url,id,datos){
		/*const headers = new HttpHeaders({'Content-Type':'application/json'});
		return this.http.put(this.API_ENDPOINT + '/notas/' + pupilo.id, pupilo, {headers: headers});*/
		console.log('hola update')
    //let id = localStorage.getItem('id_cosito');
    fetch(url+"/"+id, {
      method: 'PUT',
      body:JSON.stringify(datos),
		  headers:{
		    'Content-Type': 'application/json'
		  }
		}).then(res => res.json())
		.catch(error => console.error('Error:', error));
    
   
            //console.log(this.addForm.getRawValue());
    
    console.log('adios update')
	}
	delete(url,id){
		//return this.http.delete(this.API_ENDPOINT + '/notas/' + id);
		console.log('hola')
    fetch(url + '/' + id, {
      method: 'delete',headers:{
		    'Content-Type': 'application/json'}
    })
    
    console.log('adios')
	}
}