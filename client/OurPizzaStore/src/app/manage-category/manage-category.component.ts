import { Component, OnInit } from '@angular/core';
import {Router} from "@angular/router";
import {ProductService} from "../services/product.service";
import {DataService} from "../data.service";
import {Subscription} from "rxjs";

@Component({
  selector: 'app-manage-category',
  templateUrl: './manage-category.component.html',
  styleUrls: ['./manage-category.component.css']
})
export class ManageCategoryComponent implements OnInit {

  categoryArr;
  private getCategory: Subscription;

  constructor(private route:Router,
              private productService:ProductService,
              private _dataService:DataService) { }

  ngOnInit(): void {

    this.productService.getCategory().subscribe(res=>{
      console.log(res);
      this.categoryArr = res['category'];
      // this._dataService.setCategory(res['category']);
    })




  }

  deleteCategory(itemElement: any, name:string) {
    this.productService.deleteCategory(itemElement).subscribe(res=>{
      alert('deleted');
      this.productService.getCategory().subscribe(res=>{
        console.log(res);
        this.categoryArr = res['category'];
        // this._dataService.setCategory(res['category']);
      })
    })

    this.productService.deleteProductByCategory(name).subscribe(res=>{
      console.log(res);
      alert(`was deleted ${res['result'].deletedCount} product(s)`);
    })
  }

  addCategory() {
    let value = document.getElementById('addCategory');
    this.productService.createCategory(value['value']).subscribe(res=>{
      if(res['status'] === 'error'){
        alert('some error try later')
        return
      }
      this.productService.getCategory().subscribe(res=>{
        console.log(res);
        this.categoryArr = res['category'];
        // this._dataService.setCategory(res['category']);
      })

      alert(`Category ${value['value']} added`)
    })
  }
}
