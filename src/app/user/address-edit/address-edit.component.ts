import { Component, OnInit } from '@angular/core';
import { NgbModal, NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { AddressService } from '../address.service';

@Component({
  selector: 'app-address-edit',
  templateUrl: './address-edit.component.html',
  styleUrls: ['./address-edit.component.css']
})
export class AddressEditComponent implements OnInit {

  id = 0
  addresses = []
  title = ''
  line1 = ''
  line2 = ''
  city = ''
  state = ''
  zipCode = ''

  constructor(
    private toastr: ToastrService,
    private service: AddressService,
    private modal: NgbActiveModal) { }

  ngOnInit(): void {
    
  }

  onUpdate() {
    if (this.title.length == 0) {
      this.toastr.warning('please enter title')
    } else if (this.line1.length == 0) {
      this.toastr.warning('please enter line1')
    } else if (this.line2.length == 0) {
      this.toastr.warning('please enter line2')
    } else if (this.city.length == 0) {
      this.toastr.warning('please enter city')
    } else if (this.state.length == 0) {
      this.toastr.warning('please select an state')
    } else if (this.zipCode.length == 0) {
      this.toastr.warning('please select an Zip Code')
    } else {
      this.service
        .updateAddress(this.id, this.title, this.line1, this.line2,
            this.city, this.state, this.zipCode)
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
