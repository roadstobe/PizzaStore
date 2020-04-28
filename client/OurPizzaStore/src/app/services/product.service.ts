import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import { delay } from 'rxjs/internal/operators/delay';
import { map } from 'rxjs/internal/operators';
export interface ProductI {
  id?:String,
  typeProduct: String,
  productName: String,
  kind:String,
  price:Array<any>,
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

  addProducts(Ptype , Pname , Pkind , Pprice , Pnutrients , Pdesc , Pimge):Observable<ProductI[]>{

      var product : ProductI={
 
  typeProduct: Ptype,
  productName: Pname,
  kind:Pkind,
  price:Pprice,
  nutrients: Pnutrients,
  description: Pdesc,
  img: Pimge
}
    return this.httpClient.post<ProductI[]>('http://localhost:9000/productApi/add', product);
    }

  getProductById(arrProdIds):Observable<ProductI[]>{
    return this.httpClient.post<ProductI[]>('http://localhost:9000/productApi/getByIds', {arrProdIds})
  }

  removeProductById(Id){
   
    return this.httpClient.post('http://localhost:9000/productApi/deleteByIds', {Id});
  }

  makeOrder(idUser, product, amountPrice){
    return this.httpClient.post('http://localhost:9000/orderApi/add', {idUser, product,amountPrice})
  }
  editProducts(id , Ptype , Pname , Pkind , Pprice , Pnutrients , Pdesc , Pimge):Observable<ProductI[]>{

    var product : ProductI={
id:id,
typeProduct: Ptype,
productName: Pname,
kind:Pkind,
price:Pprice,
nutrients: Pnutrients,
description: Pdesc,
img: Pimge
}
  return this.httpClient.post<ProductI[]>('http://localhost:9000/productApi/Edit', product);
  }

  saveCartForUser(idUser, product, amountPrice){
    return this.httpClient.post('http://localhost:9000/cartApi/add', {idUser, product,amountPrice})
  }

  getCartUser(idUser){
    return this.httpClient.post('http://localhost:9000/cartApi/get', {idUser})
  }


}
