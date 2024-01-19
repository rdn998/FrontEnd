import { Component } from '@angular/core';
import { Unity } from '../../models/Unity';

@Component({
  selector: 'app-converter',
  templateUrl: './converter.component.html',
  styleUrl: './converter.component.css'
})

export class ConverterComponent {

  select:String[] = ["km -> miles","miles -> km","cm -> inches", "inches -> cm", "feet -> meters", "meters -> feet", "yard -> millimeters", "millimeters -> yards"];
  converts:Unity[] = [
    {name:"miles", cuantity: 0.621371},
    {name:"km", cuantity: 1.60934},
    {name:"inches", cuantity: 0.393701},
    {name:"cm", cuantity: 2.54},
    {name:"meters", cuantity: 3.28084},
    {name:"feet", cuantity: 0.3048},
    {name:"milimeters", cuantity: 914.4},
    {name:"yards", cuantity: 0.00109361}];
  result:number = 0;


  convert(e:any) {
    let unity = e.target.selectedOptions[0].value.split('->')[0];
    let unityCon = e.target.selectedOptions[0].value.split('->')[1];
    console.log(this.converts.find(u => console.log(u.name)));
    
  }

}
