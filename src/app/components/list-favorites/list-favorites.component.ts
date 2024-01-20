import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { CommunicationService } from '../../services/communication.service';

@Component({
  selector: 'app-list-favorites',
  templateUrl: './list-favorites.component.html',
  styleUrl: './list-favorites.component.css'
})
export class ListFavoritesComponent implements OnInit {
  
  subscription:Subscription;
  aFavs:string[] = [];

  constructor(
    private _communicationService:CommunicationService
  ){}

  getFavs() {
    this.aFavs = JSON.parse(localStorage.getItem('favs') || '');
  }

  ngOnInit(): void {
    this.subscribeFavs();
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  subscribeFavs():void {
    this.subscription = this._communicationService.favs$.subscribe({
      next: (datos) => {this.getFavs()},
      error: (error) => {},
      complete: () => {}
    });
  }

}
