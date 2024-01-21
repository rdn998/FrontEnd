import { Component, ElementRef, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { Unity } from '../../models/Unity';
import { Subscription } from 'rxjs';
import { CommunicationService } from '../../services/communication.service';

@Component({
  selector: 'app-converter',
  templateUrl: './converter.component.html',
  styleUrl: './converter.component.css'
})

export class ConverterComponent implements OnInit, OnDestroy {

  subscription:Subscription;
  select:String[] = ["km → miles","miles → km","cm → inches", "inches → cm", "feet → meters", "meters → feet", "yard → milimeters", "milimeters → yards"];
  aUnity:Unity[] = [
    {name:"miles", cuantity: 0.621371},
    {name:"km", cuantity: 1.60934},
    {name:"inches", cuantity: 0.393701},
    {name:"cm", cuantity: 2.54},
    {name:"meters", cuantity: 3.28084},
    {name:"feet", cuantity: 0.3048},
    {name:"milimeters", cuantity: 914.4},
    {name:"yards", cuantity: 0.00109361}
  ];
  result:number = 0;
  unity:string = "km";
  unityCon:string = "miles";
  cuantity:number = 0;
  aFavs:string[] = [];

  constructor(
    private _communicationService:CommunicationService,
    private elementRef: ElementRef<HTMLElement>
  ){}

  convert(e:any) {
    this.unity = (e.target.selectedOptions[0].value.split('→')[0]).trim();
    this.unityCon = (e.target.selectedOptions[0].value.split('→')[1]).trim();
    this.calculate();
  }

  private calculate() {
    let aUnity:Unity[] = this.aUnity.filter((u) => u.name == this.unityCon);
    this.result = Number.parseFloat((aUnity[0].cuantity * this.cuantity).toFixed(2));
  }

  write() {
    this.calculate();
  }

  changeConverter() {
    let unity = this.unity;
    let unityCon = this.unityCon;
    let cuantity = this.cuantity;
    let result = this.result;

    this.unity = unityCon;
    this.cuantity = result;
    this.unityCon = unity;
    this.result = cuantity;

    const element:any = document.getElementById('convert') || {value: ''};
    element.value = `${this.unity} → ${this.unityCon}`;
  }

  bookmark() {
    if(this.cuantity != 0) {
      this.aFavs.push(`${this.cuantity} ${this.unity} → ${this.result} ${this.unityCon}`);
      localStorage.setItem('favs', JSON.stringify(this.aFavs));
      this._communicationService.favsChanges(true);
      this.cuantity = 0;
      this.result = 0;
    }
  }

  subscribeFavs():void {
    this.subscription = this._communicationService.favs$.subscribe({
      next: (datos) => {this.getFavs()},
      error: (error) => {},
      complete: () => {}
    });
  }

  getFavs() {
    if(localStorage.getItem('favs')) this.aFavs = JSON.parse(localStorage.getItem('favs') || '');
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  ngOnInit(): void {
    this.subscribeFavs();
  }

}
