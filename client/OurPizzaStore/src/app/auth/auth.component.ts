import {Component, OnDestroy, OnInit} from '@angular/core';
import {DataService} from "../data.service";
import {Subscription} from "rxjs";

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css']
})
export class AuthComponent implements OnInit, OnDestroy {

  public navTitleToGet: boolean = false;

  private getStatusUserSubscription: Subscription;


  constructor(private _dataService: DataService) { }

  ngOnInit(): void {

    this.getStatusUserSubscription = this._dataService.getStatusUser()
      .subscribe((status: boolean) =>{
        this.navTitleToGet = status;
        console.log(this.navTitleToGet)
      } );

  }


  ngOnDestroy() {
    this.getStatusUserSubscription.unsubscribe();
  }

}
