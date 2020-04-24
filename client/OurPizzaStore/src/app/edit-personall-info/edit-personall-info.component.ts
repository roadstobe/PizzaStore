import { Component, OnInit } from '@angular/core';
import {UserI, UserService} from "../services/user.service";
import {Subscription} from "rxjs";
import {Router} from "@angular/router";
import {DataService} from "../data.service";
import {FormControl, FormGroup, Validators} from "@angular/forms";

@Component({
  selector: 'app-edit-personall-info',
  templateUrl: './edit-personall-info.component.html',
  styleUrls: ['./edit-personall-info.component.css']
})
export class EditPersonallInfoComponent implements OnInit {

  user:UserI={
    address: "", birthday: undefined, email: "", name: "", password: "", phone: ""

  };
  form:FormGroup;
  private getUser: Subscription;

  constructor(private userService:UserService, private route:Router, private _dataService: DataService) { }

  ngOnInit(): void {

    this.getUser = this._dataService.getUser()
      .subscribe((user) => {
        this.user = user;
        let date = new Date(this.user.birthday)
        console.log(date);


        this.form = new FormGroup({
          email: new FormControl(this.user.email, [Validators.required, Validators.email]),
          name: new FormControl(this.user.name, [Validators.required, Validators.minLength(4)]),
          address: new FormControl(this.user.address, [Validators.required, Validators.minLength(5)]),
          phone: new FormControl(this.user.phone, [Validators.required, Validators.minLength(9)]),
          birthday: new FormControl(date, [Validators.required]),
        })
      });




  }

  submit(){
    if(this.form.valid){
      let newUser:UserI = {
        id: this.user['_id'],
        address: this.form.value.address,
        birthday: this.form.value.birthday,
        email: this.form.value.email,
        name: this.form.value.name,
        password: this.user.password,
        phone: this.form.value.phone,

      }

      this.userService.editUserData(newUser).subscribe(response=>{
        console.log(response)
      });

      if(this.user.email !== this.form.value.email){
        this.userService.logOut();
        this._dataService.setStatusUser(true);
        this._dataService.setStatusUser(false);
        this._dataService.setUser('');
        this._dataService.setIdUser('')
        this.route.navigate(['/login'])
        return;
      }

      this.userService.checkUser(this.user.email, this.user.password).subscribe(response=>{
        if(response['user']){
          this._dataService.setStatusUser(true);
          this._dataService.setUser(response['user']);
          this._dataService.setIdUser(response['user']._id)
          this.route.navigate(['/my-info'])

        }

      }, error => {console.log(error); console.log('error');})

    }
  }

}
