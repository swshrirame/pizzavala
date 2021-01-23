import { Component, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { UserService } from '../user.service';

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.css']
})
export class ChangePasswordComponent implements OnInit {

  password=''
  confirmPassword=''
  id=0
  constructor(private toastr: ToastrService,
    private service: UserService,
    private modal: NgbActiveModal) { }

  ngOnInit(): void {
    
  }
  
  onUpdate() {
    console.log(this.id)
    if (this.password.length == 0) {

      this.toastr.warning('please enter password')
    } else if (this.confirmPassword.length == 0) {
      this.toastr.warning('please enter confirm password')
    } else 
    if (this.password!=this.confirmPassword) {
      this.toastr.warning('please enter matching password')
    }else {
      this.service.changePassword(this.password,this.id)
        .subscribe(response => {
          if (response['status'] == 'success') {
            this.toastr.success("password changed successfully")
            this.modal.dismiss('ok')
          } else {
            this.toastr.error(response['error'])
          }
    })
  }
  }

  onCancel() {
    this.modal.dismiss('cancel')
  }
}
