import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {HttpClient,HttpClientModule} from "@angular/common/http";
import { AgmCoreModule } from '@agm/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavbarComponent } from './navbar/navbar.component';
import { AuthComponent } from './auth/auth.component';
import { AboutComponent } from './about/about.component';
import { MainMenuComponent } from './main-menu/main-menu.component';
import { ContactsComponent } from './contacts/contacts.component';
import { FeedbackComponent } from './feedback/feedback.component';
import { FooterComponent } from './footer/footer.component';
import { HeaderTitleComponent } from './header-title/header-title.component';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import { RegistrationComponent } from './registration/registration.component';
import { LoginComponent } from './login/login.component';
import { TemplatesComponent } from './templates/templates.component';
import { ContentComponent } from './templates/content/content.component';
import { ReviewComponent } from './review/review.component';
import { MyOrderComponent } from './my-order/my-order.component';
import { MyInfoComponent } from './my-info/my-info.component';
import { EditPersonallInfoComponent } from './edit-personall-info/edit-personall-info.component';
import { ChangePasswordComponent } from './change-password/change-password.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { MapComponent } from './map/map.component';
import { SocialComponent } from './social/social.component';
import { SortProductPipe } from './pipes/sort-product.pipe';
import { CartComponent } from './cart/cart.component';
import {NgxPaginationModule} from "ngx-pagination";
import { MakeOrderComponent } from './make-order/make-order.component';
import { GalleryComponent } from './gallery/gallery.component';
import { AdministrativeComponent } from './administrative/administrative.component';
import { ManageCategoryComponent } from './manage-category/manage-category.component';


@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    AuthComponent,
    AboutComponent,
    MainMenuComponent,
    ContactsComponent,
    FeedbackComponent,
    FooterComponent,
    HeaderTitleComponent,
    RegistrationComponent,
    LoginComponent,
    TemplatesComponent,
    ContentComponent,
    ReviewComponent,
    MyOrderComponent,
    MyInfoComponent,
    EditPersonallInfoComponent,
    ChangePasswordComponent,
    NotFoundComponent,
    MapComponent,
    SocialComponent,
    SortProductPipe,
    CartComponent,
    MakeOrderComponent,
    GalleryComponent,
    AdministrativeComponent,
    ManageCategoryComponent,
  ],
    imports: [
        BrowserModule,
        NgxPaginationModule,
        AppRoutingModule,
        HttpClientModule,
        FormsModule,
        ReactiveFormsModule,
        AgmCoreModule.forRoot({
          apiKey: 'AIzaSyANsMUgTON1gtAx6okd1VWPEhmpZb2-3A0'
        })
    ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
