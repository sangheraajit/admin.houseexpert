import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';



const httpOptions = {
headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};
declare var Razorpay: any;

@Injectable({
  providedIn: 'root'
})
export class OrderService {
  apiUrl = environment.CommonApiServer + 'api/OrderControler/';
  constructor(private http: HttpClient) {

  }

  createOrder(order:any){
   /*  customerName: order.name,
    email: order.email,
    phoneNumber: order.phone,
    amount: order.amount */
      return this.http.post(this.apiUrl+"SaveOrder", order);
  }
  CreateOrUpdateOrder(order:any){
    /*  customerName: order.name,
     email: order.email,
     phoneNumber: order.phone,
     amount: order.amount */
       return this.http.post(this.apiUrl+"CreateOrUpdateOrder", order);
   }
   SendWhatsAppsPaymentPending(orderid:any){
    /*  customerName: order.name,
     email: order.email,
     phoneNumber: order.phone,
     amount: order.amount */
       return this.http.post(this.apiUrl+"SendWhatsAppsPaymentPending?orderid="+orderid,{});
   }
   SendWhatsAppsQuotation(orderid:any){
    /*  customerName: order.name,
     email: order.email,
     phoneNumber: order.phone,
     amount: order.amount */
       return this.http.post(this.apiUrl+"SendWhatsAppsQuotation?orderid="+orderid,{});
   }
   SendWhatsAppsAdvancePay(orderid:any){
    /*  customerName: order.name,
     email: order.email,
     phoneNumber: order.phone,
     amount: order.amount */
       return this.http.post(this.apiUrl+"SendWhatsAppsAdvancePay?orderid="+orderid,{});
   }
   SendWhatsAppsJobConfirmation(orderid:any){
    /*  customerName: order.name,
     email: order.email,
     phoneNumber: order.phone,
     amount: order.amount */
       return this.http.post(this.apiUrl+"SendWhatsAppsJobConfirmation?orderid="+orderid,{});
   }
   SendEmailAdminOrderQuote(orderid:any){
    /*  customerName: order.name,
     email: order.email,
     phoneNumber: order.phone,
     amount: order.amount */
       return this.http.post(this.apiUrl+"SendEmailAdminOrderQuote?orderid="+orderid,{});
   }
  createRazorOrder(order:any){
    /*  customerName: order.name,
     email: order.email,
     phoneNumber: order.phone,
     amount: order.amount */
       return this.http.post(this.apiUrl+"GetRazorpayOrderNumber", order);
   }
  updateOrder(order:any) {
     /*  return this.http.put(AppConstants.API_URL + 'order', {
      razorpayOrderId: order.razorpay_order_id,
      razorpayPaymentId: order.razorpay_payment_id,
      razorpaySignature: order.razorpay_signature
      }, httpOptions); */
      return this.http.post(this.apiUrl+"update",order);
  }
  AdminOrderUpdate(order:any) {
    /*  return this.http.put(AppConstants.API_URL + 'order', {
     razorpayOrderId: order.razorpay_order_id,
     razorpayPaymentId: order.razorpay_payment_id,
     razorpaySignature: order.razorpay_signature
     }, httpOptions); */
     return this.http.post(this.apiUrl+"AdminOrderUpdate",order);
 }
}
