import { Component, OnInit } from '@angular/core';
import {UserI, UserService} from "../services/user.service";
import {Router} from "@angular/router";
import {DataService} from "../data.service";
import {Subscription} from "rxjs";

@Component({
  selector: 'app-my-info',
  templateUrl: './my-info.component.html',
  styleUrls: ['./my-info.component.css']
})
export class MyInfoComponent implements OnInit {

  user:UserI = {
    address: "", birthday: undefined, email: "", name: "", password: "", phone: ""

  };
  private getUser: Subscription;

  constructor(private userService:UserService, private route:Router, private _dataService: DataService) {}

  ngOnInit(): void {
    this.getUser = this._dataService.getUser()
      .subscribe((user) => this.user = user);
  }


  goToEdit(){ this.route.navigate(['edit-info']);}
  goToChange(){ this.route.navigate(['change-password']);}
  gotoOrders(){ this.route.navigate(['my-order']);}
  goReply(){ this.route.navigate(['leave-review']);}
  signOut(){

    this._dataService.setStatusUser(false);
    let clearUser:UserI ={address: "", birthday: undefined, email: "", name: "", password: "", phone: ""};
    this._dataService.setUser(clearUser);
    this.userService.logOut();
    this.route.navigate(['/'])


    if(localStorage.getItem('cart')) {
      this._dataService.setProduct(JSON.parse(localStorage.getItem('cart')));
    }else{
      localStorage.setItem('cart', JSON.stringify([]))
      this._dataService.setProduct(JSON.parse(localStorage.getItem('cart')));
    }



  }

}
