import {Injectable} from '@angular/core';
import {HttpClient, HttpClientModule, HttpParams} from "@angular/common/http";
import {Observable} from "rxjs";
import {map} from "rxjs/operators";


export interface UserI {
  id?: string,
  discount?: number,
  name: string,
  email: string,
  phone: string,
  password: string,
  address: string,
  birthday: Date
  order?: any[],
  role?: string

}


@Injectable({
  providedIn: 'root'
})
export class UserService {


  constructor(private httpClient: HttpClient) {
  }


  private isAuth: boolean = false;


  login() {
    this.isAuth = true;
  }

  logOut() {
    this.isAuth = false;
  }

  isAuthenticated(): Promise<boolean> {
    return new Promise<boolean>(resolve => {
      resolve(this.isAuth);
    });
  }

  checkUser(email: string, password: string): Observable<UserI> {
    return this.httpClient.post<UserI>("http://localhost:9000/userApi/check", {
      email: email,
      password: password,
    })
      .pipe(
        map((user) => {
          console.log('here', user);
          if (user) localStorage.setItem("token", user["token"]);
          return user;
        })
      );
  }

  register(userName: string, email: string, phone: string, address: string, dateOfBirth: Date, password: string): Observable<any> {
    let user: UserI = {
      name: userName,
      email: email,
      phone: phone,
      address: address,
      birthday: dateOfBirth,
      password: password
    }
    /* console.log(user); */
    return this.httpClient.post("http://localhost:9000/userApi/add", user)
      .pipe(
        map((res) => {
          console.log(res);
          if (!res) return false;
          return res;
        })
      );
  }

  getOrders(idUser): Observable<Array<any>> {
    return this.httpClient.post<Array<any>>('http://localhost:9000/userApi/orders', {idUser})
  }

  editUserData(data) {
    return this.httpClient.post('http://localhost:9000/userApi/update', {data})
  }
}
