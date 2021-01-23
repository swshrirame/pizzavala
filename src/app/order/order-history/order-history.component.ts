import { ToastrService } from 'ngx-toastr';
import { OrderService } from './../order.service';
import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { OrderDetailsComponent } from '../order-details/order-details.component';

@Component({
  selector: 'app-order-history',
  templateUrl: './order-history.component.html',
  styleUrls: ['./order-history.component.css']
})
export class OrderHistoryComponent implements OnInit {
  orders = []

  constructor(
    private toastr: ToastrService,
    private orderService: OrderService,
    private modalService: NgbModal) { }

  ngOnInit(): void {
    this.loadOrders()
  }

  loadOrders() {
    this.orderService
      .getOrders()
      .subscribe(response => {
        if (response['status'] == 'success') {
          this.orders = response['data']
        } else {
          this.toastr.error(response['error'])
        }
      })
  }

  onCancelOrder(order) {
    this.orderService
      .cancelOrder(order.id)
      .subscribe(response => {
        if (response['status'] == 'success') {
          this.toastr.success('Cancelled your order')
          this.loadOrders()
        } else {
          this.toastr.error(response['error'])
        }
      })
  }
  onDetails(order) {
    const modalRef = this.modalService.open(OrderDetailsComponent, {size: 'lg'})
    const component=modalRef.componentInstance as OrderDetailsComponent
      
      component.userId = order.userId
      component.id = order.id

    modalRef.result.finally(() => {
      this.loadOrders()
    })
  }
}
