import { Component, OnInit } from '@angular/core';
import {DataService} from "../data.service";
import {ProductService} from "../services/product.service";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {UserI, UserService} from "../services/user.service";

@Component({
  selector: 'app-make-order',
  templateUrl: './make-order.component.html',
  styleUrls: ['./make-order.component.css']
})
export class MakeOrderComponent implements OnInit {

  dataProducts:any[];
  amountPrice:number = 0;
  form:FormGroup;
  user:UserI;

  constructor(private _dataService:DataService,
              private productService:ProductService,
              private userService:UserService) { }


  ngOnInit(): void {
    this._dataService.getProductInCart().subscribe(product=>{
      this.dataProducts = product;
      this.amountPrice = this.dataProducts.reduce((acc, el)=>{
        return acc += el.price * el.count
      }, 0)
    });

    this._dataService.getUser().subscribe(user=>{
      this.user = user;
      this.form = new FormGroup({
        email: new FormControl(user.email, [Validators.required, Validators.email]),
        name: new FormControl(user.name, [Validators.required, Validators.minLength(8)]),
        address: new FormControl(user.address, [Validators.required, Validators.minLength(5)]),
        phone: new FormControl(user.phone, [Validators.required, Validators.minLength(9)])
      })
    })
  }

  deleteOneItem(id: any, price:number) {
    let idx = this.dataProducts.findIndex(el => el.id == id && el.price == price)
    let oldItem = this.dataProducts[idx];
    let newArrProd = [];
    if(oldItem.count > 1){
      oldItem.count -= 1
      newArrProd = [...this.dataProducts.slice(0, idx), oldItem, ...this.dataProducts.slice(idx+1)]
    }else{
      newArrProd = [...this.dataProducts.slice(0, idx), ...this.dataProducts.slice(idx+1)];
    }
    this._dataService.setProduct(newArrProd);


    if(this.user['_id']){
      this.productService.saveCartForUser(this.user['_id'], newArrProd, this.amountPrice).subscribe(res=>{
        console.log(res)
      },error => {console.log(error)})
    }
    else{
      localStorage.setItem('cart', JSON.stringify(newArrProd));
    }

  }

  submit() {
    if(this.form.valid) {
      this.productService.makeOrder(this.user['_id'],
        this.dataProducts,
        this.amountPrice)
        .subscribe(response => {
        console.log(response)
          this._dataService.setProduct([]);
          if(this.user['_id']){
            this.productService.saveCartForUser(this.user['_id'], [], this.amountPrice)
          }
          else{
            localStorage.setItem('cart', JSON.stringify([]));
          }
      }, error => {console.log(error)});
    }
  }
}
