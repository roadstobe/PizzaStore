import { Injectable } from '@angular/core';
import {BehaviorSubject, Observable} from "rxjs";
import {UserI} from "./services/user.service";

@Injectable({
  providedIn: 'root'
})
export class DataService {

  private navTitle$: BehaviorSubject<string> = new BehaviorSubject<string>('Default nav title');
  private statusUser$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  private isUser$: BehaviorSubject<UserI> = new BehaviorSubject<UserI>({
    address: "",
    birthday: undefined,
    email: "",
    name: "",
    password: "",
    phone: ""
  });

  public setStatusUser(newStatusUser: boolean):void{
    this.statusUser$.next(newStatusUser)
  }
  public getStatusUser():Observable<boolean>{
    return this.statusUser$.asObservable();
  }
  public setUser(newUser){
    this.isUser$.next(newUser)
  };
  public getUser(){
    return this.isUser$.asObservable();
  }

  public setIdUser(newNavTitle: string): void {
    this.navTitle$.next(newNavTitle);
  }

  public getIdUser(): Observable<string> {
    return this.navTitle$.asObservable();
  }


  //////////////////////////////////////
  ///////////////for cart///////////////

  private inCartProduct$:BehaviorSubject<any[]> = new BehaviorSubject<any[]>([]);
  public setProduct(newProduct:any[]){
    this.inCartProduct$.next(newProduct);
  }
  public getProductInCart():Observable<any[]> {
    return this.inCartProduct$.asObservable();
  }
}
