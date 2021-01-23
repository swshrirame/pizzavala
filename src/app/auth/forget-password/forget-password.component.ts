import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { ChangePasswordComponent } from 'src/app/user/change-password/change-password.component';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-forget-password',
  templateUrl: './forget-password.component.html',
  styleUrls: ['./forget-password.component.css']
})
export class ForgetPasswordComponent implements OnInit {

  email='';
  
  constructor(
    private router: Router,
    private service: AuthService,
    private toaster: ToastrService,
    private modalService: NgbModal) { }

  ngOnInit(): void {
  }
  
  onSubmit()
  {
    if (this.email.length == 0) {
    this.toaster.warning('please enter email name')
  }
  else{
   console.log(this.email)
    this.service.sendPasswordLink(this.email).subscribe(response => {
    if (response['status'] == 'success') {
  
  // cache the user details along with the token
    const user = response['data']
 // sessionStorage['id'] = user['id']
  //sessionStorage['user_name'] = user['firstName'] + ' ' + user['lastName']
  //sessionStorage['token'] ="onUpdate() user['token']
  
  //this.toaster.success('Welcome ' + sessionStorage['user_name'])
  //console.log(user['id'])
  const modelRef=this.modalService.open(ChangePasswordComponent, {size: 'lg'})
  const component=modelRef.componentInstance as ChangePasswordComponent
  
  component.id = user.id
 
 

  modelRef.result.finally(()=>{
    this.router.navigate(['/auth/signin'])
  })
  //this.router.navigate(['/auth/change-password'],sessionStorage['id'])

  } else 
  {
  this.toaster.error(response['error'])
  }
  })
  }
  }
}
