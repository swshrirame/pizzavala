import { Route } from '@angular/compiler/src/core';
import { Component, AfterViewChecked } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ActionSequence } from 'protractor';


declare let paypal : any
@Component({
  selector: 'app-payment-gateway',
  templateUrl: './payment-gateway.component.html',
  styleUrls: ['./payment-gateway.component.css']
})
export class PaymentGatewayComponent implements AfterViewChecked  {
  constructor(
    private modalService: NgbModal,
   ) { }

  addscript: boolean=false
  PaypalLoad: boolean=true
  finalAmount : number=1;
  paypalConfig = {
    env : 'sandbox',
    client : {
      sandbox : 'AeKs9GprnkTYCqwILIl00HmEOKSYWdCPBVz4joN4qKV883Lw4UZhnyXJJYpf0l-K1hceTQ6GNvom882u'
    },
    commit : true,
    payment:(data,actions)=>{
      return actions.payment.create({
        payment:{
          transactions:[
            {
              amount : {total:this.finalAmount,currency:"USD"}
            }
          ]
        }
      })
    },
    onAuthorize:(data,actions)=>{
      return actions.payment.execute().then((payment)=>{
        //do something when payment is success
        alert("transaction completed")  
              
      })
    }
    }
  orderService: any;
  toastr: any;
  modal: any;
  payUMoneyService: any;
  messageService: any;
    ngAfterViewChecked(): void {
      if(!this.addscript){
        this.addPaypalScript().then(()=>{
          paypal.Button.render(this.paypalConfig,'#paypal-button-container')
          this.PaypalLoad=false
        })
      }
  }  
  addPaypalScript(){
    this.addscript=true
    return new Promise((resolve,reject)=>{
      let scripttagElement =document.createElement('script')
      scripttagElement.src="https://www.paypalobjects.com/api/checkout.js"
      scripttagElement.onload=resolve
      document.body.appendChild(scripttagElement)

    })
  }

}
