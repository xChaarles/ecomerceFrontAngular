import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DetalleOrdenService {

  private apio:string = "http://localhost:8080"
  constructor(private http :HttpClient) { } 

  getOrdenesByUserId(userId:any, token:string):Observable<any>{
    const url = `${this.apio}/user/carrito/detalleOrden?userId=${userId}`;
    const headers = new HttpHeaders ({
      'Authorization' : `Bearer ${token}`
    });
    return this.http.get<any>(url, { headers });
  }
}
