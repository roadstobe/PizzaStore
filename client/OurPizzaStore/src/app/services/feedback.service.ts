import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class FeedbackService {

  constructor(private http:HttpClient) { }

  addFeedback(userId, name, text){
    return this.http.post('http://localhost:9000/feedbackApi/add', {userId, name, text})
  }
  getFeedback(){
    return this.http.post('http://localhost:9000/feedbackApi/get', {})
  }
}
