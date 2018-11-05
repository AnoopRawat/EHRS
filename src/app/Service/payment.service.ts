import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AppConst } from '../AppConst';

@Injectable({
  providedIn: 'root'
})
export class PaymentService {

  constructor(private httpClient: HttpClient) { }

  makePayment(paymentData) {
    paymentData.createTransactionRequest.merchantAuthentication.name = AppConst.SANDBOX_PAYMENT.merchantAuthentication_name;
    paymentData.createTransactionRequest.merchantAuthentication.transactionKey = AppConst.SANDBOX_PAYMENT.merchantAuthentication_Key;
    return this.httpClient.post("https://apitest.authorize.net/xml/v1/request.api", paymentData);
  }
}
