import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";

export interface ProductI {
  id:String,
  typeProduct: String,
  productName: String,
  kind:String,
  price: Number,
  nutrients: Array<string>,
  description?:String,
  img?:string

}


@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor(private httpClient:HttpClient) { }

  getProducts():Observable<ProductI[]>{
  return this.httpClient.post<ProductI[]>('http://localhost:9000/productApi/getAll', {});
  }
  getProductById(arrProdIds):Observable<ProductI[]>{
    return this.httpClient.post<ProductI[]>('http://localhost:9000/productApi/getByIds', {arrProdIds})
  }

  makeOrder(idUser, product, amountPrice){
    return this.httpClient.post('http://localhost:9000/orderApi/add', {idUser, product,amountPrice})
  }


  saveCartForUser(idUser, product, amountPrice){
    return this.httpClient.post('http://localhost:9000/cartApi/add', {idUser, product,amountPrice})
  }

  getCartUser(idUser){
    return this.httpClient.post('http://localhost:9000/cartApi/get', {idUser})
  }


}
