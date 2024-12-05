import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';

declare var ePayco: any;

@Injectable({
  providedIn: 'root'
})
export class EpaycoService {

  private publicKey = '13b4d19452a85c009d50326311e14f74';
  constructor(private http: HttpClient) { }

  realizarPago(data: any): void {
    const handler = ePayco.checkout.configure({
      key: this.publicKey,
      lang: 'es',
      test: true
    });
  
    handler.open({
      name: data.name,
      apellido: data.apellido,
      telefono: data.telefono,
      description: data.descripcion,
      currency: data.currency,
      amount: data.amount,
      tax_base: data.tax_base,
      tax: data.tax,
      country: data.country,
      lang: data.lang,
      invoice: data.invoice,
      confirmation: data.confirmation,
      response: data.response
    });
  }
}