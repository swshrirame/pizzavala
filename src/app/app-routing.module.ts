import { DisclaimerComponent } from './home/disclaimer/disclaimer.component';
import { TermsAndConditionsComponent } from './home/terms-and-conditions/terms-and-conditions.component';
import { ContactUsComponent } from './home/contact-us/contact-us.component';
import { AboutUsComponent } from './home/about-us/about-us.component';
import { StaticHomeComponent } from './static-home/static-home.component';
import { AuthService } from './auth/auth.service';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';

const routes: Routes = [
  // for the default url (url with no path)
  { path: '', redirectTo: '/static-home', pathMatch: 'full' },

  // home component having the menu (navigation)
  { 
    path: 'home',
    component: HomeComponent,
    children: [
      { path: 'user', loadChildren: () => import('./user/user.module').then(m => m.UserModule) },
      { path: 'order', loadChildren: () => import('./order/order.module').then(m => m.OrderModule) },
      { path: 'product', loadChildren: () => import('./product/product.module').then(m => m.ProductModule) },
      { path: 'about-us', component: AboutUsComponent },
      { path: 'contact-us', component: ContactUsComponent },
      { path: 'terms-and-conditions', component: TermsAndConditionsComponent },
      { path: 'disclaimer', component: DisclaimerComponent },
    ],
    canActivate: [AuthService]
  },
  { path: 'static-home', component: StaticHomeComponent },

  // for signin and signup
  { path: 'auth', loadChildren: () => import('./auth/auth.module').then(m => m.AuthModule) }
]

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
