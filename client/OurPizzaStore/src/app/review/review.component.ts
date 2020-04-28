import { Component, OnInit } from '@angular/core';
import {UserI, UserService} from "../services/user.service";
import {Subscription} from "rxjs";
import {Router} from "@angular/router";
import {DataService} from "../data.service";
import {FeedbackService} from "../services/feedback.service";

@Component({
  selector: 'app-review',
  templateUrl: './review.component.html',
  styleUrls: ['./review.component.css']
})
export class ReviewComponent implements OnInit {


  user:UserI = {
    address: "", birthday: undefined, email: "", name: "", password: "", phone: ""

  };
  private getUser: Subscription;
  constructor(private userService:UserService,
              private route:Router,
              private _dataService: DataService,
              private feedback:FeedbackService
  ) {}

  ngOnInit(): void {
    this.getUser = this._dataService.getUser()
      .subscribe((user) => {
        this.user = user;
      });
  }

  sendFeedback() {
    let text = document.getElementById('exampleFormControlTextarea1');

    this.feedback.addFeedback(this.user['_id'], this.user.name, text['value']).subscribe(res=>{
      if(res['status'] === 'added'){
        alert('Feedback added')
      }else{
        alert('some error try later')
      }
      this.route.navigate(['/']);
    })
    console.dir(text['value'])
  }
}
