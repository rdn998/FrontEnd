import { Component, Input } from '@angular/core';
import { CommunicationService } from '../../services/communication.service';

@Component({
  selector: 'app-favorites',
  templateUrl: './favorites.component.html',
  styleUrl: './favorites.component.css'
})
export class FavoritesComponent {
  
  aFavs:string[] = [];
  @Input() fav:string;

  constructor(
    private _communicationService:CommunicationService
  ) {}


  deleteFav() {
    this.getFavs();
    this.aFavs = this.aFavs.filter((s) => s != this.fav);
    localStorage.setItem('favs', JSON.stringify(this.aFavs));
    this._communicationService.favsChanges(true);
  }

  getFavs() {
    if(localStorage.getItem('favs')) this.aFavs = JSON.parse(localStorage.getItem('favs') || '');
  }

}
