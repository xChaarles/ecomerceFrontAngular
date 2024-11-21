import { Injectable } from '@angular/core';
declare var ePayco: any;

@Injectable({
  providedIn: 'root'
})
export class EpaycoService {

  private publicKey = '';

  constructor() {
  }

  realizarPago( data:any ): void {

     var handler = ePayco.checkout.configure({
      key: this.publicKey,
      lang: 'es',
      test: true
    });
    handler.open(data);
  }
 

}
