import {Component, ElementRef, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {ProductI, ProductService} from "../services/product.service";
import {ActivatedRoute, Router} from "@angular/router";
import {DataService} from "../data.service";
import {Subscription} from "rxjs";
import alertify  from 'alertifyjs';
import {UserI} from "../services/user.service";

@Component({
  selector: 'app-main-menu',
  templateUrl: './main-menu.component.html',
  styleUrls: ['./main-menu.component.css']
})
export class MainMenuComponent implements OnInit, OnDestroy {

  page: number = 1;
  private getCart: Subscription;
  amountPrice:number = 0;
  isUser:UserI = {
    address: "", birthday: undefined, email: "", name: "", password: "", phone: ""

  }



  //продукт для карточок
  products:ProductI[] = []
  categoryArr = [];

  //не той продукт що продукт
  dataProducts:any[];

  filter:string = '';



  constructor(private productService:ProductService,
              private route: ActivatedRoute,
              private router: Router,
              private _dataService: DataService) { }


  ngOnInit(): void {

    this.productService.getCategory().subscribe(res=>{
      this.categoryArr = res['category'];
    })


    this._dataService.getUser().subscribe(res=>{
      this.isUser = res;
    })

    //get card product
    this.productService.getProducts().subscribe(res=>{
      this.products = res;
    })

    //get cart product
    this.getCart = this._dataService.getProductInCart().subscribe(product=>{
      this.dataProducts = product;
      this.amountPrice = this.dataProducts.reduce((acc, el)=>{
        return acc += el.price * el.count
      }, 0)
    })


  }


  setPrice(value: any, id) {
    let price = document.getElementById(id);
    price.textContent = value;
  }

  setFilter(s: string) {
    this.filter = s;
  }

  addToCart(_id: string) {

    let element = document.getElementById(_id);

    const productInCartObj = {
      id: _id,
      price: element.textContent,
      name: element.getAttribute('data-name'),
      type: element.getAttribute('data-type'),
      kind: element.getAttribute('data-kind'),
      count: 1
    }

    alert(`was added ${productInCartObj.name} by ${productInCartObj.price}`)

    //добавлення до корзини
    let arrProducts = [];
    this.getCart = this._dataService.getProductInCart().subscribe(cart => arrProducts = cart)

    //коригування кількості
    let idx = arrProducts.findIndex(el=> el.price == productInCartObj.price && productInCartObj.id == el.id)
    if(idx < 0){
      arrProducts.push(productInCartObj)
    }else{
      arrProducts[idx].count += 1
    }

    //запис у сервіс
    this._dataService.setProduct(arrProducts);


    // запис у локал або базу даних
    if(this.isUser['_id']){
      this.productService.saveCartForUser(this.isUser['_id'], arrProducts, this.amountPrice).subscribe(response=>{
        console.log(response)
      })
    }
    else{
      localStorage.setItem('cart', JSON.stringify(arrProducts))
    }


    alertify.notify('Ready!');
  }


  ngOnDestroy() {
    this.getCart.unsubscribe();
  }
}
