import { Component, OnInit } from '@angular/core';
import {FeedbackService} from "../services/feedback.service";

@Component({
  selector: 'app-feedback',
  templateUrl: './feedback.component.html',
  styleUrls: ['./feedback.component.css']
})
export class FeedbackComponent implements OnInit {

  feedbackArray;

  constructor(private feedback:FeedbackService) { }


  ngOnInit(): void {
    this.feedback.getFeedback().subscribe(res=>{
      this.feedbackArray = res
    })
  }

}
