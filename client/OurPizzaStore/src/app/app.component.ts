import {Component, OnInit} from '@angular/core';
import {DataService} from "./data.service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  title = 'OurPizzaStore';
  lat: number = 49.8477485;
  lng: number = 24.0155463;


  constructor(private _dataService:DataService) {
  }

  ngOnInit(){


    if(localStorage.getItem('cart')){
      this._dataService.setProduct(JSON.parse(localStorage.getItem('cart')));
    }
  }

}



// <agm-map [latitude]="lat" [longitude]="lng">
//   <agm-marker [latitude]="lat" [longitude]="lng"></agm-marker>
// </agm-map>
