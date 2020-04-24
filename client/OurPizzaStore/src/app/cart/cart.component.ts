import {Component, OnDestroy, OnInit} from '@angular/core';
import {ProductI, ProductService} from "../services/product.service";
import {DataService} from "../data.service";
import {Subscription} from "rxjs";
import alertify  from 'alertifyjs';
import {UserI} from "../services/user.service";

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit, OnDestroy {

  dataProducts:any[];
  amountPrice:number = 0;
  isUser: UserI = {
    address: "", birthday: undefined, email: "", name: "", password: "", phone: ""

  }
  private getCart: Subscription;

  constructor(private _dataService:DataService,
              private productService:ProductService) { }




  ngOnInit(): void {
    this.getCart = this._dataService.getProductInCart().subscribe(product=>{
      this.dataProducts = product;
      this.amountPrice = this.dataProducts.reduce((acc, el)=>{
        return acc += el.price * el.count
      }, 0)
    })

    this._dataService.getUser().subscribe(user=> {
      if(user['_id']){
        this.isUser = user;
      }
    });

  }

  deleteOneItem(id: any, price:number) {
    //визначення ындексу де треба зробити змыни
    let idx = this.dataProducts.findIndex(el => el.id == id && el.price == price)
    let oldItem = this.dataProducts[idx];
    let newArrProd = [];


    //коригування корзини видалення або зменшення кылькосты
    if(oldItem.count > 1){
      oldItem.count -= 1
      newArrProd = [...this.dataProducts.slice(0, idx), oldItem, ...this.dataProducts.slice(idx+1)]
    }else{
      newArrProd = [...this.dataProducts.slice(0, idx), ...this.dataProducts.slice(idx+1)];
    }

    //запис даних
    if(this.isUser['_id']){
      this.productService.saveCartForUser(this.isUser['_id'], newArrProd, this.amountPrice).subscribe(res=>{
        console.log(res)
      },error => {console.log(error)})
    }
    else{
      localStorage.setItem('cart', JSON.stringify(newArrProd));
    }


    this._dataService.setProduct(newArrProd);






    //не працюэ
    alertify.alert().close(); 
    // alertify.set('notifier','position', 'top-left');
  //  alertify.success('Current position : ' + alertify.get('notifier','position'));
    // alertify.notify('sample', 'success', 5, function(){  console.log('dismissed'); });
  }


  ngOnDestroy() {
    this.getCart.unsubscribe();
  }
}
