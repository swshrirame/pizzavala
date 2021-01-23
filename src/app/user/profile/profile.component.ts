import { UserService } from './../user.service';
import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ChangePasswordComponent } from '../change-password/change-password.component';
import { ProfileEditComponent } from '../profile-edit/profile-edit.component';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  profile = undefined
  firstName=''
  lastName=''
  email=''
  phone=''
  id=0
  constructor(private toastr: ToastrService,
    private service: UserService,
    private modalService: NgbModal) { }

  ngOnInit(): void {
    this.loadProfile()
  }

  loadProfile() {
    this.service
      .getProfile()
      .subscribe(response => {
        if (response['status'] == 'success') {
          this.profile = response['data']
        } else {
          this.toastr.error(response['error'])
        }
      }) 
  }
  onUpdate(profile) {
    const modelRef=this.modalService.open(ProfileEditComponent, {size: 'lg'})
    const component=modelRef.componentInstance as ProfileEditComponent
    
    component.id = profile.id
    component.firstName = profile.firstName
    component.lastName = profile.lastName
    component.email = profile.email
    component.phone = profile.phone
   

    modelRef.result.finally(()=>{
      this.loadProfile()
    })
  }
  onChange(profile)
  {
    const modelRef=this.modalService.open(ChangePasswordComponent, {size: 'lg'})
    const component=modelRef.componentInstance as ChangePasswordComponent
    
    component.id = profile.id
   
   

    modelRef.result.finally(()=>{
      this.loadProfile()
    })
  }
}
