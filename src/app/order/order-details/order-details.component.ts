import { OrderService } from './../order.service';
import { Component, OnInit } from '@angular/core';
import { NgbModal, NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-order-details',
  templateUrl: './order-details.component.html',
  styleUrls: ['./order-details.component.css']
})
export class OrderDetailsComponent implements OnInit {
  userId = 0
  id = 1
  grandTotal = 0
  details = []
  date = ''

  constructor(
    private modal: NgbActiveModal,
    private toastr: ToastrService,
    private service: OrderService) { }

  ngOnInit(): void {
    this.loadDetails()
  }

  loadDetails() {
    this.service
        .getOrderDetails(this.userId, this.id)
        .subscribe(response => {
          if (response['status'] == 'success') {
            this.details = response['data']
            this.grandTotal = this.details[0]['grandTotal']
            this.date = this.details[0]['created_on']
            console.log(`date: ${this.date}`)
          } else {
            this.toastr.error(response['error'])
          }
        })
  }

  onCancel() {
    this.modal.dismiss('cancel')
  }
}
