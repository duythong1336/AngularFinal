import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { MainEventComponent } from './main-event/main-event.component';
import { ProductNodejsComponent } from './product-nodejs/product-nodejs.component';
import { AuthGuard } from './guards/auth.guards';
import { MainLayoutComponent } from './main-layout/main-layout.component';
import { RegisterComponent } from './register/register.component';
const routes: Routes = [
  // { path: "", pathMatch: "full" , component: LoginComponent },
  // { path: "product", component: MainEventComponent },
  // { path: "product-nodejs", component: ProductNodejsComponent },
  // { path: "", component: LoginComponent}
  { path: '', component: LoginComponent },
  { path: 'register', component: RegisterComponent},
  { path: 'login', component: LoginComponent },
  {
    path: 'admin',
    component: MainLayoutComponent,
    canActivate: [AuthGuard],
    children: [
      { path: 'product', component: MainEventComponent },
      { path: 'product-nodejs', component: ProductNodejsComponent },
      { path: 'logina', component: LoginComponent },
      // { path: 'register', component: RegisterComponent },
    ],
  },

  { path: '**', component: LoginComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
