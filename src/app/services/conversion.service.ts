import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { GLOBAL } from './global';
import { Conversion } from '../models/Conversion';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class ConversionService {

  url:string = GLOBAL.API_URL;

  constructor(
    private _http:HttpClient
  ) { }

  get():Observable<Conversion[]> {
    return this._http.get<Conversion[]>(this.url.concat("unity"));
  }
  
  save(conversion:Conversion):Observable<any> {
    return this._http.post<Conversion>(this.url.concat("unity"), conversion);
  }

  delete(id:number) {
    return this._http.delete<Conversion>(this.url.concat(`unity/${id}`));
  }
}