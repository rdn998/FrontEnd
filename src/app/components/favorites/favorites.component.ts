import { Component, Input } from '@angular/core';
import { CommunicationService } from '../../services/communication.service';
import { Conversion } from '../../models/Conversion';
import { ConversionService } from '../../services/conversion.service';

@Component({
  selector: 'app-favorites',
  templateUrl: './favorites.component.html',
  styleUrl: './favorites.component.css'
})
export class FavoritesComponent {
  
  aFavs:string[] = [];
  @Input() fav:string;
  @Input() favCon:Conversion;

  constructor(
    private _communicationService:CommunicationService,
    private _conversionService:ConversionService
  ) {}


  deleteFav() {
    this._conversionService.delete(this.favCon.id || 0).subscribe({
      next: (datos) => {},
      error: (error) => {},
      complete: () => {this._communicationService.favsChanges(true);}
    });
    /*this.getFavs();
    this.aFavs = this.aFavs.filter((s) => s != this.fav);
    localStorage.setItem('favs', JSON.stringify(this.aFavs));*/
    
  }

  getFavs() {
    if(localStorage.getItem('favs')) this.aFavs = JSON.parse(localStorage.getItem('favs') || '');
  }

}
