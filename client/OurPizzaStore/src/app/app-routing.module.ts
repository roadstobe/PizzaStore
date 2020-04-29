import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {TemplatesComponent} from "./templates/templates.component";
import {LoginComponent} from "./login/login.component";
import {RegistrationComponent} from "./registration/registration.component";
import {MyInfoComponent} from "./my-info/my-info.component";
import {EditPersonallInfoComponent} from "./edit-personall-info/edit-personall-info.component";
import {ChangePasswordComponent} from "./change-password/change-password.component";
import {ReviewComponent} from "./review/review.component";
import {NotFoundComponent} from "./not-found/not-found.component";
import {AuthenticationGuard} from "./authentication.guard";
import {MyOrderComponent} from "./my-order/my-order.component";
import {CartComponent} from "./cart/cart.component";
import {MakeOrderComponent} from "./make-order/make-order.component";
import {AdministrativeComponent} from "./administrative/administrative.component";
import {ManageCategoryComponent} from "./manage-category/manage-category.component";

const routes: Routes = [
  {path: '', component: TemplatesComponent},
  {path: 'login', component: LoginComponent},
  {path: 'register', component: RegistrationComponent},
  {path: 'cart', component: CartComponent},
  {path: 'order', component: MakeOrderComponent},
  {path: 'my-info', component:MyInfoComponent, canActivate:[AuthenticationGuard]},
  {path: 'category', component:ManageCategoryComponent, canActivate:[AuthenticationGuard]},
  {path: 'admin', component:AdministrativeComponent, canActivate:[AuthenticationGuard]},
  {path: 'my-order', component:MyOrderComponent, canActivate:[AuthenticationGuard]},
  {path: 'edit-info', component:EditPersonallInfoComponent,  canActivate:[AuthenticationGuard]},
  {path: 'change-password', component:ChangePasswordComponent,  canActivate:[AuthenticationGuard]},
  {path: 'leave-review', component:ReviewComponent,  canActivate:[AuthenticationGuard]},
  {path: '**', component: NotFoundComponent}

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
