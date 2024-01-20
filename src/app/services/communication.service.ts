import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CommunicationService {

  favs:BehaviorSubject<boolean> = new BehaviorSubject(true);
  favs$ = this.favs.asObservable(); 
  
  constructor(
  ) { }

  favsChanges(state:boolean):void {
    this.favs.next(state);
  }

}
