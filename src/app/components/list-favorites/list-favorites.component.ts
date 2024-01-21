import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { CommunicationService } from '../../services/communication.service';
import { ConversionService } from '../../services/conversion.service';
import { Conversion } from '../../models/Conversion';

@Component({
  selector: 'app-list-favorites',
  templateUrl: './list-favorites.component.html',
  styleUrl: './list-favorites.component.css'
})
export class ListFavoritesComponent implements OnInit {
  
  subscription:Subscription;
  //aFavs:string[] = [];
  aFavsCon:Conversion[] = [];

  constructor(
    private _communicationService:CommunicationService,
    private _conversionService:ConversionService
  ){}

  /*getFavs() {
    this.aFavs = JSON.parse(localStorage.getItem('favs') || '');
  }*/

  getData() {
    this._conversionService.get().subscribe({
      next: (datos) => {this.aFavsCon = datos},
      error: (error) => {},
      complete: () => {}
    })
  }

  ngOnInit(): void {
    this.subscribeFavs();
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  subscribeFavs():void {
    this.subscription = this._communicationService.favs$.subscribe({
      next: (datos) => {this.getData()},
      error: (error) => {},
      complete: () => {}
    });
  }

}
