import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {DataService} from "../data.service";

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  amountProduct: number;
  dataProducts:any[];


  constructor(private route: ActivatedRoute, private router: Router,private _dataService:DataService,) { }

  ngOnInit(): void {
    this._dataService.getProductInCart().subscribe(product=>{
      this.amountProduct = product.length
    });
  }

  onAnchorClick() {
    // this.route.fragment.subscribe ( f => {
    //   const element = document.querySelector ( "#" + f )
    //   if ( element ) element.scrollIntoView ( element )
    // });
  }
}
