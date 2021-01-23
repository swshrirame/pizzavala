import { AddressEditComponent } from './../address-edit/address-edit.component';
import { ToastrService } from 'ngx-toastr';
import { AddressService } from './../address.service';
import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { AddressAddComponent } from '../address-add/address-add.component';

@Component({
  selector: 'app-address-list',
  templateUrl: './address-list.component.html',
  styleUrls: ['./address-list.component.css']
})
export class AddressListComponent implements OnInit {

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
    private modalService: NgbModal) { }

  ngOnInit(): void {
    this.loadAddresses()
  }

  loadAddresses() {
    this.service
      .getAddresses()
      .subscribe(response => {
        if (response['status'] == 'success') {
          this.addresses = response['data']
        } else {
          this.toastr.error(response['error'])
        }
      }) 
  }

  onAdd() {
    const modalRef = this.modalService.open(AddressAddComponent, {size: 'lg'})
    modalRef.result.finally(() => {
      this.loadAddresses()
    })
  }

  onDelete(address) {
    this.service
      .deleteAddress(address.id)
      .subscribe(response => {
        if (response['status'] == 'success') {
          this.loadAddresses()
        } else {
          this.toastr.error(response['error'])
        }
      })
  }

  onUpdate(address)
  {
      const modelRef=this.modalService.open(AddressEditComponent, {size: 'lg'})
      const component=modelRef.componentInstance as AddressEditComponent
      
      component.id = address.id
      component.title = address.title
      component.line1 = address.line1
      component.line2 = address.line2
      component.city = address.city
      component.state = address.state
      component.zipCode = address.zipCode

      modelRef.result.finally(()=>{
        this.loadAddresses()
      })
  }
}
