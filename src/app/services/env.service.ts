import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class EnvService {

    API_URL='http://192.168.0.13:8000/api/';
  constructor() { }
}
