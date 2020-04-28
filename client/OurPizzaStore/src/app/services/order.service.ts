import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import { delay } from 'rxjs/internal/operators/delay';
import { map } from 'rxjs/internal/operators';


@Injectable({
  providedIn: 'root'
})
export class OrderService {

  constructor(private httpClient:HttpClient) { }

  getOrders():Observable<any[]>{

  return this.httpClient.post<any[]>('http://localhost:9000/orderApi/get', {});
  }

  removeOrder(Id){
   
    return this.httpClient.post('http://localhost:9000/orderApi/delete', {Id});
  }
 
 
 


}
