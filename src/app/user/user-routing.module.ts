import { AddressListComponent } from './address-list/address-list.component';
import { AddressEditComponent } from './address-edit/address-edit.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AddressAddComponent } from './address-add/address-add.component';
import { ProfileComponent } from './profile/profile.component';
import { ChangePasswordComponent } from './change-password/change-password.component';

const routes: Routes = [
  { path: 'address-add', component: AddressAddComponent },
  { path: 'address-edit', component: AddressEditComponent },
  { path: 'address-list', component: AddressListComponent },
  { path: 'profile', component: ProfileComponent },
  {path:'change-password',component:ChangePasswordComponent},

]

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UserRoutingModule { }
