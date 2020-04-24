import { Component, OnInit } from '@angular/core';
import {UserI, UserService} from "../services/user.service";
import {Subscription} from "rxjs";
import {DataService} from "../data.service";

@Component({
  selector: 'app-my-order',
  templateUrl: './my-order.component.html',
  styleUrls: ['./my-order.component.css']
})
export class MyOrderComponent implements OnInit {

  orders:Array<any>;
  idUser$:Subscription;
  idUser:string;

  constructor(private userService: UserService, private _dataService: DataService) { }

  ngOnInit(): void {

    this.idUser$ = this._dataService.getIdUser()
      .subscribe((id) => this.idUser = id);


    this.userService.getOrders(this.idUser).subscribe(response=>{
      this.orders = response;
      console.log(response)
    })
  }

}
