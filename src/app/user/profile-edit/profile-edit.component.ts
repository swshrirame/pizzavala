import { Component, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { UserService } from '../user.service';

@Component({
  selector: 'app-profile-edit',
  templateUrl: './profile-edit.component.html',
  styleUrls: ['./profile-edit.component.css']
})
export class ProfileEditComponent implements OnInit {

  firstName=''
  lastName=''
  email=''
  phone=''
  id=0

   constructor(private toastr: ToastrService,
    private service: UserService,
    private modal: NgbActiveModal) { }

  ngOnInit(): void {
  }
  
  onUpdate() {
    if (this.firstName.length == 0) {
      this.toastr.warning('please enter firstname')
    } else if (this.email.length == 0) {
      this.toastr.warning('please enter email')
    } else if (this.phone.length == 0) {
      this.toastr.warning('please enter phone')
    }else {
      this.service.putProfile(this.id, this.firstName, this.lastName,
            this.email, this.phone)
        .subscribe(response => {
          if (response['status'] == 'success') {
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
