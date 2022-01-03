import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AngularFireModule } from '@angular/fire';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { environment } from '../environments/environment';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { NavbarComponent } from './navbar/navbar.component';
import { MainEventComponent } from './main-event/main-event.component';//khai báo khi yêu cầu phải xác thực VD: trong chức năng update
import {ReactiveFormsModule} from "@angular/forms";
import { HttpClientModule } from '@angular/common/http';
import { ProductNodejsComponent } from './product-nodejs/product-nodejs.component';
import { InsertItemNodejsComponent } from './insert-item-nodejs/insert-item-nodejs.component';
import { LoginComponent } from './login/login.component';
import { TopNavComponent } from './top-nav/top-nav.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule } from '@angular/forms';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { MainLayoutComponent } from './main-layout/main-layout.component';
@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    MainEventComponent,
    ProductNodejsComponent,
    InsertItemNodejsComponent,
    LoginComponent,
    TopNavComponent,
    HeaderComponent,
    FooterComponent,
    MainLayoutComponent,
    
    
  ],
  imports: [
    HttpClientModule,
    BrowserModule,
    AngularFireModule.initializeApp(environment.firebase),
		AngularFirestoreModule,
		AngularFireAuthModule,
    AppRoutingModule,
    ReactiveFormsModule,
    NgbModule,
    FormsModule,

  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
