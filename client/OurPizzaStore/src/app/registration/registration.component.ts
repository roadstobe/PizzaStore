import { Component, OnInit } from '@angular/core';
import {NgForm} from "@angular/forms";
import {Router} from "@angular/router";
import {UserService} from "../services/user.service"

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css']
})
export class RegistrationComponent implements OnInit {


  onSubmit(form: NgForm){

    if(form.valid){
      this.userService.register(form.value.userName, form.value.email ,form.value.phone , form.value.address , form.value.dateOfBirth,form.value.password )
        .subscribe(data=>{
          console.log(data);
            if(data['status'] === 'success registered'){
              alert('Registration success')
              this.router.navigate(['/login'])
            }

          },
          (error)=>{console.log(error);
          });
    }
  }
  constructor(private userService:UserService ,  private router :Router) { }


  ngOnInit(): void {
  }

}
