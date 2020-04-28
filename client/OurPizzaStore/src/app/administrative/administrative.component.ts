import { Component, OnInit} from '@angular/core';
import * as $ from 'jquery';
import {ProductService , ProductI } from '../services/product.service'
import { stringify } from 'querystring';
import { Button } from 'protractor';

@Component({
  selector: 'app-administrative',
  templateUrl: './administrative.component.html',
  styleUrls: ['./administrative.component.css']
})
export class AdministrativeComponent implements OnInit {
  Products:ProductI[]=[];
  constructor(private productServise :ProductService  ) { }
 
  
refresh()
{

  this.productServise.getProducts()
    .subscribe((data)=>{
    this.Products = data
    });
  
   
}

  ngOnInit(): void {
    $('#content').append("<h1>Hello Admin</h1>");
    this.productServise.getProducts()
    .subscribe((data)=>{
    this.Products = data
    });
  }
  goodsControl()
  {
    this.refresh();
    $("#content").empty();
  
    $('#content').append(' <button id = "add" class="btn btn-primary" ng-click = addNew()>Add new product</button>');


document.getElementById("add").addEventListener('click', ()=>{this.addNew()});
     $('#content').append('<table class="table table-hower table-striped">\
               <thead>\
    <th>Тип продукту</th>\
    <th>Категорія</th>\
    <th>Назва</th>\
    <th>Інгредієнти</th>\
    <th>Ціна</th>\
    <th>Edit</th>\
    <th>Delete</th>\
</thead>\
  <tbody>\
    </tbody>\
</table>');



for(let i=0;i<this.Products.length; i++)
{
  $('tbody').append("<tr id ="+i+">");
  var Nutrients = new String;
 
  $('tbody').append("<td>"+this.Products[i]["productType"]+"</td>");
  $('tbody').append("<td>"+this.Products[i]["kind"]+"</td>");
  $('tbody').append("<td>"+this.Products[i]["productName"]+"</td>");
  $('tbody').append("<td>"+this.Products[i]["nutrients"].toString()+"</td>");
  var price = new String("");
  for(let j=0;j<this.Products[i]["price"].length;j++)
  {
    price+=this.Products[i]["price"][j]["size"] +" : "+ this.Products[i]["price"][j]["value"]+"<br>";
  }
 
  $('tbody').append("<td>"+price+"</td>");

  $('tbody').append('<td><button type="button" id = "'+i+'" name='+ this.Products[i]["_id"]+' class="btn btn-warning">Edit</button></td>');
  $('tbody').append('<td><button type="button" id = "'+i+'"   name='+ this.Products[i]["_id"]+'  class="btn btn-danger">Delete</button></td>');
  $('tbody').append("</tr>");







  }
 
  
  var buttons = (<HTMLButtonElement[]><any>document.getElementsByClassName("btn-danger"));
      if (buttons.length > 0) {
  
          for (var i = 0; i < buttons.length; i++) {
             let tmp = i.toString()
              buttons[i].onclick = ()=>{this.removeProduct(buttons[tmp].name  ) };
  
          }
  
      }

      var buttons = (<HTMLButtonElement[]><any>document.getElementsByClassName("btn-warning"));
      if (buttons.length > 0) {
  
          for (var i = 0; i < buttons.length; i++) {
             let tmp = i.toString()
              buttons[i].onclick = ()=>{this.editProduct(buttons[tmp].name  ) };
  
          }
  
      }


  
  }

  addNew( )
  {
    $("#content").empty();
    $("#content").append('<h3>Add new product</h3>');
    $("#content").append('<h5>Product type</h5>');
    $('#content').append(' <input class="form-control" id="productType" >');
    $("#content").append('<h5>Product king</h5>');
    $('#content').append('<select class="form-control" id="kind">\
  <option>Meat</option>\
  <option>Vegeterian</option>\
  <option>Fish</option>\
</select>');
$("#content").append('<h5>Product name</h5>');
$('#content').append(' <input class="form-control" id="productName" >');
$("#content").append('<h5>Product description</h5>');
$('#content').append(' <textarea class="form-control"  id="productDesc" ></textarea>');
$("#content").append('<h5>Product ingridients</h5>');
$('#content').append('<div>\
<input class="form-control"  id="newIngridient" >\
<button id = "addIngridient" class="btn btn-primary">Add new ingridient</button>\
<select  class="form-control" id="selectedIngridients" > </select ></div>');
  

$("#content").append('<h5>Product image</h5>');
$('#content').append(' <input class="form-control" id="productImg" >');


$("#content").append('<h5>Product prices</h5>');
$('#content').append('<div>\
<input class="form-control"  id="newSize" placeholder = "product size" >\
<input class="form-control" type="number" id="newPrice" placeholder = "product price" >\
<button id = "addPrice" class="btn btn-primary">Add new size</button>\
<select  class="form-control"  id="selectedSizes" > </select >\
</div>');
$('#content').append('<button id = "addproduct" class="btn btn-success"  >Add new product</button>');

document.getElementById('addproduct').addEventListener('click', ()=>{this.EditOnServer(1)});

$( "#addIngridient" ).on( "click", function() {
  $('#selectedIngridients').append("<option>" + $('#newIngridient').val()+"</option>");
});
$( "#addPrice" ).on( "click", function() {
  if($('#newSize').val().length!=0&&$('#newPrice').val().length!=0){
  $('#selectedSizes').append("<option>" + $('#newSize').val()+" : "+$('#newPrice').val()+ "</option>");
  }
  else{
    alert("enter size or price field");
  }
});


this.refresh();


  }
removeProduct(name )
{

  this.productServise.removeProductById(name)
  .subscribe(data=>{
  
    alert("product successfully removed");
    console.log(name);
    this.Products=this.Products.filter(item=>item["_id"]!==name);
    
   
    this.goodsControl();
  },
  (error)=>{console.log(error);
  });
 


}









editProduct(name)
{
  var editTmp = this.Products.find(item=>item["_id"]==name)
  $("#content").empty();
    $("#content").append('<h3>Edit product</h3>');
    $("#content").append('<h5>Product type</h5>');
    $('#content').append(' <input class="form-control" id="EditproductType" value="'+editTmp["productType"]+'" >');
    $("#content").append('<h5>Product king</h5>');
    $('#content').append('<select class="form-control" id="Editkind">\
  <option value="Meat">Meat</option>\
  <option value="Vegeterian">Vegeterian</option>\
  <option value="Fish">Fish</option>\
</select>');
$('#Editkind').val(editTmp["kind"]);
$("#content").append('<h5>Product name</h5>');
$('#content').append(' <input class="form-control" id="EditproductName" value="'+editTmp["productName"]+'" >');
$("#content").append('<h5>Product description</h5>');
$('#content').append(' <textarea class="form-control"  id="EditproductDesc"  ></textarea>');
$("#content").append('<h5>Product ingridients</h5>');
$('#content').append('<div>\
<input class="form-control"  id="newIngridient" >\
<button id = "addIngridient" class="btn btn-primary">Add new ingridient</button>\
<button id = "removeIngridient" style="margin-left:5px" class="btn btn-danger">Remove ingridient</button>\
<select  class="form-control" id="selectedIngridients" > </select ></div>');
$("#content").append('<h5>Product image</h5>');
$('#content').append(' <input class="form-control" id="productImg" value="'+ editTmp["img"]+'" >');
$("#content").append('<h5>Product prices</h5>');
$('#content').append('<div>\
<input class="form-control"  id="newSize" placeholder = "product size" >\
<input class="form-control" type="number" id="newPrice" placeholder = "product price" >\
<button id = "addPrice" class="btn btn-primary">Add new size</button>\
<button id = "removePrice" style="margin-left:5px" class="btn btn-danger">Remove size</button>\
<select  class="form-control"  id="selectedSizes" > </select >\
</div>');
$('#content').append('<button id = "editproduct" class="btn btn-success"  >Edit product</button>');





document.getElementById("EditproductDesc").innerHTML = editTmp["description"].toString();


for(let i=0;i<editTmp["nutrients"].length;i++)
{
  $('#selectedIngridients').append("<option value="+ editTmp["nutrients"][i]+">" + editTmp["nutrients"][i]+"</option>")
}

for(let i=0;i<editTmp["price"].length;i++)
{
  $('#selectedSizes').append("<option>" + editTmp["price"][i]["size"]+" : "+editTmp["price"][i]["value"]+ "</option>");
  
}






document.getElementById('editproduct').addEventListener('click', ()=>{this.EditOnServer(2 , editTmp["_id"])});

$("#removePrice" ).on( "click", function() {
  $("#selectedSizes").find('option:selected').remove();
});


$("#removeIngridient" ).on( "click", function() {
  $("#selectedIngridients").find('option:selected').remove();
});


$( "#addIngridient" ).on( "click", function() {
  $('#selectedIngridients').append("<option>" + $('#newIngridient').val()+"</option>");
});
$( "#addPrice" ).on( "click", function() {
  if($('#newSize').val().length!=0&&$('#newPrice').val().length!=0){
  $('#selectedSizes').append("<option>" + $('#newSize').val()+" : "+$('#newPrice').val()+ "</option>");
  }
  else{
    alert("enter size or price field");
  }
});
}




EditOnServer(typeFunc , id?)
{
  if($("#EditproductType").val().length!=0&&$("#Editkind").length!=0&&$("#EditproductName").val().length!=0&&document.getElementById("selectedIngridients").children.length!=0&&document.getElementById("selectedSizes").children.length!=0){
    var nutrientsArr = new Array();
    for(let i = 0;i<document.getElementById("selectedIngridients").children.length;i++)
    {
      nutrientsArr.push(document.getElementById("selectedIngridients").children[i].textContent);
    }
    var pricesArr = new Array();
    for(let i = 0;i<document.getElementById("selectedSizes").children.length;i++)
    {
      var tmp = document.getElementById("selectedSizes").children[i].textContent.split(':')
    pricesArr.push({size:  tmp[0], value:  tmp[1]});
        }
 console.log(pricesArr);


if(typeFunc ==1){
    this.productServise.addProducts($("#productType").val() ,$("#productName").val(),$("#kind option:selected").text(),pricesArr ,   nutrientsArr , $("#productDesc").val() , $("#productImg").val())
      .subscribe(data=>{
           },
        (error)=>{console.log(error);
        });
        this.refresh();
        alert("product successfully added");

      }
      else
      {
        this.productServise.editProducts( id , $("#EditproductType").val() ,$("#EditproductName").val(),$("#Editkind option:selected").text(),pricesArr ,   nutrientsArr , $("#EditproductDesc").val() , $("#productImg").val())
        .subscribe(data=>{
             },
          (error)=>{console.log(error);
          });
          this.refresh();
      
          alert("product successfully edited");
      }



  }
  else
  {
   alert("enter all fields");
  }
}

orderControl()
{
  $("#content").empty();
}




}





















